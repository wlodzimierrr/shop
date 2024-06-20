import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Context
import ShopContextProvider from "./context/ShopContext.jsx"
import OrdersContextProvider from './context/OrdersContext.jsx'
import AuthContextProvider from './context/AuthContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <OrdersContextProvider>
        <ShopContextProvider>
          <App />
        </ShopContextProvider>
      </OrdersContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
