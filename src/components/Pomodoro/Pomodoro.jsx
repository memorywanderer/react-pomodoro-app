import { useEffect, useMemo, useReducer, useState } from 'react'
import PomodoroTimer from '..//PomodoroTimer/PomodoroTimer.jsx'
import PomodoroOptions from '../PomodoroOptions/PomodoroOptions.jsx'

import './Pomodoro.css'

import sessionReducer from '../SessionReducer'
import breakReducer from '../BreakReducer.js'

import { DEFAULT_SESSION_TIME, DEFAULT_BREAK_TIME, MIN_TIME, MINUTE, MAX_TIME } from '../TimeConstants.js'
import { PomodoroContext } from '../context/PomodoroContext.js'

const reducer = (state, action) => {
  switch (action.type) {
    case 'start_timer':
      return true
    case 'stop_timer':
      return false
  }
}

export default function Pomodoro() {
  const [state, dispatch] = useReducer(reducer, false)
  const [sessionDuration, setSessionDuration] = useState(DEFAULT_SESSION_TIME)
  const [breakDuration, setBreakDuration] = useState(DEFAULT_BREAK_TIME)
  const [sessionValue, sessionDispatch] = useReducer(sessionReducer, DEFAULT_SESSION_TIME / MINUTE)
  const [breakValue, breakDispatch] = useReducer(breakReducer, DEFAULT_BREAK_TIME / MINUTE)

  useEffect(() => {
    if (sessionValue * MINUTE <= MIN_TIME) {
      setSessionDuration(MIN_TIME)
    } else if (sessionValue * MINUTE >= MAX_TIME) {
      setSessionDuration(MAX_TIME)
    } else {
      setSessionDuration(sessionValue * MINUTE)
    }
  }, [sessionValue])

  useEffect(() => {
    if (breakValue * MINUTE <= MIN_TIME) {
      setBreakDuration(MIN_TIME)
    } else if (breakValue * MINUTE >= MAX_TIME) {
      setBreakDuration(MAX_TIME)
    } else {
      setBreakDuration(breakValue * MINUTE)
    }
  }, [breakValue])

  return (
    <>
      <div className="pomodoro">
        <PomodoroTimer
          running={state}
          sessionDuration={sessionDuration}
          breakDuration={breakDuration}
          dispatch={dispatch}
        />
        {!state &&
          <PomodoroContext.Provider value={{ sessionDispatch, breakDispatch, sessionValue, breakValue }}>
            <PomodoroOptions />
          </PomodoroContext.Provider>}
      </div>
      <div className="decoration decoration--one"></div>
      <div className="decoration decoration--two"></div>
    </>
  )
}
