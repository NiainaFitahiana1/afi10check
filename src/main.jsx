import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import TicketVerification from './TicketVerif.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TicketVerification />
  </StrictMode>,
)
