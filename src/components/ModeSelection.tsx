import { useLanguage } from '../i18n/LanguageContext'

type Props = {
  onSelect: (mode: 'pvp' | 'ai') => void
  onBack: () => void
}

const ModeSelection = ({ onSelect, onBack }: Props) => {
  const { t } = useLanguage()

  return (
    <div className="screen mode-screen">
      <button className="back-btn" onClick={onBack}>
        ← {t.back}
      </button>

      <h2 className="screen-title">{t.chooseMode}</h2>

      <div className="mode-cards">
        <button className="mode-card" onClick={() => onSelect('pvp')}>
          <span className="mode-card-icon">👥</span>
          <span className="mode-card-label">{t.vsPlayer}</span>
        </button>
        <button className="mode-card" onClick={() => onSelect('ai')}>
          <span className="mode-card-icon">🤖</span>
          <span className="mode-card-label">{t.vsAI}</span>
        </button>
      </div>
    </div>
  )
}

export default ModeSelection
