import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './marketing/styles/marketing.css'
import { captureAttribution } from './marketing/lib/attribution'
import { capturePrerenderSnapshot } from './marketing/lib/prerenderSnapshot'

// Marketing site defaults to light, never flash OS dark / body #000 on refresh
const initializeTheme = () => {
  const storedTheme = localStorage.getItem('theme')
  const theme = storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : 'light'
  document.documentElement.classList.remove('light', 'dark')
  document.documentElement.classList.add(theme)
}

initializeTheme()
captureAttribution()

const rootEl = document.getElementById('root')!
// Before createRoot wipes it: AppErrorBoundary restores this if a lazy chunk fails.
capturePrerenderSnapshot(rootEl)

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
