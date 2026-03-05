"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { personal, stats } from "@/lib/data";
import SectionWrapper from "../shared/SectionWrapper";
import CountUp from "./CountUp";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const coreTechs = ["React", "Node.js", "OpenAI", "AWS", "TypeScript", "Docker", "LangChain", "PostgreSQL"];

  return (
    <SectionWrapper id="about">
      <div
        style={{
          background: "#060810",
          padding: "96px 0 120px",
          position: "relative",
        }}
      >
        {/* Decorative glows */}
        <div style={{ position: "absolute", top: 0, left: 0, width: 384, height: 384, background: "rgba(0,229,255,0.04)", filter: "blur(120px)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 320, height: 320, background: "rgba(255,159,28,0.04)", filter: "blur(120px)", borderRadius: "50%", pointerEvents: "none" }} />

        {/* Decorative bracket */}
        <svg style={{ position: "absolute", top: 32, right: 32, opacity: 0.08 }} width="80" height="80" viewBox="0 0 80 80" fill="none">
          <text x="4" y="44" fontSize="32" fill="#00E5FF" fontFamily="monospace">{"{"}</text>
          <text x="40" y="70" fontSize="32" fill="#FF9F1C" fontFamily="monospace">{"}"}</text>
        </svg>

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 64, flexWrap: "wrap" }}
          >
            <span style={{ fontFamily: "var(--font-accent)", color: "#00E5FF", fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase" }}>02.</span>
            <div style={{ height: 1, width: 80, background: "linear-gradient(to right, #00E5FF, transparent)", opacity: 0.4 }} />
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "white", textTransform: "uppercase", letterSpacing: "-0.02em", margin: 0 }}>
              Who I Am
            </h2>
          </motion.div>

          {/* Two column layout */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: 64, alignItems: "start" }}>
            {/* Left: Bio + chips */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <p style={{ fontFamily: "var(--font-body)", color: "#A8B2C8", fontSize: "clamp(0.875rem, 1.4vw, 1rem)", lineHeight: 1.85, marginBottom: 20 }}>
                {personal.bio}
              </p>
              <p style={{ fontFamily: "var(--font-body)", color: "#A8B2C8", fontSize: "clamp(0.8rem, 1.2vw, 0.9rem)", lineHeight: 1.85, marginBottom: 40, opacity: 0.75 }}>
                Whether it&apos;s designing multi-tenant microservice architectures, integrating LLMs into production pipelines, or migrating a million-line Angular codebase to React — I thrive at the intersection of engineering rigor and product velocity.
              </p>

              {/* Tech chips - clearly visible with enough margin */}
              <div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "#A8B2C8", opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 14 }}>
                  Core Stack
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {coreTechs.map((tech) => (
                    <motion.span
                      key={tech}
                      whileHover={{ y: -3, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 12,
                        color: "#00E5FF",
                        border: "1px solid rgba(0,229,255,0.3)",
                        padding: "7px 16px",
                        borderRadius: 999,
                        background: "rgba(0,229,255,0.06)",
                        cursor: "default",
                        display: "inline-block",
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Stat cards */}
            <motion.div
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -6, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{
                    background: "rgba(13,21,37,0.8)",
                    border: "1px solid rgba(0,229,255,0.12)",
                    borderRadius: 14,
                    padding: "18px 14px",
                    cursor: "default",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                >
                  <div style={{ fontSize: 20, marginBottom: 8 }}>{stat.icon}</div>
                  <div style={{ fontFamily: "var(--font-accent)", color: "#00E5FF", fontSize: "clamp(1.1rem, 2vw, 1.6rem)", fontWeight: 700, lineHeight: 1 }}>
                    {inView ? <CountUp end={stat.value} suffix={stat.suffix} /> : `0${stat.suffix}`}
                  </div>
                  <div style={{ fontFamily: "var(--font-body)", color: "#A8B2C8", fontSize: 10, marginTop: 6, lineHeight: 1.4 }}>{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
