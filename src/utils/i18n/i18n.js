import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: import.meta.VITE_DEBUG === 'true',
        fallbackLng: "en",
        ns: ["Common", "Playlist"], // Specify the types of individual files 
        defaultNS: "Common",
        backend: {
            loadPath: "/locales/{{lng}}/{{ns}}.json" // How to find them
        }
});

i18n.on("languageChanged", (lng) => {
  console.log("Detected language:", lng);
});

export default i18n;