type GameControlsProps = {
  onResetGame: () => void
  onResetScore: () => void
}

const GameControls = ({ onResetGame, onResetScore }: GameControlsProps) => {
  return (
    <div className="game-controls">
      <button className="control-button" onClick={onResetGame}>
        Reset Round
      </button>
      <button className="control-button ghost" onClick={onResetScore}>
        Reset Score
      </button>
    </div>
  )
}

export default GameControls
