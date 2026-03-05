"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { personal } from "@/lib/data";
import { ChevronDown } from "lucide-react";

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ─── Staggered character reveal ───────────────────────────────────────────
function AnimatedText({ text, delay = 0 }: { text: string; delay?: number }) {
  const chars = text.split("");
  return (
    <span className="inline-block overflow-hidden">
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

// ─── Role typewriter ──────────────────────────────────────────────────────
function RoleTypewriter({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = roles[index];
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < target.length) {
      timer = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === target.length) {
      timer = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [displayed, deleting, index, roles]);

  return (
    <span className="typing-cursor font-body text-[var(--text-body)] text-base sm:text-lg md:text-xl">
      {displayed}
    </span>
  );
}

// ─── Scroll indicator ─────────────────────────────────────────────────────
function ScrollIndicator() {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3, duration: 0.8 }}
      onClick={() => scrollToSection("about")}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-body)] hover:text-[var(--accent)] transition-colors group"
    >
      <span className="font-body text-xs uppercase tracking-[0.2em] opacity-60 group-hover:opacity-100 transition-opacity">
        Scroll
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </motion.button>
  );
}

// ─── Hero Text Layer ──────────────────────────────────────────────────────
export default function HeroText() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-4 sm:px-6">
      {/* Pre-title label */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mb-6 flex items-center gap-3"
      >
        <span className="h-px w-10 bg-[var(--accent)] opacity-60" />
        <span className="font-accent text-[var(--accent)] text-xs uppercase tracking-[0.3em]">
          {personal.title}
        </span>
        <span className="h-px w-10 bg-[var(--accent)] opacity-60" />
      </motion.div>

      {/* Name — massive display */}
      <h1 className="font-display text-white leading-none mb-4" style={{ fontSize: "clamp(3.5rem, 14vw, 12rem)" }}>
        <span className="block">
          <AnimatedText text={personal.firstName} delay={0.5} />
        </span>
        <span className="block text-gradient-cyan">
          <AnimatedText text={personal.lastName} delay={0.9} />
        </span>
      </h1>

      {/* Role typewriter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="mb-10 h-8 flex items-center"
      >
        <RoleTypewriter roles={personal.roles} />
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <button
          onClick={() => scrollToSection("projects")}
          className="btn-neon px-8 py-3 text-sm rounded-sm"
        >
          View Work
        </button>
        <a
          href="/assets/resume.pdf"
          download
          className="btn-neon btn-neon-amber px-8 py-3 text-sm rounded-sm"
        >
          Download Resume
        </a>
      </motion.div>

      <ScrollIndicator />
    </div>
  );
}
