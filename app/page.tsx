"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/shared/SmoothScroll";
import Navbar from "@/components/shared/Navbar";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

// Lazy load hero to avoid SSR issues with Three.js
const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });

export default function HomePage() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
