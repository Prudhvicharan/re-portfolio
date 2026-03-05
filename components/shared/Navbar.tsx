"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "@/lib/data";
import { Menu, X } from "lucide-react";

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // JS-driven mobile breakpoint (avoids Tailwind class compilation issues)
  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navItems.map((n) => document.getElementById(n.id));
      let current = "";
      sections.forEach((sec) => {
        if (sec && sec.getBoundingClientRect().top <= 120) current = sec.id;
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          transition: "all 0.4s",
          background: scrolled ? "rgba(6,8,16,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,229,255,0.06)" : "none",
          padding: scrolled ? "14px 0" : "20px 0",
        }}
      >
        <div style={{
          maxWidth: 1280, margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 40px)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              fontFamily: "var(--font-accent)", color: "#00E5FF",
              fontSize: 18, letterSpacing: "0.15em", fontWeight: 700,
              background: "none", border: "none", cursor: "pointer",
              flexShrink: 0,
            }}
          >
            PC<span style={{ color: "white" }}>.</span>
          </button>

          {/* Desktop Nav — shown only when not mobile */}
          {!isMobile && (
            <ul style={{ display: "flex", alignItems: "center", gap: 36, listStyle: "none", margin: 0, padding: 0 }}>
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    style={{
                      fontFamily: "var(--font-body)", fontSize: 11,
                      textTransform: "uppercase", letterSpacing: "0.12em",
                      color: active === item.id ? "#00E5FF" : "rgba(168,178,200,0.7)",
                      background: "none", border: "none", cursor: "pointer",
                      transition: "color 0.2s", position: "relative", padding: "4px 0",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "white")}
                    onMouseLeave={e => (e.currentTarget.style.color = active === item.id ? "#00E5FF" : "rgba(168,178,200,0.7)")}
                  >
                    {item.label}
                    <span style={{
                      position: "absolute", bottom: -2, left: 0,
                      height: 1, width: active === item.id ? "100%" : "0%",
                      background: "#00E5FF", transition: "width 0.3s",
                    }} />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Mobile hamburger — shown only on mobile */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              style={{
                background: "rgba(0,229,255,0.05)", border: "1px solid rgba(0,229,255,0.15)",
                borderRadius: 8, cursor: "pointer", color: "rgba(168,178,200,0.9)",
                padding: "8px 10px", display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <Menu size={22} />
            </button>
          )}
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed", inset: 0, zIndex: 998,
                background: "rgba(6,8,16,0.85)", backdropFilter: "blur(12px)",
              }}
            />
            {/* Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              style={{
                position: "fixed", right: 0, top: 0, bottom: 0, zIndex: 999,
                width: "min(280px, 85vw)",
                background: "rgba(10,15,30,0.98)",
                borderLeft: "1px solid rgba(0,229,255,0.1)",
                display: "flex", flexDirection: "column",
                padding: "clamp(20px, 5vw, 28px)",
              }}
            >
              {/* Drawer header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                <span style={{ fontFamily: "var(--font-accent)", color: "#00E5FF", fontSize: 18, fontWeight: 700, letterSpacing: "0.15em" }}>
                  PC<span style={{ color: "white" }}>.</span>
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  style={{
                    background: "rgba(168,178,200,0.06)", border: "1px solid rgba(168,178,200,0.1)",
                    borderRadius: 8, cursor: "pointer", color: "rgba(168,178,200,0.8)",
                    padding: 8, display: "flex",
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav items */}
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 0, flex: 1 }}>
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <button
                      onClick={() => { setMenuOpen(false); setTimeout(() => scrollToSection(item.id), 280); }}
                      style={{
                        fontFamily: "var(--font-heading)", fontSize: "clamp(1.15rem, 5vw, 1.4rem)",
                        fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em",
                        color: active === item.id ? "#00E5FF" : "rgba(255,255,255,0.85)",
                        background: "none", border: "none", cursor: "pointer",
                        width: "100%", textAlign: "left",
                        padding: "13px 0",
                        borderBottom: "1px solid rgba(168,178,200,0.06)",
                      }}
                    >
                      <span style={{ fontFamily: "var(--font-accent)", color: "#00E5FF", fontSize: 9, marginRight: 10, opacity: 0.5, letterSpacing: "0.15em" }}>
                        {String(i + 1).padStart(2, "0")}.
                      </span>
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </ul>

              {/* Resume CTA at bottom */}
              <div style={{ paddingTop: 20, borderTop: "1px solid rgba(168,178,200,0.07)", marginTop: 12 }}>
                <a
                  href="/assets/resume.pdf"
                  download
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "block", width: "100%",
                    fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600,
                    color: "#00E5FF", textAlign: "center",
                    border: "1px solid rgba(0,229,255,0.3)", borderRadius: 10, padding: "14px",
                    background: "rgba(0,229,255,0.05)", textDecoration: "none",
                    letterSpacing: "0.1em", textTransform: "uppercase",
                  }}
                >
                  Download Resume ↓
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
