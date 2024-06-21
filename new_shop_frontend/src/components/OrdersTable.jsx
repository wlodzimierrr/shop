import React, { useContext } from 'react';

// Contexts
import { ShopContext } from '../context/ShopContext';
import { OrdersContext } from '../context/OrdersContext';

const OrdersTable = () => {
  
  const { allOrders } = useContext(OrdersContext);
  const { all_products } = useContext(ShopContext);

  if (!allOrders || !all_products) {
    return <div>Loading...</div>;
  }

  return (
    <section className='max-padd-container bg-primary rounded-3xl'>
      <div className='py-10  h-[600px]'>
        <table className='w-full mx-auto'>
          <thead>
            <tr className='border border-tertiary/90 bg-tertiary/90 text-white regular-16 sm:regular-18 text-start py-12'>
              <th className='p-1 py-2'>Order Number</th>
              <th className='p-1 py-2'>Products</th>
              <th className='p-1 py-2'>Name</th>
              <th className='p-1 py-2'>Price</th>
              <th className='p-1 py-2'>Quantity</th>
              <th className='p-1 py-2'>Total</th>
            </tr>
          </thead>
          <tbody className='border border-slate-900/20'>
            {allOrders.map((order) => (
              <React.Fragment key={order.orderId}>
                {order.cart.map((item) => {
                  const product = all_products.find((product) => product.id === item.id);
                  if (product) {
                    return (
                      <tr key={item.id} className='border-b border-slate-900/20 text-gray-30 p-6 medium-14 text-center'>
                        <td><div className='line-clamp-3'>{order.orderId}</div></td>
                        <td className='flex items-end justify-center'>
                          <img src={product.image} alt="prdctImg" height={55} width={55} className='rounded-lg ring-1 ring-slate-900/5 m-3 p-1' crossOrigin="anonymous"/>
                        </td>
                        <td><div className='line-clamp-3'>{product.name}</div></td>
                        <td>£{product.new_price}</td>
                        <td className='w-16 h-16 bg-white'>{item.quantity}</td>
                        <td>£{product.new_price * item.quantity}</td>
                      </tr>
                    );
                  }
                  return null;
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default OrdersTable;
