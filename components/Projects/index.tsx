"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/lib/data";
import SectionWrapper from "../shared/SectionWrapper";

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 });
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });
  const isAmber = index % 2 !== 0;
  const accent = isAmber ? "#FF9F1C" : "#00E5FF";
  const borderColor = isAmber ? "rgba(255,159,28,0.2)" : "rgba(0,229,255,0.15)";

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - left - width / 2) / (width / 2));
    y.set((e.clientY - top - height / 2) / (height / 2));
  }
  function onMouseLeave() { x.set(0); y.set(0); }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.1 }}
      style={{
        perspective: 1000,
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: "preserve-3d",
        background: "rgba(13,21,37,0.7)",
        backdropFilter: "blur(20px)",
        border: `1px solid ${borderColor}`,
        borderRadius: 20,
        overflow: "hidden",
        cursor: "default",
      }}
      className="hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-shadow duration-300"
    >
      {/* Accent top bar */}
      <div style={{ height: 4, background: `linear-gradient(to right, ${accent}, transparent)` }} />

      <div style={{ padding: "28px" }}>
        {/* Title row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 10, color: accent, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 4, opacity: 0.8 }}>
              {project.tagline}
            </p>
            <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, color: "white", fontSize: "1.25rem" }}>{project.name}</h3>
          </div>
          <div style={{ display: "flex", gap: 8, flexShrink: 0, marginLeft: 16 }}>
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}
                className="hover:text-white hover:border-white transition-colors"
              >
                <Github size={15} />
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: 8, border: `1px solid ${borderColor}`, color: accent }}
                className="hover:bg-[rgba(0,229,255,0.05)] transition-colors"
              >
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>

        {/* Metric */}
        <div style={{
          fontFamily: "var(--font-heading)", fontWeight: 900,
          fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
          color: accent, marginBottom: 4, lineHeight: 1,
        }}>
          {project.metrics.headline}
        </div>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--text-body)", fontSize: 12, opacity: 0.6, marginBottom: 14 }}>
          {project.metrics.sub}
        </p>

        <p style={{ fontFamily: "var(--font-body)", color: "var(--text-body)", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: 20 }}>
          {project.description}
        </p>

        {/* Tech stack */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {project.stack.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "var(--font-body)", fontSize: 11, color: "var(--text-body)",
                border: "1px solid rgba(168,178,200,0.15)", padding: "4px 10px", borderRadius: 4,
                background: "rgba(168,178,200,0.04)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <div style={{ background: "#0D1525", paddingTop: 96, paddingBottom: 128, position: "relative" }}>
        {/* Glows */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: 0, left: "25%", width: 384, height: 384, background: "rgba(0,229,255,0.03)", filter: "blur(120px)", borderRadius: "50%" }} />
          <div style={{ position: "absolute", bottom: 0, right: "25%", width: 320, height: 320, background: "rgba(255,159,28,0.04)", filter: "blur(120px)", borderRadius: "50%" }} />
        </div>

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 56, flexWrap: "wrap" }}
          >
            <span style={{ fontFamily: "var(--font-accent)", color: "#00E5FF", fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase" }}>05.</span>
            <div style={{ height: 1, width: 80, background: "linear-gradient(to right, #00E5FF, transparent)", opacity: 0.4 }} />
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "white", textTransform: "uppercase", letterSpacing: "-0.02em", margin: 0 }}>
              What I&apos;ve Built
            </h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))", gap: 32 }}>
            {projects.map((p, i) => (
              <ProjectCard key={p.name} project={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
