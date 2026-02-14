import "./CartWidget.css";

const CartWidget = () => {
  const itemsInCart = 0;

  return (
    <div className="cartWidget" aria-label="Carrito de compras">
      <span className="cartIcon" role="img" aria-hidden="true">🛒</span>
      <span className="cartText">Carrito</span>
      <span className="cartBadge" aria-label="Cantidad de productos en el carrito">
        {itemsInCart}
      </span>
    </div>
  );
};

export default CartWidget;
