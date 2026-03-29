import { useState, useEffect } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { useGameLogic, type GameConfig } from '../hooks/useGameLogic'
import Board from './Board'
import GameEndScreen from './GameEndScreen'
import AchievementToast from './AchievementToast'
import ConfirmDialog from './ConfirmDialog'

type Props = {
  config: GameConfig
  onQuit: () => void
}

const GameScreen = ({ config, onQuit }: Props) => {
  const { t } = useLanguage()
  const game = useGameLogic(config)
  const [showEnd, setShowEnd] = useState(false)
  const [showQuitConfirm, setShowQuitConfirm] = useState(false)

  useEffect(() => {
    if (game.gameOver) {
      const timer = setTimeout(() => setShowEnd(true), 700)
      return () => clearTimeout(timer)
    }
    setShowEnd(false)
  }, [game.gameOver])

  const turnLabel = game.currentPlayer === 'X' ? t.playerX : t.playerO

  return (
    <div className="screen game-screen">
      {/* Top bar */}
      <div className="game-topbar">
        <button className="btn-icon" onClick={() => setShowQuitConfirm(true)}>←</button>
        <div className="turn-indicator">
          <span className="turn-label">{t.turnOf}</span>
          <span className={`turn-player turn-${game.currentPlayer.toLowerCase()}`}>{turnLabel}</span>
        </div>
        <div style={{ width: 44 }} />
      </div>

      {/* Score bar */}
      <div className="score-bar">
        <div className="score-item score-x">
          <span className="score-sym">✕</span>
          <span className="score-val">{game.scoreX}</span>
        </div>
        <div className="score-item score-d">
          <span className="score-sym">―</span>
          <span className="score-val">{game.scoreDraw}</span>
        </div>
        <div className="score-item score-o">
          <span className="score-sym">○</span>
          <span className="score-val">{game.scoreO}</span>
        </div>
      </div>

      {/* Series score */}
      {config.seriesMode !== 'single' && (
        <div className="series-bar">
          <span className="series-label">{t.seriesScore}:</span>
          <span className="series-values">{game.seriesX} — {game.seriesO}</span>
        </div>
      )}

      {/* AI thinking */}
      {game.isAIThinking && (
        <div className="ai-thinking">
          <span className="ai-dots"><span>.</span><span>.</span><span>.</span></span>
          <span>{t.aiThinking}</span>
        </div>
      )}

      {/* Board */}
      <div className="board-area">
        <Board
          board={game.board}
          gridSize={config.gridSize}
          onCellClick={game.playCell}
          winLine={game.winLine}
          disabled={game.gameOver || game.isAIThinking}
        />
      </div>

      {/* Bottom */}
      <div className="game-bottom">
        <button className="btn btn-ghost btn-sm" onClick={() => game.resetRound()}>
          <span className="btn-ico">🔄</span>{t.resetRound}
        </button>
      </div>

      {/* End overlay */}
      {showEnd && game.gameOver && (
        <GameEndScreen
          winner={game.winner}
          mode={config.mode}
          playerSymbol={config.playerSymbol}
          seriesWinner={game.seriesWinner}
          onPlayAgain={() => {
            setShowEnd(false)
            game.seriesWinner ? game.resetAll() : game.resetRound()
          }}
          onMenu={onQuit}
        />
      )}

      {/* Achievements */}
      <AchievementToast ids={game.newAchievements} onDismiss={game.dismissAchievements} />

      {/* Confirm quit */}
      {showQuitConfirm && (
        <ConfirmDialog
          message={t.confirmQuit}
          onConfirm={onQuit}
          onCancel={() => setShowQuitConfirm(false)}
        />
      )}
    </div>
  )
}

export default GameScreen
