import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../ui.css";

export default function Catalog() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://ohapka-backend-individd.amvera.io/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="catalog-page">
      <h1 className="catalog-title">Каталог</h1>

      <div className="catalog-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}