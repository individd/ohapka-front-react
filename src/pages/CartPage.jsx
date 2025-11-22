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
    <div className="checkout-container">
      <h2 className="section-title">КОРЗИНА</h2>

      {cart.length === 0 ? (
        <p style={{ padding: "12px", fontSize: "16px", opacity: 0.6 }}>
          ПУСТО
        </p>
      ) : (
        cart.map((item) => {
          const displayPrice = (item.quantity / item.min) * item.price;
          const imageSrc = (Array.isArray(item.image) ? item.image[0] : item.image) || "https://via.placeholder.com/300?text=No+Image";

          return (
            <div key={item.id} className="cart-item">
              <img
                src={imageSrc}
                alt={item.name}
                className="cart-item-image"
              />

              <div className="cart-item-info">
                <div>
                  <div className="cart-item-title">{item.name}</div>
                  <div className="cart-item-meta">
                    {item.quantity} шт • {displayPrice.toLocaleString("ru-RU")} ₽
                  </div>
                </div>

                <div className="cart-item-controls">
                  <button
                    onClick={() => changeQuantity(item.id, -1)}
                    className="cart-qty-btn"
                  >
                    –
                  </button>

                  <span style={{ minWidth: "30px", textAlign: "center", fontWeight: "700" }}>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => changeQuantity(item.id, +1)}
                    className="cart-qty-btn"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}

      {cart.length > 0 && (
        <div style={{ marginTop: 40, marginBottom: 40 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, fontWeight: 900, fontSize: 20 }}>
            <span>ИТОГО:</span>
            <span>{total.toLocaleString("ru-RU")} ₽</span>
          </div>

          <button
            className="btn-primary"
            onClick={handleCheckout}
          >
            ОФОРМИТЬ
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