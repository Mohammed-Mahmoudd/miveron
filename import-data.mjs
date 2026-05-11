import { createClient } from 'next-sanity';

// 1. Your Sanity Token (already pasted by you)
const token = "sk5KyVrnPch84zEh3Ja3zChipe6jmq6F5a4ewLDIg96auOUrOMjnxR9zQ3GHsBsFY7Gbq7oIP7kOiLcc5l9SBCKxnJU5rng2vjahcUevnHVYQuIbWiNzb3SO2DCH8qK3kTOhF3hHo8IEDPucmzBkL5hT1nDHOFkmA3w4ZOaIztjfHhz59Sb8";

const client = createClient({
  projectId: "c69w2hr0",
  dataset: "production",
  apiVersion: "2024-05-10",
  useCdn: false,
  token: token,
});

// JSON data structure updated for your new schema
const productsData = [
  {
    name: "Phantom",
    price: 850,
    collection: "core",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80",
    variants: [
      {
        colorName: "Matte Black",
        colorCode: "#1a1a1a",
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80"
      },
      {
        colorName: "Midnight Blue",
        colorCode: "#152238",
        image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&q=80"
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1200&q=80",
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=1200&q=80"
    ],
    tagline: "Invisible until it's on.",
    description: "The Phantom is our most minimalist creation yet. Designed for those who appreciate silence and sophistication.",
    caseSize: "40mm",
    movement: "Japanese Quartz",
    caseMaterial: "316L Stainless Steel",
    crystal: "Hardened Mineral",
    strapMaterial: "Genuine Leather",
    waterResistance: "5 ATM",
    features: ["Luminous hands", "Date window", "Ultra-slim profile"],
    badge: "NEW",
    currency: "EGP",
    inStock: true,
  },
  {
    name: "Signal",
    price: 1450,
    collection: "icon",
    image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=80",
    variants: [
      {
        colorName: "Gold & Black",
        colorCode: "#D4AF37",
        image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=80"
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=1200&q=80"
    ],
    tagline: "Ahead of everyone's time.",
    description: "Our signature automatic timepiece featuring a skeleton caseback and premium Miyota movement.",
    caseSize: "42mm",
    movement: "Automatic Miyota 8215",
    caseMaterial: "Stainless Steel / Gold PVD",
    crystal: "Sapphire Coated",
    strapMaterial: "Italian Leather",
    waterResistance: "5 ATM",
    features: ["Skeleton back", "40hr Power reserve", "Gold crown"],
    badge: "ICONIC",
    currency: "EGP",
    inStock: true,
  }
];

async function uploadImage(url) {
  if (!url) return null;
  try {
    console.log(`  - Fetching image: ${url.substring(0, 50)}...`);
    const res = await fetch(url);
    const blob = await res.blob();
    const asset = await client.assets.upload('image', blob, {
      filename: `image-${Date.now()}.jpg`
    });
    return asset._id;
  } catch (err) {
    console.error(`  - Failed to upload image: ${err.message}`);
    return null;
  }
}

async function importData() {
  console.log('🚀 Starting Import for Miveron (Variants & Gallery Edition)...');

  for (const item of productsData) {
    console.log(`\n📦 Processing Product: ${item.name}`);

    // 1. Upload Main Image
    const mainImageRef = await uploadImage(item.image);

    // 2. Upload Variant Images
    const variantDocs = [];
    if (item.variants) {
      for (const variant of item.variants) {
        console.log(`  - Uploading variant image for: ${variant.colorName}`);
        const vImageRef = await uploadImage(variant.image);
        variantDocs.push({
          _type: 'object',
          colorName: variant.colorName,
          colorCode: variant.colorCode,
          image: vImageRef ? {
            _type: 'image',
            asset: { _type: 'reference', _ref: vImageRef }
          } : undefined
        });
      }
    }

    // 3. Upload Gallery Images
    const galleryDocs = [];
    if (item.gallery) {
      for (const gUrl of item.gallery) {
        const gImageRef = await uploadImage(gUrl);
        if (gImageRef) {
          galleryDocs.push({
            _type: 'image',
            asset: { _type: 'reference', _ref: gImageRef }
          });
        }
      }
    }

    // 4. Create Product Document
    const productDoc = {
      _type: 'product',
      name: item.name,
      price: item.price,
      collection: item.collection,
      tagline: item.tagline,
      description: item.description,
      caseSize: item.caseSize,
      movement: item.movement,
      caseMaterial: item.caseMaterial,
      crystal: item.crystal,
      strapMaterial: item.strapMaterial,
      waterResistance: item.waterResistance,
      features: item.features,
      badge: item.badge,
      currency: item.currency || 'EGP',
      inStock: item.inStock ?? true,
      image: mainImageRef ? {
        _type: 'image',
        asset: { _type: 'reference', _ref: mainImageRef }
      } : undefined,
      variants: variantDocs.length > 0 ? variantDocs : undefined,
      gallery: galleryDocs.length > 0 ? galleryDocs : undefined,
    };

    try {
      const result = await client.create(productDoc);
      console.log(`✅ Success! Created product ID: ${result._id}`);
    } catch (err) {
      console.error(`❌ Error creating product: ${err.message}`);
    }
  }

  console.log('\n🏁 Import completed. Check your Sanity Studio!');
}

importData();
