import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const SITE_NAME = "Car-Bliss";
const SITE_URL = "https://www.car-bliss.com";
const DEFAULT_DESCRIPTION =
  "Discover top-rated car care products including washing kits, shampoos, microfiber cloths, and detailing tools. Shop now for professional car maintenance solutions.";
const DEFAULT_KEYWORDS =
  "car care, auto detailing, car wash kits, car shampoo, microfiber cloths, car detailing tools, vehicle maintenance, premium car products";

function toAbsoluteUrl(value) {
  return value.startsWith("http") ? value : new URL(value, SITE_URL).toString();
}

export default function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  path,
  type = "website",
  image = logo,
  noIndex = false,
  structuredData,
}) {
  const location = useLocation();
  const resolvedPath = path ?? location.pathname;
  const canonicalUrl = toAbsoluteUrl(resolvedPath);
  const imageUrl = toAbsoluteUrl(image);
  const robotsContent = noIndex ? "noindex, nofollow" : "index, follow";
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const structuredDataEntries = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={SITE_NAME} />
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <meta name="theme-color" content="#0f172a" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      <meta name="format-detection" content="telephone=no" />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={`${SITE_NAME} logo`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={`${SITE_NAME} logo`} />
      <meta name="twitter:url" content={canonicalUrl} />
      {structuredDataEntries.map((entry, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(entry)}
        </script>
      ))}
    </Helmet>
  );
}
