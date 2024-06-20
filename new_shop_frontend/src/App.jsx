import { BrowserRouter, Route, Routes } from "react-router-dom"

// Components
import Header from "./components/Header"
import Footer from "./components/Footer"

// Pages
import Home from "./pages/Home"
import Category from "./pages/Category" 
import Product from "./pages/Product"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Checkout from "./pages/Checkout"
import Account from "./pages/Account"
import Orders from "./pages/Orders"
import GuestCheckout from "./pages/GuestCheckout"

// Utility
import ProtectedRoute from "./utility/ProtectedRoute"

export default function App() {
  return (
  <main className='text-tertiary'>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/category/:category" element={<Category />}/>
        <Route path="/product/:productId" element={<Product />}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/guestCheckout" element={<GuestCheckout/>}/>
        <Route path="/cartPage" element={<Cart />}/>
        <Route path="/login" element={<Login />}/>

        <Route path="/account" element={<ProtectedRoute element={<Account />} />} />
        <Route path="/orders" element={<ProtectedRoute element={<Orders />} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </main>
  )
}