import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db, hasFirebaseConfig } from "./firebase";
import { products as mockProducts } from "../data/products";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function mapProduct(docSnap) {
  const data = docSnap.data();
  return { id: docSnap.id, ...data };
}

/**
 * Obtiene productos desde Firestore (colección: products).
 * Si no hay credenciales de Firebase configuradas, cae a mock data.
 */
export async function getProducts(categoryId) {
  // Fallback amigable (para que el proyecto compile sin .env)
  if (!hasFirebaseConfig || !db) {
    await delay(250);
    if (!categoryId) return [...mockProducts];
    return mockProducts.filter((p) => p.category === categoryId);
  }

  const productsRef = collection(db, "products");
  const q = categoryId ? query(productsRef, where("category", "==", categoryId)) : productsRef;
  const snap = await getDocs(q);
  return snap.docs.map(mapProduct);
}

/**
 * Obtiene un producto por id desde Firestore (doc: products/{itemId}).
 * Si no hay Firebase, cae a mock data.
 */
export async function getProductById(itemId) {
  if (!hasFirebaseConfig || !db) {
    await delay(250);
    return mockProducts.find((p) => p.id === itemId) ?? null;
  }

  const ref = doc(db, "products", itemId);
  const snap = await getDoc(ref);
  return snap.exists() ? mapProduct(snap) : null;
}
