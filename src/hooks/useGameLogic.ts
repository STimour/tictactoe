import { useCallback, useEffect, useRef, useState } from 'react'
import { checkWinner, getWinningLine, isDraw, createEmptyBoard } from '../utils/gameLogic'
import type { BoardState, PlayerMark, GridSize } from '../utils/gameLogic'
import { getBestMove } from '../utils/ai'
import { useSettings } from '../contexts/SettingsContext'
import { playTap, playWin, playLose, playDraw, vibrate, vibrateWin, vibrateLose } from '../utils/feedback'
import { recordGame, type GameResult } from '../utils/stats'
import { saveGame, clearSavedGame, loadSavedGame } from '../utils/saveGame'

export type GameMode = 'pvp' | 'ai'
export type Difficulty = 'easy' | 'medium' | 'hard'
export type SeriesMode = 'single' | 'bo3' | 'bo5'
export type FirstPlayer = 'human' | 'ai' | 'random' | 'player1' | 'player2'

export interface GameConfig {
  mode: GameMode
  difficulty: Difficulty
  gridSize: GridSize
  playerSymbol: 'X' | 'O'
  firstPlayer: FirstPlayer
  seriesMode: SeriesMode
}

export const defaultConfig: GameConfig = {
  mode: 'pvp',
  difficulty: 'easy',
  gridSize: 3,
  playerSymbol: 'X',
  firstPlayer: 'player1',
  seriesMode: 'single',
}

function resolveFirst(cfg: GameConfig): PlayerMark {
  if (cfg.mode === 'ai') {
    if (cfg.firstPlayer === 'human') return cfg.playerSymbol
    if (cfg.firstPlayer === 'ai') return cfg.playerSymbol === 'X' ? 'O' : 'X'
    return Math.random() < 0.5 ? 'X' : 'O'
  }
  if (cfg.firstPlayer === 'player2') return 'O'
  if (cfg.firstPlayer === 'random') return Math.random() < 0.5 ? 'X' : 'O'
  return 'X'
}

