// i18n configuration for TrendRadar
const translations = {
    en: { appName: 'TrendRadar', description: 'Emerging industry trends with impact assessments' },
    de: { appName: 'TrendRadar', description: 'Emerging industry trends with impact assessments (DE)' },
} as const

export type Locale = keyof typeof translations
export const defaultLocale: Locale = 'en'
export const supportedLocales = Object.keys(translations) as Locale[]

export function t(key: keyof typeof translations.en, locale: Locale = defaultLocale): string {
    return translations[locale]?.[key] ?? translations.en[key] ?? key
}

export default translations
