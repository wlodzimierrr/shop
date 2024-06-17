import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Components
import SideBar from '../components/Sidebar'
import AddProduct from '../components/AddProduct'
import ListProduct from '../components/ListProduct'

const Admin = () => {
  return (
    <div className='lg:flex'>
        <SideBar />
        <Routes>
            <Route path='/addproduct' element={<AddProduct />}/>
            <Route path='/listproduct' element={<ListProduct />}/>
        </Routes>
    </div>
  )
}

export default Admin;