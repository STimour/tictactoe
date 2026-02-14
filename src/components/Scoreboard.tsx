import type { ScoreState } from '../hooks/useGame'

type ScoreboardProps = {
  score: ScoreState
}

const Scoreboard = ({ score }: ScoreboardProps) => {
  return (
    <div className="scoreboard">
      <div className="score-card score-x">
        <span className="score-label">Player X</span>
        <span className="score-value">{score.X}</span>
      </div>
      <div className="score-card score-draw">
        <span className="score-label">Draws</span>
        <span className="score-value">{score.draws}</span>
      </div>
      <div className="score-card score-o">
        <span className="score-label">Player O</span>
        <span className="score-value">{score.O}</span>
      </div>
    </div>
  )
}

export default Scoreboard
