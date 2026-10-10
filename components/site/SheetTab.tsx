"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronUp } from "lucide-react";
import { SHEETS, useCurrentSheet } from "./Nav";

// Phones only: a thumb-height tab that names the current sheet, shows progress through
// the set, and opens the sheet index. Links are ordinary anchors, so Motion handles the scroll.
export default function SheetTab() {
  const { current, progress } = useCurrentSheet();
  const [open, setOpen] = useState(false);
  const tab = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const sheet = SHEETS.find(s => s.id === current) ?? SHEETS[0];

  useEffect(() => {
    if (!open) return;
    list.current?.querySelector<HTMLAnchorElement>('[aria-current="true"]')?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); tab.current?.focus(); } };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  return <div className={`sheet-tab${open ? " is-open" : ""}`}>
    {open && <button type="button" className="sheet-tab-backdrop" aria-label="Close sheet index" onClick={() => setOpen(false)} />}
    <nav id="sheet-index" className="sheet-tab-panel" aria-label="Sheet index" hidden={!open}>
      <p className="mono">Sheet index</p>
      <ol ref={list}>
        {SHEETS.map(s => <li key={s.id}>
          <a href={`#${s.id}`} aria-current={s.id === current ? "true" : undefined} onClick={() => setOpen(false)}>
            <span className="mono">{s.no}</span>{s.label}
          </a>
        </li>)}
      </ol>
    </nav>
    <button ref={tab} type="button" className="sheet-tab-pill" aria-expanded={open} aria-controls="sheet-index" onClick={() => setOpen(v => !v)}>
      <span className="mono">{sheet.no}</span>
      <b>{sheet.label}</b>
      <ChevronUp size={16} aria-hidden="true" />
      <i style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <span className="sr-only">, open the sheet index</span>
    </button>
  </div>;
}
