"use client";

import { useEffect, useRef, useState } from "react";
import { navItems } from "@/lib/data";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      let current = "";
      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (section && section.getBoundingClientRect().top <= 140) current = item.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const panel = dialog.current;
    if (!panel || !menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    panel.showModal(); // Native modal makes the background inert and contains focus.
    panel.querySelector<HTMLButtonElement>("button")?.focus();
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 768px)");
    const onResize = () => { if (desktop.matches) setMenuOpen(false); };
    desktop.addEventListener("change", onResize);
    return () => {
      desktop.removeEventListener("change", onResize);
      panel.close();
      document.body.style.overflow = previousOverflow;
      if (!desktop.matches) trigger.current?.focus();
    };
  }, [menuOpen]);

  return (
    <>
      <nav aria-label="Main navigation" className={`site-nav${scrolled ? " is-scrolled" : ""}`}>
        <div className="nav-content">
          <a href="#hero" className="nav-brand" aria-label="Prudhvi Charan — back to top">PC<span>.</span></a>
          <ul className="desktop-nav">
            {navItems.map(item => <li key={item.id}><a href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined}>{item.label}</a></li>)}
          </ul>
          <button ref={trigger} type="button" className="menu-trigger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-haspopup="dialog"><Menu aria-hidden="true" size={22} /></button>
        </div>
      </nav>
      <dialog ref={dialog} id="mobile-navigation" className="mobile-drawer" aria-labelledby="mobile-menu-title"
        onCancel={event => { event.preventDefault(); setMenuOpen(false); }}
        onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) setMenuOpen(false); } }}
        onKeyDown={event => {
          if (event.key !== "Tab") return;
          const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
          const first = items[0], last = items[items.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
          if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
        }}>
        <div className="drawer-header"><h2 id="mobile-menu-title">Navigation</h2><button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X aria-hidden="true" size={22} /></button></div>
        <nav aria-label="Mobile navigation"><ul>{navItems.map(item => <li key={item.id}><a href={`#${item.id}`} onClick={() => setMenuOpen(false)} aria-current={active === item.id ? "location" : undefined}>{item.label}</a></li>)}</ul></nav>
      </dialog>
    </>
  );
}
