import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const locales = ["en", "zh"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages();
  const t = (key: string) => messages[key as keyof typeof messages];

  return {
    title: "YIGO Group – Trusted Global Real Estate Developer in Dubai",
    description:
      "YIGO Group is a Dubai real estate developer delivering premium residential and mixed-use projects in Dubai and worldwide. Contact us to explore our projects.",
    alternates: {
      canonical: `https://yigogroup.ae/${locale}/`,
    },
    icons: {
      icon: "/images/logo.svg",
      shortcut: "/images/logo.svg",
      apple: "/images/logo.svg",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const messages = await getMessages();

  return (
    <html lang={locales.includes(locale) ? locale : "en"}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="pt-0">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
