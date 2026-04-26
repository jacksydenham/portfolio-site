export interface CuratedGroup {
  title: string;
  items: string[];
  blurb: string;
}

export const curatedGroups: CuratedGroup[] = [
  {
    title: "Core UI Components",
    items: ["React", "DevExtreme", "ShadCN"],
    blurb:
      "React-driven rendering of DevExtreme's enterprise-grade grids and ShadCN primitives enables rapid delivery of real-time interfaces with fully accessible, themeable UI components.",
  },
  {
    title: "Frontend Frameworks",
    items: ["React", "Next.js", "SPFx", "DevExtreme", "ShadCN"],
    blurb:
      "Integrate Next.js/React server-rendered front-ends with exisitng ecosystems like SharePoint via SPFx, and enrich them with DevExtreme data widgets or custom ShadCN components.",
  },
  {
    title: "Design & Prototyping",
    items: ["Figma"],
    blurb:
      "Mock and iterate UI designs in Figma through collaborative review processes, creating quick feedback cycles.",
  },
  {
    title: "Backend Core",
    items: ["Node.js", "Redis"],
    blurb:
      "Build event-driven Node.js backends with REST APIs, real-time WebSocket messaging, Redis caching, and serverless computation workloads.",
  },
  {
    title: "API & Integration Toolkit",
    items: ["Node.js", "tRPC", "Redis"],
    blurb:
      "Design type-safe tRPC and REST APIs in Node.js with Redis caching to create high performance integrate layers.",
  },
  {
    title: "Programming Languages",
    items: ["JSTS", "Java", "Python", "CPP"],
    blurb:
      "Fluent in JavaScript, TypeScript, Java, Python, and C++, with extensive experience adapting to new languages as integration requirements call for it.",
  },
  {
    title: "Data Modeling",
    items: ["SQL", "Prisma", "Dataverse"],
    blurb:
      "Model relational data in SQL databases with Prisma for type-safe queries, and mirror schemas in data services like Dataverse for seamless Power Platform integration.",
  },
  {
    title: "Schema & Validation",
    items: ["Zod"],
    blurb:
      "Define and enforce runtime and TypeScript schemas with Zod for robust input validation across both APIs and UIs.",
  },
  {
    title: "Serverless Platforms",
    items: ["Next.js", "Power Automate", "Vercel", "Azure"],
    blurb:
      "Utilise Next.js API routes, Vercel Edge and Azure for serverless SSR, file transforms, and background tasks, and automate cloud workflows with Power Automate.",
  },
  {
    title: "Cloud Hosting",
    items: ["Vercel", "Azure"],
    blurb:
      "Deploy SSR and static assets on Vercel's global CDN, and offload processing and storage to cloud platforms (e.g., Azure, AWS Lambda, S3, and RDS).",
  },
  {
    title: "Platform Extensions",
    items: ["SharePoint"],
    blurb:
      "Extend existing intranets with web-parts and extensions like SPFx to deliver seamless custom functionality.",
  },
  {
    title: "Business Process Automation",
    items: ["Power Automate", "n8n"],
    blurb:
      "Leverage cloud automation platforms like Power Automate and n8n to drive event-based workflows, triggering approvals, notifications, and data transformations from enterprise sources.",
  },
  {
    title: "Collaborative Workflows",
    items: ["Teams"],
    blurb:
      "Use of communication channels to quickly resolve issues and keep projects on track through team coordination, built on years of experience in customer service.",
  },
  {
    title: "SDLC & Project Management",
    items: ["Teams", "Jira", "GitHub"],
    blurb:
      "Manage the entire SDLC using Jira for sprint planning and issue tracking, and GitHub for version control, pull-request reviews, and CI/CD practices to ensure reliable, on time releases.",
  },
  {
    title: "Version Control",
    items: ["GitHub"],
    blurb:
      "Git-driven version control with structured branching strategies, pull requests, and commit conventions to maintain code history and expedite onboarding processes.",
  },
  {
    title: "AI Integration",
    items: ["ChatGPT"],
    blurb:
      "ChatGPT Integration to power automation, enhancing user interactions by streamlining decision-making through natural language understanding and context-aware task handling.",
  },
];
