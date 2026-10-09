import type { Metadata, Viewport } from "next";
import { Archivo, Geist, JetBrains_Mono } from "next/font/google";
import { personal } from "@/lib/data";
import "./globals.css";

const display = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-display" });
const body = Geist({ subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#123a86" };

const title = "Prudhvi Charan — Application Developer & Data Engineer";
const description = "Prudhvi Charan P, Application Developer II at HNTB in Kansas City. Full-stack applications and data engineering with .NET/C#, SQL Server, Python, Azure and Databricks.";

export const metadata: Metadata = {
  metadataBase: new URL(personal.portfolio),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, type: "website", url: "/", images: [{ url: "/social-preview.png", width: 1200, height: 630, alt: title }] },
  twitter: { card: "summary_large_image", title, description, images: ["/social-preview.png"] },
};

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.name,
  jobTitle: "Application Developer II",
  worksFor: { "@type": "Organization", name: "HNTB" },
  address: { "@type": "PostalAddress", addressLocality: "Kansas City", addressRegion: "MO", addressCountry: "US" },
  url: personal.portfolio,
  sameAs: [personal.linkedin, personal.github],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        {/* Marks JS as available before first paint, so the cover can animate in without a flash. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js');setTimeout(function(){document.documentElement.classList.add('loaded')},2500)" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
        {children}
      </body>
    </html>
  );
}
