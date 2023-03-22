import { useEffect } from "react"


export default function TimerCountdown({ time }) {

  return (
    <div className='countdown timer__countdown'>
      <span className="countdown__minutes">{("0" + Math.floor(time / 60000) % 60).slice(-2)}:</span>
      <span className="countdown__seconds">{("0" + Math.floor(time / 1000) % 60).slice(-2)}</span>
    </div>
  )
}
