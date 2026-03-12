import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { translations, type Language, type TranslationKeys } from './translations'

type LanguageContextType = {
  lang: Language
  setLang: (lang: Language) => void
  t: TranslationKeys
}

function detectLanguage(): Language {
  try {
    const stored = localStorage.getItem('game-lang')
    if (stored === 'fr' || stored === 'ru') return stored
  } catch { /* empty */ }
  return 'ru'
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ru',
  setLang: () => {},
  t: translations.ru,
})

export const useLanguage = () => useContext(LanguageContext)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>(detectLanguage)

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    try { localStorage.setItem('game-lang', newLang) } catch { /* empty */ }
  }

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}
