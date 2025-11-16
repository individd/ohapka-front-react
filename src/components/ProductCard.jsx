import React from "react";

export default function ProductCard({ product }) {
  const image = Array.isArray(product.images)
    ? product.images[0]
    : product.images;

  return (
    <div
      style={{
        border: "1px solid #eee",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        background: "white",
      }}
    >
      {image && (
        <img
          src={image}
          alt={product.name}
          style={{
            width: "100%",
            borderRadius: 12,
            marginBottom: 8,
          }}
        />
      )}

      <h3 style={{ margin: "8px 0" }}>{product.name}</h3>

      <p style={{ color: "#777", margin: "4px 0" }}>
        {product.price} ₽
      </p>
    </div>
  );
}