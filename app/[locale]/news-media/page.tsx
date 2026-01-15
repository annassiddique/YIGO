import type { Metadata } from "next";
import NewsMediaClient from "./NewsMediaClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: "News & Media | YIGO Group",
    description: "Stay updated with the latest news, press releases, and media coverage from YIGO Group's real estate developments across Dubai and beyond.",
    alternates: {
      canonical: `https://yigogroup.ae/${locale}/news-media`,
    },
  };
}

export default function NewsMediaPage() {
  return <NewsMediaClient />;
}