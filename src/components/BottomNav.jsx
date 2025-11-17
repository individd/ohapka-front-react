import React from "react";
import { NavLink } from "react-router-dom";
import "../ui.css";

const navItems = [
  { to: "/", label: "Каталог", icon: CatalogIcon },
  { to: "/cart", label: "Корзина", icon: CartIcon },
  { to: "/about", label: "О проекте", icon: InfoIcon },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={({ isActive }) =>
            "bottom-nav-item" +
            (isActive ? " bottom-nav-item-active" : "")
          }
        >
          <Icon className="bottom-nav-icon" />
          <span className="bottom-nav-label">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

function CatalogIcon({ className = "" }) {
  // heroicons Squares2X2Icon (outline)
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="4" y="4" width="7" height="7" rx="2" />
      <rect x="13" y="4" width="7" height="7" rx="2" />
      <rect x="4" y="13" width="7" height="7" rx="2" />
      <rect x="13" y="13" width="7" height="7" rx="2" />
    </svg>
  );
}

function CartIcon({ className = "" }) {
  // heroicons ShoppingBagIcon (упрощённый outline)
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M7 9V7a5 5 0 0 1 10 0v2" />
      <path d="M5 9h14l-1 9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 9Z" />
      <path d="M9 13h.01M15 13h.01" />
    </svg>
  );
}

function InfoIcon({ className = "" }) {
  // heroicons InformationCircleIcon (outline)
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10v6" />
      <path d="M12 8h.01" />
    </svg>
  );
}