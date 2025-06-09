import React from "react";
import Products from "./pages/Products";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import ShoppingCart from "./pages/shopping-cart/ShoppingCart";
import { CartProvider } from "./context/CartContext";
import News from "./pages/news/NEws";
import Contact from "./pages/contact/Contact";
import Footer from "./components/footer/Footer";
import FloatingSocialButtons from "./components/FloatingSocialButtons";
import LayoutProductDetail from "./pages/product-detail/LayoutProductDetail";
import ProductDetail from "./pages/product-detail/ProductDetail";
import NoPage from "./pages/NoPage";
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
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product" element={<LayoutProductDetail />}>
              <Route index element={<Products />} />
              <Route path=":slug" element={<ProductDetail />} />
            </Route>
            <Route path="*" element={<NoPage />} />
          </Routes>
          <FloatingSocialButtons />
          <Footer />
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}
