import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/productsService";

import ItemDetail from "../ItemDetail/ItemDetail";
import "./ItemDetailContainer.css";

/**
 * Container: maneja estado + efectos (fetch simulado por Promise).
 */
const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);

    getProductById(itemId)
      .then((data) => {
        if (active) setItem(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [itemId]);

  if (loading) {
    return (
      <main className="idc" role="status" aria-live="polite">
        Cargando producto...
      </main>
    );
  }

  if (!item) {
    return (
      <main className="idc">
        <h2 className="idc__title">Producto no encontrado</h2>
        <p className="idc__text">
          Revisá el enlace o volvé al catálogo.
        </p>
      </main>
    );
  }

  return (
    <main className="idc">
      <ItemDetail item={item} />
    </main>
  );
};

export default ItemDetailContainer;
