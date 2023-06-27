import React, { useContext } from 'react'
import { Store } from '../context/Store'

export default function PomodoroOptionsInput({ type }) {
  const { state, dispatch } = useContext(Store)
  const { sessionTime, breakTime } = state

  function onSessionChange(event) {
    dispatch({ type: 'HANDLE_SESSION', payload: { event } })
  }

  function onBreakChange(event) {
    dispatch({ type: 'HANDLE_BREAK', payload: { event } })
  }

  return (
    <div className='input options__input'>
      <button
        onClick={
          (type === 'session')
            ? () => dispatch({ type: 'SESSION_ADD_TIME' })
            : () => dispatch({ type: 'BREAK_ADD_TIME' })}
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
            ? sessionTime
            : breakTime
        }
        type="number"
        className="input__field" />
      <button
        onClick={
          (type === 'session')
            ? () => dispatch({ type: 'SESSION_REMOVE_TIME' })
            : () => dispatch({ type: 'BREAK_REMOVE_TIME' })}
        className="btn-down input__btn-down"
      >
        <i className="fas fa-angle-double-down"></i>
      </button>
    </div>
  )
}
