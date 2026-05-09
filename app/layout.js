import { Inter, Space_Grotesk, Cairo } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartProvider from "./context/CartContext";

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

export const metadata = {
  title: "MIVERON — Before Everyone Else",
  description:
    "Est. Cairo. Premium watches for the ones who move first. Don't follow time. Set it.",
  keywords: ["watches", "luxury", "Egypt", "Cairo", "Miveron", "premium", "timepiece"],
  openGraph: {
    title: "MIVERON — Before Everyone Else",
    description: "Est. Cairo. Premium watches for the ones who move first.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${cairo.variable}`}>
      <body className="grain-overlay">
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
