import { useEffect } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { allAchievements } from '../utils/stats'

type Props = {
  ids: string[]
  onDismiss: () => void
}

const AchievementToast = ({ ids, onDismiss }: Props) => {
  const { t } = useLanguage()

  useEffect(() => {
    if (ids.length > 0) {
      const timer = setTimeout(onDismiss, 3500)
      return () => clearTimeout(timer)
    }
  }, [ids, onDismiss])

  if (!ids.length) return null

  return (
    <div className="toast-container">
      {ids.map((id) => {
        const ach = allAchievements.find((a) => a.id === id)
        if (!ach) return null
        return (
          <div key={id} className="toast">
            <span className="toast-icon">{ach.icon}</span>
            <div className="toast-text">
              <span className="toast-label">{t.unlocked}</span>
              <span className="toast-title">{(t as Record<string, unknown>)[ach.titleKey] as string}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default AchievementToast
