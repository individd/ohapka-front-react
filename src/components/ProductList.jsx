import React from "react";
import { ProductCard } from "./ProductCard";

export function ProductList({ products, onAdd }) {
  return (
    <div>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onAdd={onAdd} />
      ))}
    </div>
  );
}