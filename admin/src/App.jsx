import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "../../frontend/src/context/AuthContext";
import { CartProvider } from "../../frontend/src/context/CartContext";
import ProtectedRoute from "../../frontend/src/routes/ProtectedRoute";
import AdminRoutes from "./routes/AdminRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Công khai */}
              <Route element={<ProtectedRoute />}>
                <Route path="admin/*" element={<AdminRoutes />} />
              </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
