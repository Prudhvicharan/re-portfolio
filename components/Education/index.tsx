"use client";

import { motion } from "framer-motion";
import { education } from "@/lib/data";
import SectionWrapper from "../shared/SectionWrapper";
import { GraduationCap, MapPin, Calendar, BookOpen } from "lucide-react";

const yearColors = ["#00E5FF", "#A855F7"];

export default function Education() {
  return (
    <SectionWrapper id="education">
      <div style={{
        background: "linear-gradient(135deg, #0A0F1E 0%, #060810 60%, #0A0A1A 100%)",
        paddingTop: 96, paddingBottom: 128, position: "relative", overflow: "hidden",
      }}>
        {/* Large ghost text */}
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(100px, 18vw, 200px)",
          color: "white", opacity: 0.018, pointerEvents: "none", whiteSpace: "nowrap", letterSpacing: "-0.05em",
        }}>EDU</div>

        {/* Dot grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(168,85,247,0.07) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }} />

        {/* Glows */}
        <div style={{ position: "absolute", top: "10%", right: "5%", width: 350, height: 350, background: "rgba(168,85,247,0.05)", filter: "blur(100px)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "15%", left: "5%", width: 250, height: 250, background: "rgba(0,229,255,0.04)", filter: "blur(80px)", borderRadius: "50%", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(20px, 5vw, 32px)", position: "relative" }}>
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 56, flexWrap: "wrap" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-accent)", color: "#A855F7", fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", flexShrink: 0 }}>06.</span>
              <div style={{ height: 1, width: 60, background: "linear-gradient(to right, #A855F7, transparent)", opacity: 0.4, flexShrink: 0 }} />
              <h2 style={{
                fontFamily: "var(--font-heading)", fontWeight: 900,
                fontSize: "clamp(1.6rem, 5vw, 3.8rem)",
                color: "white", textTransform: "uppercase", letterSpacing: "-0.02em",
                margin: 0,
                wordBreak: "break-word", overflowWrap: "anywhere", maxWidth: "100%",
              }}>
                Education
              </h2>
            </div>
          </motion.div>

          {/*
            Timeline layout:
            - 80px left column: holds the vertical line + circle icon
            - flex: 1 right column: card content
          */}
          <div style={{ position: "relative" }}>
            {/* The continuous vertical line behind all items */}
            <div style={{
              position: "absolute",
              left: 39, /* center of the 80px column */
              top: 0, bottom: 0,
              width: 2,
              background: "linear-gradient(to bottom, #A855F7, rgba(0,229,255,0.4))",
              opacity: 0.25,
            }} />

            <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
              {education.map((edu, i) => {
                const accentColor = yearColors[i] ?? "#00E5FF";
                const year = edu.period.split("–")[1]?.trim().split(" ").pop() ?? "2024";

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.12 }}
                    style={{ display: "flex", gap: "clamp(14px, 3vw, 32px)", alignItems: "flex-start" }}
                  >
                    {/* Left column: icon + year (fixed 80px) */}
                    <div style={{
                      flexShrink: 0, width: "clamp(60px, 8vw, 80px)",
                      display: "flex", flexDirection: "column", alignItems: "center",
                      position: "relative", zIndex: 2,
                      paddingTop: 4,
                    }}>
                      {/* Circle icon */}
                      <div style={{
                        width: "clamp(44px, 7vw, 56px)", height: "clamp(44px, 7vw, 56px)", borderRadius: "50%",
                        background: `radial-gradient(circle at 35% 35%, ${accentColor}22, rgba(6,8,16,0.95))`,
                        border: `2px solid ${accentColor}55`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: `0 0 24px ${accentColor}20`,
                        flexShrink: 0,
                      }}>
                        <GraduationCap size={18} color={accentColor} />
                      </div>
                      {/* Year below icon */}
                      <div style={{
                        fontFamily: "var(--font-heading)", fontWeight: 900,
                        fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                        color: accentColor, opacity: 0.22,
                        marginTop: 10, lineHeight: 1, textAlign: "center",
                      }}>
                        {year}
                      </div>
                    </div>

                    {/* Right column: card */}
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      style={{
                        flex: 1,
                        background: `linear-gradient(135deg, rgba(13,21,37,0.85) 0%, rgba(6,8,16,0.9) 100%)`,
                        border: `1px solid ${accentColor}20`,
                        borderRadius: 20, overflow: "hidden",
                        padding: "clamp(20px, 4vw, 32px)",
                        position: "relative",
                        transition: "border-color 0.3s, box-shadow 0.3s",
                        minWidth: 0, /* prevent flex overflow */
                      }}
                      className="hover:shadow-[0_16px_50px_rgba(0,0,0,0.4)]"
                    >
                      {/* Corner glow */}
                      <div style={{
                        position: "absolute", top: 0, right: 0,
                        width: 120, height: 120,
                        background: `radial-gradient(circle at top right, ${accentColor}0B, transparent 70%)`,
                        pointerEvents: "none",
                      }} />

                      {/* Badge */}
                      <div style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        fontFamily: "var(--font-body)", fontSize: 9,
                        color: accentColor,
                        background: `${accentColor}14`,
                        border: `1px solid ${accentColor}30`,
                        padding: "5px 12px", borderRadius: 999,
                        textTransform: "uppercase", letterSpacing: "0.2em",
                        marginBottom: 14,
                      }}>
                        {i === 0 ? "🎓 Graduate" : "🏛️ Undergraduate"}
                      </div>

                      {/* Degree */}
                      <h3 style={{
                        fontFamily: "var(--font-heading)", fontWeight: 800, color: "white",
                        fontSize: "clamp(0.95rem, 2.5vw, 1.35rem)", lineHeight: 1.3,
                        marginBottom: 6, letterSpacing: "-0.01em",
                      }}>
                        {edu.degree}
                      </h3>

                      <p style={{ fontFamily: "var(--font-body)", color: accentColor, fontSize: 13, marginBottom: 16 }}>
                        {edu.institution}
                      </p>

                      {/* Meta */}
                      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 20 }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-body)", color: "#A8B2C8", fontSize: 11, opacity: 0.6 }}>
                          <MapPin size={11} /> {edu.location}
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-body)", color: "#A8B2C8", fontSize: 11, opacity: 0.6 }}>
                          <Calendar size={11} /> {edu.period}
                        </span>
                      </div>

                      {/* GPA block */}
                      <div style={{
                        display: "inline-flex", flexDirection: "column",
                        background: `linear-gradient(135deg, ${accentColor}14, ${accentColor}05)`,
                        border: `1px solid ${accentColor}28`,
                        borderRadius: 12, padding: "10px 18px", marginBottom: 20,
                      }}>
                        <span style={{ fontFamily: "var(--font-body)", fontSize: 9, color: accentColor, opacity: 0.55, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 4 }}>GPA</span>
                        <span style={{ fontFamily: "var(--font-accent)", fontWeight: 700, fontSize: "clamp(1.1rem, 2vw, 1.5rem)", color: accentColor, lineHeight: 1 }}>
                          {edu.gpa}
                        </span>
                      </div>

                      {/* Coursework */}
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                          <BookOpen size={11} color="#A8B2C8" opacity={0.45} />
                          <span style={{ fontFamily: "var(--font-body)", fontSize: 9, color: "#A8B2C8", opacity: 0.45, textTransform: "uppercase", letterSpacing: "0.2em" }}>Key Coursework</span>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                          {edu.courses.map((c) => (
                            <span key={c} style={{
                              fontFamily: "var(--font-body)", fontSize: 11, color: "#A8B2C8",
                              border: "1px solid rgba(168,178,200,0.1)", padding: "5px 12px", borderRadius: 6,
                              background: "rgba(168,178,200,0.04)",
                            }}>
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
