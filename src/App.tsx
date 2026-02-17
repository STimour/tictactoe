import { useEffect, useRef, useState } from 'react'
import './App.css'
import Board from './components/Board'
import GameControls from './components/GameControls'
import GameStatus from './components/GameStatus'
import ModeBar from './components/ModeBar'
import Scoreboard from './components/Scoreboard'
import { useGame } from './hooks/useGame'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

function App() {
  const [installable, setInstallable] = useState(false)
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      deferredPrompt.current = e as BeforeInstallPromptEvent
      setInstallable(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt.current) return
    await deferredPrompt.current.prompt()
    const { outcome } = await deferredPrompt.current.userChoice
    if (outcome === 'accepted') {
      setInstallable(false)
    }
    deferredPrompt.current = null
  }

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
        <h1>
          Futuristic Tic Tac Toe
          {installable && (
            <button className="install-btn" onClick={handleInstall} title="Installer l'application">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
          )}
        </h1>
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
