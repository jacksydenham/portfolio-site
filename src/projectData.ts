import type { ProjectData } from "./components/ProjectCard";

export const projects: ProjectData[] = [
  {
    title: "KeyDocs",
    logoUrl: "/images/keydocs.png",
    subtitle: "Astral IP",
    teamSize: 3,
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
    title: "Agent Bond",
    logoUrl: "/images/agentbond.png",
    colors: ["#ffffffff", "#ffa600ff", "#ffffff"],
    subtitle: "GitHub",
    subtitleUrl: "https://github.com/jacksydenham/agent-bond",
    teamSize: 1,
    duration: "2 wk",
    intro:
      "Agent Bond is an AI‑powered agent that joins your Discord voice channel, transcribes live speech via Azure Cognitive Services, then uses GPT‑4 to automatically perform Jira actions, moving or creating tasks with an approval step before execution for full transparency and security.",
    showcaseMedia: [
      { type: "video", url: "https://youtu.be/jhei7UBwx9g" },
      { type: "image", url: "/images/bond1.png" },
      { type: "image", url: "/images/bond2.png" },
    ],
    descriptions: [
      {
        title: "Overview",
        children: [
          {
            title:
              "Real‑time voice transcription from custom Discord bot via Azure Speech Service",
          },
          {
            title: "GPT‑4 parsing of transcript into structured Jira commands",
          },
          {
            title:
              "Automatic execution of Jira actions, with toast-based user approval",
          },
          {
            title:
              "Interactive React Kanban dashboard with drag and drop to mirror live Jira board",
          },
        ],
      },
      {
        title: "Key Features",
        children: [
          {
            title: "End‑to‑end automation: speech → parse → confirm → execute",
          },
          {
            title:
              "Decoupled parsing & action execution for secure OAuth cookie handling",
          },
          {
            title:
              "Activity feed for audit‑style logging of all automated and manual actions",
          },
        ],
      },
      {
        title: "Stack & Integration",
        children: [
          { title: "Next.js, React, Tailwind CSS, dnd‑kit" },
          { title: "Node.js API Routes, OpenAI GPT‑4o mini, react‑hot‑toast" },
          { title: "discord.js, Azure Speech SDK, Express" },
          { title: "Atlassian REST API (Jira), secure OAuth cookie flow" },
        ],
      },
    ],
  },
  {
    title: "AI Content Platform",
    logoUrl: "/images/kingdom.png",
    colors: ["var(--theme-color)", "var(--theme-color)", "var(--theme-color)"],
    subtitle: "In-Progress",
    teamSize: 5,
    duration: "12 wk",
    intro:
      "An automated content platform that transforms a single URL into a complete, SEO-friendly blog post in under 45 seconds. It uses a scalable pipeline to scrape web data, generate AI-driven content, and prepare it for publication.",
    descriptions: [
      {
        title: "Core Functionality",
        children: [
          { title: "Automated blog post & image generation from a URL" },
          { title: "Keyword-driven for SEO-optimized content" },
          { title: "Sub-45s article generation & sub-2m video creation" },
        ],
      },
      {
        title: "System Architecture",
        children: [
          { title: "Scalable, multi-tenant backend for concurrent users" },
          { title: "End-to-end automated content pipeline via n8n" },
          { title: "Secure user authentication and management with Clerk" },
        ],
      },
      {
        title: "Tech Stack",
        children: [
          { title: "React, Node.js, TypeScript" },
          { title: "n8n for workflow automation" },
          { title: "OpenAI API (GPT-4)" },
          { title: "Clerk for authentication" },
        ],
      },
    ],
  }
]