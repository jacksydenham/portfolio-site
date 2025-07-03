import type { ShowcaseItem } from "./components/ShowcaseCarousel";

export const showcaseItems: ShowcaseItem[] = [
  {
    title: "End-to-End Audit Logging",
    intro: "At Astral IP I built a unified audit-log across SharePoint and our Admin Portal—so every user and system event flows through one consistent review UI.",
    section1Header: 'Sharepoint Document Trails',
    section1: [
      "SPFx web-parts push status changes into Dataverse",
      "Power Automate stamps, routes & logs approvals",
      "Every document auto-logs full revision history"
    ],
    section2Header: 'Admin Portal',
    section2: [
      "Prisma + PostgreSQL store all admin events",
      "Each row shows Action, Target & 1–3-word summary",
      "Expandable Before ↔ After diffs for any change"
    ],
    challenges: [
      { title: "Universal template", description: "one schema for every action" },
      { title: "Readability at scale", description: "terse summaries + detail on demand" },
      { title: "Seamless UX", description: "identical patterns in both platforms" }
    ],
    impact: "100% coverage, <2 min reviews, ISO-ready."
  },
  {
    title: "End-to-End Audit EATING",
    intro: "At Astral IP I built a unified audit-log across SharePoint and our Admin Portal—so every user and system event flows through one consistent review UI.",
    section1Header:'',
    section1: [
      "SPFx web-parts push status changes into EATING",
      "Power Automate EATING, routes & logs EATING",
      "Every document auto-logs full revision history"
    ],
    section2Header: '',
    section2: [
      "Prisma + PostgreSQL EATING all admin events",
      "Each EATING shows Action, Target & 1–3-word summary",
      "EATING Before ↔ After diffs for any EATING"
    ],
    challenges: [
      { title: "EATING template", description: "one schema for every action" },
      { title: "Readability EATING EATING", description: "terse EATING + EATING on demand" },
      { title: "EATING UX", description: "identical patterns EATING both platforms" }
    ],
    impact: "100% coverage, <2 min reviews, ISO-ready."
  }
];
