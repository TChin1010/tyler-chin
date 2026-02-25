import { changeLanguage } from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";

const languages =  [
    {code: 'en', lang: 'English'},
    {code: 'zh-CH', lang: 'Chinese'},
    {code: 'zh-HK', lang: 'Cantonese'},
    
]

export default function LanguageSelector() {
    const { i18n } = useTranslation()

    const changeLanguage = (languageCode: string) => {
        i18n.changeLanguage(languageCode);
    }

    return null
}