import type { ProjectData } from "./components/ProjectCard";

export const projects: ProjectData[] = [
  {
    title: "KeyDocs",
    logoUrl: "/images/keydocs.png",
    subtitle: "Astral IP",
    teamSize: 2,
    duration: "12mo",
    colors: ["#2b79d7", "#0541F8", "#5ECBFF"],
    intro:
      "KeyDocs automates the creation, review, approval, and publication of business documents, transforming approved files into stamped, controlled PDFs and hosting them in SharePoint to streamline workflows, reduce manual tracking, and ensure compliance.",
    descriptions: [
      {
        title: "Front-end (React sites)",
        children: [
          {
            title:
              "Admin Center: tenant setup, document roles & config interfaces",
          },
          {
            title: "Consumer Portal: consumer users view released docs",
          },
        ],
      },
      {
        title: "SPFx Web Parts",
        children: [
          {
            title: "Assignments page: filterable workflow task dashboard",
          },
          {
            title:
              "Controlled Documents UI: submit review/approval/obsoletion & view full document version history",
          },
        ],
      },
      {
        title: "Document Lifecycle (Power Automate Flows)",
        children: [
          {
            title:
              "Parallel & sequential review cycles which influence metadata",
          },
          {
            title:
              "Approvals generate stamped controlled PDF via customisable transformation profile",
          },
          {
            title: "Obsoletions with separate stamping and version locking",
          },
        ],
      },
      {
        title: "Transformation Profiles",
        children: [
          { title: "Metadata-driven stamping rules per document type" },
          {
            title:
              "Configurable headers, footers, watermarks & type associations",
          },
        ],
      },
      {
        title: "Governance & Notifications",
        children: [
          { title: "Comprehensive audit logging (see Technical Highlights below)" },
          {
            title:
              "Power Automate triggers for email reminders & workflow alerts",
          },
        ],
      },
      {
        title: "Tech Stack",
        children: [
          { title: "React / Next.js UI (Shadcn components)" },
          { title: "tRPC + Zod for type-safe API validation" },
          { title: "Prisma ORM + Redis <-> Dataverse tables" },
          { title: "SharePoint REST API & SPFx web parts" },
          { title: "Azure Functions stamping microservice" },
        ],
      },
    ],
  },
  {
    title: "Carer Manager Plus",
    logoUrl: "/images/carer.png",
    colors: ["var(--theme-color)", "var(--theme-color)", "var(--theme-color)"],
    subtitle: "GitHub",
    teamSize: 6,
    duration: "4mo",
    subtitleUrl:
      "https://github.com/jacksydenham/Carer-Manager-Plus-Admin-Portal",
    intro:
      "Rest API based front end to connect with live carers, arrange appointments, meetups, and host ive calls and schedule meetings for external stakleholders.",
    descriptions: [
      {
        title: "Purpose",
        children: [{ title: "Manage care plans and rostering" }],
      },
      {
        title: "Integration",
        children: [{ title: "Realtime data sync with mobile app" }],
      },
      {
        title: "Tech stack",
        children: [{ title: "Vue 3 / Pinia / Tailwind" }],
      },
    ],
  },
  {
    title: "SmartBoard",
    colors: ["#28a745", "#1e7e34", "#c3e6cb"],
    subtitle: "GitHub",
    teamSize: 1,
    duration: "4wk",
    descriptions: [
      {
        title: "Purpose",
        children: [{ title: "Interactive classroom dashboard" }],
      },
      {
        title: "Features",
        children: [{ title: "Live annotations & feedback" }],
      },
      { title: "Stack", children: [{ title: "Electron / React Three Fiber" }] },
    ],
  },
];
