"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Phone, Linkedin, Github, Mail, Copy, Check, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { personal } from "@/lib/data";
import SectionWrapper from "../shared/SectionWrapper";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus("success");
      formRef.current.reset();
    } catch {
      setStatus("error");
    }
  }

  async function copyEmail() {
    await navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const contactLinks = [
    { icon: Phone, label: "Phone", value: personal.phone, href: `tel:${personal.phone}` },
    { icon: Linkedin, label: "LinkedIn", value: `@${personal.linkedin}`, href: `https://linkedin.com/in/${personal.linkedin}` },
    { icon: Github, label: "GitHub", value: `@${personal.github}`, href: `https://github.com/${personal.github}` },
  ];

  const inputStyle = {
    width: "100%",
    background: "rgba(13,21,37,0.8)",
    border: "1px solid rgba(0,229,255,0.15)",
    borderRadius: 10,
    padding: "12px 16px",
    fontFamily: "var(--font-body)",
    color: "white",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box" as const,
  };

  return (
    <SectionWrapper id="contact">
      <div style={{ background: "#060810", paddingTop: 96, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "25%", left: 0, width: 384, height: 384, background: "rgba(0,229,255,0.04)", filter: "blur(140px)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 320, height: 320, background: "rgba(255,159,28,0.04)", filter: "blur(120px)", borderRadius: "50%" }} />
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}
        >
          <span style={{ fontFamily: "var(--font-accent)", color: "var(--accent)", fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase" }}>07.</span>
          <span style={{ height: 1, width: 120, background: "linear-gradient(to right, var(--accent), transparent)", opacity: 0.3 }} />
          <span style={{ fontFamily: "var(--font-body)", color: "var(--text-body)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.5 }}>Contact</span>
        </motion.div>

        {/* Hero headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "var(--font-heading)", fontWeight: 900,
            fontSize: "clamp(1.8rem, 5vw, 4.5rem)",
            color: "white", textTransform: "uppercase", lineHeight: 1.05,
            marginBottom: 20, letterSpacing: "-0.02em",
            overflowWrap: "anywhere", wordBreak: "break-word",
            maxWidth: "100%",
          }}
        >
          Let&apos;s Build Something{" "}
          <span style={{ color: "var(--accent)" }}>Exceptional.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          style={{
            fontFamily: "var(--font-body)", color: "var(--text-body)",
            fontSize: "clamp(0.875rem, 1.5vw, 1rem)", lineHeight: 1.7,
            maxWidth: 520, marginBottom: 52,
          }}
        >
          Whether you have a project idea, an opportunity, or just want to say hi — my inbox is always open.
        </motion.p>

        {/* Two-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: 40, alignItems: "start" }}>
          {/* Left: Contact info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Email copy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{
                background: "rgba(13,21,37,0.6)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(0,229,255,0.15)",
                borderRadius: 14,
                padding: "20px 24px",
              }}
            >
              <p style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "var(--text-body)", opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 10 }}>Direct Email</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Mail size={15} color="var(--accent)" />
                  <span style={{ fontFamily: "var(--font-body)", color: "white", fontSize: 14 }}>{personal.email}</span>
                </div>
                <button
                  onClick={copyEmail}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.2)",
                    borderRadius: 8, padding: "8px 14px", cursor: "pointer",
                    fontFamily: "var(--font-body)", fontSize: 12,
                    color: copied ? "#34D399" : "var(--accent)", transition: "all 0.2s",
                  }}
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </motion.div>

            {/* Other contacts */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {contactLinks.map(({ icon: Icon, label, value, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 6 }}
                  style={{
                    display: "flex", alignItems: "center", gap: 16,
                    background: "rgba(13,21,37,0.5)",
                    border: "1px solid rgba(168,178,200,0.1)",
                    borderRadius: 12, padding: "16px 20px",
                    textDecoration: "none", transition: "border-color 0.2s",
                  }}
                  className="hover:border-[rgba(0,229,255,0.25)]"
                >
                  <div style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid rgba(0,229,255,0.2)", background: "rgba(0,229,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={16} color="var(--accent)" />
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "var(--text-body)", opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.15em" }}>{label}</p>
                    <p style={{ fontFamily: "var(--font-body)", color: "var(--text-body)", fontSize: 13, marginTop: 2 }}>{value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Animated envelope */}
            <motion.div
              whileHover="hover"
              initial="rest"
              style={{ alignSelf: "flex-start", marginTop: 8 }}
            >
              <svg width="80" height="60" viewBox="0 0 120 90" fill="none" style={{ overflow: "visible" }}>
                <rect x="4" y="20" width="112" height="66" rx="8" stroke="rgba(0,229,255,0.5)" strokeWidth="2" fill="rgba(0,229,255,0.04)" />
                <motion.path
                  d="M4 20 L60 54 L116 20"
                  stroke="rgba(0,229,255,0.5)" strokeWidth="2" fill="none"
                  variants={{ hover: { d: "M4 20 L60 10 L116 20" }, rest: { d: "M4 20 L60 54 L116 20" } }}
                  transition={{ duration: 0.3 }}
                />
                <motion.rect
                  x="30" y="2" width="60" height="42" rx="4"
                  fill="#0D1525" stroke="rgba(0,229,255,0.4)" strokeWidth="1.5"
                  variants={{ hover: { y: -20, opacity: 1 }, rest: { y: 0, opacity: 0 } }}
                  transition={{ duration: 0.3 }}
                />
                <motion.text
                  x="60" y="26" textAnchor="middle" fontSize="7" fill="#00E5FF"
                  fontFamily="JetBrains Mono, monospace" fontWeight="600"
                  variants={{ hover: { opacity: 1, y: -18 }, rest: { opacity: 0, y: 0 } }}
                  transition={{ duration: 0.3 }}
                >
                  Hi there! 👋
                </motion.text>
              </svg>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "var(--text-body)", opacity: 0.4, marginTop: 4 }}>Hover me</p>
            </motion.div>
          </div>

          {/* Right: Message form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              background: "rgba(13,21,37,0.6)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(0,229,255,0.12)",
              borderRadius: 20,
              padding: "32px",
            }}
          >
            <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, color: "white", fontSize: "1.1rem", marginBottom: 24 }}>
              Send a Message
            </h3>
            <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: 10, color: "var(--text-body)", opacity: 0.5, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>Your Name</label>
                  <input name="user_name" type="text" required placeholder="John Doe" style={inputStyle} className="focus:border-[rgba(0,229,255,0.4)] focus:shadow-[0_0_20px_rgba(0,229,255,0.1)] transition-all" />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: 10, color: "var(--text-body)", opacity: 0.5, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>Your Email</label>
                  <input name="user_email" type="email" required placeholder="john@example.com" style={inputStyle} className="focus:border-[rgba(0,229,255,0.4)] focus:shadow-[0_0_20px_rgba(0,229,255,0.1)] transition-all" />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: 10, color: "var(--text-body)", opacity: 0.5, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>Message</label>
                <textarea name="message" required rows={5} placeholder="Tell me about your project or opportunity..." style={{ ...inputStyle, resize: "vertical" as const }} className="focus:border-[rgba(0,229,255,0.4)] focus:shadow-[0_0_20px_rgba(0,229,255,0.1)] transition-all" />
              </div>

              {status === "success" && (
                <div style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)", borderRadius: 10, padding: "12px 16px", fontFamily: "var(--font-body)", color: "#34D399", fontSize: 13 }}>
                  ✓ Message sent! I&apos;ll be in touch soon.
                </div>
              )}
              {status === "error" && (
                <div style={{ background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.3)", borderRadius: 10, padding: "12px 16px", fontFamily: "var(--font-body)", color: "#F43F5E", fontSize: 13 }}>
                  ✗ Something went wrong. Please try emailing directly.
                </div>
              )}

              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
                whileTap={{ scale: status === "sending" ? 1 : 0.97 }}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  background: status === "sending" ? "rgba(0,229,255,0.1)" : "rgba(0,229,255,0.12)",
                  border: "1px solid rgba(0,229,255,0.4)",
                  borderRadius: 12, padding: "14px 24px",
                  fontFamily: "var(--font-body)", fontWeight: 600,
                  color: "var(--accent)", fontSize: 14,
                  cursor: status === "sending" ? "not-allowed" : "pointer",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  transition: "all 0.2s",
                }}
                className="hover:bg-[rgba(0,229,255,0.2)] hover:shadow-[0_0_30px_rgba(0,229,255,0.25)]"
              >
                <Send size={15} />
                {status === "sending" ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ maxWidth: 1280, margin: "80px auto 0", padding: "0 32px" }}>
        <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(0,229,255,0.2), transparent)", marginBottom: 32 }} />
        <p style={{ fontFamily: "var(--font-body)", color: "var(--text-body)", fontSize: 13, opacity: 0.4, textAlign: "center" }}>
          © 2025 Prudhvi Charan P — Built with Next.js, Three.js &amp; a lot of caffeine ☕
        </p>
      </div>
      </div>
    </SectionWrapper>
  );
}
