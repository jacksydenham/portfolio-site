export interface TabletMeta {
  name: string;
  categories: string[];
  gridX: number;
  gridY: number;
  projects?: string[];
}

export const TabletMeta: TabletMeta[] = [
  { name: "React",                 categories: ["Full Stack"],                          gridX: 0, gridY: 0, projects: ["Keydocs", "Carer Manager Plus"] },
  { name: "Next.js",               categories: ["Full Stack", "Cloud"],                 gridX: 1, gridY: 0, projects: ["Keydocs", "Carer Manager Plus"] },
  { name: "JSTS",                  categories: ["Full Stack","Lang"],                   gridX: 2, gridY: 0, projects: ["Keydocs", "Carer Manager Plus"] },
  { name: "Node.js",               categories: ["Full Stack","Integration"],            gridX: 3, gridY: 0, projects: ["Carer Manager Plus"] },
  { name: "SQL",                   categories: ["Databasing"],                          gridX: 4, gridY: 0, projects: ["Carer Manager Plus", "SmartBoard"] },
  { name: "Prisma",                categories: ["Databasing"],                          gridX: 5, gridY: 0, projects: ["Keydocs"] },

  { name: "SharePoint",            categories: ["Cloud","Integration"],                 gridX: 0, gridY: 1, projects: ["Keydocs"] },
  { name: "SPFx",                  categories: ["Full Stack","Cloud"],                  gridX: 1, gridY: 1, projects: ["Keydocs"] },
  { name: "Power Automate",        categories: ["Cloud","Integration"],                 gridX: 2, gridY: 1, projects: ["Keydocs"] },
  { name: "Vercel",                categories: ["Full Stack", "Cloud"],                 gridX: 3, gridY: 1, projects: ["SmartBoard"] },
  { name: "Zod",                   categories: ["Databasing","Cloud"],                  gridX: 4, gridY: 1, projects: ["Keydocs"] },
  { name: "tRPC",                  categories: ["Integration", "Cloud", "Full Stack"],  gridX: 5, gridY: 1, projects: ["Keydocs"] },
    
  { name: "Java",                  categories: ["Lang"],                                gridX: 0, gridY: 2, projects: ["SmartBoard"] },
  { name: "Python",                categories: ["Lang"],                                gridX: 1, gridY: 2 },
  { name: "CPP",                   categories: ["Lang"],                                gridX: 2, gridY: 2 },
  { name: "Postman",               categories: ["Integration", "SDLC"],                 gridX: 3, gridY: 2, projects: ["Carer Manager Plus"] },
  { name: "DevExtreme",            categories: ["Full Stack"],                          gridX: 4, gridY: 2, projects: ["Carer Manager Plus"] },
  { name: "ShadCN",                categories: ["Full Stack"],                          gridX: 5, gridY: 2, projects: ["Keydocs"] },

  { name: "Teams",                 categories: ["SDLC"],                                gridX: 0, gridY: 3, projects: ["Keydocs", "Carer Manager Plus"] },
  { name: "Jira",                  categories: ["SDLC"],                                gridX: 1, gridY: 3, projects: ["Keydocs", "Carer Manager Plus"] },
  { name: "GitHub",                categories: ["SDLC"],                                gridX: 2, gridY: 3 },
  { name: "AWS",                   categories: ["Cloud"],                               gridX: 3, gridY: 3 },
  { name: "Dataverse",             categories: ["Databasing","Cloud"],                  gridX: 4, gridY: 3, projects: ["Keydocs"] },
  { name: "Figma",                 categories: ["SDLC"],                                gridX: 5, gridY: 3 }
];
