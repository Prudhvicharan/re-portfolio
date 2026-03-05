<h1 align="center">
  <br>
  🚀 Prudhvi Charan — Portfolio
  <br>
</h1>

<p align="center">
  <strong>Senior Full-Stack AI Engineer · 5+ Years · Building AI systems that scale to millions.</strong>
</p>

<p align="center">
  <a href="https://react.prudhvicharan.com">
    <img src="https://img.shields.io/badge/Live-Portfolio-00E5FF?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Portfolio" />
  </a>
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js" />
  <img src="https://img.shields.io/badge/Framer_Motion-purple?style=for-the-badge&logo=framer" />
  <img src="https://img.shields.io/badge/EmailJS-orange?style=for-the-badge" />
</p>

---

## ✨ Overview

A jaw-dropping, single-page portfolio built for a **Senior Full-Stack AI Engineer**. Not a resume slapped onto a webpage — a digital artifact. Features a live-coded 3D hero, infinite skill scrollers, animated timeline sections, and a working contact form.

> **Single-page** — one continuous scrollable experience. No routing. No page loads.

---

## 🖼️ Preview

| Hero | Skills | Experience |
|------|--------|------------|
| 3D particle field · animated name reveal | 8 infinite category scroll rows | Vertical timeline · numbered highlights |

| Projects | Education | Contact |
|---------|-----------|---------|
| Metric cards · live + GitHub links | Dual timeline · GPA blocks | EmailJS form · direct copy links |

---

## 🛠️ Tech Stack

