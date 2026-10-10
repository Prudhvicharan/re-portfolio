# Prudhvi Charan — Portfolio

A static Next.js portfolio designed as an engineering drawing set: six sticky sheets (cover, profile, work, experience, materials, contact) in cyanotype blue with red markup. The cover portrait is a WebGL halftone, project schematics can be run step by step, and sheet headings are drawn like a pen plotter.

## Development

```sh
npm ci
npm run dev
```

All content lives in `lib/data.ts` (profile, experience, projects, skills, education). `lib/work.ts` holds the project schematics. Treat the résumé as the source of truth; do not invent results or dates.

Configure the public EmailJS identifiers for the contact form in an ignored `.env` file:

```dotenv
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

The EmailJS template must accept `user_name`, `user_email` and `message`.

## Structure

| Path | Purpose |
|---|---|
| `app/` | Layout, page, global styles, icons, robots and sitemap |
| `components/site/` | Sheets, nav, mobile sheet tab, portrait, register, schematic, contact, motion |
| `lib/` | Content (`data.ts`) and schematic definitions (`work.ts`) |
| `public/` | Résumé, portrait, social preview, CNAME |
| `tests/` | Interaction tests (Vitest + Testing Library) |
| `scripts/verify-export.mjs` | Checks the static export after a build |

## Verification

```sh
npm test
npm run typecheck
npm run build
npm run test:export
```

## Export and deployment

`npm run build` writes the static site to `out/`. `npm run deploy` builds and publishes it to the `gh-pages` branch; run it only when ready to publish.

The social preview, `public/social-preview.png`, is a 1200×630 capture of the cover sheet. The site icon is `app/icon.svg`, with `app/apple-icon.png` rendered from it.
