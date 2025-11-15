import React from "react";

export function ProductCard({ product, onAdd }) {
  return (
    <div style={styles.card}>
      <img src={product.image} style={styles.image} />
      <div style={styles.info}>
        <h3 style={styles.name}>{product.name}</h3>
        <p style={styles.price}>{product.price} ₽</p>
        <button style={styles.btn} onClick={() => onAdd(product)}>
          Добавить
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    marginBottom: 16
  },
  image: {
    width: "100%",
    height: 200,
    objectFit: "cover"
  },
  info: {
    padding: 12
  },
  name: {
    margin: 0,
    fontSize: 16,
    fontWeight: 600
  },
  price: {
    margin: "6px 0",
    fontSize: 15,
    fontWeight: 500
  },
  btn: {
    width: "100%",
    padding: "10px 0",
    borderRadius: 8,
    border: "none",
    background: "#222",
    color: "#fff",
    fontSize: 15
  }
};