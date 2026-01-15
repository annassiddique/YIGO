import type { Metadata } from "next";
import ContactForm from "@/components/ui/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "Contact YIGO Group For Real Estate Inquiries in Dubai",
    description:
      "Reach out to YIGO Group's Dubai office for expert real estate development solutions. Get the address, phone, and email, and submit your inquiry online today.",
    alternates: {
      canonical: `https://yigogroup.ae/${locale}/contact`,
    },
  };
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <main className="pb-20 mt-40">
        <ContactForm />
      </main>
    </div>
  );
}