### Core Framework
| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org) | 16.1.6 | App Router · static export (`output: 'export'`) |
| [React](https://react.dev) | 19 | UI layer |
| [TypeScript](https://typescriptlang.org) | 5 | Type safety throughout |

### Styling
| Technology | Version | Purpose |
|---|---|---|
| [Tailwind CSS](https://tailwindcss.com) | 4 | Utility classes + `@theme` inline design tokens |
| CSS Custom Properties | — | Global design tokens (`--font-heading`, `--accent`, etc.) |
| Google Fonts | — | Syne · JetBrains Mono · Orbitron · Bebas Neue |

### Animation & 3D
| Technology | Version | Purpose |
|---|---|---|
| [Framer Motion](https://www.framer.com/motion/) | 12 | Section reveals · spring physics · AnimatePresence |
| [Three.js](https://threejs.org) | 0.183 | 3D particle starfield in hero |
| [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) | 9 | React renderer for Three.js |
| [@react-three/drei](https://github.com/pmndrs/drei) | 10 | Helper hooks (OrbitControls, etc.) |
| [GSAP](https://greensock.com/gsap/) | 3 | Scroll-driven animations |
| [Lenis](https://lenis.darkroom.engineering/) | 1 | Buttery-smooth scroll |

### Communication
| Technology | Purpose |
|---|---|
| [@emailjs/browser](https://www.emailjs.com/) | Contact form — sends email directly from the browser, no backend required |

### Icons & Utilities
| Technology | Purpose |
|---|---|
| [Lucide React](https://lucide.dev) | Icon set (GraduationCap, MapPin, Github, ExternalLink…) |
| [clsx](https://github.com/lukeed/clsx) | Conditional classNames |

---

## 📋 Prerequisites

- **Node.js** ≥ 18.17 (LTS recommended)
- **npm** ≥ 9 (or `pnpm` / `yarn`)
- An **EmailJS** account for the contact form (free tier works)

---

## 🚀 Installation & Development

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
# → Fill in your EmailJS credentials (see EmailJS Integration section below)

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — hot-reload is active.

---

## 🔨 Building for Production

```bash
# Compile TypeScript + bundle
npm run build

# The output is a fully-static site in the /out directory
# (configured via output: 'export' in next.config.ts)
```

> The build generates pure HTML/CSS/JS — no Node.js server required to host.

---

## 🌐 Deployment

### Vercel (recommended — zero config)

```bash
npm install -g vercel
vercel --prod
```

Or connect your GitHub repo at [vercel.com/new](https://vercel.com/new) — Vercel auto-detects Next.js.

### GitHub Pages

```bash
# Build the static export
npm run build

# The /out directory is your deployable site.
# Push it to the gh-pages branch or configure Pages to serve from /out.
```

### Netlify / Cloudflare Pages / Any Static Host

Upload the `/out` directory after `npm run build`. No server-side rendering needed.

---

## 📬 EmailJS Integration

The contact form sends emails **directly from the browser** — no backend, no server costs.

### Setup

1. Create a free account at [emailjs.com](https://www.emailjs.com/)
2. Add an **Email Service** (Gmail, Outlook, etc.) → note the **Service ID**
3. Create an **Email Template** with these variables:

   ```
   From: {{from_name}} <{{reply_to}}>
   Subject: Portfolio Contact: {{subject}}
   Body: {{message}}
   ```

   Note the **Template ID**.

4. Copy your **Public Key** from Account → API Keys.

5. Create a `.env.local` file in the project root:

   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
   ```

6. The form at `components/Contact/index.tsx` reads these automatically via `process.env.NEXT_PUBLIC_*`.

> **Security note:** `NEXT_PUBLIC_` variables are exposed in the browser bundle — this is expected for EmailJS. Your private email credentials stay in EmailJS's servers, not in the code.

---

## 📁 Project Structure

```
antigravity/
├── app/
│   ├── globals.css          # Design tokens, keyframes, marquee animation, base reset
│   ├── layout.tsx           # Root layout — fonts, metadata, viewport config
│   └── page.tsx             # Single page — all sections composed here
│
├── components/
│   ├── Hero/                # 3D particle starfield, animated name reveal, typing subtitle
│   │   ├── index.tsx
│   │   ├── ParticleField.tsx
│   │   └── StarField.tsx
│   ├── About/               # Who I Am — bio, stats grid, core tech chips
│   │   └── index.tsx
│   ├── TechStack/           # What I Build With — 8 category infinite scroll rows
│   │   └── index.tsx
│   ├── Experience/          # Work history — vertical timeline, numbered highlights
│   │   └── index.tsx
│   ├── Projects/            # Portfolio projects — metric cards, GitHub + live links
│   │   └── index.tsx
│   ├── Education/           # Academic timeline — GPA blocks, coursework tags
│   │   └── index.tsx
│   ├── Contact/             # EmailJS contact form + direct contact links
│   │   └── index.tsx
│   └── shared/
│       ├── Navbar.tsx       # Sticky nav — JS-driven mobile hamburger drawer
│       ├── SectionWrapper.tsx
│       └── Footer.tsx
│
├── lib/
│   └── data.ts              # All content data — experience, projects, education, skills
│
├── public/
│   └── assets/
│       └── resume.pdf       # Downloadable resume
│
├── next.config.ts           # output: 'export', devIndicators: false
├── tsconfig.json
├── postcss.config.mjs
└── package.json
```

---

## 🎨 Customisation

All content lives in a **single file** — `lib/data.ts`. To make this portfolio your own:

1. **Personal info / bio** → `About` component inline content + `data.ts`
2. **Work experience** → `experience[]` array in `data.ts`
3. **Projects** → `projects[]` array in `data.ts` — update name, description, links, stack, metrics
4. **Education** → `education[]` array in `data.ts`
5. **Skills** → `skills{}` object and `skillsFlat` in `data.ts`
6. **Colors / fonts** → CSS custom properties at the top of `app/globals.css`
7. **Resume** → replace `public/assets/resume.pdf`

---

## 🎯 Performance Notes

- **Static export** — pre-rendered at build time, served as flat files. Zero server cold starts.
- **Fonts** loaded from Google Fonts via `<link>` in layout (preconnect configured).
- **Scroll animations** use `whileInView` (Framer Motion) — elements animate once in viewport.
- **3D scene** (Hero) uses `@react-three/fiber` — WebGL with graceful fallback.
- **Infinite scrollers** — pure CSS `animation: marquee-left / marquee-right` — GPU-composited, no JS loop.
- **Mobile nav** — JS-driven `isMobile` state (avoids Tailwind purge issues with dynamic class names).

---

## 📜 License

This project is licensed under the **MIT License** — see [LICENSE](./LICENSE) for details.

You are free to use, copy, modify, merge, publish, distribute, and sublicense this portfolio template. Attribution is appreciated but not required.

---

## 🙏 Acknowledgements

- [Three.js](https://threejs.org) — WebGL made approachable
- [Framer Motion](https://www.framer.com/motion/) — physics-based animation
- [Lucide](https://lucide.dev) — beautiful open-source icons
- [EmailJS](https://www.emailjs.com/) — zero-backend email

---

<p align="center">
  Built with ♥ by <strong>Prudhvi Charan P</strong> — Senior Full-Stack AI Engineer<br/>
  <a href="https://linkedin.com/in/prudhvi-charan">LinkedIn</a> ·
  <a href="https://github.com/Prudhvicharan">GitHub</a> ·
  <a href="mailto:psprudhvicharan@gmail.com">Email</a>
</p>
