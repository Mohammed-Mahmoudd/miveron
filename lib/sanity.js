import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "c69w2hr0",
  dataset: "production",
  apiVersion: "2024-05-10",
  useCdn: false, // Set to true for production, false for fresh data
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

// Price adjustment applied to all products when fetched from Sanity
const PRICE_ADJUSTMENT = 200;

/**
 * Adds the price adjustment to a single product or an array of products.
 * Only adjusts the `price` field if it exists and is a number.
 */
export function applyPriceAdjustment(data) {
  if (!data) return data;

  if (Array.isArray(data)) {
    return data.map((item) => ({
      ...item,
      ...(typeof item.price === "number"
        ? { price: item.price + PRICE_ADJUSTMENT }
        : {}),
    }));
  }

  // Single product
  return {
    ...data,
    ...(typeof data.price === "number"
      ? { price: data.price + PRICE_ADJUSTMENT }
      : {}),
  };
}
