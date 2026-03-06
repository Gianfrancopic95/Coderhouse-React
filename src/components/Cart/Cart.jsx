import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CartItem from "../CartItem/CartItem";
import "./Cart.css";

const Cart = () => {
  const { cartItems, clearCart, totalPrice, totalUnits } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="cart">
        <h2 className="cart__title">Carrito</h2>
        <div className="cart__empty" role="status" aria-live="polite">
          🛒 Tu carrito está vacío.
        </div>
        <Link className="cart__btn" to="/">
          Ver catálogo
        </Link>
      </main>
    );
  }

  return (
    <main className="cart">
      <div className="cart__header">
        <h2 className="cart__title">Carrito</h2>
        <button className="cart__btn cart__btn--ghost" onClick={clearCart}>
          Vaciar carrito
        </button>
      </div>

      <section className="cart__list" aria-label="Productos en el carrito">
        {cartItems.map((it) => (
          <CartItem key={it.id} item={it} />
        ))}
      </section>

      <aside className="cart__summary" aria-label="Resumen del carrito">
        <div className="cart__row">
          <span>Total de unidades</span>
          <strong>{totalUnits}</strong>
        </div>
        <div className="cart__row">
          <span>Total</span>
          <strong>${totalPrice.toLocaleString("es-AR")}</strong>
        </div>

        <div className="cart__actions">
          <Link className="cart__btn" to="/checkout">
            Finalizar compra
          </Link>
          <Link className="cart__btn cart__btn--ghost" to="/">
            Seguir comprando
          </Link>
        </div>
      </aside>
    </main>
  );
};

export default Cart;
