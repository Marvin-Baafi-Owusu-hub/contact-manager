import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {AuthProvider} from './context/AuthContext'
import {ContactProvider} from './context/ContactContext'
import './index.css'
import App from './App.jsx' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
