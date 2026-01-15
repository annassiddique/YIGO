// // Import Chinese news items
// import { newsItemsZh } from './news.zh';

// export interface NewsItem {
//   slug: string;
//   title: string;
//   excerpt: string;
//   content: string;
//   date: string;
//   author: string;
//   image?: string;
//   category: 'news' | 'press' | 'media';
//   featured?: boolean;
// }

// export const newsItems: NewsItem[] = [
//   {
//     slug: 'yigo-wins-gold-at-the-architecture-madrid-awards-2025',
//     title: 'YIGO Wins Gold at the Architecture Madrid Awards 2025',
//     excerpt: 'YIGO Group has earned global recognition at the Architecture Madrid Awards 2025, winning Gold in Residential Architecture for its Dubai flagship project, CBD26.',
//     content: `# YIGO Wins Gold at the Architecture Madrid Awards 2025

// ## A Landmark Achievement for YIGO Group

// YIGO Group has earned global recognition at the Architecture Madrid Awards 2025, winning Gold in Residential Architecture for its Dubai flagship project, CBD26.

// This achievement highlights YIGO’s architectural philosophy of “merging rationality with aesthetics,” combining minimalist modernism with cultural depth. The Dubai development’s fluid façade and Mediterranean-inspired design have redefined contemporary living in the Middle East.

// ## A Symbol of Innovation and Legacy

// This international recognition positions YIGO among the most forward-thinking real estate developers in the world. More than an award, it marks a milestone in the company’s journey — a celebration of precision, creativity, and craftsmanship that continues to shape skylines across continents.`,
//     date: '2025-10-30',
//     author: 'YIGO Team',
//     image: '/images/news-award.jpg',
//     category: 'news',
//     featured: true
//   },
//   {
//     slug: 'yigo-launches-a-new-era-of-living-in-dubais-international-city',
//     title: 'YIGO Launches a New Era of Living in Dubai’s International City',
//     excerpt: 'YIGO Group has officially launched its first Middle Eastern development, located at Plot CBD26 in Dubai’s International City.',
//     content: `# YIGO Launches a New Era of Living in Dubai’s International City

// ## A Global Vision Arrives in the UAE

// YIGO Group has officially launched its first Middle Eastern development, located at Plot CBD26 in Dubai’s International City. The project presents a globally limited collection of 186 residences, merging Hong Kong craftsmanship with Middle Eastern character.

// ## Seamless Connectivity and Intelligent Design

// Situated 188 metres from the Blue Line Metro and just 15 minutes from Dubai International Airport, the development exemplifies convenience and elegance. Its intelligent two-bedroom configurations optimise space for maximum functionality and rental yield — redefining modern urban living.

// ## A Statement of Confidence and Craftsmanship

// This project symbolizes YIGO’s commitment to shaping the future of Dubai’s skyline through artistry, precision, and sustainability.`,
//     date: '2024-01-10',
//     author: 'YIGO Team',
//     image: '/images/news-office.jpg',
//     category: 'press',
//     featured: false
//   },
//   {
//     slug: 'yigo-group-expands-into-dubais-dynamic-real-estate-market',
//     title: 'YIGO Group Expands into Dubai’s Dynamic Real Estate Market',
//     excerpt: 'With over 23 years of experience in Asia and Europe, YIGO Group marks its strategic expansion into Dubai’s real estate market. Known for combining architectural innovation with long-term value creation, YIGO brings a new standard of international living to the UAE.',
//     content: `# YIGO Group Expands into Dubai’s Dynamic Real Estate Market

// ## From Hong Kong to Dubai — A Global Journey

// With over 23 years of experience in Asia and Europe, YIGO Group marks its strategic expansion into Dubai’s real estate market. Known for combining architectural innovation with long-term value creation, YIGO brings a new standard of international living to the UAE.

// ## Building Bridges Between East and West

// YIGO’s first project, CBD26, embodies the brand’s DNA — fusing functionality, artistry, and cultural understanding. The group’s entry into Dubai is more than a geographical expansion; it’s the beginning of a regional evolution in design and development philosophy.

