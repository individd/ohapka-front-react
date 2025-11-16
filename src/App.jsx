import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import Catalog from "./pages/Catalog";
import CartPage from "./pages/CartPage";
import About from "./pages/About";

import BottomNav from "./components/BottomNav";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div style={{ paddingBottom: 70 }}>
          <Routes>
            <Route path="/" element={<Catalog />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>

        <BottomNav />
      </BrowserRouter>
    </CartProvider>
  );
}