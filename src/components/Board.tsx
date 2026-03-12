import type { BoardState, GridSize } from '../utils/gameLogic'

type BoardProps = {
  board: BoardState
  gridSize: GridSize
  onCellClick: (index: number) => void
  winLine: number[] | null
  disabled: boolean
}

const Board = ({ board, gridSize, onCellClick, winLine, disabled }: BoardProps) => {
  return (
    <div
      className={`board board-${gridSize}`}
      style={{
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize}, 1fr)`,
      }}
    >
      {board.map((cell, i) => {
        const isWin = winLine?.includes(i) ?? false
        return (
          <button
            key={i}
            className={`cell${cell ? ' cell-filled' : ''}${cell === 'X' ? ' cell-x' : ''}${cell === 'O' ? ' cell-o' : ''}${isWin ? ' cell-win' : ''}${disabled ? ' cell-disabled' : ''}`}
            onClick={() => onCellClick(i)}
            disabled={!!cell || disabled}
            aria-label={`Row ${Math.floor(i / gridSize) + 1}, Col ${(i % gridSize) + 1}${cell ? `: ${cell}` : ''}`}
          >
            {cell && (
              <span className="cell-symbol">
                {cell === 'X' ? (
                  <svg viewBox="0 0 100 100" className="sym-svg sym-x">
                    <line x1="22" y1="22" x2="78" y2="78" />
                    <line x1="78" y1="22" x2="22" y2="78" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 100 100" className="sym-svg sym-o">
                    <circle cx="50" cy="50" r="28" />
                  </svg>
                )}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default Board
