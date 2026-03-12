import { useLanguage } from '../i18n/LanguageContext'
import { useTheme } from '../theme/ThemeContext'

type Props = {
  onPlay: () => void
  onRules: () => void
  onSettings: () => void
  onStats: () => void
}

const LandingPage = ({ onPlay, onRules, onSettings, onStats }: Props) => {
  const { lang, setLang, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="screen landing-screen">
      <div className="landing-topbar">
        <div className="lang-flags">
          <button className={`flag-btn${lang === 'ru' ? ' active' : ''}`} onClick={() => setLang('ru')} aria-label="Русский">🇷🇺</button>
          <button className={`flag-btn${lang === 'fr' ? ' active' : ''}`} onClick={() => setLang('fr')} aria-label="Français">🇫🇷</button>
        </div>
        <button className="btn-icon theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? '🌙' : theme === 'dark' ? '🔆' : '👁️'}
        </button>
      </div>

      <div className="landing-hero">
        <div className="logo-grid">
          <span className="logo-x">✕</span><span className="logo-o">○</span><span className="logo-x">✕</span>
          <span className="logo-o">○</span><span className="logo-x">✕</span><span className="logo-o">○</span>
          <span className="logo-x">✕</span><span className="logo-o">○</span><span className="logo-x">✕</span>
        </div>
        <h1 className="landing-title">{t.title}</h1>
        <p className="landing-subtitle">{t.subtitle}</p>
      </div>

      <div className="landing-actions">
        <button className="btn btn-primary btn-lg btn-play" onClick={onPlay}>
          <span className="btn-ico">▶</span>{t.play}
        </button>
        <button className="btn btn-secondary" onClick={onStats}>
          <span className="btn-ico">📊</span>{t.stats}
        </button>
        <div className="landing-row">
          <button className="btn btn-secondary" onClick={onRules}>
            <span className="btn-ico">📖</span>{t.rules}
          </button>
          <button className="btn btn-secondary" onClick={onSettings}>
            <span className="btn-ico">⚙️</span>{t.settings}
          </button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
