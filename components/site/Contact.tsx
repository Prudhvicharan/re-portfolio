"use client";
import { useRef, useState } from "react";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import emailjs from "@emailjs/browser";
import { personal } from "@/lib/data";
import { RESUME } from "./Nav";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const sending = useRef(false);
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState<"idle" | "done" | "failed">("idle");
  const [stamp, setStamp] = useState<string | null>(null);

  const land = (label: string) => { setStamp(null); requestAnimationFrame(() => setStamp(label)); };

  async function copy() {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied("done");
      land("Email copied");
      setTimeout(() => setCopied("idle"), 2400);
    } catch {
      setCopied("failed");
    }
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!form.current || sending.current) return;
    sending.current = true;
    setStatus("sending");
    try {
      await emailjs.sendForm(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, form.current, process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
      setStatus("sent");
      form.current.reset();
      land("Request received");
    } catch {
      setStatus("error");
    } finally {
      sending.current = false;
    }
  }

  return <div className="contact-grid">
    <p className="contact-big reveal" aria-hidden="true">Let’s build<br /><span className="red">something.</span></p>
    <div>
      <div className="contact-direct">
        <p className="mono">Direct line</p>
        <div className="email-row">
          <a className="email" href={`mailto:${personal.email}`}>{personal.email}</a>
          <button type="button" className="copy" onClick={copy} aria-label="Copy email address">
            {copied === "done" ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}{copied === "done" ? "Copied" : "Copy"}
          </button>
        </div>
        <p className="sr-only" role="status" aria-live="polite">{copied === "done" ? "Email address copied." : copied === "failed" ? "Could not copy. Select the address to copy it." : ""}</p>
        <nav className="links" aria-label="Elsewhere">
          <a href={personal.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={16} aria-hidden="true" /></a>
          <a href={personal.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={16} aria-hidden="true" /></a>
          <a href={RESUME} target="_blank" rel="noopener noreferrer">Résumé (PDF) <ArrowUpRight size={16} aria-hidden="true" /></a>
        </nav>
      </div>
    </div>

    <form ref={form} className="rfi reveal" onSubmit={submit} aria-labelledby="rfi-title" aria-busy={status === "sending"}>
      <div className="rfi-head mono"><span id="rfi-title">Request for information</span><span aria-hidden="true">RFI-001</span></div>
      <div className="rfi-row">
        <div className="field"><label htmlFor="user_name">Your name</label><input id="user_name" name="user_name" autoComplete="name" required placeholder="Who’s asking?" /></div>
        <div className="field"><label htmlFor="user_email">Your email</label><input id="user_email" name="user_email" type="email" autoComplete="email" required placeholder="you@company.com" /></div>
      </div>
      <div className="field"><label htmlFor="message">Message</label><textarea id="message" name="message" required placeholder="A role, a project, or a messy dataset. Tell me about it." /></div>
      <div className="rfi-foot">
        <p>Sent through EmailJS straight to my inbox. Please don’t include anything sensitive.</p>
        <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send request"}</button>
      </div>
      <p className={`status ${status}`} role="status" aria-live="polite">
        {status === "sent" && "Sent. I’ll reply to the email you gave."}
        {status === "error" && <>That didn’t send, and your message is still here. Try again, or email <a href={`mailto:${personal.email}`}>{personal.email}</a>.</>}
      </p>
    </form>

    <div className={`stamp${stamp ? " is-down" : ""}`} aria-hidden="true">Approved<small>{stamp ?? " "}</small></div>
  </div>;
}
