import type { Difficulty } from '../hooks/useGame'

type ModeBarProps = {
  mode: 'pvp' | 'ai'
  difficulty: Difficulty
  onModeChange: (mode: 'pvp' | 'ai') => void
  onDifficultyChange: (difficulty: Difficulty) => void
}

const ModeBar = ({
  mode,
  difficulty,
  onModeChange,
  onDifficultyChange,
}: ModeBarProps) => {
  return (
    <div className="mode-bar">
      <div className="mode-group">
        <button
          className={`mode-button ${mode === 'pvp' ? 'active' : ''}`}
          onClick={() => onModeChange('pvp')}
        >
          Player vs Player
        </button>
        <button
          className={`mode-button ${mode === 'ai' ? 'active' : ''}`}
          onClick={() => onModeChange('ai')}
        >
          Player vs AI
        </button>
      </div>
      {mode === 'ai' && (
        <div className="difficulty-group">
          <button
            className={`difficulty-button ${
              difficulty === 'easy' ? 'active' : ''
            }`}
            onClick={() => onDifficultyChange('easy')}
          >
            Easy
          </button>
          <button
            className={`difficulty-button ${
              difficulty === 'medium' ? 'active' : ''
            }`}
            onClick={() => onDifficultyChange('medium')}
          >
            Medium
          </button>
          <button
            className={`difficulty-button ${
              difficulty === 'hard' ? 'active' : ''
            }`}
            onClick={() => onDifficultyChange('hard')}
          >
            Hard
          </button>
        </div>
      )}
    </div>
  )
}

export default ModeBar
