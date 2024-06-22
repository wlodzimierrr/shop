import React, { useContext } from 'react'

// Components
import CartItems from '../components/CartItems'
import { RiShoppingCart2Line } from 'react-icons/ri'

// Contexts
import { ShopContext } from '../context/ShopContext'

const Cart = () => {

  const { getTotalCartItems } = useContext(ShopContext)
  
  return (
    <div>
      {getTotalCartItems() > 0 ? (
        <CartItems />
      ) : (
        <section className="max-padd-container flexCenter flex-col bg-primary">
        <div className="w-full max-w-[666px] h-[600px] bg-primary m-auto item-center flex items-center justify-center">
          <h3 className="h3 flex items-center text-center">Your cart is empty <span className="ml-2 text-amber-500"><RiShoppingCart2Line /></span></h3>
          </div>
          </section>
      )}
    </div>
  )
}

export default Cart