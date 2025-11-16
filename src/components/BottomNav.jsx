import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function BottomNav() {
  const location = useLocation();
  const current = location.pathname;

  const linkStyle = (active) => ({
    flex: 1,
    textAlign: "center",
    padding: "10px 0",
    color: active ? "#2a7bf6" : "#555",
    fontWeight: active ? "600" : "400",
    textDecoration: "none",
  });

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "#fff",
        borderTop: "1px solid #e5e5e5",
        display: "flex",
        justifyContent: "space-between",
        padding: "5px 0",
        zIndex: 100,
      }}
    >
      <Link to="/" style={linkStyle(current === "/")}>
        Каталог
      </Link>

      <Link to="/cart" style={linkStyle(current === "/cart")}>
        Корзина
      </Link>

      <Link to="/about" style={linkStyle(current === "/about")}>
        О проекте
      </Link>
    </div>
  );
}