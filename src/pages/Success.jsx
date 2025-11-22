import React from "react";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <div className="success-icon-wrapper">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" color="#002147">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>

      <h2 className="success-title">Заказ оформлен!</h2>

      <p className="success-text">
        Мы получили ваш заказ и скоро свяжемся для подтверждения.
      </p>

      <button
        onClick={() => navigate("/")}
        className="btn-primary"
      >
        ВЕРНУТЬСЯ В КАТАЛОГ
      </button>
    </div>
  );
}