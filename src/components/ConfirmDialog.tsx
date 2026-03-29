import { useLanguage } from '../i18n/LanguageContext'

type Props = {
  message: string
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmDialog = ({ message, onConfirm, onCancel }: Props) => {
  const { t } = useLanguage()
  return (
    <div className="overlay" onClick={onCancel}>
      <div className="dialog confirm-card" onClick={(e) => e.stopPropagation()}>
        <p className="confirm-message">{message}</p>
        <div className="dialog-actions">
          <button className="btn btn-ghost" onClick={onCancel}><span className="btn-ico">✖️</span>{t.cancel}</button>
          <button className="btn btn-primary" onClick={onConfirm}><span className="btn-ico">✅</span>{t.confirm}</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
