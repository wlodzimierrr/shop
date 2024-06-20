import React, { createContext, useEffect, useState } from 'react';

export const OrdersContext = createContext(null);

const OrdersContextProvider = (props) => {

    const [allOrders, setAllOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('auth-token');
                if (!token) {
                    return;
                }

                const response = await fetch('/api/orders/getOrders', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'auth-token': token,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const data = await response.json();
                setAllOrders(data.ordersData);
                
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);
    
    const contextValue = { allOrders };

    return (
        <OrdersContext.Provider value={contextValue}>
            {props.children}
        </OrdersContext.Provider>
    );
};

export default OrdersContextProvider;