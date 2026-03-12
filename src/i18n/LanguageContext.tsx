import { createContext, useContext, useState, type ReactNode } from 'react'
import { translations, type Language, type TranslationKeys } from './translations'

type LanguageContextType = {
  lang: Language
  setLang: (lang: Language) => void
  t: TranslationKeys
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ru',
  setLang: () => {},
  t: translations.ru,
})

export const useLanguage = () => useContext(LanguageContext)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem('game-lang')
      return stored === 'fr' || stored === 'ru' ? stored : 'ru'
    } catch {
      return 'ru'
    }
  })

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    try {
      localStorage.setItem('game-lang', newLang)
    } catch {}
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}
