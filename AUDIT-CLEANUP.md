# Branch A — audit cleanup

Branch: `fix/audit-cleanup`, based on fetched `origin/main` (`87de456`).
Existing `update-portfolio-data` branch is preserved. No deployment or push performed.

## Content sources

- User-supplied HNTB description: Application Developer II, full-time, July 2026–present, Kansas City, Missouri, on-site. The database scope, auditing counts, stored-procedure work, and Azure Synapse wording come from that description.
- User confirmed Akdene ended in June 2026. Its start date and technical responsibilities come from the attached résumé.
- `prudhvi-charan-resume.docx` supplies Vitrana titles, projects, technical skills, education, and metrics. Metrics are résumé-backed statements, not independently verified analytics. No production data was accessed.
- Removed unsupported homepage statistics and the million-line migration claim. Removed undergraduate coursework not supplied in the résumé.

## Requested changes

| Request | Implementation / status |
| --- | --- |
| Must 1: social URLs | Full URLs are stored centrally and used without prepending domains. GitHub HTTP 200 and profile identity checked; LinkedIn HTTP 999 blocks the automated request. Manual click-through pending. |
| Must 2: form and icon accessibility | Matching label/field IDs, autocomplete, project action names, persistent polite live regions, visible focus styles. |
| Must 3: mobile drawer | Native modal dialog with background inertness, initial focus, explicit Tab/Shift+Tab loop, Escape cancellation handler, focus restoration, expanded state, and desktop-resize cleanup. Automated handlers tested; native browser behavior pending. |
| Must 4: zoom | Removed maximumScale. Verified in exported HTML. |
| Must 5: reduced motion | Static skill groups and role text; MotionConfig respects user preference; CSS disables animation/transition and smooth scrolling; 3D is not mounted for reduced motion; tilt is disabled. |
| Must 6: SSR hero | Server-rendered H1, role and native View Work anchor. Only decorative WebGL is dynamically loaded. No navigation/CTA entrance delay. Other section content no longer starts invisible. |
| Must 7: mobile contact | Single-column fields below 600px, wrapping email/social addresses, direct mailto, clipboard error feedback, 16px inputs. |
| Should 1: skills | Static grouped lists; no repeated marquee content. |
| Should 2: project evidence | Problem, personal contribution/decisions, and résumé-backed results added; vague labels removed. Screenshots deferred: no screenshots in either public repository tree and browser capture is unavailable. No mock screenshots substituted. |
| Should 3: order | Hero → About → Projects → Skills → Experience → Education → Contact; matching numbering and navigation. |
| Should 4: anchors | Native fragment anchors, scroll offsets, and skip-to-content. |
| Should 5: readability | Raised 9–11px secondary text to at least 12px, removed text opacity reductions, increased body sizing, brighter education accent, 44px project action targets. Full rendered contrast/reflow testing remains pending. |
| Should 6: SEO | Updated factual metadata, canonical, PNG social preview, sitemap.xml and robots.txt in static export. Preview image visually inspected. |
| Should 7: email | Honest EmailJS handling notice, honest service-acceptance success message, error retaining input and offering mailto. Mocked success/failure/retry tested. Direct live test rejected with HTTP 403 because EmailJS disallows non-browser clients; inbox delivery remains unverified. |
| Nice: typography | Kept existing four-family direction to avoid unrelated visual changes; removed unused font weights from request. |
| Nice: year | Build-time current year with client refresh. |
| Nice: styles | Shared styles for touched layouts; removed blanket mobile padding overrides. No unrelated full refactor. |

## Additional fixes

- Next.js updated from 16.1.6 to 16.3.6 and compatible transitive security fixes applied; npm reported zero vulnerabilities afterward. Static hosting does not imply every framework server advisory was exploitable here.
- WebGL pauses offscreen/in background tabs, caps pixel ratio, and has an error boundary so unavailable WebGL does not remove the introduction.
- Fixed mouse-event cleanup: the subscription now uses an effect rather than treating a useThree selector as an effect.
- Prevent duplicate form submissions; disable sending until hydration and use POST semantics to avoid a no-JavaScript form putting contact data into a query string. A noscript note directs visitors to email.
- Removed résumé-download links restored by the older main baseline, rather than advertise an outdated PDF. The existing unlinked asset was not rewritten.
- Raised project action targets and allowed title/action rows and role metadata to wrap on small screens.

## Verification and limitations

Commands:

```sh
npm test
npm run typecheck
npm run build
npm run test:export
npm audit
```

Eight jsdom interaction tests cover contact validation, profile targets, success/loading/reset, forced failure/retained input/retry, clipboard denial, mobile focus loop/cancellation/restoration, fragment selection, and project action names. Dialog native methods are explicitly polyfilled for jsdom; these tests are not browser or manual testing.

Export checks inspect generated HTML for hero/H1/CTA, page order, field labels, named links, valid fragment targets, correct profile links and dates, unrestricted viewport, canonical/social metadata, preview asset, robots and sitemap.

Browser setup failed with `Importing module "node:process" is not allowed in node_repl` before any navigation could occur. No manual desktop/mobile, keyboard, screen-reader, console, WebGL, or contact-submit checks are claimed. The direct EmailJS request used one clearly marked QA message and returned HTTP 403; do not enable non-browser sending solely to pass this test.

Before deployment, finish these in a working browser:

1. Check 320/375/390px mobile and desktop layouts, zoom/reflow, and screen-reader names/status announcements.
2. Open both social links and verify the intended profiles (sign in to LinkedIn if required).
3. Open the drawer with keyboard; loop Tab/Shift+Tab; close with Escape/backdrop/link; verify focus restoration and desktop resize behavior.
4. Enable reduced motion before load and while open; verify static fallback, no smooth scroll/tilt, and no WebGL scene.
5. Submit one labeled contact test and confirm inbox receipt. Simulate offline/service failure and verify input retention, fallback and retry.
6. Capture real project screenshots and add them with descriptive alt text. Verify both demos' current interfaces before choosing images.
