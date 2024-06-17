import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({containerStyles}) => {
  return (
    <nav className={`${containerStyles}`}>
      <NavLink to={'/'} className={({isActive})=> isActive ? "active-link" : ""}>Home</NavLink>
      <NavLink to={'/category1'} className={({isActive})=> isActive ? "active-link" : ""}>category1</NavLink>
      <NavLink to={'/category2'} className={({isActive})=> isActive ? "active-link" : ""}>category2</NavLink>
      <NavLink to={'/category3'} className={({isActive})=> isActive ? "active-link" : ""}>category3</NavLink>
    </nav>
  )
}

export default Navbar