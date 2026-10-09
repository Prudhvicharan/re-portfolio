"use client";
import { useEffect, useRef, useState } from "react";

// The cover portrait, rebuilt as a halftone field of dots. Raw WebGL: one draw call,
// a few thousand points, no post-processing. It only draws while the cover is uncovered,
// survives React's development double-mount, and rebuilds itself if the browser drops the context.
const GRID = 150;
const SRC = "/work/portrait.jpg";

const VERT = `
attribute vec2 aPos; attribute float aSize; attribute float aRand;
uniform vec2 uMouse, uFit; uniform float uTime, uIntro, uLift, uCell, uReduced;
varying float vLens, vAlpha;
void main() {
  // Intro: every dot starts scattered and settles on its own beat.
  float k = clamp((uIntro - aRand * .55) / .45, 0., 1.);
  k = 1. - pow(1. - k, 3.);
  float a = aRand * 6.2831 * 7.;
  vec2 p = mix(aPos + vec2(cos(a), sin(a)) * (.6 + aRand * 1.4), aPos, k);
  // A gentle drift so the field always reads as live.
  p += (1. - uReduced) * vec2(sin(aPos.y * 9. + uTime * .9), cos(aPos.x * 7. + uTime * .7)) * .0035;
  // Scrolling away lifts the print off the sheet: dots rise and fall away on their own beat.
  float lift = clamp((uLift * 1.5 - aRand * .5), 0., 1.);
  lift = lift * lift;
  p += vec2((aRand - .5) * 1.4 + sin(a) * .3, .8 + aRand * 1.6) * lift;
  // Cursor lens: dots part around the pointer and swell at the rim.
  vec2 d = p - uMouse;
  float dist = length(d);
  float lens = (1. - smoothstep(0., .34, dist)) * (1. - uLift);
  p += normalize(d + 1e-5) * lens * lens * .11;
  vLens = smoothstep(.0, .34, dist) * (1. - smoothstep(.22, .4, dist)) * (1. - uLift);
  vAlpha = 1. - lift;
  gl_Position = vec4(p * uFit, 0., 1.);
  gl_PointSize = uCell * aSize * (1. + vLens * .9) * mix(.3, 1., k) * (1. - lift * .6);
}`;

const FRAG = `
precision mediump float;
varying float vLens, vAlpha;
void main() {
  float r = length(gl_PointCoord - .5);
  float a = (1. - smoothstep(.42, .5, r)) * vAlpha;
  gl_FragColor = vec4(mix(vec3(.929, .941, .949), vec3(1., .29, .18), vLens * .85), a);
}`;

type Dots = { pos: Float32Array; size: Float32Array; rand: Float32Array; count: number };
let cached: Promise<Dots> | null = null;

function sample(): Promise<Dots> {
  cached ??= new Promise<Dots>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = c.height = GRID;
      const ctx = c.getContext("2d", { willReadFrequently: true })!;
      ctx.drawImage(img, 0, 0, GRID, GRID);
      const px = ctx.getImageData(0, 0, GRID, GRID).data;
      let br = 0, bg = 0, bb = 0, n = 0;
      for (const [cx, cy] of [[2, 2], [GRID - 3, 2], [2, 40], [GRID - 3, 40]]) {
        const i = (cy * GRID + cx) * 4; br += px[i]; bg += px[i + 1]; bb += px[i + 2]; n++;
      }
      br /= n; bg /= n; bb /= n;
      const smooth = (v: number, a: number, b: number) => Math.min(1, Math.max(0, (v - a) / (b - a)));
      // Subject = clearly different from the backdrop, or skin-coloured, or dark (hair, beard, suit).
      const cells: { x: number; y: number; lum: number; mask: number }[] = [];
      let lo = 1, hi = 0;
      for (let y = 0; y < GRID; y++) for (let x = 0; x < GRID; x++) {
        const i = (y * GRID + x) * 4, r = px[i], g = px[i + 1], b = px[i + 2];
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        const lum = (r * .299 + g * .587 + b * .114) / 255;
        const sat = max ? (max - min) / max : 0;
        const diff = Math.hypot(r - br, g - bg, b - bb) / 255;
        const mask = Math.max(smooth(diff, .16, .26), smooth(sat, .11, .2), smooth(.5 - lum, 0, .12));
        if (mask <= .05) continue;
        cells.push({ x, y, lum, mask });
        if (mask > .9) { lo = Math.min(lo, lum); hi = Math.max(hi, lum); }
      }
      const pos: number[] = [], size: number[] = [], rand: number[] = [];
      for (const cell of cells) {
        // Stretch contrast across the subject so eyes, beard and tie read clearly.
        const s = cell.mask * (.14 + .86 * Math.pow(smooth(cell.lum, lo + .04, hi - .02), 1.25));
        if (s < .1) continue;
        pos.push((cell.x / (GRID - 1)) * 2 - 1, 1 - (cell.y / (GRID - 1)) * 2);
        size.push(s); rand.push(Math.random());
      }
      resolve({ pos: new Float32Array(pos), size: new Float32Array(size), rand: new Float32Array(rand), count: size.length });
    };
    img.onerror = () => { cached = null; reject(new Error("portrait failed to load")); };
    img.src = SRC;
  });
  return cached;
}

