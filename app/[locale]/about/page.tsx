import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: "YIGO Group – Visionary Global Real Estate Developer",
    description: "Discover YIGO Group's mission to redefine urban living with innovative, sustainable real estate developments across Asia, Europe, and the Middle East.",
    alternates: {
      canonical: `https://yigogroup.ae/${locale}/about`,
    },
  };
}

export default function AboutPage() {
  return <AboutClient />;
}