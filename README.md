# Prudhvi Charan — Portfolio

Next.js static portfolio with a server-rendered introduction, project evidence, work history, grouped skills, education, and an EmailJS contact form. The existing dark/cyan visual direction is retained, with optional decorative Three.js rendering.

## Development

```sh
npm ci
npm run dev
```

Content lives in `lib/data.ts`. Profile values are complete HTTPS URLs. Treat the résumé and owner-supplied updates as the source of truth; do not invent results or dates.

Configure these public EmailJS identifiers in an ignored `.env` file:

```dotenv
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

The EmailJS template must accept `user_name`, `user_email`, and `message`. Recipient settings, origin restrictions, quotas, and delivery are managed in EmailJS. Never put private service credentials in `NEXT_PUBLIC_*` variables.

## Verification

```sh
npm test
npm run typecheck
npm run build
npm run test:export
```

Interaction tests mock EmailJS and use jsdom; they do not send email or certify browser layout. See [AUDIT-CLEANUP.md](AUDIT-CLEANUP.md) for completed checks, content provenance, and remaining manual browser/delivery checks.

## Export and deployment

`npm run build` writes the static site to `out/`, including robots.txt, sitemap.xml, canonical metadata and the social preview. `npm run deploy` builds and publishes that directory to the gh-pages branch; run it only when ready to publish. Next.js server-only features are not used for this static site.

The social preview is `public/social-preview.png`. Its reproducible SVG-to-PNG generator is `scripts/generate-social-preview.mjs` (uses the sharp dependency supplied with Next.js).