export default function Portrait({ children }: { children?: React.ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = canvas.current, box = wrap.current;
    if (!el || !box) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cover = box.closest(".sheet") as HTMLElement | null;
    const mouse = { x: 9, y: 9, tx: 9, ty: 9 };
    let gl: WebGLRenderingContext | null = null;
    let scene: { count: number; u: Record<string, WebGLUniformLocation | null>; dispose: () => void } | null = null;
    let raf = 0, disposed = false, inView = true, start = 0, lift = 0;

    const build = async () => {
      gl = el.getContext("webgl", { antialias: false, alpha: true, premultipliedAlpha: false });
      if (!gl || gl.isContextLost()) return;
      const dots = await sample().catch(() => null);
      if (!dots || disposed || !gl || gl.isContextLost()) return;
      const g = gl;
      const shader = (type: number, src: string) => { const s = g.createShader(type)!; g.shaderSource(s, src); g.compileShader(s); return s; };
      const prog = g.createProgram()!;
      g.attachShader(prog, shader(g.VERTEX_SHADER, VERT));
      g.attachShader(prog, shader(g.FRAGMENT_SHADER, FRAG));
      g.linkProgram(prog);
      if (!g.getProgramParameter(prog, g.LINK_STATUS)) return;
      g.useProgram(prog);
      g.enable(g.BLEND);
      g.blendFunc(g.SRC_ALPHA, g.ONE_MINUS_SRC_ALPHA);
      const buffers = ([["aPos", dots.pos, 2], ["aSize", dots.size, 1], ["aRand", dots.rand, 1]] as const).map(([name, data, per]) => {
        const buf = g.createBuffer(); g.bindBuffer(g.ARRAY_BUFFER, buf); g.bufferData(g.ARRAY_BUFFER, data, g.STATIC_DRAW);
        const loc = g.getAttribLocation(prog, name); g.enableVertexAttribArray(loc); g.vertexAttribPointer(loc, per, g.FLOAT, false, 0, 0);
        return buf;
      });
      const u = Object.fromEntries(["uMouse", "uFit", "uTime", "uIntro", "uLift", "uCell", "uReduced"].map(n => [n, g.getUniformLocation(prog, n)]));
      g.uniform1f(u.uReduced, reduced ? 1 : 0);
      scene = { count: dots.count, u, dispose: () => { buffers.forEach(b => g.deleteBuffer(b)); g.deleteProgram(prog); } };
      resize();
      setLive(true);
      wake();
    };

    const resize = () => {
      if (!gl || !scene) return;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const w = box.clientWidth, h = box.clientHeight;
      if (!w || !h) return;
      el.width = Math.round(w * dpr); el.height = Math.round(h * dpr);
      gl.viewport(0, 0, el.width, el.height);
      const aspect = w / h;
      gl.uniform1f(scene.u.uCell, (Math.min(w, h) / GRID) * dpr * 1.08);
      // Fit the square image inside the box: scale the long axis down.
      gl.uniform2f(scene.u.uFit, 1 / Math.max(aspect, 1), Math.min(aspect, 1));
    };

    const visible = () => inView && !document.hidden && lift < 1;
    const frame = (now: number) => {
      raf = 0;
      if (disposed || !gl || !scene || gl.isContextLost() || !visible()) return;
      if (!start) start = now;
      const t = (now - start) / 1000;
      mouse.x += (mouse.tx - mouse.x) * .12; mouse.y += (mouse.ty - mouse.y) * .12;
      const { u } = scene;
      gl.uniform2f(u.uMouse, mouse.x, mouse.y);
      gl.uniform1f(u.uTime, t);
      gl.uniform1f(u.uIntro, reduced ? 1 : Math.min(1, t / 2.2));
      gl.uniform1f(u.uLift, reduced ? 0 : lift);
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.POINTS, 0, scene.count);
      raf = requestAnimationFrame(frame);
    };
    function wake() { if (!raf && visible()) raf = requestAnimationFrame(frame); }

    // Sheets stack: the cover stays "in view" while later sheets cover it, so track how far it has been covered.
    const onScroll = () => {
      const h = cover?.offsetHeight || innerHeight;
      lift = Math.min(1, Math.max(0, scrollY / (h * .85)));
      wake();
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect(), side = Math.min(r.width, r.height) / 2;
      mouse.tx = (e.clientX - r.left - r.width / 2) / side;
      mouse.ty = -(e.clientY - r.top - r.height / 2) / side;
    };
    const onLeave = () => { mouse.tx = 9; mouse.ty = 9; };
    const onLost = (e: Event) => { e.preventDefault(); cancelAnimationFrame(raf); raf = 0; scene = null; setLive(false); };
    const onRestored = () => { void build(); };

    const io = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; wake(); });
    const ro = new ResizeObserver(() => { resize(); wake(); });
    io.observe(box); ro.observe(box);
    el.addEventListener("webglcontextlost", onLost);
    el.addEventListener("webglcontextrestored", onRestored);
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", wake);
    onScroll();
    void build();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect(); ro.disconnect();
      el.removeEventListener("webglcontextlost", onLost);
      el.removeEventListener("webglcontextrestored", onRestored);
      removeEventListener("scroll", onScroll);
      removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", wake);
      // Free GPU buffers but keep the context alive: React may remount on this same canvas.
      scene?.dispose();
    };
  }, []);

  return <div ref={wrap} className={`portrait${live ? " is-live" : ""}`} role="img" aria-label="Portrait of Prudhvi Charan, drawn as a field of dots">
    <div className="portrait-fallback" aria-hidden="true" />
    <canvas ref={canvas} aria-hidden="true" />
    <span className="crosshair ch-1" aria-hidden="true" /><span className="crosshair ch-2" aria-hidden="true" />
    <div aria-hidden="true">{children}</div>
  </div>;
}
