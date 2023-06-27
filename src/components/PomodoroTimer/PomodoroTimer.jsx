import { useEffect, useMemo, useState } from 'react'
import './PomodoroTimer.css'

import TimerCountdown from './TimerCountdown.jsx'

import StartButton from './StartButton.jsx'
import PauseButton from './PauseButton.jsx'
import ResetButton from './ResetButton.jsx'

import { INTERVAL } from '../../constants/timeConstants'
const nearMidnight = new Date(new Date().setHours(24, 0, 0, 0))

export default function PomodoroTimer({ running, dispatch, sessionDuration, breakDuration }) {

  const [deadline, setDeadline] = useState(new Date(Date.now() + sessionDuration))
  const parsedDeadline = useMemo(() => Date.parse(deadline), [deadline])
  const [timespan, setTimespan] = useState(new Date(parsedDeadline) - Date.now())
  const [isSession, setIsSession] = useState(true)
  const [isBreak, setIsBreak] = useState(false)
  const [sessionCounter, setSessionCounter] = useState(0)
  const [breakCounter, setBreakCounter] = useState(0)
  const [isReset, setIsReset] = useState(false)

  useEffect(() => {
    (sessionCounter !== 0) && setWithExpiry('sessions', sessionCounter, nearMidnight.getTime());
    (breakCounter !== 0) && setWithExpiry('breaks', breakCounter, nearMidnight.getTime())
  }, [sessionCounter, breakCounter])

  useEffect(() => {
    setSessionCounter(getWithExpiry('sessions'))
    setBreakCounter(getWithExpiry('breaks'))
  }, [])

  const setWithExpiry = (key, value, expireTime) => {
    const now = new Date()
    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
      value: value,
      expire: expireTime
    }
    localStorage.setItem(key, JSON.stringify(item))
  }

  const getWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key)
    if (!itemStr)
      return null
    const item = JSON.parse(itemStr)
    const now = new Date()
    // compare the expiry time of the item with the current time
    if (now > new Date(item.expire)) {
      localStorage.removeItem(key)
      return null
    }
    return item.value
  }

  useEffect(() => {
    setIsReset(false);
    dispatch({ type: 'stop_timer' });
    (isBreak) && setDeadline(new Date(Date.now() + breakDuration));
    (isSession) && setDeadline(new Date(Date.now() + sessionDuration));
  }, [isSession, isBreak, breakDuration, sessionDuration, isReset])

  useEffect(() => {
    let intervalId
    if (running && isSession) {
      intervalId = setInterval(() => {
        setTimespan((_timespan) => {
          if (_timespan > 1000) {
            return _timespan - INTERVAL
          } else {
            Notification.requestPermission()
              .then((perm => {
                if (perm === 'granted') {
                  const notification = new Notification("Session has come to the end!", {})
                  notification.addEventListener('error', e => alert('Error'))
                }
              }))
            setIsSession(false)
            setIsBreak(true)
            clearInterval(intervalId);
            setSessionCounter(sessionCounter + 1)
            return 0
          }
        })
      }, INTERVAL)
    } else if (running && isBreak) {
      intervalId = setInterval(() => {
        setTimespan((_timespan) => {
          if (_timespan > 1000) {
            return _timespan - INTERVAL
          } else {
            Notification.requestPermission()
              .then((perm => {
                if (perm === 'granted') {
                  const notification = new Notification("Break has come to the end!", {})
                  notification.addEventListener('error', e => alert('Error'))
                }
              }))
            setIsSession(true)
            setIsBreak(false)
            clearInterval(intervalId);
            setBreakCounter(breakCounter + 1)
            return 0
          }
        })
      }, INTERVAL)
    } else {
      clearInterval(intervalId)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [INTERVAL, running])

  useEffect(() => {
    setTimespan(new Date(parsedDeadline) - Date.now());
  }, [parsedDeadline]);

  const handleOnStartClick = () => {
    dispatch({ type: 'start_timer' })
  }

  const handleOnPauseClick = () => {
    dispatch({ type: 'stop_timer' })
  }

  const handleOnResetClick = () => {
    setIsReset(true)
  }

  return (
    <section className="timer pomodoro__timer">
      <h1 className='timer__title'>Focus Clock</h1>
      <p className='timer__title'>Sessions today: {sessionCounter}</p>
      <p className='timer__title'>Breaks today: {breakCounter}</p>
      <TimerCountdown
        running={running}
        time={timespan}
      />
      <section className="timer__controls">
        {!running
          ? <StartButton onStartClick={handleOnStartClick} />
          : <PauseButton onPauseClick={handleOnPauseClick} />}
        {!running && <ResetButton onResetClick={handleOnResetClick} />}
      </section>

    </section>
  )
}
