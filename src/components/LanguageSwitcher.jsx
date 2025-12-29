import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

const LanguageSwitcher = ({ className = "" }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleLanguage = () => {
    const currentLang = i18n.language;
    const newLang = currentLang === "en" ? "zh" : "en";

    // Change the language
    i18n.changeLanguage(newLang);

    // Update the URL
    const pathSegments = location.pathname.split("/").filter(Boolean);

    // Remove current language from path
    if (pathSegments[0] === "en" || pathSegments[0] === "zh") {
      pathSegments.shift();
    }

    // Build new path with new language
    const newPath = `/${newLang}${
      pathSegments.length > 0 ? "/" + pathSegments.join("/") : ""
    }${location.search}`;
    navigate(newPath);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`px-3 py-1 text-sm font-medium rounded-full transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200 ${className}`}
      aria-label="Switch Language"
    >
      {i18n.language === "en" ? "中文" : "EN"}
    </button>
  );
};

export default LanguageSwitcher;
