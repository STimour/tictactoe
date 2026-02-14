export type PlayerMark = 'X' | 'O'
export type BoardState = Array<PlayerMark | ''>

export const WINNING_LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export const checkWinner = (board: BoardState): PlayerMark | null => {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as PlayerMark
    }
  }
  return null
}

export const getWinningLine = (board: BoardState): number[] | null => {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return line
    }
  }
  return null
}

export const isDraw = (board: BoardState): boolean => {
  return !checkWinner(board) && board.every((cell) => cell !== '')
}

export const getAvailableMoves = (board: BoardState): number[] => {
  const moves: number[] = []
  board.forEach((cell, index) => {
    if (cell === '') {
      moves.push(index)
    }
  })
  return moves
}
