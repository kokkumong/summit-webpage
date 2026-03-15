import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const rootEl = document.getElementById('root')
if (!rootEl) {
  document.body.innerHTML = '<p style="padding:2rem;color:#e2e8f0;background:linear-gradient(135deg,#0a0a1a,#0f0f2a);">#root 요소를 찾을 수 없습니다.</p>'
} else {
  createRoot(rootEl).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
