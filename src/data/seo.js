export const siteFaqs = [
  {
    question: "How often should I wash my car?",
    answer:
      "Most daily-driven cars benefit from a proper wash every one to two weeks. During monsoon season, dusty conditions, or highway use, washing more often helps protect paint and trim from buildup.",
  },
  {
    question: "Which car shampoo is safest for regular use?",
    answer:
      "A pH-balanced shampoo is usually the safest choice for regular washes because it lifts dirt without stripping existing wax or sealant layers too aggressively.",
  },
  {
    question: "Are microfiber towels really better than regular cloths?",
    answer:
      "Yes. Quality microfiber towels are softer, absorb more water, and reduce the risk of dragging grit across the paint when washing, drying, or buffing.",
  },
  {
    question: "Should I choose wax or ceramic spray for paint protection?",
    answer:
      "Wax is a good option if you enjoy frequent detailing and want a warm gloss. Ceramic sprays are usually easier to maintain over longer intervals and offer stronger water-beading performance.",
  },
];

export const organization = {
  name: "Car-Bliss",
  legalName: "Car-Bliss",
  url: "https://www.car-bliss.com",
  logo: "https://www.car-bliss.com/src/assets/logo.png",
  email: "support@car-bliss.com",
  sameAs: ["https://www.instagram.com/carbliss_for_cars/"],
  description:
    "Car-Bliss publishes practical car care buying guides, maintenance tips, and curated product recommendations for drivers who want easier cleaning and paint protection routines.",
};

export const editorialPrinciples = [
  "We focus on practical car care products that help with routine washing, drying, interior cleaning, and paint protection.",
  "Recommendations are selected for usefulness, brand trust, category fit, and everyday maintenance value.",
  "Affiliate commissions may be earned from qualifying purchases, but affiliate relationships do not determine which categories or product types we cover.",
  "Guides are written to answer common ownership questions in clear language so readers can compare products faster.",
];

export const guideMeta = {
  published: "2026-03-19",
  modified: "2026-03-19",
  authorName: "Car-Bliss Editorial Team",
};

export const categoryDescriptions = {
  "Best Sellers":
    "Explore the most popular car care products on Car-Bliss, from shampoos and microfiber towels to interior cleaners and paint protection picks trusted by everyday drivers.",
  "Combos & Bundles":
    "These complete kits bundle together the essentials for washing, interior cleaning, and finishing, making them a practical choice if you want an easier all-in-one setup.",
  "Car Shampoo & Cleaners":
    "Choose from pH-balanced shampoos, foam wash concentrates, and water-saving cleaners that help loosen grime safely while protecting your paint during regular washes.",
  "Pressure Washers & Foam Cannons":
    "Pressure washers and foam cannons help speed up pre-rinse and snow-foam steps, which can reduce contact washing risk and improve cleaning efficiency on dirtier cars.",
  "Microfiber Cloths & Towels":
    "Microfiber wash mitts and drying towels are some of the most important tools for safer detailing because they help lift residue while reducing scratch risk on delicate surfaces.",
  "Interior Cleaning":
    "Keep dashboards, trim, upholstery, and high-touch cabin surfaces cleaner with interior products designed to remove dust, fingerprints, and daily-use buildup without greasy residue.",
  "Polish, Wax & Protection":
    "Polishes, waxes, and spray protectants help restore gloss, improve water behavior, and add a protective layer that makes future washes easier and paintwork easier to maintain.",
  "Car Perfume":
    "Car perfumes and air fresheners help keep the cabin pleasant between deep cleans, with options that range from subtle gels to stronger long-lasting fragrances.",
};

export const categoryGuideLinks = {
  "Best Sellers": {
    href: "/guides/wash-without-swirl-marks",
    label: "Start with the safe wash guide",
  },
  "Combos & Bundles": {
    href: "/guides/wash-without-swirl-marks",
    label: "See the weekly wash routine",
  },
  "Car Shampoo & Cleaners": {
    href: "/guides/wash-without-swirl-marks",
    label: "Learn how to wash without swirl marks",
  },
  "Pressure Washers & Foam Cannons": {
    href: "/guides/wash-without-swirl-marks",
    label: "Read the pre-rinse and foam wash guide",
  },
  "Microfiber Cloths & Towels": {
    href: "/guides/wash-without-swirl-marks",
    label: "See how to choose safer wash tools",
  },
  "Interior Cleaning": {
    href: "/guides/interior-cleaning-guide",
    label: "Read the interior cleaning guide",
  },
  "Polish, Wax & Protection": {
    href: "/guides/wax-vs-ceramic-spray",
    label: "Compare wax and ceramic spray",
  },
  "Car Perfume": {
    href: "/guides/interior-cleaning-guide",
    label: "Pair fragrance with a cleaner cabin routine",
  },
};

export function buildFaqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildProductListSchema(products, name, url) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    url,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.name,
          image: product.image,
          brand: {
            "@type": "Brand",
            name: product.brand,
          },
          category: product.category,
          aggregateRating: product.rating
            ? {
                "@type": "AggregateRating",
                ratingValue: product.rating,
                reviewCount: 1,
              }
            : undefined,
        },
      })),
    },
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: organization.name,
    legalName: organization.legalName,
    url: organization.url,
    logo: organization.logo,
    email: organization.email,
    sameAs: organization.sameAs,
    description: organization.description,
  };
}
