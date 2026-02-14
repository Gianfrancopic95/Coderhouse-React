import { useState } from "react";
import "./ItemCount.css";

/**
 * Presentación + lógica local (contador simple).
 * La integración real con carrito se hace más adelante.
 */
const ItemCount = ({ stock, initial = 1, onAdd }) => {
  const safeInitial = Math.max(1, Math.min(initial, stock || 1));
  const [count, setCount] = useState(safeInitial);

  const dec = () => setCount((c) => Math.max(1, c - 1));
  const inc = () => setCount((c) => Math.min(stock, c + 1));

  const handleAdd = () => {
    if (typeof onAdd === "function") onAdd(count);
  };

  return (
    <div className="itemCount" aria-label="Selector de cantidad">
      <div className="itemCount__controls">
        <button className="itemCount__btn" onClick={dec} disabled={count <= 1}>
          −
        </button>
        <span className="itemCount__value" aria-live="polite">
          {count}
        </span>
        <button className="itemCount__btn" onClick={inc} disabled={count >= stock}>
          +
        </button>
      </div>

      <button className="itemCount__add" onClick={handleAdd} disabled={stock <= 0}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;
