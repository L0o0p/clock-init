import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
try {
  Loader?.postMessage(JSON.stringify({ loading: true }))
} catch (e) {
  console.error(e)
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
