import React from "react";
import Products from "./pages/Products";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import ShoppingCart from "./pages/shopping-cart/ShoppingCart";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<ShoppingCart />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}
