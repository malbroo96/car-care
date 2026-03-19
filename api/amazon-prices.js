import crypto from "node:crypto";

const DEFAULT_HOST = "webservices.amazon.in";
const DEFAULT_REGION = "eu-west-1";
const DEFAULT_MARKETPLACE = "www.amazon.in";
const SERVICE = "ProductAdvertisingAPI";
const ENDPOINT = "/paapi5/getitems";
const TARGET = "com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems";

function hmac(key, value, encoding) {
  return crypto.createHmac("sha256", key).update(value, "utf8").digest(encoding);
}

function sha256(value, encoding = "hex") {
  return crypto.createHash("sha256").update(value, "utf8").digest(encoding);
}

function toAmzDate(date) {
  return date.toISOString().replace(/[:-]|\.\d{3}/g, "");
}

function toDateStamp(date) {
  return toAmzDate(date).slice(0, 8);
}

function getSigningKey(secretKey, dateStamp, region) {
  const kDate = hmac(`AWS4${secretKey}`, dateStamp);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, SERVICE);
  return hmac(kService, "aws4_request");
}

function buildHeaders({ accessKey, secretKey, host, region, payload }) {
  const now = new Date();
  const amzDate = toAmzDate(now);
  const dateStamp = toDateStamp(now);
  const payloadHash = sha256(payload);

  const canonicalHeaders =
    `content-encoding:amz-1.0\n` +
    `content-type:application/json; charset=utf-8\n` +
    `host:${host}\n` +
    `x-amz-date:${amzDate}\n` +
    `x-amz-target:${TARGET}\n`;
  const signedHeaders =
    "content-encoding;content-type;host;x-amz-date;x-amz-target";
  const canonicalRequest = [
    "POST",
    ENDPOINT,
    "",
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join("\n");

  const credentialScope = `${dateStamp}/${region}/${SERVICE}/aws4_request`;
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    sha256(canonicalRequest),
  ].join("\n");

  const signature = hmac(
    getSigningKey(secretKey, dateStamp, region),
    stringToSign,
    "hex"
  );

  return {
    "content-encoding": "amz-1.0",
    "content-type": "application/json; charset=utf-8",
    host,
    "x-amz-date": amzDate,
    "x-amz-target": TARGET,
    Authorization:
      `AWS4-HMAC-SHA256 Credential=${accessKey}/${credentialScope}, ` +
      `SignedHeaders=${signedHeaders}, Signature=${signature}`,
  };
}

function chunk(values, size) {
  const chunks = [];
  for (let i = 0; i < values.length; i += size) {
    chunks.push(values.slice(i, i + size));
  }
  return chunks;
}

function normalizeItem(item) {
  const listing = item?.OffersV2?.Listings?.[0] || item?.Offers?.Listings?.[0];
  const price = listing?.Price;

  return {
    asin: item?.ASIN,
    detailPageUrl: item?.DetailPageURL,
    amount: price?.Amount ?? null,
    currency: price?.Currency ?? null,
    displayAmount: price?.DisplayAmount ?? null,
  };
}

async function requestPrices({ host, region, marketplace, partnerTag, accessKey, secretKey, itemIds }) {
  const payload = JSON.stringify({
    ItemIds: itemIds,
    ItemIdType: "ASIN",
    PartnerTag: partnerTag,
    PartnerType: "Associates",
    Marketplace: marketplace,
    Resources: [
      "ItemInfo.Title",
      "OffersV2.Listings.Price",
      "Offers.Listings.Price",
    ],
  });

  const response = await fetch(`https://${host}${ENDPOINT}`, {
    method: "POST",
    headers: buildHeaders({
      accessKey,
      secretKey,
      host,
      region,
      payload,
    }),
    body: payload,
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      error: data?.Errors?.[0]?.Message || "Amazon price request failed.",
    };
  }

  const items = data?.ItemsResult?.Items || [];
  return {
    ok: true,
    items: Object.fromEntries(items.map((item) => [item.ASIN, normalizeItem(item)])),
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const accessKey =
    process.env.AMAZON_CREATORS_ACCESS_KEY ||
    process.env.AMAZON_PAAPI_ACCESS_KEY;
  const secretKey =
    process.env.AMAZON_CREATORS_SECRET_KEY ||
    process.env.AMAZON_PAAPI_SECRET_KEY;
  const partnerTag =
    process.env.AMAZON_CREATORS_ASSOCIATE_TAG ||
    process.env.AMAZON_ASSOCIATE_TAG;
  const host =
    process.env.AMAZON_CREATORS_HOST ||
    process.env.AMAZON_PAAPI_HOST ||
    DEFAULT_HOST;
  const region =
    process.env.AMAZON_CREATORS_REGION ||
    process.env.AMAZON_PAAPI_REGION ||
    DEFAULT_REGION;
  const marketplace = process.env.AMAZON_MARKETPLACE || DEFAULT_MARKETPLACE;

  if (!accessKey || !secretKey || !partnerTag) {
    return res.status(500).json({
      error:
        "Missing Amazon credentials. Set AMAZON_CREATORS_ACCESS_KEY, AMAZON_CREATORS_SECRET_KEY, and AMAZON_CREATORS_ASSOCIATE_TAG in Vercel.",
    });
  }

  const products = Array.isArray(req.body?.products) ? req.body.products : [];
  const withAsin = products.filter((product) => typeof product?.asin === "string" && product.asin.trim());

  if (!withAsin.length) {
    return res.status(200).json({ prices: {}, missing: products.map((product) => product.id) });
  }

  const idByAsin = new Map(withAsin.map((product) => [product.asin, product.id]));
  const asinChunks = chunk(
    [...new Set(withAsin.map((product) => product.asin.trim()))],
    10
  );

  const priceEntries = {};
  const errors = [];

  for (const asinChunk of asinChunks) {
    const result = await requestPrices({
      host,
      region,
      marketplace,
      partnerTag,
      accessKey,
      secretKey,
      itemIds: asinChunk,
    });

    if (!result.ok) {
      errors.push(result.error);
      continue;
    }

    Object.entries(result.items).forEach(([asin, value]) => {
      const productId = idByAsin.get(asin);
      if (productId) {
        priceEntries[productId] = value;
      }
    });
  }

  return res.status(200).json({
    prices: priceEntries,
    missing: products
      .filter((product) => !priceEntries[product.id])
      .map((product) => product.id),
    errors,
  });
}
