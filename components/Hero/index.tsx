"use client";

import { useRef, Suspense, lazy } from "react";

const HeroScene = lazy(() => import("./HeroScene"));
import HeroText from "./HeroText";

export default function Hero() {
  const mouse = useRef<[number, number]>([0, 0]);

  return (
    <section
      id="hero"
      className="relative w-full h-screen bg-[var(--bg)] overflow-hidden"
      onMouseMove={(e) => {
        mouse.current = [
          (e.clientX / window.innerWidth) * 2 - 1,
          -((e.clientY / window.innerHeight) * 2 - 1),
        ];
      }}
    >
      {/* Radial glow behind the 3D scene */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[70vw] h-[70vh] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgba(0,229,255,0.07) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* 3D Canvas (lazy loaded, SSR-safe) */}
      <Suspense fallback={null}>
        <HeroScene mouse={mouse} />
      </Suspense>

      {/* HTML text overlay */}
      <HeroText />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[var(--bg)] to-transparent pointer-events-none" />
    </section>
  );
}
