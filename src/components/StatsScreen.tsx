import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { loadStats, resetAllStats, allAchievements } from '../utils/stats'
import ConfirmDialog from './ConfirmDialog'

type Props = {
  onBack: () => void
}

const StatsScreen = ({ onBack }: Props) => {
  const { t } = useLanguage()
  const [stats, setStats] = useState(loadStats)
  const [showConfirm, setShowConfirm] = useState(false)

  const winRate = stats.totalPlayed > 0 ? Math.round((stats.totalWon / stats.totalPlayed) * 100) : 0

  const handleReset = () => {
    resetAllStats()
    setStats(loadStats())
    setShowConfirm(false)
  }

  return (
    <div className="screen stats-screen">
      <header className="screen-header">
        <button className="btn-icon" onClick={onBack}>←</button>
        <h1>{t.statsTitle}</h1>
      </header>

      {stats.totalPlayed === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📊</span>
          <p>{t.noStats}</p>
        </div>
      ) : (
        <div className="stats-content">
          <div className="stats-grid">
            <div className="stat-card"><span className="stat-val">{stats.totalPlayed}</span><span className="stat-lbl">{t.gamesPlayed}</span></div>
            <div className="stat-card stat-win"><span className="stat-val">{stats.totalWon}</span><span className="stat-lbl">{t.gamesWon}</span></div>
            <div className="stat-card stat-lose"><span className="stat-val">{stats.totalLost}</span><span className="stat-lbl">{t.gamesLost}</span></div>
            <div className="stat-card"><span className="stat-val">{stats.totalDraw}</span><span className="stat-lbl">{t.gamesDraw}</span></div>
          </div>

          <div className="progress-bar-wrap">
            <div className="progress-bar"><div className="progress-fill" style={{ width: `${winRate}%` }} /></div>
            <span className="progress-label">{t.winRate}: {winRate}%</span>
          </div>

          <div className="streaks">
            <div className="streak-card"><span className="streak-ico">🔥</span><span className="streak-lbl">{t.currentStreak}</span><span className="streak-val">{stats.currentStreak}</span></div>
            <div className="streak-card"><span className="streak-ico">⭐</span><span className="streak-lbl">{t.bestStreak}</span><span className="streak-val">{stats.bestStreak}</span></div>
          </div>

          <h2 className="section-title">{t.achievementsTitle}</h2>
          <div className="ach-list">
            {allAchievements.map((ach) => {
              const unlocked = stats.achievements.includes(ach.id)
              return (
                <div key={ach.id} className={`ach-card${unlocked ? ' ach-unlocked' : ' ach-locked'}`}>
                  <span className="ach-icon">{ach.icon}</span>
                  <div className="ach-info">
                    <span className="ach-name">{(t as Record<string, unknown>)[ach.titleKey] as string}</span>
                    <span className="ach-desc">{(t as Record<string, unknown>)[ach.descKey] as string}</span>
                  </div>
                  {unlocked && <span className="ach-check">✓</span>}
                </div>
              )
            })}
          </div>

          <button className="btn btn-danger" onClick={() => setShowConfirm(true)}><span className="btn-ico">🗑️</span>{t.resetStats}</button>
        </div>
      )}

      {showConfirm && <ConfirmDialog message={t.resetStatsConfirm} onConfirm={handleReset} onCancel={() => setShowConfirm(false)} />}
    </div>
  )
}

export default StatsScreen
