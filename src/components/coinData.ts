export interface CoinMeta {
  name: string;
  categories: string[];
  gridX: number;
  gridY: number;
}

export const coinMeta: CoinMeta[] = [
  { name: "React",                  categories: ["Full Stack"],             gridX: 0, gridY: 0 },
  { name: "REST API",              categories: ["Integration"],            gridX: 1, gridY: 0 },
  { name: "TypeScript / JavaScript",categories: ["Full Stack","Lang"],     gridX: 2, gridY: 0 },
  { name: "Node.js",               categories: ["Full Stack","Integration"],gridX: 3, gridY: 0 },
  { name: "SQL",                   categories: ["Databasing"],             gridX: 4, gridY: 0 },
  { name: "Prisma",                categories: ["Databasing"],             gridX: 5, gridY: 0 },

  { name: "SharePoint",            categories: ["Cloud","Integration"],    gridX: 0, gridY: 1 },
  { name: "SPFx",                  categories: ["Full Stack","Cloud"],     gridX: 1, gridY: 1 },
  { name: "Power Automate",        categories: ["Cloud","Integration"],    gridX: 2, gridY: 1 },
  { name: "JDBC",                  categories: ["Databasing"],             gridX: 3, gridY: 1 },
  { name: "Dataverse",             categories: ["Databasing","Cloud"],     gridX: 4, gridY: 1 },
  { name: "JSON",                  categories: ["Integration"],            gridX: 5, gridY: 1 },

  { name: "Java",                  categories: ["Lang"],                   gridX: 0, gridY: 2 },
  { name: "Python",                categories: ["Lang"],                   gridX: 1, gridY: 2 },
  { name: "C++",                   categories: ["Lang"],                   gridX: 2, gridY: 2 },
  { name: "JavaFX",                categories: ["Full Stack"],             gridX: 3, gridY: 2 },
  { name: "DevExtreme",            categories: ["Full Stack"],             gridX: 4, gridY: 2 },
  { name: "ShadCN",                categories: ["Full Stack"],             gridX: 5, gridY: 2 },

  { name: "Teams",                 categories: ["SDLC"],                   gridX: 0, gridY: 3 },
  { name: "Jira",                  categories: ["SDLC"],                   gridX: 1, gridY: 3 },
  { name: "GitHub",                categories: ["SDLC"],                   gridX: 2, gridY: 3 },
  { name: "Git",                   categories: ["SDLC"],                   gridX: 3, gridY: 3 },
  { name: "VSCode",                categories: ["SDLC"],                   gridX: 4, gridY: 3 },
  { name: "Figma",                 categories: ["SDLC"],                   gridX: 5, gridY: 3 }
];
