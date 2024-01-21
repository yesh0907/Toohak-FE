import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // Uncomment StrictMode if you don't want app to re-render twice
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
