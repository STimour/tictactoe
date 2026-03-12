import type { PlayerMark } from '../utils/gameLogic'
import { useLanguage } from '../i18n/LanguageContext'

type GameStatusProps = {
  currentPlayer: PlayerMark
  winner: PlayerMark | null
  draw: boolean
  mode: 'pvp' | 'ai'
}

const GameStatus = ({ currentPlayer, winner, draw, mode }: GameStatusProps) => {
  const { t } = useLanguage()

  let message = `${t.turnOf} ${currentPlayer}`
  if (winner) {
    message = `${winner === 'X' ? t.playerX : t.playerO} ${t.wins}`
  } else if (draw) {
    message = t.draw
  } else if (mode === 'ai' && currentPlayer === 'O') {
    message = t.aiThinking
  }

  return (
    <div className="game-status">
      <span>{message}</span>
    </div>
  )
}

export default GameStatus
