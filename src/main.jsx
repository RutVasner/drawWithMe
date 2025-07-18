import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { WordsProvider } from './context/WordsContext.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Trivia from './component/Trivia.jsx'
import "./style.css"
import '@fontsource/noto-sans-hebrew';
import '@fontsource/noto-serif-hebrew';
import '@fontsource/noto-rashi-hebrew';
import '@fontsource/ibm-plex-sans-hebrew';
import '@fontsource/playpen-sans-hebrew';
import '@fontsource/solitreo';
createRoot(document.getElementById('root')).render(
    <WordsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/trivia" element={<Trivia />} />
        </Routes>
      </BrowserRouter>
    </WordsProvider>
)
