import { StrictMode } from 'react'
if (window.Telegram?.WebApp) {
  const tg = window.Telegram.WebApp;
  tg.expand();
  tg.ready();
}
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
