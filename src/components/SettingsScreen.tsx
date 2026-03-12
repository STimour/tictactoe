import { useLanguage } from '../i18n/LanguageContext'
import { useTheme } from '../theme/ThemeContext'

type Props = {
  onBack: () => void
}

const SettingsScreen = ({ onBack }: Props) => {
  const { lang, setLang, t } = useLanguage()
  const { theme, setTheme } = useTheme()

  return (
    <div className="screen settings-screen">
      <button className="back-btn" onClick={onBack}>
        ← {t.back}
      </button>

      <h2 className="screen-title">{t.settingsTitle}</h2>

      <div className="settings-section">
        <h3 className="settings-label">{t.language}</h3>
        <div className="settings-flags">
          <button
            className={`flag-btn-large ${lang === 'ru' ? 'flag-active' : ''}`}
            onClick={() => setLang('ru')}
          >
            <span className="flag-emoji-lg">🇷🇺</span>
            <span>Русский</span>
          </button>
          <button
            className={`flag-btn-large ${lang === 'fr' ? 'flag-active' : ''}`}
            onClick={() => setLang('fr')}
          >
            <span className="flag-emoji-lg">🇫🇷</span>
            <span>Français</span>
          </button>
        </div>
      </div>

      <div className="settings-section">
        <h3 className="settings-label">{t.theme}</h3>
        <div className="settings-theme-options">
          <button
            className={`theme-option ${theme === 'light' ? 'theme-active' : ''}`}
            onClick={() => setTheme('light')}
          >
            <span className="theme-icon">☀️</span>
            <span>{t.themeLight}</span>
          </button>
          <button
            className={`theme-option ${theme === 'dark' ? 'theme-active' : ''}`}
            onClick={() => setTheme('dark')}
          >
            <span className="theme-icon">🌙</span>
            <span>{t.themeDark}</span>
          </button>
        </div>
      </div>

      <div className="settings-info">
        <span className="offline-chip">{t.offlineReady}</span>
      </div>
    </div>
  )
}

export default SettingsScreen
