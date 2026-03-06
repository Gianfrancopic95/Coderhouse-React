import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, hasFirebaseConfig } from "./firebase";

/**
 * Crea una orden en Firestore (colección: orders).
 * Devuelve el id del documento.
 */
export async function createOrder(order) {
  if (!hasFirebaseConfig || !db) {
    // Para desarrollo sin .env (evita romper). Simulamos id.
    return `MOCK-${Math.random().toString(16).slice(2).toUpperCase()}`;
  }

  const ordersRef = collection(db, "orders");
  const payload = { ...order, createdAt: serverTimestamp() };
  const docRef = await addDoc(ordersRef, payload);
  return docRef.id;
}
