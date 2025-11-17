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
        maxWidth: 480,
        margin: "0 auto",
        fontFamily: "system-ui",
      }}
    >
      {/* Иконка */}
      <div
        style={{
          width: 90,
          height: 90,
          borderRadius: "50%",
          background: "#F7FF8B",
          border: "2px solid #E5E5E5",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto 24px",
        }}
      >
        <span style={{ fontSize: 50, color: "#000" }}>✓</span>
      </div>

      <h2 style={{ marginBottom: 8, fontSize: 22, fontWeight: 700 }}>Заказ оформлен</h2>

      <p style={{ fontSize: 15, opacity: 0.6, marginBottom: 40, lineHeight: "20px" }}>
        Мы получили ваш заказ и скоро свяжемся для подтверждения.
      </p>

      <button
        onClick={() => navigate("/")}
        style={{
          width: "100%",
          background: "#F7FF8B",
          color: "#000",
          padding: "16px 0",
          borderRadius: 14,
          border: "none",
          fontSize: 16,
          fontWeight: 600,
          marginTop: 10,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
        }}
      >
        Вернуться в каталог
      </button>
    </div>
  );
}