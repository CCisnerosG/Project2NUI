import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { BrowserRouter } from 'react-router-dom'
import { PokemonProvider } from './context/pokemon-context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <NextUIProvider>
        <PokemonProvider>
          <App />
        </PokemonProvider>
      </NextUIProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
