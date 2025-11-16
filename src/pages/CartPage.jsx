import React from "react";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, updateQty, removeItem } = useCart();

  const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <div style={{ padding: 16 }}>
      <h2>Корзина</h2>

      {cart.length === 0 && <p>Корзина пуста</p>}

      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #eee",
            padding: 12,
            borderRadius: 12,
            marginBottom: 12,
          }}
        >
          <h3>{item.name}</h3>
          <p>Цена: {item.price} ₽</p>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button onClick={() => updateQty(item.id, item.quantity - item.step)}>
              -
            </button>

            <span>{item.quantity}</span>

            <button onClick={() => updateQty(item.id, item.quantity + item.step)}>
              +
            </button>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            style={{
              marginTop: 10,
              padding: 6,
              background: "red",
              border: "none",
              borderRadius: 6,
              color: "white",
            }}
          >
            Удалить
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <div>
          <h3>Итого: {total} ₽</h3>

          <a
            href="/checkout"
            style={{
              display: "block",
              background: "#2a7bf6",
              padding: 12,
              textAlign: "center",
              color: "white",
              borderRadius: 10,
              marginTop: 16,
            }}
          >
            Оформить заказ
          </a>
        </div>
      )}
    </div>
  );
}