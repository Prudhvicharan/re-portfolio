// Presentation only: how each project reads in the drawing register.
// `flow` is the system schematic, left to right; every step reflects lib/data.ts or the repo README.
// `run` is what the Run animation narrates when a sample item passes through that step.
export interface Step { label: string; note?: string; run: string; accent?: boolean }

export const work: Record<string, { kind: string; host: string; sample: string; flow: Step[] }> = {
  "Career Axis": {
    kind: "Full-stack app",
    host: "prudhvicharan.github.io",
    sample: "an application email",
    flow: [
      { label: "Gmail API", note: "read-only inbox", run: "A new email arrives; the app reads it with read-only access." },
      { label: "Rules", note: "cheap, exact matches", run: "Known senders and phrases are matched first, at almost no cost." },
      { label: "Subject-level AI", note: "most messages stop here", run: "If the rules can't decide, a model classifies it from the subject line alone." },
      { label: "Full-body model", note: "fallback for the hard ones", run: "Only ambiguous emails pay for a full-body read by the larger model.", accent: true },
      { label: "Azure Service Bus", note: "async routing", run: "The labelled result is queued, so slow steps never block the inbox sync." },
      { label: "Tracker", note: "8 job-signal categories", run: "The application moves to its stage, one of eight signal categories." },
    ],
  },
  LaunchMasters: {
    kind: "Full-stack platform",
    host: "launchmasters-prod.vercel.app",
    sample: "one college record",
    flow: [
      { label: "External REST APIs", note: "institution data", run: "Institution data is pulled from external REST APIs." },
      { label: "Python import", note: "normalize + load", run: "Import scripts clean and normalize the fields before loading." },
      { label: "SQL schema", note: "schema-driven model", run: "The record lands in a schema-driven model, one shape for every college." },
      { label: "Node / Express API", note: "filtering, pagination", run: "The API serves it through filtered, paginated queries." },
      { label: "Redis cache", note: "hot queries", run: "Popular searches are answered from cache instead of the database.", accent: true },
      { label: "Angular app", note: "search, deadlines", run: "A student finds the college, tracks its deadlines and manages the application." },
    ],
  },
  GitFolio: {
    kind: "Developer tool",
    host: "gitfolio.prudhvicharan.com",
    sample: "a GitHub profile",
    flow: [
      { label: "GitHub public API", note: "no login", run: "A public profile is imported; no GitHub login is ever requested." },
      { label: "Pick repositories", note: "up to eight", run: "The user chooses up to eight repositories to feature." },
      { label: "Write or draft", note: "Gemini is optional", run: "They write the story, or let Gemini draft it with their own key, never stored.", accent: true },
      { label: "Compose", note: "Editorial · Studio · Aurora", run: "The story is laid out in one of three directions." },
      { label: "Sanitized preview", note: "rehype-sanitize", run: "The preview renders through an explicit sanitization schema." },
      { label: "README.md", note: "copy or download", run: "Ready-to-publish Markdown is copied or downloaded; nothing writes to GitHub." },
    ],
  },
  "Four Founders": {
    kind: "VS Code extension",
    host: "VS Code Marketplace",
    sample: "one theme",
    flow: [
      { label: "Four houses", note: "Godric · Salazar · Rowena · Helga", run: "Each theme starts from one house and its colors." },
      { label: "Dark + light", note: "eight themes", run: "Every house gets a dark and a light variant: eight themes in all." },
      { label: "Workbench colors", note: "house banners on the chrome", run: "House colors go on the title and status bars, where banners belong.", accent: true },
      { label: "Syntax tokens", note: "tuned for long sessions", run: "Code colors stay calm and readable for an eight-hour day." },
      { label: "Marketplace", note: "prudhvicharan.four-founders", run: "Published to the VS Code Marketplace, one install for all eight." },
    ],
  },
};
