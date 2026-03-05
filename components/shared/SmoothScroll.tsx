"use client";

// SmoothScroll is removed — native CSS scroll-behavior: smooth is used instead.
// Lenis caused jank when competing with Three.js's own requestAnimationFrame loop.
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
