import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

/**
 * Configuración Firebase por variables de entorno (Vite).
 *
 * Crear un archivo .env en la raíz del proyecto con:
 * VITE_FIREBASE_API_KEY=...
 * VITE_FIREBASE_AUTH_DOMAIN=...
 * VITE_FIREBASE_PROJECT_ID=...
 * VITE_FIREBASE_STORAGE_BUCKET=...
 * VITE_FIREBASE_MESSAGING_SENDER_ID=...
 * VITE_FIREBASE_APP_ID=...
 */

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Si faltan credenciales, NO rompemos la app: los services pueden caer en mock data.
export const hasFirebaseConfig = Boolean(firebaseConfig?.projectId);

export const app = hasFirebaseConfig ? initializeApp(firebaseConfig) : null;
export const db = hasFirebaseConfig ? getFirestore(app) : null;
