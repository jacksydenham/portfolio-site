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
      "At the heart of every polished interface are React, DevExtreme and ShadCN. React drives declarative rendering, DevExtreme handles data-dense grids and charts, and ShadCN (with Radix) provides accessible, themeable primitives that speed up UI development.",
  },
  {
    title: "Frontend Frameworks",
    items: ["React", "Next.js", "SPFx", "DevExtreme", "ShadCN"],
    blurb:
      "Next.js and React deliver a modern, server-rendered frontend—while SPFx brings that same React code into SharePoint. DevExtreme adds enterprise-grade data widgets, and ShadCN gives you the building blocks for custom design systems.",
  },
  {
    title: "Design & Prototyping",
    items: ["Figma"],
    blurb:
      "Design files live in Figma: from low-fi wireframes to pixel-perfect prototypes, complete with shared design tokens, auto-layout systems and collaborative review tools for rapid iteration.",
  },
  {
    title: "Backend Core",
    items: ["Node.js"],
    blurb:
      "Node.js powers the server side with event-driven, non-blocking I/O—ideal for streaming files, handling WebSocket streams, or running heavy compute tasks in AWS Lambda or similar environments.",
  },
  {
    title: "API & Integration Toolkit",
    items: ["Node.js", "tRPC", "Postman"],
    blurb:
      "tRPC gives you end-to-end typesafe APIs in Node.js. Postman collections become living documentation and regression tests, ensuring every endpoint behaves exactly as promised.",
  },
  {
    title: "Programming Languages",
    items: ["JSTS", "Java", "Python", "CPP"],
    blurb:
      "From TypeScript (JSTS) through Java and Python to performance-critical C++, a consistent coding style and shared logging/metrics conventions keep multi-runtime projects maintainable and debuggable.",
  },
  {
    title: "Data Modeling",
    items: ["SQL", "Prisma", "Dataverse"],
    blurb:
      "Your relational core lives in SQL Server or Postgres, modeled in Prisma for type-safe queries. Dataverse mirrors that same schema in Microsoft 365, making Power Apps and Automate integrations seamless.",
  },
  {
    title: "Schema & Validation",
    items: ["Zod"],
    blurb:
      "Zod sits at every API boundary and form, validating inputs in Node.js or the browser. You get runtime safety and generate accurate TypeScript types with zero extra boilerplate.",
  },
  {
    title: "Serverless Platforms",
    items: ["Next.js", "Power Automate", "Vercel", "AWS"],
    blurb:
      "Edge functions on Vercel and AWS Lambda handle SSR, file transforms, and background jobs. Power Automate orchestrates long-running flows—no servers to patch or scale.",
  },
  {
    title: "Cloud Hosting",
    items: ["Vercel", "AWS"],
    blurb:
      "Vercel delivers global CDN and edge compute for SSR and static assets. AWS covers heavy lifting—Lambda, S3, RDS—ensuring workloads run where they fit best.",
  },
  {
    title: "Platform Extensions",
    items: ["SharePoint"],
    blurb:
      "Custom code runs inside SharePoint via SPFx web-parts and extensions, giving intranet users new functionality without leaving the Microsoft 365 shell.",
  },
  {
    title: "Business Process Automation",
    items: ["Power Automate"],
    blurb:
      "Power Automate listens to SharePoint/Dataverse events, then executes approval workflows, sends emails, and logs audit trails—connecting business users to automated pipelines.",
  },
  {
    title: "Collaborative Workflows",
    items: ["Teams"],
    blurb:
      "MS Teams is your hub for collaboration: stand-ups, code reviews, and release demos happen in Teams channels—integrated with Azure Pipelines and GitHub notifications.",
  },
  {
    title: "SDLC & Project Management",
    items: ["Teams", "Jira", "GitHub", "Postman"],
    blurb:
      "GitHub Actions build, lint, and deploy. Jira drives sprint planning and issue tracking. Teams hosts stand-ups and demos. Postman collections serve as living API specs.",
  },
  {
    title: "Version Control",
    items: ["GitHub"],
    blurb:
      "A robust Git-based workflow in GitHub—including pull requests, branch protections, and CI ensures code quality and traceability across the entire team.",
  },
];
