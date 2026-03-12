import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import type { GameConfig, Difficulty, SeriesMode, FirstPlayer } from '../hooks/useGameLogic'
import type { GridSize } from '../utils/gameLogic'

type Props = {
  mode: 'pvp' | 'ai'
  onStart: (config: GameConfig) => void
  onBack: () => void
}

const GameSetup = ({ mode, onStart, onBack }: Props) => {
  const { t } = useLanguage()
  const [gridSize, setGridSize] = useState<GridSize>(3)
  const [difficulty, setDifficulty] = useState<Difficulty>('medium')
  const [playerSymbol, setPlayerSymbol] = useState<'X' | 'O'>('X')
  const [firstPlayer, setFirstPlayer] = useState<FirstPlayer>(mode === 'ai' ? 'human' : 'player1')
  const [seriesMode, setSeriesMode] = useState<SeriesMode>('single')

  const handleStart = () => onStart({ mode, gridSize, difficulty, playerSymbol, firstPlayer, seriesMode })

  return (
    <div className="screen setup-screen">
      <header className="screen-header">
        <button className="btn-icon" onClick={onBack}>←</button>
        <h1>{t.settings}</h1>
      </header>

      <div className="setup-content">
        {/* Grid size */}
        <div className="setup-section">
          <label className="setup-label">{t.gridSize}</label>
          <div className="setup-options">
            {([3, 4, 5] as GridSize[]).map((s) => (
              <button key={s} className={`chip${gridSize === s ? ' chip-active' : ''}`} onClick={() => setGridSize(s)}>
                {s}×{s}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty (AI only) */}
        {mode === 'ai' && (
          <div className="setup-section">
            <label className="setup-label">{t.difficulty}</label>
            <div className="setup-options">
              {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
                <button key={d} className={`chip${difficulty === d ? ' chip-active' : ''}`} onClick={() => setDifficulty(d)}>
                  {t[d]}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Symbol */}
        <div className="setup-section">
          <label className="setup-label">{t.chooseSymbol}</label>
          <div className="setup-options symbol-options">
            <button className={`chip symbol-chip${playerSymbol === 'X' ? ' chip-active' : ''}`} onClick={() => setPlayerSymbol('X')}>
              <svg viewBox="0 0 100 100" className="chip-svg chip-svg-x"><line x1="25" y1="25" x2="75" y2="75" /><line x1="75" y1="25" x2="25" y2="75" /></svg>
            </button>
            <button className={`chip symbol-chip${playerSymbol === 'O' ? ' chip-active' : ''}`} onClick={() => setPlayerSymbol('O')}>
              <svg viewBox="0 0 100 100" className="chip-svg chip-svg-o"><circle cx="50" cy="50" r="25" /></svg>
            </button>
          </div>
        </div>

        {/* First player */}
        <div className="setup-section">
          <label className="setup-label">{t.chooseFirst}</label>
          <div className="setup-options">
            {mode === 'ai' ? (
              <>
                <button className={`chip${firstPlayer === 'human' ? ' chip-active' : ''}`} onClick={() => setFirstPlayer('human')}>{t.human}</button>
                <button className={`chip${firstPlayer === 'ai' ? ' chip-active' : ''}`} onClick={() => setFirstPlayer('ai')}>{t.ai}</button>
                <button className={`chip${firstPlayer === 'random' ? ' chip-active' : ''}`} onClick={() => setFirstPlayer('random')}>{t.random}</button>
              </>
            ) : (
              <>
                <button className={`chip${firstPlayer === 'player1' ? ' chip-active' : ''}`} onClick={() => setFirstPlayer('player1')}>{t.player1}</button>
                <button className={`chip${firstPlayer === 'player2' ? ' chip-active' : ''}`} onClick={() => setFirstPlayer('player2')}>{t.player2}</button>
                <button className={`chip${firstPlayer === 'random' ? ' chip-active' : ''}`} onClick={() => setFirstPlayer('random')}>{t.random}</button>
              </>
            )}
          </div>
        </div>

        {/* Series mode */}
        <div className="setup-section">
          <label className="setup-label">{t.seriesMode}</label>
          <div className="setup-options">
            <button className={`chip${seriesMode === 'single' ? ' chip-active' : ''}`} onClick={() => setSeriesMode('single')}>{t.singleGame}</button>
            <button className={`chip${seriesMode === 'bo3' ? ' chip-active' : ''}`} onClick={() => setSeriesMode('bo3')}>{t.bestOf3}</button>
            <button className={`chip${seriesMode === 'bo5' ? ' chip-active' : ''}`} onClick={() => setSeriesMode('bo5')}>{t.bestOf5}</button>
          </div>
        </div>

        <button className="btn btn-primary btn-lg btn-start" onClick={handleStart}>
          <span className="btn-ico">🎮</span>{t.startGame}
        </button>
      </div>
    </div>
  )
}

export default GameSetup
