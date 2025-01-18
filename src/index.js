import {BrowserRouter} from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import MoodTrackerProvider from './context/MoodTrackerContext'

ReactDOM.render(
  <React.StrictMode>
    <MoodTrackerProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MoodTrackerProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
