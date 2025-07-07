import type { ShowcaseItem } from "./components/ShowcaseCarousel";

export const showcaseItems: ShowcaseItem[] = [
  {
    title: "This Portfolio's Interface",
    intro:
      "This site's board/tile interface is built with React Three Fiber, backed by a global store architecture, merging 3D visuals with structured frontend state management.",

    section1Header: "State-Driven Architecture",
    section1: [
      "Local Zustand store holds metadata for tiles, projects, skills, and scene/scroll states",
      "Curated skill groups are derived from hover states based on categorised triggers",
      "Scroll and 3D content respond to store state without noticeable performance drops",
    ],

    section2Header: "Interactive R3F Layer",
    section2: [
      "Instanced tiles with custom textures allow for clear visualisation of my tech stack and practical experience",
      "Cohesive 3D logic keeps visuals consistent across all animated states",
    ],

    challenges: [
      {
        title: "State coordination",
        description: "Skill/project content, scroll & scene all driven from one store",
      },
      {
        title: "Dynamic content",
        description: "Tile data drives both visuals and displayed content",
      },
      {
        title: "Performance tuning",
        description: "Instancing + memoised R3F loop = ~0 re-renders",
      },
    ],
    impact: "One unified frontend layer combining React, R3F, Zustand, and a scroll-based UI.",
    images: [ "images/thisArch.png","/images/figma.png",]
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
        description: "One table handles 26 different events with varying complexity.",
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
    impact: "Every action traceable, every review centralised, ISO 27001 compliance covered.",
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
