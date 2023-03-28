import 'antd/dist/antd.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './context/auth'
import { CartProvider } from './context/cart'
import { SearchProvider } from './context/search'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
        <App />
        </CartProvider>
      </SearchProvider>
    </AuthProvider>
  </React.StrictMode>,
)
