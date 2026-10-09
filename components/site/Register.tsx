"use client";
import { useState } from "react";
import { ArrowUpRight, Github, Plus } from "lucide-react";
import { projects } from "@/lib/data";
import { work } from "@/lib/work";

// Drawing register: one row per project; opening a row unfolds its detail drawing.
export default function Register() {
  const [open, setOpen] = useState<string | null>(projects[0].name);
  const toggle = (name: string) => {
    setOpen(current => (current === name ? null : name));
    // Heights change below this point; let scroll-linked motion re-measure after the unfold.
    setTimeout(() => window.dispatchEvent(new Event("layoutchange")), 650);
  };

  return <div className="register">
    <div className="register-head mono" aria-hidden="true"><span>No.</span><span>Project</span><span>Type</span><span>Stack</span><span /></div>
    {projects.map((p, i) => {
      const w = work[p.name];
      const id = `drawing-${i}`;
      const isOpen = open === p.name;
      return <article key={p.name} className={`entry${isOpen ? " is-open" : ""}`}>
        <h3 className="entry-row">
          <button type="button" aria-expanded={isOpen} aria-controls={id} onClick={() => toggle(p.name)}>
            <span className="entry-no mono">W-{String(i + 1).padStart(2, "0")}</span>
            <span className="entry-name">{p.name}</span>
            <span className="entry-kind mono">{w.kind}</span>
            <span className="entry-stack mono">{p.stack.slice(0, 3).join(" · ")}</span>
            <Plus className="entry-icon" size={22} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </h3>
        <div className="entry-body" id={id} role="region" aria-label={`${p.name} detail`} inert={!isOpen}>
          <div className="entry-inner">
            <div className="detail">
              <div className="detail-text">
                <p className="detail-tagline">{p.tagline}</p>
                <dl>
                  <div><dt className="mono">Problem</dt><dd>{p.problem}</dd></div>
                  <div><dt className="mono">What I built</dt><dd>{p.role}</dd></div>
                  <div><dt className="mono">Outcome</dt><dd>{p.outcome}</dd></div>
                </dl>
                <ul className="tags" aria-label="Technologies">{p.stack.map(s => <li key={s}>{s}</li>)}</ul>
                <div className="detail-links">
                  <a className="btn btn--red" href={p.live} target="_blank" rel="noopener noreferrer">Open {w.host.includes("Marketplace") ? "on Marketplace" : "live"} <ArrowUpRight size={16} aria-hidden="true" /></a>
                  <a className="btn btn--ghost" href={p.github} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} source on GitHub`}><Github size={16} aria-hidden="true" />Source</a>
                </div>
              </div>
              <figure className="schematic">
                <figcaption className="mono"><span>Detail {String(i + 1).padStart(2, "0")} · System schematic</span><span>{w.host}</span></figcaption>
                <ol className="flow">
                  {w.flow.map((s, k) => <li key={s.label} className={`step${s.accent ? " step--accent" : ""}`} style={{ "--i": k } as React.CSSProperties}>
                    <span className="step-no mono">{String(k + 1).padStart(2, "0")}</span>
                    <span className="step-box"><b>{s.label}</b>{s.note && <small>{s.note}</small>}</span>
                  </li>)}
                </ol>
              </figure>
            </div>
          </div>
        </div>
      </article>;
    })}
  </div>;
}
