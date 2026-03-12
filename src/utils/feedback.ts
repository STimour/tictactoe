let audioCtx: AudioContext | null = null

function getCtx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext()
  return audioCtx
}

function tone(freq: number, dur: number, type: OscillatorType = 'sine', vol = 0.08, delay = 0) {
  try {
    const ctx = getCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = freq
    osc.type = type
    gain.gain.value = vol
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + dur)
    osc.start(ctx.currentTime + delay)
    osc.stop(ctx.currentTime + delay + dur)
  } catch { /* silent */ }
}

export const playTap = () => tone(600, 0.08)

export const playWin = () => {
  tone(523, 0.15, 'sine', 0.1, 0)
  tone(659, 0.15, 'sine', 0.1, 0.15)
  tone(784, 0.2, 'sine', 0.12, 0.3)
}

export const playLose = () => {
  tone(400, 0.2, 'sawtooth', 0.06, 0)
  tone(350, 0.2, 'sawtooth', 0.06, 0.2)
  tone(300, 0.25, 'sawtooth', 0.06, 0.4)
}

export const playDraw = () => tone(440, 0.35, 'triangle', 0.06)

export function vibrate(pattern: number | number[] = 15) {
  try { navigator?.vibrate?.(pattern) } catch { /* silent */ }
}

export const vibrateWin = () => vibrate([50, 40, 50, 40, 100])
export const vibrateLose = () => vibrate([200])
