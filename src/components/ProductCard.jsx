import React from "react";
import { useCart } from "../context/CartContext";
import "../ui.css";

export default function ProductCard({ product }) {
  const { cart, addItem, changeQuantity } = useCart();

  const cartItem = cart.find((item) => item.id === product.id);
  const inCart = !!cartItem;

  const price = Number(product.price) || 0;
  const min = Number(product.min) || 1;
  const step = Number(product.step) || min;

  return (
    <div className="product-card">
      {/* Фото */}
      <div className="product-image-wrapper">
        <img
          src={Array.isArray(product.images) ? product.images[0] : product.images}
          alt={product.name}
          className="product-image"
        />
      </div>

      {/* Название */}
      <div className="product-title">{product.name}</div>

      {/* Цена-пилюля */}
      <div className="product-price-pill">
        {price.toLocaleString("ru-RU")} ₽ <span className="sub">за {min} шт</span>
      </div>

      {/* --- Вариант C --- */}
      {!inCart ? (
        // ---- КНОПКА "В ОХАПКУ" ----
        <button
          className="add-button"
          onClick={() => addItem(product, min)}
        >
          В охапку
        </button>
      ) : (
        // ---- БЛОК КОЛИЧЕСТВА ----
        <div className="in-cart-block">
          <div className="in-cart-label">
            В охапке: <b>{cartItem.quantity}</b>
          </div>

          <div className="qty-controls">
            <button className="qty-btn" onClick={() => changeQuantity(product.id, -1)}>
              –
            </button>

            <div className="qty-value">{cartItem.quantity}</div>

            <button className="qty-btn" onClick={() => changeQuantity(product.id, +1)}>
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
}