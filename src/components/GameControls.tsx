import { useLanguage } from '../i18n/LanguageContext'

type GameControlsProps = {
  onResetGame: () => void
  onResetScore: () => void
}

const GameControls = ({ onResetGame, onResetScore }: GameControlsProps) => {
  const { t } = useLanguage()
  return (
    <div className="game-controls">
      <button className="control-button" onClick={onResetGame}>
        {t.resetRound}
      </button>
      <button className="control-button ghost" onClick={onResetScore}>
        {t.resetScore}
      </button>
    </div>
  )
}

export default GameControls
