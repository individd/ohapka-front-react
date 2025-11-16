import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../ui.css";

export default function Catalog() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://ohapka-backend-individd.amvera.io/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch(console.error);
  }, []);

  return (
    <div className="catalog-page">
      <h2 className="catalog-title">Каталог охапок</h2>
      <p className="catalog-subtitle">
        Яркие, свежие и честные охапки цветов — без пафоса и флористов.
      </p>

      <div className="catalog-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}