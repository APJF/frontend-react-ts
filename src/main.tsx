// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App'
import './app/globals.css' 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> {/* <--- Đặt BrowserRouter ở đây */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)