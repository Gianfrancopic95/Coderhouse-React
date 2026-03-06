import "./CartWidget.css";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const CartWidget = () => {
  const { totalUnits } = useCart();

  return (
    <Link className="cartWidget" to="/cart" aria-label="Ir al carrito">
      <span className="cartIcon" role="img" aria-hidden="true">🛒</span>
      <span className="cartText">Carrito</span>
      {totalUnits > 0 && (
        <span className="cartBadge" aria-label="Cantidad de productos en el carrito">
          {totalUnits}
        </span>
      )}
    </Link>
  );
};

export default CartWidget;
