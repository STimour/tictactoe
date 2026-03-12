import { useState } from 'react'
import './App.css'
import { LanguageProvider } from './i18n/LanguageContext'
import { ThemeProvider } from './theme/ThemeContext'
import { SettingsProvider } from './contexts/SettingsContext'
import { useTutorial } from './hooks/useTutorial'
import type { GameConfig } from './hooks/useGameLogic'
import { defaultConfig } from './hooks/useGameLogic'
import LandingPage from './components/LandingPage'
import ModeSelection from './components/ModeSelection'
import GameSetup from './components/GameSetup'
import GameScreen from './components/GameScreen'
import RulesScreen from './components/RulesScreen'
import SettingsScreen from './components/SettingsScreen'
import StatsScreen from './components/StatsScreen'
import Tutorial from './components/Tutorial'

type Screen = 'landing' | 'modeSelect' | 'gameSetup' | 'game' | 'rules' | 'settings' | 'stats'

function AppInner() {
  const [screen, setScreen] = useState<Screen>('landing')
  const [gameMode, setGameMode] = useState<'pvp' | 'ai'>('ai')
  const [gameConfig, setGameConfig] = useState<GameConfig>(defaultConfig)
  const [gameKey, setGameKey] = useState(0)
  const tutorial = useTutorial()

  const handleModeSelect = (mode: 'pvp' | 'ai') => {
    setGameMode(mode)
    setScreen('gameSetup')
  }

  const handleStartGame = (config: GameConfig) => {
    setGameConfig(config)
    setGameKey((k) => k + 1)
    setScreen('game')
  }

  return (
    <div className="app">
      {tutorial.show && (
        <Tutorial step={tutorial.step} totalSteps={tutorial.totalSteps} onNext={tutorial.next} onSkip={tutorial.finish} />
      )}
      <div className="screen-container">
        {screen === 'landing' && (
          <LandingPage
            onPlay={() => setScreen('modeSelect')}
            onRules={() => setScreen('rules')}
            onSettings={() => setScreen('settings')}
            onStats={() => setScreen('stats')}
          />
        )}
        {screen === 'modeSelect' && (
          <ModeSelection onSelect={handleModeSelect} onBack={() => setScreen('landing')} />
        )}
        {screen === 'gameSetup' && (
          <GameSetup mode={gameMode} onStart={handleStartGame} onBack={() => setScreen('modeSelect')} />
        )}
        {screen === 'game' && (
          <GameScreen key={gameKey} config={gameConfig} onQuit={() => setScreen('landing')} />
        )}
        {screen === 'rules' && <RulesScreen onBack={() => setScreen('landing')} />}
        {screen === 'settings' && <SettingsScreen onBack={() => setScreen('landing')} />}
        {screen === 'stats' && <StatsScreen onBack={() => setScreen('landing')} />}
      </div>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SettingsProvider>
          <AppInner />
        </SettingsProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
