import React, { createContext, useEffect, useState } from 'react'

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 301; index++) { 
    cart[index] = 0;
  }
  return cart;
}

const ShopContextProvider = (props) => {

  const [all_products, setAll_Products] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/products/allProducts`)
      .then((response) => response.json())
      .then((data) => setAll_Products(data.products))
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setError("Failed to fetch products.");
      });

    if (localStorage.getItem('auth-token')) {
      fetch(`/api/cart/getCart`, {
        method: 'GET',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => setCartItems(data.cartData))
        .catch((err) => {
          console.error("Failed to fetch cart:", err);
          setError("Failed to fetch cart.");
        });
    }
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}));
    if (localStorage.getItem('auth-token')) {
      fetch(`/api/cart/addToCart`, {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "itemId": itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => {
          console.error("Failed to add to cart:", err);
          setError("Failed to add to cart.");
        });
    }
  } 

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}));
    if (localStorage.getItem('auth-token')) {
      fetch(`/api/cart/removeFromCart`, {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "itemId": itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => {
          console.error("Failed to remove from cart:", err);
          setError("Failed to remove from cart.");
        });
    }
  } 

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_products.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  }

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  }
  
  const contextValue = {
    all_products,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    error, 
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
      {error && <div className="error">{error}</div>} 
    </ShopContext.Provider>
  );
}

export default ShopContextProvider;
