import { useLanguage } from '../i18n/LanguageContext'
import { useTheme } from '../theme/ThemeContext'

type Props = {
  onPlay: () => void
  onRules: () => void
  onSettings: () => void
}

const LandingPage = ({ onPlay, onRules, onSettings }: Props) => {
  const { lang, setLang, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="screen landing-screen">
      <div className="theme-toggle-landing">
        <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>

      <div className="lang-switcher">
        <button
          className={`flag-btn ${lang === 'ru' ? 'flag-active' : ''}`}
          onClick={() => setLang('ru')}
          aria-label="Русский"
        >
          <span className="flag-emoji">🇷🇺</span>
        </button>
        <button
          className={`flag-btn ${lang === 'fr' ? 'flag-active' : ''}`}
          onClick={() => setLang('fr')}
          aria-label="Français"
        >
          <span className="flag-emoji">🇫🇷</span>
        </button>
      </div>

      <div className="landing-logo">
        <div className="logo-grid">
          <span className="logo-x">✕</span>
          <span className="logo-o">○</span>
          <span className="logo-x">✕</span>
          <span className="logo-o">○</span>
          <span className="logo-x">✕</span>
          <span className="logo-o">○</span>
          <span className="logo-x">✕</span>
          <span className="logo-o">○</span>
          <span className="logo-x">✕</span>
        </div>
      </div>

      <h1 className="landing-title">{t.title}</h1>
      <p className="landing-subtitle">{t.subtitle}</p>

      <div className="landing-buttons">
        <button className="btn-primary btn-play" onClick={onPlay}>
          <span className="btn-icon">▶</span>
          {t.play}
        </button>
        <button className="btn-secondary" onClick={onRules}>
          <span className="btn-icon">📖</span>
          {t.rules}
        </button>
        <button className="btn-secondary" onClick={onSettings}>
          <span className="btn-icon">⚙</span>
          {t.settings}
        </button>
      </div>

      <p className="landing-offline">{t.offlineReady}</p>
    </div>
  )
}

export default LandingPage
