import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import type { Difficulty } from '../hooks/useGame'
import type { GridSize } from '../utils/gameLogic'

type Props = {
  onStart: (difficulty: Difficulty, gridSize: GridSize) => void
  onBack: () => void
}

const GameSetup = ({ onStart, onBack }: Props) => {
  const { t } = useLanguage()
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [gridSize, setGridSize] = useState<GridSize>(3)

  const difficulties: { key: Difficulty; label: string }[] = [
    { key: 'easy', label: t.easy },
    { key: 'medium', label: t.medium },
    { key: 'hard', label: t.hard },
  ]

  const sizes: GridSize[] = [3, 4, 5]

  return (
    <div className="screen setup-screen">
      <button className="back-btn" onClick={onBack}>
        ← {t.back}
      </button>

      <div className="setup-section">
        <h3 className="setup-label">{t.difficulty}</h3>
        <div className="setup-options">
          {difficulties.map((d) => (
            <button
              key={d.key}
              className={`setup-chip ${difficulty === d.key ? 'chip-active' : ''}`}
              onClick={() => setDifficulty(d.key)}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="setup-section">
        <h3 className="setup-label">{t.gridSize}</h3>
        <div className="setup-options">
          {sizes.map((s) => (
            <button
              key={s}
              className={`setup-chip ${gridSize === s ? 'chip-active' : ''}`}
              onClick={() => setGridSize(s)}
            >
              {s}×{s}
            </button>
          ))}
        </div>
      </div>

      <button
        className="btn-primary btn-start"
        onClick={() => onStart(difficulty, gridSize)}
      >
        <span className="btn-icon">▶</span>
        {t.startGame}
      </button>
    </div>
  )
}

export default GameSetup
