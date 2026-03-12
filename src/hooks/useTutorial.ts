import { useState } from 'react'

const KEY = 'tictac-tutorial-done'

export function useTutorial() {
  const [show, setShow] = useState(() => !localStorage.getItem(KEY))
  const [step, setStep] = useState(0)
  const totalSteps = 3

  const next = () => {
    if (step < totalSteps - 1) setStep(step + 1)
    else finish()
  }

  const finish = () => {
    setShow(false)
    localStorage.setItem(KEY, '1')
  }

  return { show, step, totalSteps, next, finish }
}
