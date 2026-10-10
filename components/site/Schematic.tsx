"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import type { Step } from "@/lib/work";

const STEP_MS = 1300;

// A system schematic that can be "run": a packet travels box to box while a log narrates each step.
export default function Schematic({ no, host, sample, flow, active }: { no: number; host: string; sample: string; flow: Step[]; active: boolean }) {
  const [at, setAt] = useState(-1); // -1 idle · 0..n-1 running · n done
  const [packetY, setPacketY] = useState(0);
  const list = useRef<HTMLOListElement>(null);
  const running = at >= 0 && at < flow.length;

  // Collapsing the drawing stops and resets the run.
  useEffect(() => { if (!active) setAt(-1); }, [active]);

  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => setAt(a => a + 1), STEP_MS);
    return () => clearTimeout(id);
  }, [at, running]);

  // Park the packet beside the active box.
  useLayoutEffect(() => {
    const box = list.current?.children[Math.min(Math.max(at, 0), flow.length - 1)]?.querySelector<HTMLElement>(".step-box");
    if (box && list.current) setPacketY(box.getBoundingClientRect().top - list.current.getBoundingClientRect().top + box.offsetHeight / 2);
  }, [at, flow.length]);

  const done = at >= flow.length;
  const label = String(no).padStart(2, "0");
  const log = at < 0 ? `Press Run to send ${sample} through the system.` : done ? `Done. ${sample[0].toUpperCase() + sample.slice(1)} made it through all ${flow.length} steps.` : `${String(at + 1).padStart(2, "0")} · ${flow[at].label}: ${flow[at].run}`;

  return <figure className={`schematic${running ? " is-running" : ""}${done ? " is-done" : ""}`}>
    <figcaption className="mono">
      <span>Detail {label} · System schematic</span>
      <span>{host}</span>
    </figcaption>
    <ol className="flow-compact" aria-label="System flow">{flow.map(s => <li key={s.label} className={s.accent ? "is-key" : undefined}>{s.label}</li>)}</ol>
    <div className="run-bar">
      <p className="run-log" role="status" aria-live="polite">{log}</p>
      <button type="button" className="run-btn" onClick={() => setAt(0)} disabled={running}>
        {done ? <RotateCcw size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
        {running ? "Running…" : done ? "Run again" : "Run"}
      </button>
    </div>
    <div className="flow-wrap">
    <ol ref={list} className="flow">
      {flow.map((s, k) => <li key={s.label} className={`step${s.accent ? " step--accent" : ""}${k === at ? " is-active" : ""}${k < at ? " is-passed" : ""}`} style={{ "--i": k } as React.CSSProperties}>
        <span className="step-no mono">{String(k + 1).padStart(2, "0")}</span>
        <span className="step-box"><b>{s.label}</b>{s.note && <small>{s.note}</small>}</span>
      </li>)}
    </ol>
    <span className="packet" aria-hidden="true" style={{ transform: `translateY(${packetY}px)`, opacity: running ? 1 : 0 }} />
    </div>
  </figure>;
}
