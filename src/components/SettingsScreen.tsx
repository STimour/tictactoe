import { useLanguage } from '../i18n/LanguageContext'
import { useTheme, type Theme } from '../theme/ThemeContext'
import { useSettings, type AnimSpeed, type FontSize } from '../contexts/SettingsContext'

type Props = {
  onBack: () => void
}

const SettingsScreen = ({ onBack }: Props) => {
  const { lang, setLang, t } = useLanguage()
  const { theme, setTheme } = useTheme()
  const { sounds, vibrations, animSpeed, fontSize, setSounds, setVibrations, setAnimSpeed, setFontSize } = useSettings()

  return (
    <div className="screen settings-screen">
      <header className="screen-header">
        <button className="btn-icon" onClick={onBack}>←</button>
        <h1>{t.settingsTitle}</h1>
      </header>

      <div className="settings-content">
        {/* Language */}
        <div className="settings-section">
          <label className="settings-label">{t.language}</label>
          <div className="settings-row">
            <button className={`chip${lang === 'ru' ? ' chip-active' : ''}`} onClick={() => setLang('ru')}>🇷🇺 Русский</button>
            <button className={`chip${lang === 'fr' ? ' chip-active' : ''}`} onClick={() => setLang('fr')}>🇫🇷 Français</button>
          </div>
        </div>

        {/* Theme */}
        <div className="settings-section">
          <label className="settings-label">{t.theme}</label>
          <div className="settings-row">
            {(['light', 'dark', 'contrast'] as Theme[]).map((th) => (
              <button key={th} className={`chip${theme === th ? ' chip-active' : ''}`} onClick={() => setTheme(th)}>
                {th === 'light' ? `☀️ ${t.themeLight}` : th === 'dark' ? `🌙 ${t.themeDark}` : `👁️ ${t.themeContrast}`}
              </button>
            ))}
          </div>
        </div>

        {/* Sounds toggle */}
        <div className="settings-section settings-toggle-section">
          <label className="settings-label">{t.sounds}</label>
          <button className={`toggle${sounds ? ' toggle-on' : ''}`} onClick={() => setSounds(!sounds)}>
            <span className="toggle-track"><span className="toggle-thumb" /></span>
          </button>
        </div>

        {/* Vibrations toggle */}
        <div className="settings-section settings-toggle-section">
          <label className="settings-label">{t.vibrations}</label>
          <button className={`toggle${vibrations ? ' toggle-on' : ''}`} onClick={() => setVibrations(!vibrations)}>
            <span className="toggle-track"><span className="toggle-thumb" /></span>
          </button>
        </div>

        {/* Animation speed */}
        <div className="settings-section">
          <label className="settings-label">{t.animationSpeed}</label>
          <div className="settings-row">
            {(['slow', 'normal', 'fast'] as AnimSpeed[]).map((s) => (
              <button key={s} className={`chip${animSpeed === s ? ' chip-active' : ''}`} onClick={() => setAnimSpeed(s)}>{t[s]}</button>
            ))}
          </div>
        </div>

        {/* Font size */}
        <div className="settings-section">
          <label className="settings-label">{t.fontSize}</label>
          <div className="settings-row">
            {(['small', 'medium', 'large'] as FontSize[]).map((fs) => (
              <button key={fs} className={`chip${fontSize === fs ? ' chip-active' : ''}`} onClick={() => setFontSize(fs)}>
                {fs === 'small' ? t.fontSmall : fs === 'medium' ? t.fontMedium : t.fontLarge}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsScreen
