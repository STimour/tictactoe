import { useLanguage } from '../i18n/LanguageContext'

type Props = {
  step: number
  totalSteps: number
  onNext: () => void
  onSkip: () => void
}

const icons = ['👆', '📏', '⚙️']

const Tutorial = ({ step, totalSteps, onNext, onSkip }: Props) => {
  const { t } = useLanguage()
  const steps = [t.tutorialStep1, t.tutorialStep2, t.tutorialStep3]

  return (
    <div className="overlay" onClick={(e) => e.stopPropagation()}>
      <div className="dialog tutorial-card">
        <h2 className="tutorial-title">{t.tutorialTitle}</h2>
        <div className="tutorial-icon">{icons[step]}</div>
        <p className="tutorial-text">{steps[step]}</p>
        <div className="tutorial-dots">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <span key={i} className={`dot${i === step ? ' dot-active' : ''}`} />
          ))}
        </div>
        <div className="dialog-actions">
          <button className="btn btn-ghost" onClick={onSkip}><span className="btn-ico">❌</span>{t.tutorialSkip}</button>
          <button className="btn btn-primary" onClick={onNext}>
            {step < totalSteps - 1 ? <><span className="btn-ico">➡️</span>{t.tutorialNext}</> : <><span className="btn-ico">✅</span>{t.tutorialDone}</>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Tutorial
