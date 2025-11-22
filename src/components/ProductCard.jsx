import React from "react";
import { useCart } from "../context/CartContext";
import "../ui.css";

export default function ProductCard({ product }) {
  const { addItem, cart, changeQuantity } = useCart();

  // product: { id, name, price, images, ... }
  // Fix: use 'images' property and handle array/string
  const imageSrc = (Array.isArray(product.images) ? product.images[0] : product.images) || "https://via.placeholder.com/300?text=No+Image";

  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => {
    addItem(product);
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={imageSrc} alt={product.name} className="product-image" />
      </div>

      <div className="product-info">
        <div className="product-title">{product.name}</div>
        <div className="product-meta">{product.min} шт. в охапке</div>
        <div className="product-price">{product.price} ₽</div>
      </div>

      <div className="card-footer">
        {quantity === 0 ? (
          <button className="btn-lemon" onClick={handleAdd}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        ) : (
          <div className="in-cart-block">
            <button className="qty-btn-mini" onClick={() => changeQuantity(product.id, -1)}>-</button>
            <span className="qty-val-mini">{quantity}</span>
            <button className="qty-btn-mini" onClick={() => changeQuantity(product.id, 1)}>+</button>
          </div>
        )}
      </div>
    </div>
  );
}