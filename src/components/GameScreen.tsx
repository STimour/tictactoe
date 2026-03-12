import type { GameConfig } from '../hooks/useGame'
import { useGame } from '../hooks/useGame'
import { useLanguage } from '../i18n/LanguageContext'
import Board from './Board'
import GameStatus from './GameStatus'
import Scoreboard from './Scoreboard'
import GameControls from './GameControls'

type Props = {
  config: GameConfig
  onQuit: () => void
}

const GameScreen = ({ config, onQuit }: Props) => {
  const { t } = useLanguage()
  const {
    board,
    currentPlayer,
    draw,
    winner,
    winningLine,
    mode,
    gridSize,
    score,
    handleMove,
    resetGame,
    resetScore,
  } = useGame(config)

  return (
    <div className="screen game-screen">
      <div className="game-topbar">
        <button className="back-btn" onClick={onQuit}>
          ← {t.quit}
        </button>
        <GameStatus
          currentPlayer={currentPlayer}
          winner={winner}
          draw={draw}
          mode={mode}
        />
      </div>

      <div className="board-wrapper">
        <Board
          board={board}
          gridSize={gridSize}
          onCellClick={handleMove}
          winningLine={winningLine}
          isLocked={Boolean(winner || draw || (mode === 'ai' && currentPlayer === 'O'))}
        />
      </div>

      <Scoreboard score={score} />
      <GameControls onResetGame={resetGame} onResetScore={resetScore} />
    </div>
  )
}

export default GameScreen
