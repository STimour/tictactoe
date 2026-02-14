import type { BoardState, PlayerMark } from '../utils/gameLogic'

export type BoardProps = {
  board: BoardState
  onCellClick: (index: number) => void
  winningLine: number[] | null
  isLocked: boolean
}

type LineStyle = {
  width?: string
  height?: string
  top?: string
  left?: string
  transform?: string
}

const getLineStyle = (line: number[]): LineStyle => {
  const [a, b, c] = line
  const isRow = Math.floor(a / 3) === Math.floor(b / 3)
  const isCol = a % 3 === b % 3

  if (isRow) {
    const row = Math.floor(a / 3)
    return {
      width: '92%',
      height: '4px',
      top: `${16.5 + row * 33.5}%`,
      left: '4%',
    }
  }

  if (isCol) {
    const col = a % 3
    return {
      width: '4px',
      height: '92%',
      top: '4%',
      left: `${16.5 + col * 33.5}%`,
    }
  }

  if (a === 0 && c === 8) {
    return {
      width: '120%',
      height: '4px',
      top: '50%',
      left: '-10%',
      transform: 'rotate(45deg)',
    }
  }

  return {
    width: '120%',
    height: '4px',
    top: '50%',
    left: '-10%',
    transform: 'rotate(-45deg)',
  }
}

const renderMark = (mark: PlayerMark | '') => {
  if (!mark) {
    return null
  }
  return <span className={`mark mark-${mark}`}>{mark}</span>
}

const Board = ({ board, onCellClick, winningLine, isLocked }: BoardProps) => {
  return (
    <div className="board">
      {winningLine && (
        <div className="winning-line" style={getLineStyle(winningLine)} />
      )}
      {board.map((cell, index) => (
        <button
          key={index}
          className={`cell ${cell ? 'cell-filled' : ''}`}
          onClick={() => onCellClick(index)}
          disabled={isLocked || cell !== ''}
          aria-label={`Cell ${index + 1}`}
        >
          {renderMark(cell)}
        </button>
      ))}
    </div>
  )
}

export default Board
