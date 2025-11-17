import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart, changeQuantity, total } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) return;
    navigate("/checkout");
  };

  return (
    <div
      style={{
        paddingBottom: "140px",
        paddingTop: "20px",
        paddingLeft: "16px",
        paddingRight: "16px",
      }}
    >
      <h2
        style={{
          fontSize: "20px",
          fontWeight: 600,
          marginBottom: "16px",
          paddingLeft: "12px",
        }}
      >
        В охапке
      </h2>

      {cart.length === 0 ? (
        <p style={{ padding: "12px", fontSize: "16px", opacity: 0.6 }}>
          Пока пусто
        </p>
      ) : (
        cart.map((item) => {
          const displayPrice =
            (item.quantity / item.min) * item.price;

          return (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px",
                background: "#fff",
                borderRadius: "16px",
                boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
                marginBottom: "12px",
              }}
            >
              {/* Фото */}
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "64px",
                  height: "64px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />

              {/* Текстовые данные */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "15px",
                    marginBottom: "3px",
                  }}
                >
                  {item.name}
                </div>

                <div
                  style={{
                    fontSize: "13px",
                    opacity: 0.7,
                    marginBottom: "6px",
                  }}
                >
                  {item.quantity} шт • {displayPrice.toLocaleString("ru-RU")} ₽
                </div>

                {/* Счетчик */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <button
                    onClick={() => changeQuantity(item.id, -1)}
                    style={counterBtn}
                  >
                    –
                  </button>

                  <span style={{ minWidth: "40px", textAlign: "center" }}>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => changeQuantity(item.id, +1)}
                    style={counterBtn}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}

      {/* Нижняя панель — итог + кнопка */}
      {cart.length > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: "70px",
            left: 0,
            right: 0,
            background: "#fff",
            padding: "16px",
            boxShadow: "0 -4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: 600,
              marginBottom: "12px",
            }}
          >
            Итого: {total.toLocaleString("ru-RU")} ₽
          </div>

          <button
            onClick={handleCheckout}
            style={{
              width: "100%",
              background: "#F7FF8B",
              padding: "14px 0",
              fontSize: "16px",
              fontWeight: 600,
              borderRadius: "14px",
              border: "1px solid #E5E86E",
            }}
          >
            Перейти к оформлению
          </button>
        </div>
      )}
    </div>
  );
}

const counterBtn = {
  width: "34px",
  height: "34px",
  borderRadius: "10px",
  border: "1px solid #eee",
  background: "#fafafa",
  fontSize: "20px",
  lineHeight: "20px",
};