import { useCallback, useEffect, useMemo, useState } from 'react'
import { checkWinner, getWinningLine, isDraw } from '../utils/gameLogic'
import type { BoardState, PlayerMark } from '../utils/gameLogic'
import { getBestMove } from '../utils/ai'

type GameMode = 'pvp' | 'ai'
export type Difficulty = 'easy' | 'medium' | 'hard'

export type ScoreState = {
  X: number
  O: number
  draws: number
}

const emptyBoard: BoardState = Array(9).fill('')
const scoreKey = 'neo-tic-score'

const getStoredScore = (): ScoreState => {
  if (typeof window === 'undefined') {
    return { X: 0, O: 0, draws: 0 }
  }
  const stored = window.localStorage.getItem(scoreKey)
  if (!stored) {
    return { X: 0, O: 0, draws: 0 }
  }
  try {
    const parsed = JSON.parse(stored) as ScoreState
    return {
      X: Number(parsed.X) || 0,
      O: Number(parsed.O) || 0,
      draws: Number(parsed.draws) || 0,
    }
  } catch {
    return { X: 0, O: 0, draws: 0 }
  }
}

export const useGame = () => {
  const [board, setBoard] = useState<BoardState>(emptyBoard)
  const [currentPlayer, setCurrentPlayer] = useState<PlayerMark>('X')
  const [winner, setWinner] = useState<PlayerMark | null>(null)
  const [winningLine, setWinningLine] = useState<number[] | null>(null)
  const [draw, setDraw] = useState(false)
  const [mode, setModeState] = useState<GameMode>('pvp')
  const [difficulty, setDifficultyState] = useState<Difficulty>('easy')
  const [score, setScore] = useState<ScoreState>(() => getStoredScore())

  const isAiTurn = useMemo(
    () => mode === 'ai' && currentPlayer === 'O',
    [mode, currentPlayer],
  )

  useEffect(() => {
    window.localStorage.setItem(scoreKey, JSON.stringify(score))
  }, [score])

  const handleMove = useCallback(
    (index: number, source: 'human' | 'ai' = 'human') => {
    if (board[index] !== '' || winner || draw) {
      return
    }
    if (mode === 'ai' && currentPlayer === 'O' && source !== 'ai') {
      return
    }

    const nextBoard = [...board]
    nextBoard[index] = currentPlayer

    const nextWinner = checkWinner(nextBoard)
    const nextDraw = isDraw(nextBoard)
    const line = getWinningLine(nextBoard)

    setBoard(nextBoard)
    setWinner(nextWinner)
    setWinningLine(line)
    setDraw(nextDraw)

    if (nextWinner) {
      setScore((prev) => ({
        ...prev,
        [nextWinner]: prev[nextWinner] + 1,
      }))
      return
    }

    if (nextDraw) {
      setScore((prev) => ({
        ...prev,
        draws: prev.draws + 1,
      }))
      return
    }

    setCurrentPlayer((prev) => (prev === 'X' ? 'O' : 'X'))
  },
    [board, currentPlayer, draw, mode, winner],
  )

  useEffect(() => {
    if (!isAiTurn || winner || draw) {
      return
    }

    const timer = window.setTimeout(() => {
      const move = getBestMove(board, difficulty)
      if (move >= 0) {
        handleMove(move, 'ai')
      }
    }, 320)

    return () => window.clearTimeout(timer)
  }, [board, difficulty, draw, handleMove, isAiTurn, winner])

  useEffect(() => {
    if (!winner && !draw) {
      return
    }

    const timer = window.setTimeout(() => {
      resetGame()
    }, 2000)

    return () => window.clearTimeout(timer)
  }, [winner, draw])

  const resetGame = useCallback(() => {
    setBoard(emptyBoard)
    setCurrentPlayer('X')
    setWinner(null)
    setWinningLine(null)
    setDraw(false)
  }, [])

  const resetScore = useCallback(() => {
    setScore({ X: 0, O: 0, draws: 0 })
  }, [])

  const setMode = (nextMode: GameMode) => {
    setModeState(nextMode)
    resetGame()
  }

  const setDifficulty = (nextDifficulty: Difficulty) => {
    setDifficultyState(nextDifficulty)
    resetGame()
  }

  return {
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
  }
}
