import React from "react";
import "../ui.css";

export default function Header() {
  return (
    <header className="app-header">
      <div className="app-header-left">
        <div className="app-logo-text">ПРОСТО ОХАПКА</div>
        <div className="app-logo-subtitle">Свежие охапки по себестоимости</div>
      </div>

      <div className="app-header-right">
        <span className="app-header-tagline">Сегодня соберём охапку?</span>
      </div>
    </header>
  );
}