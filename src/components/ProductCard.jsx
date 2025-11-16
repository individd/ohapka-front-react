import React from "react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { cart, addItem } = useCart();

  // Текущий товар в корзине
  const inCart = cart.find((item) => item.id === product.id);
  const currentQty = inCart ? inCart.quantity : 0;

  const min = Number(product.min) || 1;
  const price = Number(product.price) || 0;

  const image = Array.isArray(product.images)
    ? product.images[0]
    : product.images;

  const handleAdd = () => {
    addItem(product, min);
  };

  return (
    <div className="card">
      <div className="card-img">
        <img src={image} alt={product.name} />
      </div>

      <div className="card-info">
        <p className="card-title">{product.name}</p>

        <div className="price-pill">
          {price.toLocaleString("ru-RU")} ₽ / {min} шт
        </div>

        {currentQty > 0 && (
          <div
            style={{
              fontSize: "11px",
              marginTop: 4,
              color: "#007aff",
              fontWeight: 600,
            }}
          >
            В корзине: {currentQty} шт
          </div>
        )}

        <button className="add-btn" onClick={handleAdd}>
          В корзину
        </button>
      </div>
    </div>
  );
}