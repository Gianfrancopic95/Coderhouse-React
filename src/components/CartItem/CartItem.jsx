import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./CartItem.css";

const CartItem = ({ item }) => {
  const { removeItem, setItemQuantity } = useCart();

  const subtotal = useMemo(() => {
    const p = Number(item.price) || 0;
    const q = Number(item.quantity) || 0;
    return p * q;
  }, [item.price, item.quantity]);

  const dec = () => setItemQuantity(item.id, (Number(item.quantity) || 1) - 1);
  const inc = () => setItemQuantity(item.id, (Number(item.quantity) || 1) + 1);

  return (
    <article className="cartItem">
      <img className="cartItem__img" src={item.img} alt={item.title} />

      <div className="cartItem__body">
        <div className="cartItem__top">
          <div className="cartItem__meta">
            <Link className="cartItem__title" to={`/item/${item.id}`}>
              {item.title}
            </Link>
            <div className="cartItem__price">${Number(item.price).toLocaleString("es-AR")}</div>
          </div>

          <button className="cartItem__remove" onClick={() => removeItem(item.id)}>
            Quitar
          </button>
        </div>

        <div className="cartItem__bottom">
          <div className="cartItem__qty" aria-label="Cantidad">
            <button onClick={dec} disabled={(Number(item.quantity) || 1) <= 1}>
              −
            </button>
            <span aria-live="polite">{item.quantity}</span>
            <button onClick={inc} disabled={(Number(item.quantity) || 0) >= (Number(item.stock) || 0)}>
              +
            </button>
          </div>

          <div className="cartItem__subtotal">
            Subtotal: <strong>${subtotal.toLocaleString("es-AR")}</strong>
          </div>
        </div>

        {(Number(item.stock) || 0) <= 0 && (
          <div className="cartItem__warn" role="status" aria-live="polite">
            ⚠️ Este producto quedó sin stock.
          </div>
        )}
      </div>
    </article>
  );
};

export default CartItem;
