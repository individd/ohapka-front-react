import React from "react";
import { Cart } from "../components/Cart";

export function CartPage({ items, onRemove }) {
  return (
    <div style={{ padding: 20 }}>
      <h2>Корзина</h2>
      <Cart items={items} onRemove={onRemove} />
    </div>
  );
}