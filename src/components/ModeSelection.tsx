import { useLanguage } from '../i18n/LanguageContext'

type Props = {
  onSelect: (mode: 'pvp' | 'ai') => void
  onBack: () => void
}

const ModeSelection = ({ onSelect, onBack }: Props) => {
  const { t } = useLanguage()

  return (
    <div className="screen mode-screen">
      <header className="screen-header">
        <button className="btn-icon" onClick={onBack}>←</button>
        <h1>{t.chooseMode}</h1>
      </header>

      <div className="mode-cards">
        <button className="mode-card" onClick={() => onSelect('pvp')}>
          <div className="mode-card-icon">👥</div>
          <span className="mode-card-title">{t.vsPlayer}</span>
          <span className="mode-card-desc">{t.vsPlayerDesc}</span>
        </button>
        <button className="mode-card" onClick={() => onSelect('ai')}>
          <div className="mode-card-icon">🤖</div>
          <span className="mode-card-title">{t.vsAI}</span>
          <span className="mode-card-desc">{t.vsAIDesc}</span>
        </button>
      </div>
    </div>
  )
}

export default ModeSelection
