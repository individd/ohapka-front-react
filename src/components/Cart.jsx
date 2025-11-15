import React from "react";

export function Cart({ items, onRemove }) {
  return (
    <div>
      {items.length === 0 && <p>Корзина пустая</p>}

      {items.map((item) => (
        <div key={item.id} style={styles.row}>
          <span>{item.name}</span>
          <span>{item.price} ₽</span>
          <button style={styles.btn} onClick={() => onRemove(item.id)}>
            Удалить
          </button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #eee",
    alignItems: "center"
  },
  btn: {
    border: "none",
    background: "#ff5252",
    padding: "6px 10px",
    color: "#fff",
    borderRadius: 6
  }
};