import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart, changeQuantity, removeItem, total } = useCart();
  const navigate = useNavigate();

  const formatPrice = (n) =>
    n.toLocaleString("ru-RU", { minimumFractionDigits: 0 });

  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ marginBottom: 20 }}>Корзина</h2>

      {cart.length === 0 && (
        <div style={{ fontSize: 16, opacity: 0.6 }}>Корзина пуста</div>
      )}

      {cart.map((item) => {
        const batches = item.quantity / item.min;
        const priceTotal = batches * item.price;

        return (
          <div
            key={item.id}
            style={{
              borderBottom: "1px solid #eee",
              paddingBottom: 16,
              marginBottom: 16,
              display: "flex",
              gap: 12,
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: 80,
                height: 80,
                objectFit: "cover",
                borderRadius: 10,
              }}
            />

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>
                {item.name}
              </div>

              <div style={{ margin: "8px 0" }}>
                <button
                  onClick={() => changeQuantity(item.id, -1)}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    background: "#f8f8f8",
                  }}
                >
                  -
                </button>

                <span style={{ margin: "0 12px" }}>{item.quantity}</span>

                <button
                  onClick={() => changeQuantity(item.id, 1)}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    background: "#f8f8f8",
                  }}
                >
                  +
                </button>
              </div>

              <div style={{ fontWeight: 600 }}>
                {formatPrice(priceTotal)} ₽
              </div>

              <button
                onClick={() => removeItem(item.id)}
                style={{
                  marginTop: 8,
                  color: "#d00",
                  border: "none",
                  background: "transparent",
                  fontSize: 14,
                }}
              >
                Удалить
              </button>
            </div>
          </div>
        );
      })}

      {cart.length > 0 && (
        <div
          style={{
            marginTop: 20,
            padding: "16px 0",
            borderTop: "1px solid #eee",
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 20,
            }}
          >
            Итого: {formatPrice(total)} ₽
          </div>

          <button
            onClick={() => navigate("/checkout")}
            style={{
              width: "100%",
              background: "#000",
              color: "#fff",
              padding: "14px 0",
              borderRadius: 10,
              border: "none",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Перейти к оформлению
          </button>
        </div>
      )}
    </div>
  );
}