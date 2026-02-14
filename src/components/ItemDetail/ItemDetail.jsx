import { useState } from "react";
import { Link } from "react-router-dom";
import ItemCount from "../ItemCount/ItemCount";
import "./ItemDetail.css";

/**
 * Presentación: vista detalle del producto.
 * Incluye ItemCount para futura integración con carrito.
 */
const ItemDetail = ({ item }) => {
  const [addedQty, setAddedQty] = useState(0);

  const onAdd = (qty) => {
    setAddedQty(qty);
  };

  return (
    <section className="itemDetail">
      <Link className="itemDetail__back" to="/">
        ← Volver al catálogo
      </Link>

      <div className="itemDetail__card">
        <img className="itemDetail__img" src={item.img} alt={item.title} />

        <div className="itemDetail__body">
          <h2 className="itemDetail__title">{item.title}</h2>
          <p className="itemDetail__price">${item.price.toLocaleString("es-AR")}</p>

          <p className="itemDetail__desc">{item.description}</p>

          <p className="itemDetail__stock">
            Stock disponible: <strong>{item.stock}</strong>
          </p>

          {addedQty > 0 ? (
            <div className="itemDetail__added" role="status" aria-live="polite">
              ✅ Agregaste <strong>{addedQty}</strong> unidad(es). (Interfaz lista para el carrito)
            </div>
          ) : (
            <ItemCount stock={item.stock} initial={1} onAdd={onAdd} />
          )}
        </div>
      </div>
    </section>
  );
};

export default ItemDetail;
