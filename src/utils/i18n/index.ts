import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en/en.json'
import ch from './locales/zh-CN/zh-CN.json'
import yue from './locales/zh-HK/zh-HK.json'

import Languages from './langCodes'

const resources = {
	[Languages.ENGLISH]: 
		{
			translation: en,
		},
	[Languages.SIMPLIFIED_CHINESE]: 		
		{
			translation: ch,
		},
	[Languages.CANTONESE_CHINESE]: 		
		{
			translation: yue,
		},

}

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.use(Backend)
	.init(
		{
			resources, // translations
			fallbackLng: 'en', // in case a language code is not reconized 
			interpolation: {escapeValue: false}
		}
	)

console.log(i18n.language)
export default i18n