import type { Metadata } from "next";
import TermsClient from "./TermsClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "Check Out YIGO Group Terms & Conditions Policy",
    description:
      "Read the Terms & Conditions for YIGO Group to understand the rules and policies, legal guidelines, and your rights. Visit the page to learn more.",
    alternates: {
      canonical: `https://yigogroup.ae/${locale}/terms`,
    },
  };
}

export default function TermsPage() {
  return <TermsClient />;
}
