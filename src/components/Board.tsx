import type { BoardState, PlayerMark, GridSize } from '../utils/gameLogic'

export type BoardProps = {
  board: BoardState
  gridSize: GridSize
  onCellClick: (index: number) => void
  winningLine: number[] | null
  isLocked: boolean
}

const renderMark = (mark: PlayerMark | '') => {
  if (!mark) return null
  return <span className={`mark mark-${mark}`}>{mark}</span>
}

const Board = ({ board, gridSize, onCellClick, winningLine, isLocked }: BoardProps) => {
  const gap = gridSize === 3 ? '0.6rem' : gridSize === 4 ? '0.45rem' : '0.35rem'

  return (
    <div
      className="board"
      data-size={gridSize}
      style={{
        gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
        gap,
      }}
    >
      {board.map((cell, index) => (
        <button
          key={index}
          className={`cell ${cell ? 'cell-filled' : ''} ${winningLine?.includes(index) ? 'cell-win' : ''}`}
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
