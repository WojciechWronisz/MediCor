import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import './motion.css'
import App from './App.tsx'
import { I18nProvider } from './i18n/I18nContext'
import { ThemeProvider } from './theme/ThemeContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <I18nProvider>
        <App />
        <Analytics />
      </I18nProvider>
    </ThemeProvider>
  </StrictMode>,
)
