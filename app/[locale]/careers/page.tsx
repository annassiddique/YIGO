import type { Metadata } from "next";
import CareersClient from "./CareersClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: "Careers at YIGO Group – Join & Grow in Dubai",
    description: "Explore career opportunities at YIGO Group. Join a culture of innovation with competitive pay, benefits, and growth in Dubai's real estate industry.",
    alternates: {
      canonical: `https://yigogroup.ae/${locale}/careers`,
    },
  };
}
export default function CareersPage() {
  return <CareersClient />;
}