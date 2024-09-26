import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthenticationContextProvider } from './services/Authentication.context.tsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthenticationContextProvider>
      <App />
    </AuthenticationContextProvider>
  </StrictMode>,
)
