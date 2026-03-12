import { useState } from 'react'
import './App.css'
import { LanguageProvider } from './i18n/LanguageContext'
import { ThemeProvider } from './theme/ThemeContext'
import LandingPage from './components/LandingPage'
import ModeSelection from './components/ModeSelection'
import GameSetup from './components/GameSetup'
import GameScreen from './components/GameScreen'
import RulesScreen from './components/RulesScreen'
import SettingsScreen from './components/SettingsScreen'
import type { Difficulty, GameConfig } from './hooks/useGame'
import type { GridSize } from './utils/gameLogic'

type Screen = 'landing' | 'modeSelect' | 'gameSetup' | 'game' | 'rules' | 'settings'

function App() {
  const [screen, setScreen] = useState<Screen>('landing')
  const [gameConfig, setGameConfig] = useState<GameConfig>({
    mode: 'pvp',
    difficulty: 'easy',
    gridSize: 3,
  })
  const [gameKey, setGameKey] = useState(0)

  const handleModeSelect = (mode: 'pvp' | 'ai') => {
    if (mode === 'pvp') {
      setGameConfig({ mode: 'pvp', difficulty: 'easy', gridSize: 3 })
      setGameKey((k) => k + 1)
      setScreen('game')
    } else {
      setGameConfig((prev) => ({ ...prev, mode: 'ai' }))
      setScreen('gameSetup')
    }
  }

  const handleGameSetup = (difficulty: Difficulty, gridSize: GridSize) => {
    setGameConfig({ mode: 'ai', difficulty, gridSize })
    setGameKey((k) => k + 1)
    setScreen('game')
  }

  return (
    <ThemeProvider>
    <LanguageProvider>
      <div className="app-shell">
        {screen === 'landing' && (
          <LandingPage
            onPlay={() => setScreen('modeSelect')}
            onRules={() => setScreen('rules')}
            onSettings={() => setScreen('settings')}
          />
        )}
        {screen === 'modeSelect' && (
          <ModeSelection
            onSelect={handleModeSelect}
            onBack={() => setScreen('landing')}
          />
        )}
        {screen === 'gameSetup' && (
          <GameSetup
            onStart={handleGameSetup}
            onBack={() => setScreen('modeSelect')}
          />
        )}
        {screen === 'game' && (
          <GameScreen
            key={gameKey}
            config={gameConfig}
            onQuit={() => setScreen('landing')}
          />
        )}
        {screen === 'rules' && (
          <RulesScreen onBack={() => setScreen('landing')} />
        )}
        {screen === 'settings' && (
          <SettingsScreen onBack={() => setScreen('landing')} />
        )}
      </div>
    </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