// ## Redefining Quality and Vision in the UAE

// By integrating Hong Kong precision with Dubai’s ambition, YIGO aims to create communities that reflect sophistication, sustainability, and modern human connection.`,
//     date: '2024-01-20',
//     author: 'YIGO Team',
//     image: '/images/news-award.jpg',
//     category: 'press',
//     featured: false
//   },
//   {
//     slug: 'the-best-family-friendly-communities-in-dubai-2025-guide',
//     title: 'The Best Family-Friendly Communities in Dubai (2025 Guide)',
//     excerpt: 'Dubai is home to some of the world’s most thoughtfully planned residential communities. From Dubai Hills Estate and Arabian Ranches to the growing International City, each area offers unique benefits for family life.',
//     content: `# The Best Family-Friendly Communities in Dubai (2025 Guide)

// ## Where Lifestyle Meets Family Comfort

// Dubai is home to some of the world’s most thoughtfully planned residential communities. From Dubai Hills Estate and Arabian Ranches to the growing International City, each area offers unique benefits for family life.

// ## Why International City Stands Out

// With easy metro access, quality schools, and healthcare facilities like GEMS International School and Fakeeh University Hospital, International City offers convenience without compromise.

// ## YIGO’s Family Vision

// Through developments like CBD26, YIGO is redefining family living — combining accessibility, safety, and design innovation for communities that feel connected, inspired, and enduring.`,
//     date: '2024-01-25',
//     author: 'YIGO Team',
//     image: '/images/news-office.jpg',
//     category: 'news',
//     featured: true
//   },
//   {
//     slug: 'investing-in-dubai-property-the-pros-and-cons-you-should-know',
//     title: 'Investing in Dubai Property – The Pros and Cons You Should Know',
//     excerpt: 'Dubai continues to rank among the most attractive real estate markets worldwide. Tax-free ownership, high rental yields, and world-class infrastructure make it a top destination for property investors.',
//     content: `# Investing in Dubai Property – The Pros and Cons You Should Know

// ## Why Dubai Attracts Global Investors

// Dubai continues to rank among the most attractive real estate markets worldwide. Tax-free ownership, high rental yields, and world-class infrastructure make it a top destination for property investors.

// ## Weighing the Challenges

// While the city offers strong growth potential, investors should consider factors such as service charges, developer quality, and market timing. Understanding these elements ensures smarter, long-term investment decisions.

// ## YIGO’s Investment Perspective

// As a global developer entering Dubai, YIGO Group brings decades of experience in value creation and cross-market insight. The company’s projects combine design excellence with solid financial performance — a balance that defines sustainable real estate success.`,
//     date: '2024-01-30',
//     author: 'YIGO Team',
//     image: '/images/news-sustainability.jpg',
//     category: 'media',
//     featured: false
//   },

// ];

// // Get news items based on locale
// export function getNewsItems(locale: string = 'en'): NewsItem[] {
//   if (locale === 'zh') {
//     return newsItemsZh;
//   }
//   return newsItems;
// }

// export function getNewsBySlug(slug: string, locale: string = 'en'): NewsItem | undefined {
//   const items = getNewsItems(locale);
//   return items.find(item => item.slug === slug);
// }

// export function getFeaturedNews(locale: string = 'en'): NewsItem[] {
//   const items = getNewsItems(locale);
//   return items.filter(item => item.featured);
// }

// export function getNewsByCategory(category: 'news' | 'press' | 'media', locale: string = 'en'): NewsItem[] {
//   const items = getNewsItems(locale);
//   return items.filter(item => item.category === category);
// }
// Import Chinese news items
import { newsItemsZh } from "./news.zh";

