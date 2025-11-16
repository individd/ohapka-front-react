import React from "react";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        padding: 24,
        textAlign: "center",
        paddingTop: 80,
      }}
    >
      {/* Иконка */}
      <div
        style={{
          width: 90,
          height: 90,
          borderRadius: "50%",
          background: "#4CAF50",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto 24px",
        }}
      >
        <span style={{ fontSize: 50, color: "#fff" }}>✓</span>
      </div>

      <h2 style={{ marginBottom: 12 }}>Заказ оформлен</h2>

      <p style={{ fontSize: 15, opacity: 0.7, marginBottom: 30 }}>
        Мы получили ваш заказ и скоро свяжемся для подтверждения.
      </p>

      <button
        onClick={() => navigate("/")}
        style={{
          width: "100%",
          background: "#000",
          color: "#fff",
          padding: "14px 0",
          borderRadius: 10,
          border: "none",
          fontSize: 16,
          fontWeight: 600,
          marginTop: 10,
        }}
      >
        Вернуться в каталог
      </button>
    </div>
  );
}