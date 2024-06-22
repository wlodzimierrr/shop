import React, { useContext } from 'react'

// Components
import OrdersTable from '../components/OrdersTable'

// Contexts
import { OrdersContext } from '../context/OrdersContext';


const Orders = () => {

  const { allOrders } = useContext(OrdersContext);
  
  return (
    <div>
      {allOrders.lentgh > 0 ? (
        <OrdersTable />
      ) : (
        <section className="max-padd-container flexCenter flex-col bg-primary">
        <div className="w-full max-w-[666px] h-[600px] bg-primary m-auto item-center flex items-center justify-center">
          <h3 className="h3 flex items-center text-center">You don't have any orders yet <span className="ml-2 text-amber-500"></span></h3>
          </div>
          </section>
      )}
    </div>
  )
}

export default Orders