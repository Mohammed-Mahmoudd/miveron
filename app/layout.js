import { Inter, Space_Grotesk, Cairo } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartProvider from "./context/CartContext";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

const BASE_URL = "https://miveron.com";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "MIVERON — Premium Luxury Watches in Egypt | Free Delivery",
    template: "%s | MIVERON",
  },
  description:
    "Shop premium luxury watches in Egypt. MIVERON offers curated collections of elegant timepieces with free delivery across Egypt & cash on delivery. ساعات فاخرة في مصر",
  keywords: [
    "luxury watches Egypt",
    "premium watches Cairo",
    "buy watches online Egypt",
    "ساعات فاخرة مصر",
    "ساعات رجالي",
    "Miveron",
    "Miveron watches",
    "watches Cairo",
    "elegant watches",
    "men watches Egypt",
    "affordable luxury watches",
    "cash on delivery watches Egypt",
    "free delivery watches",
    "online watch store Egypt",
  ],
  authors: [{ name: "MIVERON", url: BASE_URL }],
  creator: "MIVERON",
  publisher: "MIVERON",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "MIVERON — Premium Luxury Watches in Egypt",
    description:
      "Shop curated luxury watches with free delivery across Egypt. Before everyone else.",
    url: BASE_URL,
    siteName: "MIVERON",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "MIVERON — Premium Luxury Watches",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MIVERON — Premium Luxury Watches in Egypt",
    description:
      "Curated luxury watches with free delivery across Egypt. Before everyone else.",
    images: ["/logo.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon.png" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: "your-verification-code",
  },
  category: "ecommerce",
};

// JSON-LD Structured Data for Organization
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MIVERON",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.jpeg`,
  description:
    "Premium luxury watch store in Egypt. Curated collections of elegant timepieces with free delivery.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cairo",
    addressCountry: "EG",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+201501685539",
    contactType: "customer service",
    availableLanguage: ["English", "Arabic"],
  },
  sameAs: [
    "https://www.instagram.com/its.miveron/",
    "https://www.tiktok.com/@miveron1",
    "https://www.facebook.com/share/1BKDLECa7m/",
  ],
};

// JSON-LD for WebSite (enables sitelinks search box in Google)
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "MIVERON",
  url: BASE_URL,
  description: "Premium luxury watch store in Egypt",
  potentialAction: {
    "@type": "SearchAction",
    target: `${BASE_URL}/shop?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

// JSON-LD for Online Store
const storeJsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "MIVERON",
  url: BASE_URL,
  description:
    "Premium luxury watch store in Egypt with free delivery and cash on delivery.",
  image: `${BASE_URL}/logo.jpeg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cairo",
    addressCountry: "EG",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "30.0444",
    longitude: "31.2357",
  },
  priceRange: "EGP 159 - EGP 399",
  currenciesAccepted: "EGP",
  paymentAccepted: "Cash on Delivery",
  areaServed: {
    "@type": "Country",
    name: "Egypt",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Luxury Watches",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Core Collection",
      },
      {
        "@type": "OfferCatalog",
        name: "Icon Collection",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} ${spaceGrotesk.variable} ${cairo.variable}`}>
      <head>
        <link rel="canonical" href={BASE_URL} />
        <meta name="theme-color" content="#000000" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(storeJsonLd),
          }}
        />
      </head>
      <body className="grain-overlay">
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-Q9HXSSWMMH"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Q9HXSSWMMH');
          `}
        </Script>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
