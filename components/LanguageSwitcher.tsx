"use client";

import React from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    // Navigate to the new locale
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="flex items-center">
      {locale === "en" ? (
        <button
          onClick={() => switchLanguage("zh")}
          className="px-3 py-1 text-sm font-medium rounded-full transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          中文
        </button>
      ) : (
        <button
          onClick={() => switchLanguage("en")}
          className="px-3 py-1 text-sm font-medium rounded-full transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          EN
        </button>
      )}
    </div>
  );
}
