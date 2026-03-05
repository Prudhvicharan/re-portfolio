"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";
import SectionWrapper from "../shared/SectionWrapper";

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <div style={{ background: "#060810", paddingTop: 96, paddingBottom: 128, position: "relative" }}>
        {/* Glow */}
        <div style={{ position: "absolute", bottom: "25%", left: 0, width: 320, height: 320, background: "rgba(0,229,255,0.04)", filter: "blur(140px)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "10%", right: "10%", width: 200, height: 200, background: "rgba(255,159,28,0.03)", filter: "blur(100px)", borderRadius: "50%", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 64, flexWrap: "wrap" }}
          >
            <span style={{ fontFamily: "var(--font-accent)", color: "#00E5FF", fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase" }}>04.</span>
            <div style={{ height: 1, width: 80, background: "linear-gradient(to right, #00E5FF, transparent)", opacity: 0.4 }} />
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "white", textTransform: "uppercase", letterSpacing: "-0.02em", margin: 0 }}>
              Where I&apos;ve Worked
            </h2>
          </motion.div>

          {/* Experience cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {experience.map((role, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                style={{
                  background: "rgba(13,21,37,0.7)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(0,229,255,0.1)",
                  borderRadius: 20,
                  padding: "clamp(24px, 4vw, 36px)",
                  position: "relative",
                  overflow: "hidden",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
                className="hover:border-[rgba(0,229,255,0.3)] hover:shadow-[0_0_40px_rgba(0,229,255,0.07)]"
              >
                {/* Left accent bar */}
                <div style={{
                  position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
                  background: role.current
                    ? "linear-gradient(to bottom, #00E5FF, rgba(0,229,255,0.1))"
                    : "linear-gradient(to bottom, rgba(168,178,200,0.3), transparent)",
                  borderRadius: "0 0 0 20px",
                }} />

                {/* Top row: role + date */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 8, paddingLeft: 12 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                      <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, color: "white", fontSize: "clamp(1rem, 2vw, 1.25rem)", margin: 0 }}>{role.role}</h3>
                      {role.current && (
                        <span style={{
                          fontFamily: "var(--font-body)", fontSize: 9, color: "#00E5FF",
                          border: "1px solid rgba(0,229,255,0.4)", padding: "3px 10px",
                          borderRadius: 999, background: "rgba(0,229,255,0.08)",
                          textTransform: "uppercase", letterSpacing: "0.15em",
                        }}>● Live</span>
                      )}
                    </div>
                    <p style={{ fontFamily: "var(--font-body)", color: "#00E5FF", fontSize: 13, marginTop: 4, margin: "4px 0 0" }}>{role.company}</p>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <p style={{ fontFamily: "var(--font-body)", color: "#A8B2C8", fontSize: 12, opacity: 0.65, margin: 0 }}>{role.period}</p>
                    <p style={{ fontFamily: "var(--font-body)", color: "#A8B2C8", fontSize: 11, opacity: 0.45, marginTop: 3 }}>{role.location}</p>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: "rgba(168,178,200,0.07)", margin: "16px 0 16px 12px" }} />

                {/* Highlights */}
                <ul style={{ listStyle: "none", padding: "0 0 0 12px", margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {role.highlights.map((h, j) => (
                    <li key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ color: "#00E5FF", marginTop: 1, flexShrink: 0, opacity: 0.7 }}>▸</span>
                      <span style={{ fontFamily: "var(--font-body)", color: "#A8B2C8", fontSize: "clamp(0.78rem, 1.2vw, 0.875rem)", lineHeight: 1.75 }}>{h}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
