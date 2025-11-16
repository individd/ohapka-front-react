import React, { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Добавление товара в корзину
  const addItem = (product, qty) => {
    const quantity = Number(qty) || 0;
    if (!product || quantity <= 0) return;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: Number(product.price) || 0,
          quantity: quantity,
          min: Number(product.min) || 1,
          step: Number(product.step) || 1,
          image: Array.isArray(product.images)
            ? product.images[0]
            : product.images,
        },
      ];
    });
  };

  // Жёсткая установка количества (для input/кнопок +/-)
  const setQuantity = (id, qty) => {
    const quantity = Number(qty) || 0;
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: quantity } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Инкремент/декремент с учётом шага
  const changeQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) return item;
          const step = item.step || 1;
          let next = item.quantity + delta * step;
          if (next < 0) next = 0;
          return { ...item, quantity: next };
        })
        .filter((item) => item.quantity > 0)
    );
  };

  // Удаление товара
  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Полная очистка корзины
  const clearCart = () => setCart([]);

  // Итоги
  const total = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const min = item.min || 1;
        const batches = item.quantity / min;
        return sum + batches * item.price;
      }, 0),
    [cart]
  );

  const itemsCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const value = {
    cart,
    addItem,
    setQuantity,
    changeQuantity,
    removeItem,
    clearCart,
    total,
    itemsCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
};