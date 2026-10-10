"use client";
import { useEffect, useState } from "react";
import { FileText } from "lucide-react";

export const SHEETS = [
  { id: "cover", no: "A-01", label: "Cover" },
  { id: "profile", no: "A-02", label: "Profile" },
  { id: "work", no: "A-03", label: "Work" },
  { id: "experience", no: "A-04", label: "Experience" },
  { id: "materials", no: "A-05", label: "Materials" },
  { id: "contact", no: "A-06", label: "Contact" },
] as const;

export const RESUME = "/assets/resume.pdf";

/** The sheet currently under the reading line, plus overall scroll progress (0–1). */
export function useCurrentSheet() {
  const [current, setCurrent] = useState<string>(SHEETS[0].id);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = scrollY + innerHeight * 0.45;
      let id: string = SHEETS[0].id;
      for (const sheet of SHEETS) {
        const anchor = document.getElementById(sheet.id);
        if (anchor && anchor.offsetTop <= line) id = sheet.id;
      }
      setCurrent(prev => (prev === id ? prev : id));
      const max = document.documentElement.scrollHeight - innerHeight;
      setProgress(max > 0 ? Math.min(1, scrollY / max) : 0);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); cancelAnimationFrame(frame); };
  }, []);
  return { current, progress };
}

export default function Nav() {
  const { current } = useCurrentSheet();

  return <header className="nav">
    <a href="#cover" className="nav-mark" aria-label="Prudhvi Charan, back to the cover"><b>P.CHARAN</b><span>Drawing set · 2026</span></a>
    <nav aria-label="Sheets">
      <ol className="nav-index">
        {SHEETS.map(s => <li key={s.id}><a href={`#${s.id}`} aria-current={current === s.id ? "true" : undefined}><i>{s.no}</i><span>{s.label}</span></a></li>)}
      </ol>
    </nav>
    <a className="nav-resume" href={RESUME} target="_blank" rel="noopener noreferrer"><FileText size={14} aria-hidden="true" />Résumé</a>
  </header>;
}
