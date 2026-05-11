export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/checkout/success"],
      },
    ],
    sitemap: "https://miveron.com/sitemap.xml",
  };
}
