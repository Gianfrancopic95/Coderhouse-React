import "./NavBar.css";
import CartWidget from "../CartWidget/CartWidget";
import { NavLink, Link } from "react-router-dom";
import { categories } from "../../data/categories";

const NavBar = () => {
  return (
    <header className="navHeader">
      <nav className="navBar">
        <Link className="brand" to="/" aria-label="Ir al inicio">
          <span className="logo" aria-hidden="true">🖥️</span>
          <span className="brandName">PeriStore</span>
          <span className="brandTagline">Periféricos para gaming y oficina</span>
        </Link>

        <ul className="navLinks" aria-label="Navegación principal">
          <li>
            <NavLink to="/" end>
              Catálogo
            </NavLink>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <NavLink to={`/category/${cat.id}`}>{cat.name}</NavLink>
            </li>
          ))}
        </ul>

        <CartWidget />
      </nav>
    </header>
  );
};

export default NavBar;
