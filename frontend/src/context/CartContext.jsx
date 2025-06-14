import React, { useContext, createContext, useState, useEffect } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

function createData(productName, quantity, price, totalPrice) {
  return { productName, quantity, price, totalPrice };
}

// const rows = [
//   createData("T-Shirt", 159, 6.0, 24),
//   createData("T-Healmatk", 159, 6.0, 24),
//   createData("secondhand-make", 159, 6.0, 24),
// ];

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(()=>{
    const stored  = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
 
  const addItem = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  const deleteItem = (productId) => {
    const updated = cartItems.filter(
      (item) => item.product.id !== productId
    );
    setCartItems(updated);
  };

  const countCartItems = () => {
    return cartItems.reduce((total, item) => total + item.product.quantity, 0);
  }

  const getTotalPrice = ()=>{
    return cartItems.reduce((total,item)=>total + (item.product.price * item.product.quantity), 0);
  }

  return (
    <CartContext.Provider value={{ cartItems, addItem, deleteItem,countCartItems,getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
