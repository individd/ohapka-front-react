import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import Catalog from "./pages/Catalog";
import CartPage from "./pages/CartPage";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";

import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import "./ui.css";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />

        <main className="app-content" style={{ paddingBottom: "60px" }}>
          <Routes>
            <Route path="/" element={<Catalog />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </main>

        <BottomNav />
      </BrowserRouter>
    </CartProvider>
  );
}