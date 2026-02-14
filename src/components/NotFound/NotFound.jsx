import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <main className="nf">
      <h2 className="nf__title">404 - Página no encontrada</h2>
      <p className="nf__text">El enlace no existe o está mal escrito.</p>
      <Link className="nf__btn" to="/">Volver al catálogo</Link>
    </main>
  );
};

export default NotFound;
