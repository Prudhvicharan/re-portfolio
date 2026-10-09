"use client";
import { useEffect } from "react";

// All page motion lives here: one smooth-scroll loop driven by GSAP's ticker,
// sticky-sheet offsets, and scroll-linked reveals. Nothing else runs per frame.
export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(pointer: fine)").matches;
    const cleanups: (() => void)[] = [];

    // Sheets taller than the viewport stick by their bottom edge so all their content is reachable.
    const sheets = [...document.querySelectorAll<HTMLElement>(".sheet")];
    const stick = () => sheets.forEach(s => s.style.setProperty("--stick", `${Math.min(0, innerHeight - s.offsetHeight)}px`));
    stick();
    const ro = new ResizeObserver(stick);
    sheets.forEach(s => ro.observe(s));
    addEventListener("resize", stick);
    cleanups.push(() => { ro.disconnect(); removeEventListener("resize", stick); });

    // Simple reveals: an observer toggles a class once; CSS does the rest.
    const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -12% 0px" });
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
    cleanups.push(() => io.disconnect());

    // Fonts first, then the cover draws itself in.
    const ready = () => requestAnimationFrame(() => root.classList.add("loaded"));
    document.fonts?.ready.then(ready) ?? ready();

    if (reduced) {
      document.querySelectorAll(".statement .w").forEach(w => w.classList.add("on"));
      return () => cleanups.forEach(c => c());
    }

    let disposed = false;
    (async () => {
      const [{ default: gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("lenis")]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);

      if (fine) {
        const lenis = new Lenis({ lerp: .1, smoothWheel: true, anchors: true, autoRaf: false });
        const raf = (t: number) => lenis.raf(t * 1000);
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);
        cleanups.push(() => { gsap.ticker.remove(raf); lenis.destroy(); });
      }

      const ctx = gsap.context(() => {
        // Profile statement lights up word by word as it crosses the viewport.
        const words = gsap.utils.toArray<HTMLElement>(".statement .w");
        if (words.length) {
          let lit = -1;
          ScrollTrigger.create({
            trigger: ".statement", start: "top 78%", end: "bottom 42%", scrub: true,
            onUpdate: self => {
              const n = Math.round(self.progress * words.length);
              if (n === lit) return;
              lit = n;
              words.forEach((w, i) => w.classList.toggle("on", i < n));
            },
          });
        }
        // Markup callouts: leader lines draw, then the labels drop in.
        gsap.utils.toArray<HTMLElement>(".figure").forEach(fig => {
          const paths = fig.querySelectorAll("path"), marks = fig.querySelectorAll("circle"), notes = fig.querySelectorAll(".callout");
          const tl = gsap.timeline({ scrollTrigger: { trigger: fig, start: "top 70%", toggleActions: "play none none reverse" } });
          tl.fromTo(marks, { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: .35, stagger: .12, ease: "back.out(3)" })
            .fromTo(paths, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .6, stagger: .12, ease: "power2.inOut" }, "<.1")
            .fromTo(notes, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: .4, stagger: .12, ease: "power3.out" }, "-=.35");
          gsap.fromTo(fig.querySelector("img"), { scale: 1.06 }, { scale: 1, ease: "none", scrollTrigger: { trigger: fig, start: "top bottom", end: "bottom top", scrub: true } });
        });
        // Experience: dimension lines extend from their start dates.
        gsap.fromTo(".span-bar", { scaleX: 0 }, { scaleX: 1, duration: 1, stagger: .09, ease: "power3.out", scrollTrigger: { trigger: ".chart", start: "top 75%" } });
        // Big headings rise in as each sheet arrives.
        gsap.utils.toArray<HTMLElement>(".sheet-head h2, .contact-big").forEach(h => {
          gsap.fromTo(h, { yPercent: 18, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: h, start: "top 85%" } });
        });
      });
      cleanups.push(() => ctx.revert());
      ScrollTrigger.refresh();
    })();

    return () => { disposed = true; cleanups.forEach(c => c()); };
  }, []);
  return null;
}
