import React, { useContext, useState, useEffect } from 'react';
import data from './data';

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [cart, setCart] = useState(data);
  const [total, setTotal] = useState({
    amount: 0,
    price: 0,
  });
  const clearCart = () => {
    setCart([]);
  };
  const increaseItem = (id) => {
    const newCart = cart.map((cartItem) => {
      if (cartItem.id === id) {
        cartItem.amount++;
      }
      return cartItem;
    });
    setCart(newCart);
    const totalPrice = getTotal();
    return totalPrice;
  };
  const decreaseItem = (id) => {
    const newCart = cart
      .map((cartItem) => {
        if (cartItem.id === id) {
          return { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount > 0);
    setCart(newCart);
  };
  const removeItem = (id) => {
    const newCart = cart.filter((cartItem) => cartItem.id !== id);
    setCart(newCart);
  };
  const getTotal = () => {
    cart.reduce(
      (total, cartItem) => {
        let price = cartItem.amount * cartItem.price;
        total.price += price;
        total.price = parseFloat(total.price.toFixed(2));
        total.amount += cartItem.amount;
        setTotal(total);
        return total;
      },
      {
        amount: 0,
        price: 0,
      }
    );
  };
  useEffect(() => {
    getTotal();
  }, [cart]);
  return (
    <AppContext.Provider
      value={{
        cart,
        total,
        clearCart,
        increaseItem,
        decreaseItem,
        removeItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };
