import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type AnimSpeed = 'slow' | 'normal' | 'fast'
export type FontSize = 'small' | 'medium' | 'large'

interface SettingsState {
  sounds: boolean
  vibrations: boolean
  animSpeed: AnimSpeed
  fontSize: FontSize
  lastMode: 'pvp' | 'ai' | null
}

interface SettingsContextType extends SettingsState {
  setSounds: (v: boolean) => void
  setVibrations: (v: boolean) => void
  setAnimSpeed: (v: AnimSpeed) => void
  setFontSize: (v: FontSize) => void
  setLastMode: (v: 'pvp' | 'ai') => void
}

const defaults: SettingsState = {
  sounds: true,
  vibrations: true,
  animSpeed: 'normal',
  fontSize: 'medium',
  lastMode: null,
}

function load(): SettingsState {
  try {
    const raw = localStorage.getItem('tictac-settings')
    if (raw) return { ...defaults, ...JSON.parse(raw) }
  } catch { /* empty */ }
  return { ...defaults }
}

function save(s: SettingsState) {
  localStorage.setItem('tictac-settings', JSON.stringify(s))
}

const SettingsContext = createContext<SettingsContextType>({
  ...defaults,
  setSounds: () => {},
  setVibrations: () => {},
  setAnimSpeed: () => {},
  setFontSize: () => {},
  setLastMode: () => {},
})

export const useSettings = () => useContext(SettingsContext)

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<SettingsState>(load)

  const update = (patch: Partial<SettingsState>) => {
    setState((prev) => {
      const next = { ...prev, ...patch }
      save(next)
      return next
    })
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-fontsize', state.fontSize)
    const speed =
      state.animSpeed === 'slow' ? '0.5s' : state.animSpeed === 'fast' ? '0.12s' : '0.25s'
    document.documentElement.style.setProperty('--anim-speed', speed)
  }, [state.fontSize, state.animSpeed])

  return (
    <SettingsContext.Provider
      value={{
        ...state,
        setSounds: (v) => update({ sounds: v }),
        setVibrations: (v) => update({ vibrations: v }),
        setAnimSpeed: (v) => update({ animSpeed: v }),
        setFontSize: (v) => update({ fontSize: v }),
        setLastMode: (v) => update({ lastMode: v }),
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}
