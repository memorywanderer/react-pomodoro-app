import { useContext, useEffect, useReducer, useState } from 'react'
import PomodoroTimer from '../PomodoroTimer/PomodoroTimer.jsx'
import PomodoroOptions from '../PomodoroOptions/PomodoroOptions.jsx'

import './Pomodoro.css'

import {
  DEFAULT_SESSION_TIME,
  DEFAULT_BREAK_TIME,
  MIN_TIME,
  MINUTE,
  MAX_TIME
} from '../../constants/timeConstants'
import { Store } from '../context/Store.jsx'

const reducer = (state, action) => {
  switch (action.type) {
    case 'start_timer':
      return true
    case 'stop_timer':
      return false
  }
}

export default function Pomodoro() {
  const [isActive, dispatch] = useReducer(reducer, false)
  const [sessionDuration, setSessionDuration] = useState(DEFAULT_SESSION_TIME)
  const [breakDuration, setBreakDuration] = useState(DEFAULT_BREAK_TIME)
  const { state } = useContext(Store)
  const { sessionTime, breakTime } = state

  useEffect(() => {
    if (sessionTime * MINUTE <= MIN_TIME) {
      setSessionDuration(MIN_TIME)
    } else if (sessionTime * MINUTE >= MAX_TIME) {
      setSessionDuration(MAX_TIME)
    } else {
      setSessionDuration(sessionTime * MINUTE)
    }
  }, [sessionTime])

  useEffect(() => {
    if (breakTime * MINUTE <= MIN_TIME) {
      setBreakDuration(MIN_TIME)
    } else if (breakTime * MINUTE >= MAX_TIME) {
      setBreakDuration(MAX_TIME)
    } else {
      setBreakDuration(breakTime * MINUTE)
    }
  }, [breakTime])

  return (
    <>
      <section className="pomodoro">
        <PomodoroTimer
          running={isActive}
          sessionDuration={sessionDuration}
          breakDuration={breakDuration}
          dispatch={dispatch}
        />
        {!isActive && <PomodoroOptions />}
      </section>
      <div className="decoration decoration--one"></div>
      <div className="decoration decoration--two"></div>
    </>
  )
}
