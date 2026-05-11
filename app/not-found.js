import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist. Browse MIVERON's premium watch collection.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        color: "#f5f5f5",
        fontFamily: "var(--font-display), sans-serif",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <span
        style={{
          fontSize: "0.65rem",
          fontWeight: 600,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "#8a8a8a",
          marginBottom: "1rem",
        }}
      >
        404 — Not Found
      </span>
      <h1
        style={{
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          marginBottom: "1.5rem",
        }}
      >
        Lost in time.
      </h1>
      <p
        style={{
          fontSize: "1rem",
          color: "#8a8a8a",
          maxWidth: "400px",
          lineHeight: 1.6,
          marginBottom: "2rem",
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
      </p>
      <Link
        href="/shop"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          background: "#f5f5f5",
          color: "#000",
          padding: "14px 36px",
          fontSize: "0.8rem",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          borderRadius: "4px",
          textDecoration: "none",
          transition: "all 0.3s ease",
        }}
      >
        BROWSE COLLECTION
      </Link>
    </div>
  );
}
