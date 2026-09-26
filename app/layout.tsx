import type { Metadata, Viewport } from "next";
import { personal } from "@/lib/data";
import "./globals.css";

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

const title = "Prudhvi Charan | Full-Stack Application Developer";
const description = "Prudhvi Charan P — Application Developer II at HNTB. Full-stack applications and data engineering with .NET/C#, SQL, Python, Azure, and Databricks.";

export const metadata: Metadata = {
  metadataBase: new URL(personal.portfolio),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/",
    images: [{ url: "/social-preview.png", width: 1200, height: 630, alt: "Prudhvi Charan — Full-Stack Application Developer" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/social-preview.png"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Orbitron:wght@400;500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
