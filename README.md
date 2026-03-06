# Proyecto Final React (Coderhouse) — **PeriStore**

Single Page Application (SPA) de e-commerce desarrollada con **React + Vite**.

## 🚀 Funcionalidades

- **Catálogo de productos** (ItemListContainer + ItemList + Item)
- **Detalle de producto** (ItemDetailContainer + ItemDetail)
  - Selector de cantidad (**ItemCount**) con validaciones (mínimo 1, máximo stock)
  - Oculta ItemCount luego de agregar al carrito
- **Carrito** con estado global usando **Context**
  - Lista de productos, cantidades, subtotales y total
  - Remover ítems / vaciar carrito
  - **CartWidget** con total de unidades
- **Checkout**
  - Formulario de comprador
  - Genera orden en **Firestore** (colección `orders`) y muestra el **ID de la orden**
- **Navegación SPA** con **React Router**
  - Catálogo, categorías, detalle, carrito y checkout

## 🧱 Estructura de componentes

- `App`
- `NavBar`
- `CartWidget`
- `ItemListContainer` / `ItemList` / `ItemCard`
- `ItemDetailContainer` / `ItemDetail` / `ItemCount`
- `Cart` / `CartItem`
- `CheckoutForm`

## 🔥 Firebase / Firestore

La app consulta productos desde Firestore (colección `products`).

Si **no** se configuran variables de entorno, el proyecto **no se rompe**: utiliza **mock data** (`src/data/products.js`) y al confirmar compra genera un id **MOCK-...**.

### Variables de entorno (Vite)

Crear un archivo **`.env`** en la raíz del proyecto:

```bash
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### Modelo recomendado: `products`

Cada documento en `products` debería contener:

```js
{
  title: string,
  category: string,
  price: number,
  stock: number,
  description: string,
  img: string
}
```

### Modelo de orden: `orders`

Se guarda como documento en `orders`:

```js
{
  buyer: { name, phone, email },
  items: [{ id, title, price, quantity }],
  total: number,
  createdAt: serverTimestamp()
}
```

## ▶️ Cómo correr el proyecto

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

