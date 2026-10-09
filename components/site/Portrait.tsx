"use client";
import { useEffect, useRef, useState } from "react";

// The cover portrait, rebuilt as a halftone field of dots. Raw WebGL: one draw call,
// a few thousand points, no post-processing, and it only renders while on screen.
const GRID = 150;

const VERT = `
attribute vec2 aPos; attribute float aSize; attribute float aRand;
uniform vec2 uMouse, uFit; uniform float uTime, uIntro, uCell, uReduced;
varying float vLens; varying float vSize;
void main() {
  // Intro: every dot starts scattered and settles on its own beat.
  float k = clamp((uIntro - aRand * .55) / .45, 0., 1.);
  k = 1. - pow(1. - k, 3.);
  float a = aRand * 6.2831 * 7.;
  vec2 scatter = vec2(cos(a), sin(a)) * (.6 + aRand * 1.4);
  vec2 p = mix(aPos + scatter, aPos, k);
  // A gentle drift so the field always reads as live.
  p += (1. - uReduced) * vec2(sin(aPos.y * 9. + uTime * .9), cos(aPos.x * 7. + uTime * .7)) * .0035;
  // Cursor lens: dots part around the pointer and swell at the rim.
  vec2 d = p - uMouse;
  float dist = length(d);
  float lens = 1. - smoothstep(0., .34, dist);
  p += normalize(d + 1e-5) * lens * lens * .11;
  vLens = smoothstep(.0, .34, dist) * (1. - smoothstep(.22, .4, dist));
  vSize = aSize;
  gl_Position = vec4(p * uFit, 0., 1.);
  gl_PointSize = uCell * aSize * (1. + vLens * .9) * mix(.3, 1., k);
}`;

const FRAG = `
precision mediump float;
varying float vLens; varying float vSize;
void main() {
  vec2 c = gl_PointCoord - .5;
  float r = length(c);
  float a = 1. - smoothstep(.42, .5, r);
  vec3 paper = vec3(.929, .941, .949), red = vec3(1., .29, .18);
  gl_FragColor = vec4(mix(paper, red, vLens * .85), a);
}`;

function sample(img: HTMLImageElement) {
  const c = document.createElement("canvas");
  c.width = c.height = GRID;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0, GRID, GRID);
  const px = ctx.getImageData(0, 0, GRID, GRID).data;
  // Background colour from the corners; the subject is anything that differs from it.
  let br = 0, bg = 0, bb = 0, n = 0;
  for (const [cx, cy] of [[2, 2], [GRID - 3, 2], [2, 30], [GRID - 3, 30]]) {
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
  for (const c of cells) {
    // Stretch contrast across the subject so eyes, beard and tie read clearly.
    const n = smooth(c.lum, lo + .04, hi - .02);
    const s = c.mask * (.14 + .86 * Math.pow(n, 1.25));
    if (s < .1) continue;
    pos.push((c.x / (GRID - 1)) * 2 - 1, 1 - (c.y / (GRID - 1)) * 2);
    size.push(s); rand.push(Math.random());
  }
  return { pos: new Float32Array(pos), size: new Float32Array(size), rand: new Float32Array(rand), count: size.length };
}

export default function Portrait({ onCount, children }: { onCount?: (n: number) => void; children?: React.ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = canvas.current, box = wrap.current;
    if (!el || !box) return;
    const gl = el.getContext("webgl", { antialias: false, premultipliedAlpha: false, alpha: true });
    if (!gl) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, visible = true, disposed = false, start = 0, count = 0;
    const mouse = { x: 9, y: 9, tx: 9, ty: 9 };

    const shader = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, shader(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    const u = (name: string) => gl.getUniformLocation(prog, name);
    const uMouse = u("uMouse"), uTime = u("uTime"), uIntro = u("uIntro"), uCell = u("uCell"), uFit = u("uFit");
    gl.uniform1f(u("uReduced"), reduced ? 1 : 0);
    const attr = (name: string, data: Float32Array, sizePer: number) => {
      const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, name); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, sizePer, gl.FLOAT, false, 0, 0);
    };

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const w = box.clientWidth, h = box.clientHeight;
      el.width = Math.round(w * dpr); el.height = Math.round(h * dpr);
      gl.viewport(0, 0, el.width, el.height);
      const aspect = w / h;
      // The square image is fitted to the shorter side, so a cell is that side over the grid.
      gl.uniform1f(uCell, (Math.min(w, h) / GRID) * dpr * 1.08);
      // Fit the square image inside the box: scale the long axis down.
      gl.uniform2f(uFit, 1 / Math.max(aspect, 1), Math.min(aspect, 1));
    };

    const frame = (now: number) => {
      raf = 0;
      if (disposed || !visible || document.hidden) return;
      if (!start) start = now;
      const t = (now - start) / 1000;
      mouse.x += (mouse.tx - mouse.x) * .12; mouse.y += (mouse.ty - mouse.y) * .12;
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uTime, t);
      gl.uniform1f(uIntro, reduced ? 1 : Math.min(1, t / 2.2));
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.POINTS, 0, count);
      raf = requestAnimationFrame(frame);
    };
    const wake = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame); };

    const img = new Image();
    img.src = "/work/portrait.jpg";
    img.decode().then(() => {
      if (disposed) return;
      const data = sample(img);
      count = data.count;
      attr("aPos", data.pos, 2); attr("aSize", data.size, 1); attr("aRand", data.rand, 1);
      resize();
      setLive(true);
      onCount?.(count);
      wake();
    }).catch(() => {});

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const side = Math.min(r.width, r.height);
      mouse.tx = ((e.clientX - r.left - r.width / 2) / (side / 2));
      mouse.ty = -((e.clientY - r.top - r.height / 2) / (side / 2));
    };
    const onLeave = () => { mouse.tx = 9; mouse.ty = 9; };
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; wake(); });
    io.observe(box);
    const ro = new ResizeObserver(resize);
    ro.observe(box);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", wake);
    return () => {
      disposed = true; cancelAnimationFrame(raf); io.disconnect(); ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", wake);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [onCount]);

  return <div ref={wrap} className={`portrait${live ? " is-live" : ""}`} role="img" aria-label="Portrait of Prudhvi Charan, drawn as a field of dots">
    <div className="portrait-fallback" aria-hidden="true" />
    <canvas ref={canvas} aria-hidden="true" />
    <span className="crosshair ch-1" aria-hidden="true" /><span className="crosshair ch-2" aria-hidden="true" />
    <div aria-hidden="true">{children}</div>
  </div>;
}