export interface NewsItem {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image?: string;
  contentImages?: string[];
  category: "news" | "press" | "blog"; // Changed from "media"
  featured?: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

export const newsItems: NewsItem[] = [
  {
    slug: `yigo-wins-gold-at-the-architecture-madrid-awards-2025`,
    title: `YIGO Wins Gold at the Architecture Madrid Awards 2025`,
    metaTitle: `YIGO Wins Gold at Architecture Madrid Awards 2025`,
    metaDescription: `YIGO Group wins Gold Award at the International Architecture Madrid Awards 2025 for outstanding design innovation. Check out the full story to learn more.`,
    excerpt: `YIGO Group has earned global recognition at the Architecture Madrid Awards 2025, winning Gold in Residential Architecture for its Dubai flagship project, CBD26.`,
    content: `## A Landmark Achievement for YIGO Group

YIGO Group has earned global recognition at the Architecture Madrid Awards 2025, winning Gold in Residential Architecture for its Dubai flagship project, CBD26.

This achievement highlights YIGO's architectural philosophy of "merging rationality with aesthetics," combining minimalist modernism with cultural depth. The Dubai development's fluid façade and Mediterranean-inspired design have redefined contemporary living in the Middle East.

## A Symbol of Innovation and Legacy

This international recognition positions YIGO among the most forward-thinking real estate developers in the world. More than an award, it marks a milestone in the company's journey — a celebration of precision, creativity, and craftsmanship that continues to shape skylines across continents.`,
    date: `2025-10-30`,
    author: `YIGO Team`,
    image: `/images/news-award.jpg`,
    category: `news`,
    featured: true,
  },
  {
    slug: `yigo-26-a-new-benchmark-for-value-led-living`,
    title: `YIGO 26: A New Benchmark for Value-Led Living`,
    metaTitle: `YIGO 26: A New Benchmark for Value-Led Living`,
    metaDescription: `YIGO proudly introduces YIGO 26, a thoughtfully designed residential development located in International City — one of Dubai's most diverse and well-connected communities.`,
    excerpt: `YIGO proudly introduces YIGO 26, a thoughtfully designed residential development located in International City — one of Dubai's most diverse and well-connected communities.`,
    content: `YIGO proudly introduces YIGO 26, a thoughtfully designed residential development located in International City — one of Dubai's most diverse and well-connected communities.

## Why International City

International City offers a rare balance in Dubai's real estate landscape:

- Strategic connectivity to major road networks
- A vibrant, multicultural neighborhood
- Competitive entry pricing with consistent rental demand

For investors and homeowners, it represents a community where value meets livability.

[IMAGE:0]

## Designed for Real Life

YIGO 26 focuses on practical design and lifestyle efficiency. The project features:

- Smart apartment layouts maximizing usable space
- Community-oriented amenities for daily living
- Contemporary architecture with durable finishes
- Strong appeal to tenants, professionals, and families

[IMAGE:1]

## A Project With Purpose

YIGO 26 reflects YIGO's broader philosophy — creating homes that are accessible, well-planned, and future-ready. Rather than overdesigning for show, the project prioritizes comfort, usability, and long-term value.

[IMAGE:2]

Whether you're investing or planning to live, YIGO 26 is designed to fit real lifestyles — not just brochures.

[IMAGE:3]`,
    date: `2026-01-14`,
    author: `YIGO Team`,
    image: `/images/blog 1.png`,
    contentImages: [
      `/images/blog 1.1.png`,
      `/images/blog 1.2.png`,
      `/images/blog 1.3.png`,
      `/images/blog 1.4.png`,
      `/images/blog 1.5.png`,
    ],
    category: `news`,
    featured: true,
  },
  {
    slug: `dubai-property-market-outlook-2026`,
    title: `Dubai Property Market Outlook 2026: Why Smart Investors Are Acting Now`,
    metaTitle: `Dubai Property Market Outlook 2026: Why Smart Investors Are Acting Now`,
    metaDescription: `Dubai's real estate market has entered a phase of measured maturity combined with sustained global demand. As we move into 2026, the market is no longer driven by speculation — it is shaped by end-user confidence, long-term investors, and lifestyle-oriented buyers.`,
    excerpt: `Dubai's real estate market has entered a phase of measured maturity combined with sustained global demand. As we move into 2026, the market is no longer driven by speculation — it is shaped by end-user confidence, long-term investors, and lifestyle-oriented buyers.`,
    content: `Dubai's real estate market has entered a phase of measured maturity combined with sustained global demand. As we move into 2026, the market is no longer driven by speculation — it is shaped by end-user confidence, long-term investors, and lifestyle-oriented buyers.

## Strong Demand, Controlled Supply

Dubai continues to attract international buyers due to its transparent regulations, tax efficiency, and economic stability. While new developments are launching steadily, demand in mid-market and lifestyle residential segments continues to outpace supply — especially in communities offering value, accessibility, and rental yield potential.

## Global Capital Is Still Flowing In

Buyers from Europe, the UK, South Asia, and the GCC remain active. Long-term residency options, business-friendly policies, and strong infrastructure have positioned Dubai as a safe-haven market amid global uncertainty. This has translated into healthy transaction volumes and resilient pricing.

## Why Emerging Communities Are Gaining Attention

Areas such as International City, Dubai South, and Meydan are increasingly appealing to investors seeking early-cycle pricing with long-term upside. These communities benefit from improving infrastructure, connectivity, and rising rental demand — making them ideal for both investors and end users.

## 2026 Outlook

With rental yields remaining competitive and buyer sentiment strong, Dubai's property market is expected to maintain momentum. The focus is shifting toward projects that balance lifestyle quality, smart pricing, and long-term usability.

## Key Takeaway

Dubai in 2026 is not about timing the market — it's about choosing the right project, in the right community, with the right fundamentals.`,
    date: `2026-01-13`,
    author: `YIGO Team`,
    image: `/images/blog 2.png`,
    category: `news`,
    featured: true,
  },
  {
    slug: `yigo-26-launch-event-introducing-a-new-vision`,
    title: `Launch Event: Introducing a New Vision for Community Living`,
    metaTitle: `Launch Event: Introducing a New Vision for Community Living`,
    metaDescription: `YIGO recently hosted the official launch event for YIGO 26, bringing together investors, partners, industry professionals, and future homeowners to mark a significant milestone for the brand.`,
    excerpt: `YIGO recently hosted the official launch event for YIGO 26, bringing together investors, partners, industry professionals, and future homeowners to mark a significant milestone for the brand.`,
    content: `YIGO recently hosted the official launch event for YIGO 26, bringing together investors, partners, industry professionals, and future homeowners to mark a significant milestone for the brand.

[IMAGE:0]

## An Evening of Vision & Clarity

The event offered guests:

- A detailed project introduction and walkthrough
- Insights into YIGO's development philosophy
- Market perspective on International City's growth
- Direct interaction with the YIGO leadership team

[IMAGE:1]

Rather than a traditional sales-driven launch, the evening focused on education, transparency, and long-term vision.

## Market Confidence & Community Response

[IMAGE:2]

Attendees responded positively to YIGO 26's positioning — highlighting its pricing logic, location advantage, and lifestyle focus. The project resonated strongly with buyers seeking practical, future-proof real estate.

[IMAGE:3]

For YIGO, this event was more than a project unveiling — it was a statement of intent. A commitment to delivering developments that are well-conceived, responsibly priced, and community-driven.`,
    date: `2026-01-12`,
    author: `YIGO Team`,
    image: `/images/blog 3.png`,
    contentImages: [
      `/images/blog 3.1.png`,
      `/images/blog 3.2.png`,
      `/images/blog 3.3.png`,
      `/images/blog 3.4.png`,
    ],
    category: `press`,
    featured: false,
  },
  {
    slug: `why-community-centric-living-is-shaping-dubai-residential-future`,
    title: `Why Community-Centric Living Is Shaping Dubai's Residential Future`,
    metaTitle: `Why Community-Centric Living Is Shaping Dubai's Residential Future`,
    metaDescription: `The definition of "home" is changing. Today's buyers are looking beyond interiors and finishes — prioritizing community, connectivity, and everyday experience.`,
    excerpt: `The definition of "home" is changing. Today's buyers are looking beyond interiors and finishes — prioritizing community, connectivity, and everyday experience.`,
    content: `The definition of "home" is changing. Today's buyers are looking beyond interiors and finishes — prioritizing community, connectivity, and everyday experience.

[IMAGE:0]

## The Shift in Buyer Mindset

Modern homeowners value:

- Social and shared spaces
- Walkable amenities and convenience
- A sense of belonging within a neighborhood
- Long-term livability rather than short-term aesthetics

This shift has influenced how developers design and position residential projects across Dubai.

[IMAGE:1]

## Why Communities Drive Value

Projects that offer integrated living environments consistently demonstrate:

- Stronger rental demand
- Lower vacancy rates
- Higher tenant retention
- Better resale stability

[IMAGE:2]

Community is no longer a "nice to have" — it is a core investment driver.

## YIGO's Approach

YIGO embraces this evolution by designing developments that prioritize human-scale living, practical amenities, and everyday usability. YIGO 26 exemplifies this approach — creating a balanced environment where residents can live comfortably and investors can rely on sustained demand.

[IMAGE:3]

In Dubai's next real estate chapter, community-led developments will define success — not excess.`,
    date: `2026-01-11`,
    author: `YIGO Team`,
    image: `/images/blog 4.png`,
    contentImages: [
      `/images/blog 4.1.png`,
      `/images/blog 4.2.png`,
      `/images/blog 4.3.png`,
      `/images/blog 4.4.png`,
    ],
    category: `blog`,
    featured: false,
  },
  {
    slug: `yigo-launches-a-new-era-of-living-in-dubais-international-city`,
    title: `YIGO Launches a New Era of Living in Dubai's International City`,
    metaTitle: `YIGO Launches a New Era at Dubai's International City`,
    metaDescription: `Read how YIGO Group launches its first Dubai project in International City, blending global vision, smart design, and connectivity for modern urban living.`,
    excerpt: `YIGO Group has officially launched its first Middle Eastern development, located at Plot CBD26 in Dubai's International City.`,
    content: `## A Global Vision Arrives in the UAE

YIGO Group has officially launched its first Middle Eastern development, located at Plot CBD26 in Dubai's International City. The project presents a globally limited collection of 186 residences, merging Hong Kong craftsmanship with Middle Eastern character.

## Seamless Connectivity and Intelligent Design

Situated 188 metres from the Blue Line Metro and just 15 minutes from Dubai International Airport, the development exemplifies convenience and elegance. Its intelligent two-bedroom configurations optimise space for maximum functionality and rental yield — redefining modern urban living.

## A Statement of Confidence and Craftsmanship

This project symbolizes YIGO's commitment to shaping the future of Dubai's skyline through artistry, precision, and sustainability.`,
    date: `2024-01-10`,
    author: `YIGO Team`,
    image: `/images/news-office.jpg`,
    category: `press`,
    featured: false,
  },
  {
    slug: `yigo-group-expands-into-dubais-dynamic-real-estate-market`,
    title: `YIGO Group Expands into Dubai's Dynamic Real Estate Market`,
    metaTitle: `Check Out YIGO Group Expands into Dubai Real Estate Market`,
    metaDescription: `Discover how YIGO Group is expanding in Dubai's dynamic real estate market with new real estate development plans. Read the full post to learn more.`,
    excerpt: `With over 23 years of experience in Asia and Europe, YIGO Group marks its strategic expansion into Dubai's real estate market. Known for combining architectural innovation with long-term value creation, YIGO brings a new standard of international living to the UAE.`,
    content: `## From Hong Kong to Dubai — A Global Journey

With over 23 years of experience in Asia and Europe, YIGO Group marks its strategic expansion into Dubai's real estate market. Known for combining architectural innovation with long-term value creation, YIGO brings a new standard of international living to the UAE.

## Building Bridges Between East and West

YIGO's first project, CBD26, embodies the brand's DNA — fusing functionality, artistry, and cultural understanding. The group's entry into Dubai is more than a geographical expansion; it's the beginning of a regional evolution in design and development philosophy.

## Redefining Quality and Vision in the UAE

By integrating Hong Kong precision with Dubai's ambition, YIGO aims to create communities that reflect sophistication, sustainability, and modern human connection.`,
    date: `2024-01-20`,
    author: `YIGO Team`,
    image: `/images/news-award.jpg`,
    category: `press`,
    featured: false,
  },
  {
    slug: `the-best-family-friendly-communities-in-dubai-2025-guide`,
    title: `The Best Family-Friendly Communities in Dubai (2025 Guide)`,
    metaTitle: `Best Family-Friendly Communities in Dubai | 2025 Guide`,
    metaDescription: `Discover the top family-friendly communities in Dubai for 2025. Explore lifestyle, schools, convenience & comfort in Dubai's best residential areas.`,
    excerpt: `Dubai is home to some of the world's most thoughtfully planned residential communities. From Dubai Hills Estate and Arabian Ranches to the growing International City, each area offers unique benefits for family life.`,
    content: `## Where Lifestyle Meets Family Comfort

Dubai is home to some of the world's most thoughtfully planned residential communities. From Dubai Hills Estate and Arabian Ranches to the growing International City, each area offers unique benefits for family life.

## Why International City Stands Out

With easy metro access, quality schools, and healthcare facilities like GEMS International School and Fakeeh University Hospital, International City offers convenience without compromise.

## YIGO's Family Vision

Through developments like CBD26, YIGO is redefining family living — combining accessibility, safety, and design innovation for communities that feel connected, inspired, and enduring.`,
    date: `2024-01-25`,
    author: `YIGO Team`,
    image: `/images/news-office.jpg`,
    category: `news`,
    featured: true,
  },
  {
    slug: `investing-in-dubai-property-the-pros-and-cons-you-should-know`,
    title: `Investing in Dubai Property – The Pros and Cons You Should Know`,
    metaTitle: `Dubai Property Investment Pros & Cons 2025 - You Should Know`,
    metaDescription: `Learn the key pros and cons of investing in Dubai property in 2025 — from tax-free gains and strong yields to costs, timing, and market risks.`,
    excerpt: `Dubai continues to rank among the most attractive real estate markets worldwide. Tax-free ownership, high rental yields, and world-class infrastructure make it a top destination for property investors.`,
    content: `## Why Dubai Attracts Global Investors

Dubai continues to rank among the most attractive real estate markets worldwide. Tax-free ownership, high rental yields, and world-class infrastructure make it a top destination for property investors.

## Weighing the Challenges

While the city offers strong growth potential, investors should consider factors such as service charges, developer quality, and market timing. Understanding these elements ensures smarter, long-term investment decisions.

## YIGO's Investment Perspective

As a global developer entering Dubai, YIGO Group brings decades of experience in value creation and cross-market insight. The company's projects combine design excellence with solid financial performance — a balance that defines sustainable real estate success.`,
    date: `2024-01-30`,
    author: `YIGO Team`,
    image: `/images/news-sustainability.jpg`,
    category: `blog`,
    featured: false,
  },
];

// Get news items based on locale
export function getNewsItems(locale: string = "en"): NewsItem[] {
  if (locale === "zh") {
    return newsItemsZh;
  }
  return newsItems;
}

export function getNewsBySlug(
  slug: string,
  locale: string = "en"
): NewsItem | undefined {
  const items = getNewsItems(locale);
  return items.find((item) => item.slug === slug);
}

export function getFeaturedNews(locale: string = "en"): NewsItem[] {
  const items = getNewsItems(locale);
  return items.filter((item) => item.featured);
}

export function getNewsByCategory(
  category: "news" | "press" | "blog",
  locale: string = "en"
): NewsItem[] {
  const items = getNewsItems(locale);
  return items.filter((item) => item.category === category);
}
