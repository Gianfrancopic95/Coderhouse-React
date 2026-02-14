import "./ItemList.css";
import ItemCard from "../Item/ItemCard";

/**
 * Presentación: render visual de la lista.
 */
const ItemList = ({ items }) => {
  return (
    <section className="itemList" aria-label="Listado de productos">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </section>
  );
};

export default ItemList;
