import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../ui.css";

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    fetch("https://ohapka-backend-individd.amvera.io/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error(err));
  }, []);

  // Extract unique categories and colors
  const categories = [...new Set(products.map((p) => p.type))].filter(Boolean);
  const colors = [...new Set(products.map((p) => p.color))].filter(Boolean);

  // Filter products
  const filteredProducts = products.filter((p) => {
    if (selectedCategory && p.type !== selectedCategory) return false;
    if (selectedColor && p.color !== selectedColor) return false;
    return true;
  });

  return (
    <div className="catalog-page">
      {/* Filters */}
      <div className="filters-container">
        {/* Categories Row */}
        <div className="filter-row">
          <button
            className={`filter-chip ${selectedCategory === null ? "active" : ""}`}
            onClick={() => setSelectedCategory(null)}
          >
            Все
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-chip ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Colors Row */}
        <div className="filter-row">
          <button
            className={`filter-chip ${selectedColor === null ? "active" : ""}`}
            onClick={() => setSelectedColor(null)}
          >
            Все цвета
          </button>
          {colors.map((col) => (
            <button
              key={col}
              className={`filter-chip ${selectedColor === col ? "active" : ""}`}
              onClick={() => setSelectedColor(col === selectedColor ? null : col)}
            >
              {col}
            </button>
          ))}
        </div>
      </div>

      <div className="catalog-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))
        ) : (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: 40, color: "#999" }}>
            Ничего не найдено 😔
          </div>
        )}
      </div>
    </div>
  );
}