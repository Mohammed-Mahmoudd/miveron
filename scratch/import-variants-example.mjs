import { createClient } from 'next-sanity';

// 1. Create a token at https://manage.sanity.io/projects/c69w2hr0/api
const token = "YOUR_SANITY_TOKEN"; // Use the one from your import-data.mjs

const client = createClient({
  projectId: "c69w2hr0",
  dataset: "production",
  apiVersion: "2024-05-10",
  useCdn: false,
  token: token,
});

const productsWithVariants = [
  {
    name: "Phantom",
    collection: "core",
    tagline: "Invisible until it's on.",
    price: 850,
    currency: "EGP",
    mainImage: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80",
    variants: [
      {
        colorName: "Matte Black",
        colorCode: "#000000",
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80"
      },
      {
        colorName: "Midnight Blue",
        colorCode: "#191970",
        image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&q=80"
      }
    ],
    // ... other specs
  }
];

async function uploadImageToSanity(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const asset = await client.assets.upload('image', blob, {
      filename: 'variant-image.jpg',
    });
    return asset._id;
  } catch (error) {
    console.error('Image upload failed:', error.message);
    return null;
  }
}

async function importWithVariants() {
  for (const item of productsWithVariants) {
    console.log(`Processing: ${item.name}`);

    // Upload main image
    const mainImageRef = await uploadImageToSanity(item.mainImage);

    // Upload variant images and build variant objects
    const variantObjects = [];
    for (const v of item.variants) {
      const vImageRef = await uploadImageToSanity(v.image);
      variantObjects.push({
        _key: Math.random().toString(36).substring(2, 9),
        colorName: v.colorName,
        colorCode: v.colorCode,
        image: vImageRef ? {
          _type: 'image',
          asset: { _type: 'reference', _ref: vImageRef }
        } : undefined
      });
    }

    const doc = {
      _type: 'product',
      name: item.name,
      price: item.price,
      image: mainImageRef ? {
        _type: 'image',
        asset: { _type: 'reference', _ref: mainImageRef }
      } : undefined,
      variants: variantObjects,
      // ... other fields
    };

    await client.create(doc);
    console.log(`✅ Created ${item.name} with ${variantObjects.length} variants`);
  }
}

importWithVariants();
