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
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = (item) => {
    if (item.product.is_active === 0) {
      alert("Sản phẩm đã hết");
      return;
    }

    const itemAddToCart = {
      id: item.product.id,
      product_name: item.product.product_name,
      price: item.product.price,
      is_active: item.product.is_active,
      image: item.product.image,
      quantity: 1,
    };

    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(
        (cartItem) => cartItem.id === itemAddToCart.id
      );

      if (existingItem) {
        // Map tạo mảng mới, không mutate
        return prevCartItems.map((cartItem) =>
          cartItem.id === itemAddToCart.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...prevCartItems, itemAddToCart];
    });
  };

  const deleteItem = (productId) => {
    const updated = cartItems.filter((item) => item.id !== productId);
    setCartItems(updated);
  };

  const countCartItems = () => {
    return cartItems.reduce((total, item) => total + (item.quantity), 0);
  };
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

const clearCart = () => {
  setCartItems([]); // Xóa hết sản phẩm trong giỏ hàng
  localStorage.removeItem("cartItems"); // Nếu có lưu localStorage thì xóa luôn
};

  return (
    <CartContext.Provider
      value={{ cartItems, addItem, deleteItem, countCartItems, getTotalPrice,clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
