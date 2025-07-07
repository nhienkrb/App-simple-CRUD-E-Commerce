import React from "react";
import Products from "./pages/Products";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
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
import DashboardLayout from "./pages/admin/DashboardLayout";
import AdminRoutes from "./routes/AdminRoutes";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
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
                <Route path="admin/*" element={<AdminRoutes />} />
              </Route>
            {/* Layout chung: Navbar + Footer */}
            <Route path="/" element={<MainLayout />}>
              {/* Public routes */}
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="news" element={<News />} />
              <Route path="contact" element={<Contact />} />
              <Route path="product" element={<LayoutProductDetail />}>
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