import React, { useState } from "react";
import { products } from "../data/products";
import { ProductList } from "../components/ProductList";

export function Catalog({ onAdd }) {
  return (
    <div style={{ padding: 20 }}>
      <h2>Каталог</h2>
      <ProductList products={products} onAdd={onAdd} />
    </div>
  );
}