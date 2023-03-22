import { MIN_TIME, MINUTE, MAX_TIME } from './TimeConstants.js'

export default function (state, action) {
  switch (action.type) {
    case 'handle_session':
      return handleSessionDuration(action.e)
    case 'add_session_time':
      return handleAddSessionTime(state)
    case 'down_session_time':
      return handleDownSessionTime(state)
  }
}

const handleSessionDuration = (e) => {
  return e.target.value
}

const handleAddSessionTime = (state) => {
  if (+state < MAX_TIME / MINUTE) {
    return (+state + 1)
  } else {
    return MAX_TIME / MINUTE
  }
}

const handleDownSessionTime = (state) => {
  console.log('MIN_TIME time:', MIN_TIME)
  if (+state > MIN_TIME / MINUTE) {
    return (+state - 1)
  } else {
    console.log("reeee");
    return (MIN_TIME / MINUTE)
  }
}
