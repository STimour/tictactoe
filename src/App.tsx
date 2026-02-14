import './App.css'
import Board from './components/Board'
import GameControls from './components/GameControls'
import GameStatus from './components/GameStatus'
import ModeBar from './components/ModeBar'
import Scoreboard from './components/Scoreboard'
import { useGame } from './hooks/useGame'

function App() {
  const {
    board,
    currentPlayer,
    draw,
    winner,
    winningLine,
    mode,
    difficulty,
    score,
    handleMove,
    resetGame,
    resetScore,
    setMode,
    setDifficulty,
  } = useGame()

  return (
    <div className="app-shell">
      <header className="hero">
        <p className="eyebrow">Neo Arcade Protocol</p>
        <h1>Futuristic Tic Tac Toe</h1>
        <p className="subtitle">
          Tactical neon duels with offline-ready AI precision.
        </p>
      </header>

      <main className="game-grid">
        <section className="game-panel">
          <Board
            board={board}
            onCellClick={handleMove}
            winningLine={winningLine}
            isLocked={Boolean(winner || draw || (mode === 'ai' && currentPlayer === 'O'))}
          />
          <GameStatus
            currentPlayer={currentPlayer}
            winner={winner}
            draw={draw}
            mode={mode}
          />
        </section>

        <aside className="control-panel">
          <ModeBar
            mode={mode}
            difficulty={difficulty}
            onModeChange={setMode}
            onDifficultyChange={setDifficulty}
          />
          <Scoreboard score={score} />
          <GameControls onResetGame={resetGame} onResetScore={resetScore} />
          <div className="offline-chip">
            Offline ready · Installable PWA
          </div>
        </aside>
      </main>
    </div>
  )
}

export default App
