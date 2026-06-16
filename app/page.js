import { client, applyPriceAdjustment } from "../lib/sanity";
import HomeContent from "./HomeContent";

async function getProducts() {
  const query = `*[_type == "product" && !(_id in path("drafts.**"))]{
    "id": _id,
    name,
    price,
    "collection": collection,
    "image": image.asset->url,
    inStock,
    color,
    description,
    badge,
    currency
  }`;
  const data = await client.fetch(query);
  return applyPriceAdjustment(data || []);
}

export default async function Home() {
  const products = await getProducts();
  return <HomeContent products={products} />;
}
