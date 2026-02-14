import "./ItemCard.css";
import { Link } from "react-router-dom";

/**
 * Presentación: tarjeta individual del producto dentro del catálogo.
 */
const ItemCard = ({ item }) => {
  return (
    <article className="itemCard">
      <img className="itemCard__img" src={item.img} alt={item.title} />
      <div className="itemCard__body">
        <h3 className="itemCard__title">{item.title}</h3>
        <p className="itemCard__price">${item.price.toLocaleString("es-AR")}</p>

        <Link className="itemCard__btn" to={`/item/${item.id}`}>
          Ver detalle
        </Link>
      </div>
    </article>
  );
};

export default ItemCard;
