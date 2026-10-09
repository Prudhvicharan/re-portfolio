// Presentation only: which screenshot each project uses and where its markup callouts point.
// Coordinates are percentages of the screenshot (target = what the leader line points at).
export interface Callout { label: string; text: string; target: [number, number]; at: [number, number]; side: "left" | "right" }

export const work: Record<string, { image: string; alt: string; url: string; callouts: Callout[] }> = {
  "Career Axis": {
    image: "/work/career-axis.jpg",
    alt: "Career Axis sign-in screen: Google sign-in with read-only Gmail access to track job applications.",
    url: "prudhvicharan.github.io/Career-Axis",
    callouts: [
      { label: "Ingest", text: "Gmail integration: applications tracked straight from the inbox", target: [50, 67], at: [70, 84], side: "right" },
      { label: "Classify", text: "Rules, then subject-level AI, then a full-body model fallback", target: [38.5, 55.5], at: [27, 44], side: "left" },
      { label: "Outcome", text: "500+ active users · 90%+ accuracy across eight job-signal categories", target: [50, 36], at: [70, 22], side: "right" },
    ],
  },
  LaunchMasters: {
    image: "/work/launchmasters.jpg",
    alt: "LaunchMasters home page: a college application platform with search, deadlines and reminders.",
    url: "launchmasters-prod.vercel.app",
    callouts: [
      { label: "Data", text: "Institution data from external REST APIs, normalized by Python import scripts", target: [51.4, 4.3], at: [74, 17], side: "right" },
      { label: "Backend", text: "Node.js and Express API with Redis caching, filtering and pagination", target: [43.5, 64.5], at: [33, 80], side: "left" },
      { label: "Scale", text: "1,200+ students · 500+ concurrent users at 99.5% uptime", target: [52, 84], at: [76, 62], side: "right" },
    ],
  },
};
