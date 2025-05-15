import React from "react";
import Products from "./pages/Products";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route
            path="/"
            element={
              <div>
                <h1>Home Page</h1> <a href="/products">Go to Products</a>
              </div>
            }
          />
          <Route
            path="*"
            element={
              <div>
                <h1>Page Not Found</h1> <a href="/">Go Home</a>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
