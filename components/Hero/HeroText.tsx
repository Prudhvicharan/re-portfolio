import { personal } from "@/lib/data";
import { ChevronDown } from "lucide-react";

export default function HeroText() {
  return (
    <div className="hero-text relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6">
      <p className="font-accent text-[var(--accent)] text-sm uppercase tracking-[0.15em] mb-6">{personal.title}</p>
      <h1 className="font-display text-white leading-none mb-4" style={{ fontSize: "clamp(3.5rem, 14vw, 12rem)" }}>
        <span className="block">{personal.firstName}</span>
        <span className="block text-gradient-cyan">{personal.lastName}</span>
      </h1>
      <p className="font-body text-[var(--text-body)] text-base sm:text-lg mb-4">{personal.roles[0]}</p>
      <p className="font-body text-[var(--text-body)] text-sm sm:text-base mb-10">{personal.roles[1]}</p>
      <a href="#projects" className="btn-neon text-sm rounded-sm">View Work</a>
      <a href="#about" className="hero-scroll font-body flex flex-col items-center gap-2 text-[var(--text-body)]">
        <span className="text-sm uppercase tracking-[0.2em]">Scroll</span><ChevronDown aria-hidden="true" size={20} />
      </a>
    </div>
  );
}
