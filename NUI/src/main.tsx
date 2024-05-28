import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { PokemonProvider } from './context/pokemon-context.tsx'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter >
      <PokemonProvider>
        <PayPalScriptProvider
          options={{
            "client-id": "Af6MCEKWOYClBg4tTKgQg1kilC0-rBnoDh1O7qvFZUSZdpg9e1Ov4h8U3C8nvHyIip--cBjRKC-tCDFr"
          }}
        >
          {/* <NextUIProvider>
            <main className="purple-dark text-foreground bg-background"> */}
          <App />
          {/* </main>
          </NextUIProvider> */}
        </PayPalScriptProvider>
      </PokemonProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
