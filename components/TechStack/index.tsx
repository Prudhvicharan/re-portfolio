"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import SectionWrapper from "../shared/SectionWrapper";

/* ─── Speed per row (alternating, varied) ────────────────── */
const ROW_SPEEDS = [22, 16, 26, 18, 20, 14, 24, 16];

/* ─── A single minimal pill ──────────────────────────────── */
function Pill({ name, index }: { name: string; index: number }) {
  return (
    <span style={{
      flexShrink: 0,
      display: "inline-flex", alignItems: "center",
      padding: "8px 22px",
      margin: "0 8px",
      borderRadius: 3,
      border: `1px solid rgba(0,229,255,${0.1 + (index % 3) * 0.04})`,
      background: index % 2 === 0 ? "rgba(0,229,255,0.03)" : "transparent",
      fontFamily: "var(--font-body)",
      fontSize: 12,
      letterSpacing: "0.06em",
      color: "rgba(168,178,200,0.75)",
      whiteSpace: "nowrap",
      userSelect: "none",
    }}>
      {name}
    </span>
  );
}

/* ─── One scrolling strip for a category ────────────────── */
function CategoryStrip({
  label, items, index, reversed,
}: {
  label: string; items: string[]; index: number; reversed: boolean;
}) {
  const speed = ROW_SPEEDS[index] ?? 35;
  const tripled = [...items, ...items, ...items];

  return (
    <motion.div
      initial={{ opacity: 0, x: reversed ? 30 : -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      style={{ display: "flex", alignItems: "center" }}
      className="marquee-row"
    >
      {/* Fixed label side */}
      <div style={{
        flexShrink: 0,
        width: "clamp(90px, 11vw, 130px)",
        paddingRight: 16,
        borderRight: "1px solid rgba(0,229,255,0.08)",
        marginRight: 0,
      }}>
        <p style={{
          fontFamily: "var(--font-accent)",
          fontSize: "clamp(7px, 1.1vw, 10px)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(0,229,255,0.6)",
          lineHeight: 1.4,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {label}
        </p>
      </div>

      {/* Scrolling pills area */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        {/* Edge fades */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 48,
          background: "linear-gradient(to right, #0D1525, transparent)",
          zIndex: 5, pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: 48,
          background: "linear-gradient(to left, #0D1525, transparent)",
          zIndex: 5, pointerEvents: "none",
        }} />
        <div
          style={{
            display: "flex",
            animation: `${reversed ? "marquee-right" : "marquee-left"} ${speed}s linear infinite`,
          }}
        >
          {tripled.map((name, i) => (
            <Pill key={`${name}-${i}`} name={name} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}


export default function TechStack() {
  const categories = Object.entries(skills) as [string, string[]][];

  return (
    <SectionWrapper id="skills">
      <div style={{ background: "#0D1525", paddingTop: 96, paddingBottom: 120, position: "relative" }}>
        {/* Subtle glows */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "20%", right: 0, width: 360, height: 360, background: "rgba(0,229,255,0.025)", filter: "blur(120px)", borderRadius: "50%" }} />
          <div style={{ position: "absolute", bottom: "10%", left: "10%", width: 280, height: 280, background: "rgba(0,229,255,0.015)", filter: "blur(100px)", borderRadius: "50%" }} />
        </div>

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(20px, 4vw, 32px)", position: "relative" }}>
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 56, flexWrap: "wrap" }}
          >
            <span style={{ fontFamily: "var(--font-accent)", color: "#00E5FF", fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase" }}>03.</span>
            <div style={{ height: 1, width: 80, background: "linear-gradient(to right, #00E5FF, transparent)", opacity: 0.3 }} />
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "white", textTransform: "uppercase", letterSpacing: "-0.02em", margin: 0 }}>
              What I Build With
            </h2>
          </motion.div>

          {/* Category strips — all tech in labeled rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {categories.map(([label, items], i) => (
              <CategoryStrip
                key={label}
                label={label}
                items={items}
                index={i}
                reversed={i % 2 === 1}
              />
            ))}
          </div>

          {/* Bottom hint */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            style={{
              fontFamily: "var(--font-accent)", fontSize: 9, letterSpacing: "0.2em",
              color: "rgba(168,178,200,0.25)", textAlign: "center",
              textTransform: "uppercase", marginTop: 40,
            }}
          >
            and many more tools across the stack
          </motion.p>
        </div>
      </div>
    </SectionWrapper>
  );
}
