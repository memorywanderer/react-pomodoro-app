import React, { useContext } from 'react'
import { PomodoroContext } from '../context/PomodoroContext'

export default function PomodoroOptionsInput({ type }) {

  const { sessionDispatch, breakDispatch, sessionValue, breakValue } = useContext(PomodoroContext)

  function onSessionChange(e) {
    sessionDispatch({ type: 'handle_session', e })
  }

  function onBreakChange(e) {
    breakDispatch({ type: 'handle_break', e })
  }

  return (
    <div className='input options__input'>
      <button
        onClick={
          (type === 'session')
            ? () => sessionDispatch({ type: 'add_session_time' })
            : () => breakDispatch({ type: 'add_break_time' })}
        className="btn-up input__btn-up"
      >
        <i className="fas fa-angle-double-up"></i>
      </button>
      <span className="input__title">Set {type}</span>
      <input
        onChange={
          (type === 'session')
            ? onSessionChange
            : onBreakChange}
        value={
          (type === 'session')
            ? sessionValue
            : breakValue
        }
        type="number"
        className="input__field" />
      <button
        onClick={
          (type === 'session')
            ? () => sessionDispatch({ type: 'down_session_time' })
            : () => breakDispatch({ type: 'down_break_time' })}
        className="btn-down input__btn-down"
      >
        <i className="fas fa-angle-double-down"></i>
      </button>
    </div>
  )
}
