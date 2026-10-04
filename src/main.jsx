import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MoviesContextProvider from './Contaxts/MoveiApi/MoveApi.jsx'
import TVShowsContextProvider from './Contaxts/MoveiApi/TVShowsContext.jsx'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
createRoot(document.getElementById('root')).render(
  <TVShowsContextProvider>
    <MoviesContextProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </MoviesContextProvider>
  </TVShowsContextProvider>
)
  
