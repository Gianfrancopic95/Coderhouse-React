import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import "./ItemListContainer.css";

import { getProducts } from "../../services/productsService";
import { categories } from "../../data/categories";
import ItemList from "../ItemList/ItemList";

/**
 * Container: maneja estado + efectos (fetch simulado).
 */
const ItemListContainer = ({ greeting }) => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentCategory = useMemo(
    () => categories.find((c) => c.id === categoryId) ?? null,
    [categoryId]
  );

  useEffect(() => {
    let active = true;
    setLoading(true);

    getProducts(categoryId)
      .then((data) => {
        if (active) setItems(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [categoryId]);

  return (
    <main className="ilc">
      <div className="ilc__header">
        <h2 className="ilc__title">{greeting}</h2>
        <p className="ilc__hint">
          {currentCategory
            ? `Mostrando categoría: ${currentCategory.name}`
            : "Mostrando todos los productos"}
        </p>
      </div>

      {loading ? (
        <div className="ilc__loading" role="status" aria-live="polite">
          Cargando productos...
        </div>
      ) : items.length === 0 ? (
        <div className="ilc__empty">
          No hay productos para esta categoría.
        </div>
      ) : (
        <ItemList items={items} />
      )}
    </main>
  );
};

export default ItemListContainer;
