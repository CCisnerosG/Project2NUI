import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { PokemonProvider } from './context/pokemon-context.tsx'
import { CountriesProvider } from './context/countries-context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter >
      <PokemonProvider>
        <CountriesProvider>
          {/* <NextUIProvider>
            <main className="purple-dark text-foreground bg-background"> */}
          <App />
          {/* </main>
          </NextUIProvider> */}
        </CountriesProvider>
      </PokemonProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
