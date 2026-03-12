export type PlayerMark = 'X' | 'O'
export type BoardState = Array<PlayerMark | ''>
export type GridSize = 3 | 4 | 5

const linesCache = new Map<GridSize, number[][]>()

export const generateWinningLines = (size: GridSize): number[][] => {
  const cached = linesCache.get(size)
  if (cached) return cached

  const lines: number[][] = []
  // Rows
  for (let r = 0; r < size; r++) {
    const line: number[] = []
    for (let c = 0; c < size; c++) line.push(r * size + c)
    lines.push(line)
  }
  // Columns
  for (let c = 0; c < size; c++) {
    const line: number[] = []
    for (let r = 0; r < size; r++) line.push(r * size + c)
    lines.push(line)
  }
  // Diagonals
  const d1: number[] = []
  const d2: number[] = []
  for (let i = 0; i < size; i++) {
    d1.push(i * size + i)
    d2.push(i * size + (size - 1 - i))
  }
  lines.push(d1, d2)

  linesCache.set(size, lines)
  return lines
}

export const createEmptyBoard = (size: GridSize): BoardState =>
  Array(size * size).fill('')

export const checkWinner = (board: BoardState, size: GridSize): PlayerMark | null => {
  for (const line of generateWinningLines(size)) {
    const first = board[line[0]]
    if (first && line.every((i) => board[i] === first)) {
      return first as PlayerMark
    }
  }
  return null
}

export const getWinningLine = (board: BoardState, size: GridSize): number[] | null => {
  for (const line of generateWinningLines(size)) {
    const first = board[line[0]]
    if (first && line.every((i) => board[i] === first)) {
      return line
    }
  }
  return null
}

export const isDraw = (board: BoardState, size: GridSize): boolean =>
  !checkWinner(board, size) && board.every((cell) => cell !== '')

export const getAvailableMoves = (board: BoardState): number[] => {
  const moves: number[] = []
  board.forEach((cell, index) => {
    if (cell === '') moves.push(index)
  })
  return moves
}
