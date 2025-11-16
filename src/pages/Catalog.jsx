import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api";
import ProductCard from "../components/ProductCard";

export default function Catalog() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((response) => {
      if (response && Array.isArray(response.products)) {
        setProducts(response.products);
      } else {
        console.error("Invalid API response:", response);
        setProducts([]);
      }
    });
  }, []);

  return (
    <div style={{ padding: 16 }}>
      {products.length === 0 && <p>Загрузка...</p>}

      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}