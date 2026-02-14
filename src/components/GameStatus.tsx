import type { PlayerMark } from '../utils/gameLogic'

type GameStatusProps = {
  currentPlayer: PlayerMark
  winner: PlayerMark | null
  draw: boolean
  mode: 'pvp' | 'ai'
}

const GameStatus = ({ currentPlayer, winner, draw, mode }: GameStatusProps) => {
  let message = `Turn: ${currentPlayer}`
  if (winner) {
    message = `${winner} wins the round!`
  } else if (draw) {
    message = 'Draw. No more moves.'
  } else if (mode === 'ai' && currentPlayer === 'O') {
    message = 'AI is thinking...'
  }

  return (
    <div className="game-status">
      <span>{message}</span>
    </div>
  )
}

export default GameStatus
