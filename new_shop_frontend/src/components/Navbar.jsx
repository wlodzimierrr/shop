import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({containerStyles}) => {
  
  return (
    <nav className={`${containerStyles}`}>
      {localStorage.getItem('auth-token') ?
        <NavLink to={'/account'} className={({isActive})=> isActive ? "active-link" : ""}>Account</NavLink>
      : 
      <></>
      }
      <NavLink to={'/'} className={({isActive})=> isActive ? "active-link" : ""}>Home</NavLink>
      <NavLink to={'/category/MountainBikes'} className={({isActive})=> isActive ? "active-link" : ""}>Mountain Bikes</NavLink>
      <NavLink to={'/category/ElectricBikes'} className={({isActive})=> isActive ? "active-link" : ""}>Electric Bikes</NavLink>
      <NavLink to={'/category/RoadBikes'} className={({isActive})=> isActive ? "active-link" : ""}>Road Bikes</NavLink>
    </nav>
  )
}

export default Navbar