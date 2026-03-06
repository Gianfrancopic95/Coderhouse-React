import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../services/ordersService";
import "./CheckoutForm.css";

const initialBuyer = {
  name: "",
  phone: "",
  email: "",
  emailConfirm: "",
};

const CheckoutForm = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useCart();

  const [buyer, setBuyer] = useState(initialBuyer);
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");

  const cartHasStockIssues = useMemo(
    () => cartItems.some((it) => (Number(it.stock) || 0) < (Number(it.quantity) || 0)),
    [cartItems]
  );

  const isEmailValid = useMemo(() => {
    const e = buyer.email.trim().toLowerCase();
    return e.includes("@") && e.includes(".");
  }, [buyer.email]);

  const formValid = useMemo(() => {
    if (!buyer.name.trim()) return false;
    if (!buyer.phone.trim()) return false;
    if (!isEmailValid) return false;
    if (buyer.email.trim().toLowerCase() !== buyer.emailConfirm.trim().toLowerCase()) return false;
    return true;
  }, [buyer, isEmailValid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBuyer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (cartItems.length === 0) {
      setError("Tu carrito está vacío.");
      return;
    }

    if (cartHasStockIssues) {
      setError(
        "Hay productos con cantidades que superan el stock. Ajustá el carrito antes de continuar."
      );
      return;
    }

    if (!formValid) {
      setError("Por favor completá tus datos correctamente.");
      return;
    }

    setSubmitting(true);
    try {
      const order = {
        buyer: {
          name: buyer.name.trim(),
          phone: buyer.phone.trim(),
          email: buyer.email.trim().toLowerCase(),
        },
        items: cartItems.map((it) => ({
          id: it.id,
          title: it.title,
          price: Number(it.price) || 0,
          quantity: Number(it.quantity) || 0,
        })),
        total: Number(totalPrice) || 0,
      };

      const id = await createOrder(order);
      setOrderId(id);
      clearCart();
    } catch (err) {
      setError("Ocurrió un error al generar la orden. Intentá nuevamente.");
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (orderId) {
    return (
      <main className="checkout">
        <h2 className="checkout__title">¡Compra confirmada!</h2>
        <p className="checkout__text">
          Tu orden fue generada correctamente. Guardá este identificador:
        </p>
        <div className="checkout__orderId" aria-label="ID de orden">
          {orderId}
        </div>

        <div className="checkout__actions">
          <Link className="checkout__btn" to="/">
            Volver al catálogo
          </Link>
          <button className="checkout__btn checkout__btn--ghost" onClick={() => navigate("/cart")}
          >
            Ir al carrito
          </button>
        </div>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="checkout">
        <h2 className="checkout__title">Checkout</h2>
        <div className="checkout__empty" role="status" aria-live="polite">
          🛒 Tu carrito está vacío.
        </div>
        <Link className="checkout__btn" to="/">
          Ver catálogo
        </Link>
      </main>
    );
  }

  return (
    <main className="checkout">
      <div className="checkout__header">
        <h2 className="checkout__title">Checkout</h2>
        <Link className="checkout__btn checkout__btn--ghost" to="/cart">
          Volver al carrito
        </Link>
      </div>

      <section className="checkout__summary" aria-label="Resumen de compra">
        <div className="checkout__row">
          <span>Productos</span>
          <strong>{cartItems.length}</strong>
        </div>
        <div className="checkout__row">
          <span>Total</span>
          <strong>${totalPrice.toLocaleString("es-AR")}</strong>
        </div>

        {cartHasStockIssues && (
          <div className="checkout__warn" role="status" aria-live="polite">
            ⚠️ Hay productos con cantidades que superan el stock. Ajustá el carrito.
          </div>
        )}
      </section>

      <form className="checkout__form" onSubmit={handleSubmit}>
        <div className="checkout__grid">
          <label>
            Nombre y apellido
            <input name="name" value={buyer.name} onChange={handleChange} autoComplete="name" />
          </label>

          <label>
            Teléfono
            <input name="phone" value={buyer.phone} onChange={handleChange} autoComplete="tel" />
          </label>

          <label>
            Email
            <input
              name="email"
              value={buyer.email}
              onChange={handleChange}
              type="email"
              autoComplete="email"
            />
          </label>

          <label>
            Repetir email
            <input
              name="emailConfirm"
              value={buyer.emailConfirm}
              onChange={handleChange}
              type="email"
              autoComplete="email"
            />
          </label>
        </div>

        {error && (
          <div className="checkout__error" role="alert">
            {error}
          </div>
        )}

        <button className="checkout__btn" type="submit" disabled={submitting || !formValid || cartHasStockIssues}>
          {submitting ? "Generando orden..." : "Confirmar compra"}
        </button>
      </form>
    </main>
  );
};

export default CheckoutForm;
