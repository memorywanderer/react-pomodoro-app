import { MIN_TIME, MINUTE, MAX_TIME } from './TimeConstants.js'

export default function (state, action) {
  switch (action.type) {
    case 'handle_break':
      return handleBreakDuration(action.e)
    case 'add_break_time':
      return handleAddBreakTime(state)
    case 'down_break_time':
      return handleDownBreakTime(state)
  }
}

const handleBreakDuration = (e) => {
  return e.target.value
}

const handleAddBreakTime = (state) => {
  if (state < MAX_TIME / MINUTE) {
    return (+state + 1)
  } else {
    return (MAX_TIME / MINUTE)
  }
}

const handleDownBreakTime = (state) => {
  if (state > MIN_TIME / MINUTE) {
    return (+state - 1)
  } else {
    return (MIN_TIME / MINUTE)
  }
}