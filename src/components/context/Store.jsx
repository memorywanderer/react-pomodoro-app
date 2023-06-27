import { createContext, useReducer } from "react"
import {
  MIN_TIME,
  MINUTE,
  MAX_TIME,
  DEFAULT_SESSION_TIME,
  DEFAULT_BREAK_TIME
} from '../../constants/timeConstants'

const initialState = {
  sessionTime: DEFAULT_SESSION_TIME / MINUTE,
  breakTime: DEFAULT_BREAK_TIME / MINUTE
}

export const Store = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'HANDLE_SESSION': {
      const { event } = action.payload
      if (event.target.value > MIN_TIME / MINUTE || event.target.value < MAX_TIME / MINUTE) {
        console.log('handle sesion', event.target.value)
        return {
          ...state,
          sessionTime: event.target.value
        }
      }
    }
    /*
      If session time is less than max time constant (60 min), 
      then increase session time, else return max time in minutes (60 min)
      + converts value from string to number
    */
    case 'SESSION_ADD_TIME': {
      if (+state.sessionTime < MAX_TIME / MINUTE) {
        return {
          ...state,
          sessionTime: +state.sessionTime + 1
        }
      } else {
        return {
          ...state,
          sessionTime: MAX_TIME / MINUTE
        }
      }
    }

    case 'SESSION_REMOVE_TIME': {
      /*
        If session time is more than min time constant (5 min), 
        then decrease session time, else return min time in minutes (5 min)
        + converts value from string to number
      */
      if (+state.sessionTime > MIN_TIME / MINUTE) {
        return {
          ...state,
          sessionTime: state.sessionTime - 1
        }
      } else {
        return {
          ...state,
          sessionTime: MIN_TIME / MINUTE
        }
      }
    }

    case 'HANDLE_BREAK': {
      const { event } = action.payload
      if (event.target.value > MIN_TIME / MINUTE || event.target.value < MAX_TIME / MINUTE) {
        return {
          ...state,
          breakTime: event.target.value
        }
      }
    }

    case 'BREAK_ADD_TIME': {
      if (+state.breakTime < MAX_TIME / MINUTE) {
        return {
          ...state,
          breakTime: state.breakTime - 1
        }
      } else {
        return {
          ...state,
          breakTime: MAX_TIME / MINUTE
        }
      }
    }

    case 'BREAK_REMOVE_TIME': {
      if (+state.breakTime > MIN_TIME / MINUTE) {
        return {
          ...state,
          breakTime: state.breakTime - 1
        }
      } else {
        return {
          ...state,
          breakTime: MIN_TIME / MINUTE
        }
      }
    }
  }
}

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }
  return <Store.Provider value={value}>{children}</Store.Provider>
}
