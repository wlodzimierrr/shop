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

export default function App() {
  return (
  <main className='text-tertiary'>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/category/:category" element={<Category />}/>
        <Route path="/product/:productId" element={<Product />}/>
        <Route path="/cart-page" element={<Cart />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  </main>
  )
}