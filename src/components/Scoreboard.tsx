import type { ScoreState } from '../hooks/useGame'
import { useLanguage } from '../i18n/LanguageContext'

type ScoreboardProps = {
  score: ScoreState
}

const Scoreboard = ({ score }: ScoreboardProps) => {
  const { t } = useLanguage()
  return (
    <div className="scoreboard">
      <div className="score-card score-x">
        <span className="score-label">{t.playerX}</span>
        <span className="score-value">{score.X}</span>
      </div>
      <div className="score-card score-draw">
        <span className="score-label">{t.draws}</span>
        <span className="score-value">{score.draws}</span>
      </div>
      <div className="score-card score-o">
        <span className="score-label">{t.playerO}</span>
        <span className="score-value">{score.O}</span>
      </div>
    </div>
  )
}

export default Scoreboard
