import { useLanguage } from '../i18n/LanguageContext'

type Props = {
  onBack: () => void
}

const RulesScreen = ({ onBack }: Props) => {
  const { t } = useLanguage()

  return (
    <div className="screen rules-screen">
      <header className="screen-header">
        <button className="btn-icon" onClick={onBack}>←</button>
        <h1>{t.rulesTitle}</h1>
      </header>

      <div className="rules-list">
        {t.rulesText.map((rule, i) => (
          <div className="rule-item" key={i}>
            <span className="rule-number">{i + 1}</span>
            <p className="rule-text">{rule}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RulesScreen
