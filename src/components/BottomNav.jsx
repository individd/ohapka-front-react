import React from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../ui.css";

// Icons (Simple SVG)
const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const CartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const InfoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

export default function BottomNav() {
  const { cart } = useCart();

  // Calculate total items count
  const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bottom-nav">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "bottom-nav-item active" : "bottom-nav-item"
        }
      >
        <HomeIcon />
        <span>КАТАЛОГ</span>
      </NavLink>
      <NavLink
        to="/cart"
        className={({ isActive }) =>
          isActive ? "bottom-nav-item active" : "bottom-nav-item"
        }
      >
        <div style={{ position: "relative" }}>
          <CartIcon />
          {itemsCount > 0 && <span className="nav-badge">{itemsCount}</span>}
        </div>
        <span>КОРЗИНА</span>
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive ? "bottom-nav-item active" : "bottom-nav-item"
        }
      >
        <InfoIcon />
        <span>ИНФО</span>
      </NavLink>
    </nav>
  );
}