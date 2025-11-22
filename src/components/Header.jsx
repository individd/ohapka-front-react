import React from "react";
import "../ui.css";

export default function Header() {
  return (
    <header className="app-header">
      <div className="app-header-left">
        <div className="app-logo-text">NORMA</div>
        <div className="app-logo-subtitle">ГОРОДСКИЕ ЦВЕТЫ</div>
      </div>

      <div className="app-header-right">
        <span className="app-header-tagline">Свежие охапки</span>
      </div>
    </header>
  );
}