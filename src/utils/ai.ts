import { checkWinner, getAvailableMoves } from './gameLogic'
import type { BoardState, PlayerMark } from './gameLogic'

type Difficulty = 'easy' | 'medium' | 'hard'

const AI_PLAYER: PlayerMark = 'O'
const HUMAN_PLAYER: PlayerMark = 'X'

const tryWinningMove = (board: BoardState, player: PlayerMark): number | null => {
  const moves = getAvailableMoves(board)
  for (const move of moves) {
    const nextBoard = [...board]
    nextBoard[move] = player
    if (checkWinner(nextBoard) === player) {
      return move
    }
  }
  return null
}

const pickPriorityMove = (board: BoardState): number => {
  const preferred = [4, 0, 2, 6, 8, 1, 3, 5, 7]
  const moves = getAvailableMoves(board)
  for (const index of preferred) {
    if (moves.includes(index)) {
      return index
    }
  }
  return moves[0]
}

export const minimax = (
  board: BoardState,
  depth: number,
  isMaximizing: boolean,
): number => {
  const winner = checkWinner(board)
  if (winner === AI_PLAYER) {
    return 10 - depth
  }
  if (winner === HUMAN_PLAYER) {
    return depth - 10
  }
  if (getAvailableMoves(board).length === 0) {
    return 0
  }

  const moves = getAvailableMoves(board)
  if (isMaximizing) {
    let bestScore = -Infinity
    for (const move of moves) {
      const nextBoard = [...board]
      nextBoard[move] = AI_PLAYER
      const score = minimax(nextBoard, depth + 1, false)
      bestScore = Math.max(bestScore, score)
    }
    return bestScore
  }

  let bestScore = Infinity
  for (const move of moves) {
    const nextBoard = [...board]
    nextBoard[move] = HUMAN_PLAYER
    const score = minimax(nextBoard, depth + 1, true)
    bestScore = Math.min(bestScore, score)
  }
  return bestScore
}

export const getBestMove = (board: BoardState, difficulty: Difficulty): number => {
  const moves = getAvailableMoves(board)
  if (moves.length === 0) {
    return -1
  }

  if (difficulty === 'easy') {
    return moves[Math.floor(Math.random() * moves.length)]
  }

  if (difficulty === 'medium') {
    const winningMove = tryWinningMove(board, AI_PLAYER)
    if (winningMove !== null) {
      return winningMove
    }
    const blockingMove = tryWinningMove(board, HUMAN_PLAYER)
    if (blockingMove !== null) {
      return blockingMove
    }
    return pickPriorityMove(board)
  }

  let bestScore = -Infinity
  let bestMove = moves[0]
  for (const move of moves) {
    const nextBoard = [...board]
    nextBoard[move] = AI_PLAYER
    const score = minimax(nextBoard, 0, false)
    if (score > bestScore) {
      bestScore = score
      bestMove = move
    }
  }
  return bestMove
}
