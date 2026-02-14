import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import NotFound from "./components/NotFound/NotFound";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <ItemListContainer greeting="¡Bienvenido/a a PeriStore! Encontrá tus periféricos ideales 🖥️" />
          }
        />
        <Route
          path="/category/:categoryId"
          element={
            <ItemListContainer greeting="Explorá por categoría y elegí tu próximo periférico 🔎" />
          }
        />
        <Route path="/item/:itemId" element={<ItemDetailContainer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
