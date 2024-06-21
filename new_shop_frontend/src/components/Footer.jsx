import React from 'react'
import { Link } from 'react-router-dom'

// Components
import Navbar from './Navbar'

// Icons and SVGs
import SocialIcons from './SocialIcons'
import logo from '../assets/footerlog.svg'

const Footer = () => {
  return (
    <footer className='max-padd-container bg-tertiary py-6'>
      <div className='flexCenter flex-col gap-y-4'>
        {/* {Logo} */}
        <Link to={'/'} className='flex items-center gap-x-2'>
          <img src={logo} alt='logoImg' height={50} width={50} className='' crossOrigin="anonymous"/>
          <span className='bold-24 hidden xs:flex text-white'>Peak Performance</span>
        </Link>
        {/* {Nav} */}
        <div className='py-4'>
          <Navbar containerStyles={"flex gap-x-5 xl:gap-x-10 text-white medium-15 rounded-full px-2 py-1"}/> 
        </div>
        <SocialIcons />
        <hr className='h-[1px] w-2/3 my-3'/>
        <div className='text-white'>Made by <a className='hover:text-amber-400 hover:underline' href='https://github.com/wlodzimierrr'>Wlodzimierrr</a></div>
      </div>
    </footer>
  )
}

export default Footer