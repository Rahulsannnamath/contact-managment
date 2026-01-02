import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'

// Apply theme immediately before React renders to prevent flash
const savedTheme = localStorage.getItem('theme');
// Default to dark if no preference saved
const initialTheme = savedTheme ? savedTheme : 'dark';
document.documentElement.setAttribute('data-bs-theme', initialTheme);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
