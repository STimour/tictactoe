import { useLanguage } from '../i18n/LanguageContext'

type Props = {
  onBack: () => void
}

const RulesScreen = ({ onBack }: Props) => {
  const { t } = useLanguage()

  return (
    <div className="screen rules-screen">
      <button className="back-btn" onClick={onBack}>
        ← {t.back}
      </button>

      <h2 className="screen-title">{t.rulesTitle}</h2>

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
