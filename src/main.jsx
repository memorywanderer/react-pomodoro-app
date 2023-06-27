import React from 'react'
import ReactDOM from 'react-dom/client'
import Pomodoro from './components/Pomodoro/Pomodoro.jsx'
import './index.css'
import { StoreProvider } from './components/context/Store.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <StoreProvider>
      <Pomodoro />
    </StoreProvider>
  </>,
)
