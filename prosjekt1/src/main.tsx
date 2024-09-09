import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import QuoteCard from './components/QuoteCard/QuoteCard.tsx'
import './components/QuoteCard/QuoteCard.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <QuoteCard quote="The only limit to our realization of tomorrow is our doubts of today." author="Franklin D. Roosevelt" />
  </StrictMode>,
)
