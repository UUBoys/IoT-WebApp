import i18n from "i18next";
import moment from "moment";
import { initReactI18next } from "react-i18next";

import { cs } from "./resources.cs";
import { en } from "./resources.en";

export const availableLanguages: { [key: string]: string } = {
  cs: "cs",
  en: "en-BG",
};

const detectionOptions = {
  order: ["localStorage", "navigator"],
  caches: ["localStorage"],
  checkWhitelist: true,
};

export const handleChangeLanguage = (lng: "cs" | "en") => {
  moment.locale(availableLanguages[lng]);
  i18n.changeLanguage(lng);
  if (typeof window !== "undefined") {
    localStorage.setItem("i18nextLng", lng);
  }
};

i18n.use(initReactI18next).init({
  lng: "cs",
  debug: false,
  fallbackLng: "cs",
  supportedLngs: Object.keys(availableLanguages),
  interpolation: {
    escapeValue: false,
  },
  detection: detectionOptions,
  resources: {
    cs: {
      translation: cs,
    },
    en: {
      translation: en,
    },
  },
});

export default i18n;
