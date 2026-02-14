import { products } from "../data/products";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Simula un fetch de productos.
 * @param {string | undefined} categoryId
 */
export async function getProducts(categoryId) {
  await delay(450);
  if (!categoryId) return [...products];
  return products.filter((p) => p.category === categoryId);
}

/**
 * Simula un fetch de un producto por id.
 * @param {string} itemId
 */
export async function getProductById(itemId) {
  await delay(450);
  return products.find((p) => p.id === itemId) ?? null;
}
