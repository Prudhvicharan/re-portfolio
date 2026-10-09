// Presentation only: how each project reads in the drawing register.
// `flow` is the system schematic, left to right; every step reflects lib/data.ts or the repo README.
export interface Step { label: string; note?: string; accent?: boolean }

export const work: Record<string, { kind: string; host: string; flow: Step[] }> = {
  "Career Axis": {
    kind: "Full-stack app",
    host: "prudhvicharan.github.io",
    flow: [
      { label: "Gmail API", note: "read-only inbox" },
      { label: "Rules", note: "cheap, exact matches" },
      { label: "Subject-level AI", note: "most messages stop here" },
      { label: "Full-body model", note: "fallback for the hard ones", accent: true },
      { label: "Azure Service Bus", note: "async routing" },
      { label: "Tracker", note: "8 job-signal categories" },
    ],
  },
  LaunchMasters: {
    kind: "Full-stack platform",
    host: "launchmasters-prod.vercel.app",
    flow: [
      { label: "External REST APIs", note: "institution data" },
      { label: "Python import", note: "normalize + load" },
      { label: "SQL schema", note: "schema-driven model" },
      { label: "Node / Express API", note: "filtering, pagination" },
      { label: "Redis cache", note: "hot queries", accent: true },
      { label: "Angular app", note: "search, deadlines" },
    ],
  },
  GitFolio: {
    kind: "Developer tool",
    host: "gitfolio.prudhvicharan.com",
    flow: [
      { label: "GitHub public API", note: "no login" },
      { label: "Pick repositories", note: "up to eight" },
      { label: "Write or draft", note: "Gemini is optional", accent: true },
      { label: "Compose", note: "Editorial · Studio · Aurora" },
      { label: "Sanitized preview", note: "rehype-sanitize" },
      { label: "README.md", note: "copy or download" },
    ],
  },
  "Four Founders": {
    kind: "VS Code extension",
    host: "VS Code Marketplace",
    flow: [
      { label: "Four houses", note: "Godric · Salazar · Rowena · Helga" },
      { label: "Dark + light", note: "eight themes" },
      { label: "Workbench colors", note: "house banners on the chrome", accent: true },
      { label: "Syntax tokens", note: "tuned for long sessions" },
      { label: "Marketplace", note: "prudhvicharan.four-founders" },
    ],
  },
};
