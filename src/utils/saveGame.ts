import type { GridSize } from './gameLogic'

export interface SavedGame {
  board: string[]
  gridSize: GridSize
  currentPlayer: 'X' | 'O'
  mode: 'pvp' | 'ai'
  difficulty?: 'easy' | 'medium' | 'hard'
  playerSymbol: 'X' | 'O'
  scoreX: number
  scoreO: number
  scoreDraw: number
  seriesMode: 'single' | 'bo3' | 'bo5'
  seriesX: number
  seriesO: number
  timestamp: number
}

const KEY = 'tictac-saved-game'

export function saveGame(g: SavedGame) {
  localStorage.setItem(KEY, JSON.stringify(g))
}

export function loadSavedGame(): SavedGame | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw) as SavedGame
  } catch { /* empty */ }
  return null
}

export function clearSavedGame() {
  localStorage.removeItem(KEY)
}
