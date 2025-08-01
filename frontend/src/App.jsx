import React from "react";
import Products from "./pages/Products";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import ShoppingCart from "./pages/shopping-cart/ShoppingCart";
import { CartProvider } from "./context/CartContext";
import News from "./pages/news/News";
import Contact from "./pages/contact/Contact";
import Footer from "./components/footer/Footer";
import LayoutProductDetail from "./pages/product-detail/LayoutProductDetail";
import ProductDetail from "./pages/product-detail/ProductDetail";
import NoPage from "./pages/NoPage";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import FloatingSocialButtons from "./components/FloatingSocialButtons";
import ChatBotSupport from "./components/ChatBotSupport";
import PaymentSuccess from "./pages/PaymentSuccess";

function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <FloatingSocialButtons />
            <ChatBotSupport />

      <Footer />
    </>
  );
}
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Công khai */}
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route element={<ProtectedRoute />}>
              <Route path="cart" element={<ShoppingCart />} /> 
                 <Route path="payment-success" element={<PaymentSuccess />} /> 
            </Route>
            {/* Layout chung: Navbar + Footer */}
            <Route path="/" element={<MainLayout />}>
              {/* Public routes */}
              <Route index element={<Home />} />
              <Route path="trang-chu" element={<Home />} />
              <Route path="san-pham" element={<Products />} />
              <Route path="san-pham/:categorySlug" element={<Products />} />
              <Route path="tin-tuc" element={<News />} />
              <Route path="lien-he" element={<Contact />} />
              <Route path="gio-hang" element={<ShoppingCart />} />
              <Route path="san-pham-chi-tiet" element={<LayoutProductDetail />}>
                <Route index element={<Products />} />
                <Route path=":slug" element={<ProductDetail />} />
              </Route>
              <Route path="*" element={<NoPage />} />

              {/* Protected routes */}
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
