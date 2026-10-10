"use client";
import { useEffect, useRef, useState } from "react";

// A sheet heading drawn like a pen plotter: outlines are traced first, then the ink fills in.
// The real text stays in the heading (transparent) so layout, selection and screen readers are unchanged.
export default function PlotTitle({ id, children }: { id: string; children: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setDrawn(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setDrawn(true); io.disconnect(); } }, { threshold: .6 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <h2 ref={ref} id={id} className={`plot${drawn ? " is-drawn" : ""}`}>
    <span className="plot-text">{children}</span>
    <svg className="plot-ink" aria-hidden="true"><text x="0" y="0.8em">{children}</text></svg>
  </h2>;
}
