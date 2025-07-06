import type { ShowcaseItem } from "./components/ShowcaseCarousel";

export const showcaseItems: ShowcaseItem[] = [
  {
    title: "Filler Card for now ",
    intro:
      "At Astral IP I built a unified audit-log across SharePoint and our Admin Portal—so every user and system event flows through one consistent review UI.",
    section1Header: "Sharepoint Document Trails",
    section1: [
      "SPFx web-parts push status changes into Dataverse",
      "Power Automate stamps, routes & logs approvals",
      "Every document auto-logs full revision history",
    ],
    section2Header: "Admin Portal",
    section2: [
      "Prisma + PostgreSQL store all admin events",
      "Each row shows Action, Target & 1-3-word summary",
      "Expandable Before ↔ After diffs for any change",
    ],
    challenges: [
      {
        title: "Universal template",
        description: "one schema for every action",
      },
      {
        title: "Readability at scale",
        description: "terse summaries + detail on demand",
      },
      {
        title: "Seamless UX",
        description: "identical patterns in both platforms",
      },
    ],
    impact: "100% coverage, <2 min reviews, ISO-ready.",
    images: ["/images/auditLog.png", "/images/docHistory.png"],
  },
  {
    title: "Comprehensive Audit Logging",
    intro:
      "As part of Astral Consulting's KeyDocs project, I built a unified audit-logging system for our Admin Centre, capturing every configuration update and  action in a single user interface.",
    section1Header: "Backend: Schema & Storage",
    section1: [
      "Prisma schema in MicrosoftSQL to model every admin event",
      "Captured metadata: who, what, when, a short description and custom 'Details' object",
      "Stored full before/after snapshots for any field or permission change",
    ],
    section2Header: "Frontend: Review UI & Row Expand",
    section2: [
      "React table with filters by user, date, or action",
      "Inline expanders that open to show thorough details on changes made",
      "Designed for at-a-glance troubleshooting and accountability",
    ],
    challenges: [
      {
        title: "Schema Flexibility",
        description:
          "One table handles 26 different events with varying complexity.",
      },
      {
        title: "100% Coverage",
        description:
          "All administrative actions and config updates are tracked in full.",
      },
      {
        title: "Compliance-Grade UX",
        description:
          "Consistent display of entries ensures natural readability.",
      },
    ],
    impact:
      "Every action traceable, every review centralised, ISO 27001 compliance covered.",
  },
  {
    title: "End-to-End Audit EATING",
    intro:
      "At Astral IP I built a unified audit-log across SharePoint and our Admin Portal—so every user and system event flows through one consistent review UI.",
    section1Header: "",
    section1: [
      "SPFx web-parts push status changes into EATING",
      "Power Automate EATING, routes & logs EATING",
      "Every document auto-logs full revision history",
    ],
    section2Header: "",
    section2: [
      "Prisma + PostgreSQL EATING all admin events",
      "Each EATING shows Action, Target & 1-3-word summary",
      "EATING Before ↔ After diffs for any EATING",
    ],
    challenges: [
      { title: "EATING template", description: "one schema for every action" },
      {
        title: "Readability EATING EATING",
        description: "terse EATING + EATING on demand",
      },
      {
        title: "EATING UX",
        description: "identical patterns EATING both platforms",
      },
    ],
    impact: "100% coverage, <2 min reviews, ISO-ready.",
  },
];
