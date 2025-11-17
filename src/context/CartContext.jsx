import React, { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Добавить товар (минимальный шаг)
  const addItem = (product) => {
    if (!product) return;

    const min = Number(product.min) || 1;
    const step = Number(product.step) || min;

    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);

      if (existing) {
        return prev.map((i) =>
          i.id === product.id
            ? { ...i, quantity: i.quantity + step }
            : i
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: Number(product.price) || 0,
          quantity: min,
          min,
          step,
          image: Array.isArray(product.images)
            ? product.images[0]
            : product.images,
        },
      ];
    });
  };

  // Установить точное количество
  const setQuantity = (id, qty) => {
    const quantity = Number(qty) || 0;

    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  // +/- с учётом шага
  const changeQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.id !== id) return i;
          let next = i.quantity + delta * i.step;
          if (next < 0) next = 0;
          return { ...i, quantity: next };
        })
        .filter((i) => i.quantity > 0)
    );
  };

  // Удалить один товар
  const removeItem = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  // Очистить корзину
  const clearCart = () => setCart([]);

  // Количество всех цветков (не охапок)
  const itemsCount = useMemo(
    () => cart.reduce((sum, i) => sum + i.quantity, 0),
    [cart]
  );

  // Итоговая сумма
  const total = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const batches = item.quantity / item.min;
        return sum + batches * item.price;
      }, 0),
    [cart]
  );

  const value = {
    cart,
    addItem,
    setQuantity,
    changeQuantity,
    removeItem,
    clearCart,
    itemsCount,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};