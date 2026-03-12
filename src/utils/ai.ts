import { checkWinner, getAvailableMoves, generateWinningLines } from './gameLogic'
import type { BoardState, PlayerMark, GridSize } from './gameLogic'

type Difficulty = 'easy' | 'medium' | 'hard'

const AI_PLAYER: PlayerMark = 'O'
const HUMAN_PLAYER: PlayerMark = 'X'

const MAX_DEPTH: Record<GridSize, number> = { 3: 10, 4: 5, 5: 3 }

const evaluate = (board: BoardState, size: GridSize): number => {
  const lines = generateWinningLines(size)
  let score = 0
  for (const line of lines) {
    let ai = 0
    let human = 0
    for (const idx of line) {
      if (board[idx] === AI_PLAYER) ai++
      else if (board[idx] === HUMAN_PLAYER) human++
    }
    if (human === 0 && ai > 0) score += 10 ** ai
    if (ai === 0 && human > 0) score -= 10 ** human
  }
  return score
}

const alphabeta = (
  board: BoardState,
  size: GridSize,
  depth: number,
  alpha: number,
  beta: number,
  isMax: boolean,
): number => {
  const w = checkWinner(board, size)
  if (w === AI_PLAYER) return 10000 - depth
  if (w === HUMAN_PLAYER) return -10000 + depth
  const moves = getAvailableMoves(board)
  if (moves.length === 0) return 0
  if (depth >= MAX_DEPTH[size]) return evaluate(board, size)

  if (isMax) {
    let v = -Infinity
    for (const m of moves) {
      board[m] = AI_PLAYER
      v = Math.max(v, alphabeta(board, size, depth + 1, alpha, beta, false))
      board[m] = ''
      alpha = Math.max(alpha, v)
      if (alpha >= beta) break
    }
    return v
  }
  let v = Infinity
  for (const m of moves) {
    board[m] = HUMAN_PLAYER
    v = Math.min(v, alphabeta(board, size, depth + 1, alpha, beta, true))
    board[m] = ''
    beta = Math.min(beta, v)
    if (alpha >= beta) break
  }
  return v
}

const tryWinOrBlock = (board: BoardState, player: PlayerMark, size: GridSize): number | null => {
  const moves = getAvailableMoves(board)
  for (const m of moves) {
    board[m] = player
    const win = checkWinner(board, size) === player
    board[m] = ''
    if (win) return m
  }
  return null
}

const pickPriority = (board: BoardState, size: GridSize): number => {
  const center = Math.floor((size * size) / 2)
  const moves = getAvailableMoves(board)
  if (moves.includes(center)) return center
  const corners = [0, size - 1, size * (size - 1), size * size - 1]
  for (const c of corners) {
    if (moves.includes(c)) return c
  }
  return moves[0]
}

export const getBestMove = (
  board: BoardState,
  difficulty: Difficulty,
  size: GridSize,
): number => {
  const moves = getAvailableMoves(board)
  if (moves.length === 0) return -1

  if (difficulty === 'easy') {
    return moves[Math.floor(Math.random() * moves.length)]
  }

  if (difficulty === 'medium') {
    const win = tryWinOrBlock(board, AI_PLAYER, size)
    if (win !== null) return win
    const block = tryWinOrBlock(board, HUMAN_PLAYER, size)
    if (block !== null) return block
    return pickPriority(board, size)
  }

  // Hard — alpha-beta
  const copy = [...board]
  let bestScore = -Infinity
  let bestMove = moves[0]
  for (const m of moves) {
    copy[m] = AI_PLAYER
    const score = alphabeta(copy, size, 0, -Infinity, Infinity, false)
    copy[m] = ''
    if (score > bestScore) {
      bestScore = score
      bestMove = m
    }
  }
  return bestMove
}
