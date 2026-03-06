import { createContext, useContext, useMemo, useState } from "react";

/**
 * Estructura de item en carrito:
 * { id, title, price, img, quantity, stock }
 */

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addItem = (item, quantity) => {
    const qty = Number(quantity) || 0;
    if (!item?.id || qty <= 0) return;

    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      const maxStock = Number(item.stock ?? Infinity);

      if (existing) {
        const newQty = Math.min(existing.quantity + qty, maxStock);
        return prev.map((p) => (p.id === item.id ? { ...p, quantity: newQty } : p));
      }

      return [...prev, { ...item, quantity: Math.min(qty, maxStock) }];
    });
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const setItemQuantity = (id, quantity) => {
    const qty = Number(quantity) || 0;
    setCartItems((prev) =>
      prev
        .map((p) => {
          if (p.id !== id) return p;
          const maxStock = Number(p.stock ?? Infinity);
          return { ...p, quantity: Math.max(1, Math.min(qty, maxStock)) };
        })
        .filter((p) => p.quantity > 0)
    );
  };

  const totalUnits = useMemo(
    () => cartItems.reduce((acc, it) => acc + (Number(it.quantity) || 0), 0),
    [cartItems]
  );

  const totalPrice = useMemo(
    () => cartItems.reduce((acc, it) => acc + (Number(it.price) || 0) * (Number(it.quantity) || 0), 0),
    [cartItems]
  );

  const value = {
    cartItems,
    addItem,
    removeItem,
    clearCart,
    setItemQuantity,
    totalUnits,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