export function useGameLogic(config: GameConfig) {
  const { sounds, vibrations } = useSettings()
  const aiSymbol: PlayerMark = config.playerSymbol === 'X' ? 'O' : 'X'
  const aiTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // --- state ---
  const [board, setBoard] = useState<BoardState>(() => {
    const saved = loadSavedGame()
    if (saved && saved.gridSize === config.gridSize && saved.mode === config.mode)
      return saved.board as BoardState
    return createEmptyBoard(config.gridSize)
  })
  const [currentPlayer, setCurrentPlayer] = useState<PlayerMark>(() => {
    const saved = loadSavedGame()
    if (saved && saved.gridSize === config.gridSize && saved.mode === config.mode)
      return saved.currentPlayer
    return resolveFirst(config)
  })
  const [winner, setWinner] = useState<PlayerMark | null>(null)
  const [winLine, setWinLine] = useState<number[] | null>(null)
  const [drawFlag, setDrawFlag] = useState(false)
  const [scoreX, setScoreX] = useState(() => {
    const saved = loadSavedGame()
    return (saved && saved.gridSize === config.gridSize) ? saved.scoreX : 0
  })
  const [scoreO, setScoreO] = useState(() => {
    const saved = loadSavedGame()
    return (saved && saved.gridSize === config.gridSize) ? saved.scoreO : 0
  })
  const [scoreDraw, setScoreDraw] = useState(() => {
    const saved = loadSavedGame()
    return (saved && saved.gridSize === config.gridSize) ? saved.scoreDraw : 0
  })
  const [seriesX, setSeriesX] = useState(0)
  const [seriesO, setSeriesO] = useState(0)
  const [seriesWinner, setSeriesWinner] = useState<PlayerMark | null>(null)
  const [isAIThinking, setIsAIThinking] = useState(false)
  const [newAchievements, setNewAchievements] = useState<string[]>([])

  const gameOver = winner !== null || drawFlag
  const isAITurn = config.mode === 'ai' && currentPlayer === aiSymbol && !gameOver

  // persist game
  useEffect(() => {
    if (!gameOver) {
      saveGame({
        board: board as string[],
        gridSize: config.gridSize,
        currentPlayer,
        mode: config.mode,
        difficulty: config.difficulty,
        playerSymbol: config.playerSymbol,
        scoreX, scoreO, scoreDraw,
        seriesMode: config.seriesMode,
        seriesX, seriesO,
        timestamp: Date.now(),
      })
    }
  }, [board, currentPlayer, gameOver])

  // handle result for stats
  const handleResult = useCallback((w: PlayerMark | null) => {
    let result: GameResult = 'draw'
    if (w) {
      if (config.mode === 'ai') {
        result = w === config.playerSymbol ? 'win' : 'lose'
      } else {
        result = 'win' // in pvp, X winning counts as win
      }
    }
    const { newAchievements: na } = recordGame(
      result, config.mode, config.gridSize,
      config.mode === 'ai' ? config.difficulty : undefined,
    )
    if (na.length) setNewAchievements(na)
  }, [config])

  // play a cell
  const playCell = useCallback((index: number) => {
    if (board[index] !== '' || gameOver || isAIThinking) return
    if (config.mode === 'ai' && currentPlayer === aiSymbol) return

    if (sounds) playTap()
    if (vibrations) vibrate()

    const nb = [...board] as BoardState
    nb[index] = currentPlayer

    const w = checkWinner(nb, config.gridSize)
    const d = !w && isDraw(nb, config.gridSize)
    const wl = w ? getWinningLine(nb, config.gridSize) : null

    setBoard(nb)
    setWinner(w)
    setWinLine(wl)
    setDrawFlag(d)

    if (w) {
      if (w === 'X') { setScoreX(p => p + 1); setSeriesX(p => p + 1) }
      else { setScoreO(p => p + 1); setSeriesO(p => p + 1) }
      if (sounds) playWin()
      if (vibrations) vibrateWin()
      handleResult(w)

      // check series
      const needed = config.seriesMode === 'bo3' ? 2 : config.seriesMode === 'bo5' ? 3 : Infinity
      const newSX = w === 'X' ? seriesX + 1 : seriesX
      const newSO = w === 'O' ? seriesO + 1 : seriesO
      if (newSX >= needed) setSeriesWinner('X')
      else if (newSO >= needed) setSeriesWinner('O')
      clearSavedGame()
    } else if (d) {
      setScoreDraw(p => p + 1)
      if (sounds) playDraw()
      handleResult(null)
      clearSavedGame()
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }
  }, [board, currentPlayer, gameOver, isAIThinking, config, sounds, vibrations, aiSymbol, handleResult, seriesX, seriesO])

  // AI move via internal function
  const doAIMove = useCallback(() => {
    const move = getBestMove(board, config.difficulty, config.gridSize)
    if (move < 0) return

    if (sounds) playTap()
    if (vibrations) vibrate()

    const nb = [...board] as BoardState
    nb[move] = aiSymbol

    const w = checkWinner(nb, config.gridSize)
    const d = !w && isDraw(nb, config.gridSize)
    const wl = w ? getWinningLine(nb, config.gridSize) : null

    setBoard(nb)
    setWinner(w)
    setWinLine(wl)
    setDrawFlag(d)

    if (w) {
      if (w === 'X') { setScoreX(p => p + 1); setSeriesX(p => p + 1) }
      else { setScoreO(p => p + 1); setSeriesO(p => p + 1) }
      if (sounds) playLose()
      if (vibrations) vibrateLose()
      handleResult(w)
      clearSavedGame()
    } else if (d) {
      setScoreDraw(p => p + 1)
      if (sounds) playDraw()
      handleResult(null)
      clearSavedGame()
    } else {
      setCurrentPlayer(config.playerSymbol)
    }
    setIsAIThinking(false)
  }, [board, config, aiSymbol, sounds, vibrations, handleResult])

  // trigger AI
  useEffect(() => {
    if (!isAITurn) return
    setIsAIThinking(true)
    aiTimer.current = setTimeout(doAIMove, 400)
    return () => { if (aiTimer.current) clearTimeout(aiTimer.current) }
  }, [isAITurn, doAIMove])

  const resetRound = useCallback(() => {
    clearSavedGame()
    setBoard(createEmptyBoard(config.gridSize))
    setCurrentPlayer(resolveFirst(config))
    setWinner(null); setWinLine(null); setDrawFlag(false)
    setIsAIThinking(false); setNewAchievements([])
  }, [config])

  const resetAll = useCallback(() => {
    clearSavedGame()
    setBoard(createEmptyBoard(config.gridSize))
    setCurrentPlayer(resolveFirst(config))
    setWinner(null); setWinLine(null); setDrawFlag(false)
    setScoreX(0); setScoreO(0); setScoreDraw(0)
    setSeriesX(0); setSeriesO(0); setSeriesWinner(null)
    setIsAIThinking(false); setNewAchievements([])
  }, [config])

  const dismissAchievements = useCallback(() => setNewAchievements([]), [])

  return {
    board, currentPlayer, winner, winLine, draw: drawFlag, gameOver,
    scoreX, scoreO, scoreDraw,
    seriesX, seriesO, seriesWinner,
    isAIThinking, newAchievements,
    playCell, resetRound, resetAll, dismissAchievements,
  }
}
