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
