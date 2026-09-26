import HeroText from "./HeroText";
import HeroDecoration from "./HeroDecoration";

export default function Hero() {
  return (
    <section id="hero" className="relative w-full bg-[var(--bg)] overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[70vw] h-[70vh] rounded-full" style={{ background: "radial-gradient(ellipse at center, rgba(0,229,255,0.07) 0%, transparent 70%)" }} />
      </div>
      <HeroDecoration />
      <HeroText />
      <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[var(--bg)] to-transparent pointer-events-none" />
    </section>
  );
}
