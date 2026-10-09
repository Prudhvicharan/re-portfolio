"use client";
import { useEffect, useRef, useState } from "react";

// A drafting tool for visitors: drag anywhere to draw a dimension line with a live reading.
// Toggled by the ruler in the nav (a "measure:toggle" event) or the M key; desktop pointers only.
type Line = { x1: number; y1: number; x2: number; y2: number };
const MM_PER_PX = 0.2646;

function Dimension({ l, live }: { l: Line; live?: boolean }) {
  const dx = l.x2 - l.x1, dy = l.y2 - l.y1, len = Math.hypot(dx, dy);
  if (len < 2) return null;
  const nx = -dy / len * 7, ny = dx / len * 7; // perpendicular tick
  const mx = (l.x1 + l.x2) / 2, my = (l.y1 + l.y2) / 2;
  const label = `${Math.round(len)} px · ${Math.round(len * MM_PER_PX)} mm`;
  return <g className={live ? "dim is-live" : "dim"}>
    <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} markerStart="url(#arrow)" markerEnd="url(#arrow)" />
    <line x1={l.x1 - nx} y1={l.y1 - ny} x2={l.x1 + nx} y2={l.y1 + ny} />
    <line x1={l.x2 - nx} y1={l.y2 - ny} x2={l.x2 + nx} y2={l.y2 + ny} />
    <g transform={`translate(${mx} ${my})`}>
      <rect x={-label.length * 3.6 - 8} y={-22} width={label.length * 7.2 + 16} height={20} />
      <text y={-8} textAnchor="middle">{label}</text>
    </g>
  </g>;
}

export default function Measure() {
  const [on, setOn] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [draft, setDraft] = useState<Line | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const startedAt = useRef(0);

  useEffect(() => {
    const toggle = () => setOn(v => !v);
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(t.tagName) || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "m" || e.key === "M") { if (!matchMedia("(pointer: coarse)").matches) setOn(v => !v); }
      else if (e.key === "Escape") setOn(false);
      else if (e.key === "c" || e.key === "C") setLines([]);
    };
    window.addEventListener("measure:toggle", toggle);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("measure:toggle", toggle); window.removeEventListener("keydown", onKey); };
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("measure:state", { detail: on }));
    document.documentElement.classList.toggle("measuring", on);
    if (!on) { setLines([]); setDraft(null); return; }
    // Measurements describe what is on screen; scrolling makes them stale, so clear them.
    startedAt.current = scrollY;
    const onScroll = () => { if (Math.abs(scrollY - startedAt.current) > 40) { setLines([]); startedAt.current = scrollY; } };
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, [on]);

  if (!on) return null;

  const point = (e: React.PointerEvent, from?: Line | null) => {
    let x = e.clientX, y = e.clientY;
    if (e.shiftKey && from) { if (Math.abs(x - from.x1) > Math.abs(y - from.y1)) y = from.y1; else x = from.x1; }
    return { x, y };
  };

  return <div className="measure" aria-hidden="true"
    onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); const p = point(e); setDraft({ x1: p.x, y1: p.y, x2: p.x, y2: p.y }); }}
    onPointerMove={e => { setCursor({ x: e.clientX, y: e.clientY }); if (draft) { const p = point(e, draft); setDraft({ ...draft, x2: p.x, y2: p.y }); } }}
    onPointerUp={() => { if (draft && Math.hypot(draft.x2 - draft.x1, draft.y2 - draft.y1) > 6) setLines(l => [...l.slice(-7), draft]); setDraft(null); }}>
    <svg>
      <defs><marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 1 L9 5 L0 9 z" /></marker></defs>
      <line className="guide" x1={cursor.x} y1={0} x2={cursor.x} y2="100%" />
      <line className="guide" x1={0} y1={cursor.y} x2="100%" y2={cursor.y} />
      {lines.map((l, i) => <Dimension key={i} l={l} />)}
      {draft && <Dimension l={draft} live />}
    </svg>
    <span className="measure-xy" style={{ transform: `translate(${cursor.x + 14}px, ${cursor.y + 14}px)` }}>x {cursor.x} · y {cursor.y}</span>
    <p className="measure-hint">Measure · drag to dimension · Shift snaps · C clears · Esc exits</p>
  </div>;
}
