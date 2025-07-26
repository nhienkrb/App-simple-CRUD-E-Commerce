import React from "react"
import {  Route, Routes } from "react-router-dom";
import AuthProvider from "../../admin/src/context/AuthContext";
import ProtectedRoute from "../../admin/src/routes/ProtectedRoute";
import AdminRoutes from "./routes/AdminRoutes";

export default function App() {
  return (
    <AuthProvider>
        <Routes>
          {/* Công khai */}
          <Route element={<ProtectedRoute />}>
            <Route path="admin/*" element={<AdminRoutes />} />
          </Route>
        </Routes>
    </AuthProvider>
  );
}
