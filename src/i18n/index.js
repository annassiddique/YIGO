import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import all translations
import commonEn from "./locales/en/common.json";
import homeEn from "./locales/en/home.json";
import aboutEn from "./locales/en/about.json";
import projectsEn from "./locales/en/projects.json";
import newsEn from "./locales/en/news.json";
import careersEn from "./locales/en/careers.json";
import contactEn from "./locales/en/contact.json";

import commonZh from "./locales/zh/common.json";
import homeZh from "./locales/zh/home.json";
import aboutZh from "./locales/zh/about.json";
import projectsZh from "./locales/zh/projects.json";
import newsZh from "./locales/zh/news.json";
import careersZh from "./locales/zh/careers.json";
import contactZh from "./locales/zh/contact.json";

const resources = {
  en: {
    common: commonEn,
    home: homeEn,
    about: aboutEn,
    projects: projectsEn,
    news: newsEn,
    careers: careersEn,
    contact: contactEn,
  },
  zh: {
    common: commonZh,
    home: homeZh,
    about: aboutZh,
    projects: projectsZh,
    news: newsZh,
    careers: careersZh,
    contact: contactZh,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["path", "localStorage", "navigator"],
      lookupFromPathIndex: 0,
      caches: ["localStorage"],
    },
  });

export default i18n;
