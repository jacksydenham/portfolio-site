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
          {
            title:
              "Comprehensive audit logging (see Technical Highlights below)",
          },
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
    subtitleUrl:
      "https://github.com/jacksydenham/Carer-Manager-Plus-Admin-Portal",

    teamSize: 6,
    duration: "8 wk",
    intro:
      "Prototype admin portal for Carer Manager Plus. Lets admins manage companies, carers, employees and system reference data, bulk-import Excel files, and generate charge-rate reports. Built with React + DevExtreme against a Node/SQL-Server REST API in four agile sprints.",
    descriptions: [
      {
        title: "Core features",
        children: [
          { title: "CRUD for companies, employees, carers & reference tables" },
          { title: "Login / logout & secure password-change flow" },
          { title: "Excel import for clients, carers and employees" },
          { title: "Hours-charged reporting by company" },
        ],
      },
      {
        title: "Key integrations",
        children: [
          { title: "REST API layer to SQL Server" },
          { title: "Google Places autocomplete for address fields" },
          { title: "DevExtreme DataGrid, Form & Popup components" },
          { title: "Swagger UI for live API docs & testing" },
        ],
      },
      {
        title: "Tech & delivery",
        children: [
          { title: "React 18 • TypeScript • DevExtreme UI" },
          { title: "Node.js 16 / Express middleware" },
          { title: "SQL Server database" },
          { title: "4 x 2-week Scrum sprints with twice-weekly client demos" },
        ],
      },
    ],
  },
  {
    title: "More Coming Soon",
    colors: ["#28a745", "#1e7e34", "#c3e6cb"],
    subtitle: "",
    intro: "I'll be adding more projects as I complete them among my studies",
    descriptions: [
      {
        title: "Filler",
        children: [{ title: "Filler text" }],
      },
    ],
  },
];
