import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';

// Context
import { ShopContext } from '../context/ShopContext'
import { AuthContext } from '../context/AuthContext';

// Images, SVGs, Icons
import user from '../assets/user.svg'
import logoutImg from '../assets/logout.svg'
import logo from '../assets/bicycle-trail.svg'
import Navbar from './Navbar';
import { MdClose, MdMenu } from 'react-icons/md'
import { RiShoppingCart2Line } from 'react-icons/ri'

const Header = () => {
    const [menuOpened, setMenuOpened] = useState(false);
    const toggleMenu = () => setMenuOpened(!menuOpened);
    const { getTotalCartItems } = useContext(ShopContext)
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0 ) {
                // Close the menu if open when scrolling occurs
                if (menuOpened) {
                    setMenuOpened(false)
                }
            }
        };
        window.addEventListener("scroll", handleScroll);

        // Clean up the event listener when component unmounts
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [menuOpened]);

    return (
        <header className='max-padd-container w-full z-50'>
            <div className='flexBetween py-3 '>
                {/* logo */}
                <Link to={'/'} className='flex items-center gap-x-2'>
                    <img src={logo} alt='logoImg' height={50} width={50} crossOrigin="anonymous"/>
                    <span className='bold-24 hidden md:flex '>Peak Performance</span>
                </Link>
                {/* {Navbar & Buttons} */}
                <div className='flexCenter gap-x-4'>  
                    {/* {desktop navbar} */}
                    <div>
                        <Navbar containerStyles={"hidden xl:flex gap-x-5 xl:gap-x-10 medium-15 rounded-full px-2 py-1"}/> 
                    </div>
                    {/* {mobile navbar} */}
                    <div>
                        <Navbar containerStyles={`${menuOpened ? "flex items-start flex-col gap-y-12 fixed top-20 right-8 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 z-50" : "flex items-start flex-col gap-y-12 fixed top-20 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 z-50 -right-[100%]"}`}/> 
                    </div>
                    {/* {buttons} */}
                    <div className='flexBetween gap-x-3 sm:gap-x-2 bold-16'>
                        {!menuOpened ? (
                            <MdMenu className='xl:hidden cursor-pointer text-3xl hover:text-secondary' onClick={toggleMenu}/>
                        ) : (
                            <MdClose className='xl:hidden cursor-pointer text-3xl hover:text-secondary' onClick={toggleMenu} />
                        )}
                    </div>
                    <div className='flexBetween sm:gap-x-6'>
                        <NavLink to={'/cartPage'} className={'flex'}>
                            <RiShoppingCart2Line className='p-2 h-10 w-10 hover:text-secondary'/>
                        <span className='relative flexCenter w-5 h-5 rounded-full bg-secondary text-primary medium-14 -top-2 right-3'>{getTotalCartItems()}</span>
                        </NavLink>
                        {localStorage.getItem('auth-token') ? <NavLink onClick={() => {logout()}} className={'btn-secondary flexCenter gap-x-2 medium-16 rounded-xl'} >
                            <img src={logoutImg} alt="" height={19} width={19} crossOrigin="anonymous"/>
                            Logout
                        </NavLink> :
                        <NavLink to={'/login'} className={'btn-secondary flexCenter gap-x-2 medium-16 rounded-xl'} >
                            <img src={user} alt="" height={19} width={19} crossOrigin="anonymous"/>
                            Login
                        </NavLink> }
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;