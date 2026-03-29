import { useLanguage } from '../i18n/LanguageContext'
import type { PlayerMark } from '../utils/gameLogic'

type Props = {
  winner: PlayerMark | null
  mode: 'pvp' | 'ai'
  playerSymbol: 'X' | 'O'
  seriesWinner: PlayerMark | null
  onPlayAgain: () => void
  onMenu: () => void
}

const GameEndScreen = ({ winner, mode, playerSymbol, seriesWinner, onPlayAgain, onMenu }: Props) => {
  const { t } = useLanguage()

  let emoji = '🤝'
  let title: string = t.drawResult
  let subtitle: string = t.nobodyWins

  if (winner) {
    if (mode === 'ai') {
      if (winner === playerSymbol) { emoji = '🎉'; title = t.victory; subtitle = t.youWin }
      else { emoji = '😔'; title = t.defeat; subtitle = t.youLose }
    } else {
      emoji = '🏆'
      title = `${winner === 'X' ? t.playerX : t.playerO} ${t.wins}`
      subtitle = ''
    }
  }

  if (seriesWinner) {
    emoji = '👑'
    title = `${seriesWinner === 'X' ? t.playerX : t.playerO} ${t.seriesWin}`
    subtitle = ''
  }

  return (
    <div className="overlay">
      <div className="dialog end-card">
        <div className="end-emoji">{emoji}</div>
        <h2 className="end-title">{title}</h2>
        {subtitle && <p className="end-subtitle">{subtitle}</p>}
        <div className="dialog-actions end-actions">
          <button className="btn btn-primary btn-lg" onClick={onPlayAgain}>
            {seriesWinner
              ? <><span className="btn-ico">🔄</span>{t.resetScore}</>
              : <><span className="btn-ico">▶️</span>{t.playAgain}</>
            }
          </button>
          <button className="btn btn-ghost" onClick={onMenu}><span className="btn-ico">🏠</span>{t.backToMenu}</button>
        </div>
      </div>
    </div>
  )
}

export default GameEndScreen
