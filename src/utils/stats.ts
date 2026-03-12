export interface GameStats {
  totalPlayed: number
  totalWon: number
  totalLost: number
  totalDraw: number
  currentStreak: number
  bestStreak: number
  byMode: Record<'pvp' | 'ai', { played: number; won: number; lost: number; draw: number }>
  byGrid: Record<'3' | '4' | '5', { played: number; won: number; lost: number; draw: number }>
  achievements: string[]
}

const empty = () => ({ played: 0, won: 0, lost: 0, draw: 0 })

const defaultStats = (): GameStats => ({
  totalPlayed: 0, totalWon: 0, totalLost: 0, totalDraw: 0,
  currentStreak: 0, bestStreak: 0,
  byMode: { pvp: empty(), ai: empty() },
  byGrid: { '3': empty(), '4': empty(), '5': empty() },
  achievements: [],
})

export function loadStats(): GameStats {
  try {
    const raw = localStorage.getItem('tictac-stats')
    if (raw) return { ...defaultStats(), ...JSON.parse(raw) }
  } catch { /* empty */ }
  return defaultStats()
}

export function saveStats(s: GameStats) {
  localStorage.setItem('tictac-stats', JSON.stringify(s))
}

export function resetAllStats() {
  localStorage.removeItem('tictac-stats')
}

export type GameResult = 'win' | 'lose' | 'draw'

export function recordGame(
  result: GameResult,
  mode: 'pvp' | 'ai',
  gridSize: 3 | 4 | 5,
  difficulty?: 'easy' | 'medium' | 'hard',
): { stats: GameStats; newAchievements: string[] } {
  const s = loadStats()
  const gk = String(gridSize) as '3' | '4' | '5'

  s.totalPlayed++
  s.byMode[mode].played++
  s.byGrid[gk].played++

  if (result === 'win') {
    s.totalWon++; s.byMode[mode].won++; s.byGrid[gk].won++
    s.currentStreak++
    if (s.currentStreak > s.bestStreak) s.bestStreak = s.currentStreak
  } else if (result === 'lose') {
    s.totalLost++; s.byMode[mode].lost++; s.byGrid[gk].lost++
    s.currentStreak = 0
  } else {
    s.totalDraw++; s.byMode[mode].draw++; s.byGrid[gk].draw++
    // streak not reset on draw
  }

  const newAch: string[] = []
  const check = (id: string) => { if (!s.achievements.includes(id)) { s.achievements.push(id); newAch.push(id) } }

  if (s.totalWon >= 1) check('firstWin')
  if (s.currentStreak >= 3) check('streak3')
  if (s.currentStreak >= 5) check('streak5')
  if (result === 'win' && mode === 'ai' && difficulty === 'hard') check('beatHardAI')
  if (result === 'win' && gridSize === 5) check('win5x5')
  if (result === 'win' && gridSize === 4) check('win4x4')
  if (s.totalPlayed >= 10) check('play10')
  if (s.totalPlayed >= 50) check('play50')

  saveStats(s)
  return { stats: s, newAchievements: newAch }
}

export interface AchievementDef {
  id: string
  titleKey: string
  descKey: string
  icon: string
}

export const allAchievements: AchievementDef[] = [
  { id: 'firstWin', titleKey: 'achFirstWin', descKey: 'achFirstWinDesc', icon: '🏆' },
  { id: 'streak3', titleKey: 'achStreak3', descKey: 'achStreak3Desc', icon: '🔥' },
  { id: 'streak5', titleKey: 'achStreak5', descKey: 'achStreak5Desc', icon: '⚡' },
  { id: 'beatHardAI', titleKey: 'achBeatHardAI', descKey: 'achBeatHardAIDesc', icon: '🤖' },
  { id: 'win5x5', titleKey: 'achWin5x5', descKey: 'achWin5x5Desc', icon: '📐' },
  { id: 'win4x4', titleKey: 'achWin4x4', descKey: 'achWin4x4Desc', icon: '📏' },
  { id: 'play10', titleKey: 'achPlay10', descKey: 'achPlay10Desc', icon: '🎮' },
  { id: 'play50', titleKey: 'achPlay50', descKey: 'achPlay50Desc', icon: '🎖️' },
  { id: 'seriesWin', titleKey: 'achSeriesWin', descKey: 'achSeriesWinDesc', icon: '👑' },
  { id: 'perfectSeries', titleKey: 'achPerfectSeries', descKey: 'achPerfectSeriesDesc', icon: '💎' },
]
