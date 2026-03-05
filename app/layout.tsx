import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Prudhvi Charan | Senior Full-Stack AI Engineer",
  description:
    "Portfolio of Prudhvi Charan P — Senior Full-Stack AI Engineer with 5+ years of experience building AI-powered apps, microservices, and cloud-native systems.",
  keywords: ["Full-Stack Engineer", "AI Engineer", "React", "Node.js", "OpenAI", "AWS", "TypeScript"],
  openGraph: {
    title: "Prudhvi Charan | Senior Full-Stack AI Engineer",
    description: "Building AI systems that scale to millions. Healthcare, Recruitment, Enterprise SaaS.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600&family=Orbitron:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
