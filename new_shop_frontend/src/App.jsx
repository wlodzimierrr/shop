import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'

// Components
import Header from "./components/Header"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"


// Pages
import Home from "./pages/Home"
import Category from "./pages/Category" 
import Product from "./pages/Product"


export default function App() {
  return (
  <main className='text-tertiary'>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/category" element={<Category />}/>
        <Route path="/category" element={<Category />}/>
        <Route path="/category" element={<Category />}/>
        <Route path="/product" element={<Product />}>
          <Route path=":productId" element={<Product />}/>
        </Route>
        {/* <Route path="/cart-page" element={<Cart />}/>
        <Route path="/login" element={<Login />}/> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  </main>
  )
}