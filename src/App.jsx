import React, { useState } from "react";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Catalog } from "./pages/Catalog";
import { CartPage } from "./pages/CartPage";

export default function App() {
  const [page, setPage] = useState("catalog");
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart([...cart, product]);
  }

  function removeFromCart(id) {
    setCart(cart.filter((i) => i.id !== id));
  }

  return (
    <div>
      <Header />

      <nav style={styles.nav}>
        <button onClick={() => setPage("catalog")}>Каталог</button>
        <button onClick={() => setPage("cart")}>Корзина ({cart.length})</button>
      </nav>

      {page === "home" && <Home />}
      {page === "catalog" && <Catalog onAdd={addToCart} />}
      {page === "cart" && <CartPage items={cart} onRemove={removeFromCart} />}
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-around",
    padding: "12px 0",
    borderBottom: "1px solid #eee",
    background: "#fafafa"
  }
};