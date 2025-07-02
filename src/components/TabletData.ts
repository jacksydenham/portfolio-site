export interface TabletMeta {
  name: string;
  /** Descriptive tags the tile belongs to (used for filters, search, etc.) */
  categories: string[];
  /** Categories that drive cross-highlighting when this tile is hovered */
  triggers: string[];
  /** Which curated group to show first (primary blurb) */
  primarySkill: string;
  gridX: number;
  gridY: number;
  projects?: string[];
}

export const TabletMeta: TabletMeta[] = [
  { name:"React",          categories:["Frontend","UI"],            triggers:["Frontend","UI"],               primarySkill:"Core UI Components",          gridX:0, gridY:0, projects:["KeyDocs","Carer Manager Plus"] },
  { name:"Next.js",        categories:["Frontend","Serverless"],    triggers:["Frontend","Serverless"],       primarySkill:"Frontend Frameworks",          gridX:1, gridY:0, projects:["KeyDocs","Carer Manager Plus"] },
  { name:"SPFx",           categories:["Frontend","Integration"],   triggers:["Frontend","Integration"],      primarySkill:"Platform Extensions",          gridX:2, gridY:0, projects:["KeyDocs"] },
  { name:"DevExtreme",     categories:["Frontend","UI"],            triggers:["UI","Frontend"],               primarySkill:"Core UI Components",          gridX:3, gridY:0, projects:["Carer Manager Plus"] },
  { name:"ShadCN",         categories:["Frontend","UI"],            triggers:["UI","Frontend"],               primarySkill:"Core UI Components",          gridX:4, gridY:0, projects:["KeyDocs"] },
  { name:"Figma",          categories:["Design","SDLC"],            triggers:["Design"],                      primarySkill:"Design & Prototyping",         gridX:5, gridY:0 },
 
  { name:"Node.js",        categories:["Backend","API","Integration"],triggers:["Backend","API"],             primarySkill:"Backend Core",                gridX:0, gridY:1, projects:["Carer Manager Plus"] },
  { name:"JSTS",           categories:["Lang","Frontend"],          triggers:["Lang", "Frontend", "Backend"],                        primarySkill:"Programming Languages",        gridX:1, gridY:1, projects:["KeyDocs","Carer Manager Plus"] },
  { name:"Java",           categories:["Lang","Backend"],           triggers:["Lang"],                        primarySkill:"Programming Languages",        gridX:2, gridY:1, projects:["SmartBoard"] },
  { name:"Python",         categories:["Lang","Backend"],           triggers:["Lang"],                        primarySkill:"Programming Languages",        gridX:3, gridY:1 },
  { name:"CPP",            categories:["Lang"],                     triggers:["Lang"],                        primarySkill:"Programming Languages",        gridX:4, gridY:1 },
  { name:"tRPC",           categories:["API","Integration"],         triggers:["API","Integration"],          primarySkill:"API & Integration Toolkit",    gridX:5, gridY:1, projects:["KeyDocs"] },

  { name:"SQL",            categories:["Databasing"],                triggers:["Databasing"],                 primarySkill:"Data Modeling",               gridX:0, gridY:2, projects:["Carer Manager Plus","SmartBoard"] },
  { name:"Prisma",         categories:["Databasing","ORM"],          triggers:["Databasing","ORM"],           primarySkill:"Data Modeling",               gridX:1, gridY:2, projects:["KeyDocs"] },
  { name:"Zod",            categories:["Databasing"],                triggers:["Databasing"],                 primarySkill:"Schema & Validation",          gridX:2, gridY:2, projects:["KeyDocs"] },
  { name:"Dataverse",      categories:["Databasing","Integration"],  triggers:["Databasing","Integration"],   primarySkill:"Data Modeling",               gridX:3, gridY:2, projects:["KeyDocs"] },
  { name:"Power Automate", categories:["Integration","Serverless"],  triggers:["Integration","Serverless"],   primarySkill:"Business Process Automation", gridX:4, gridY:2, projects:["KeyDocs"] },
  { name:"Vercel",         categories:["Cloud","Serverless"],        triggers:["Cloud","Serverless"],         primarySkill:"Cloud Hosting",               gridX:5, gridY:2, projects:["SmartBoard"] },

  { name:"SharePoint",     categories:["Integration","Platform"],    triggers:["Integration","Platform"],     primarySkill:"Platform Extensions",         gridX:0, gridY:3, projects:["KeyDocs"] },
  { name:"Teams",          categories:["Collaboration","SDLC"],      triggers:["Collaboration","SDLC"],       primarySkill:"Collaborative Workflows",     gridX:1, gridY:3, projects:["KeyDocs","Carer Manager Plus"] },
  { name:"Jira",           categories:["SDLC"],                     triggers:["SDLC"],                        primarySkill:"SDLC & Project Management",   gridX:2, gridY:3, projects:["KeyDocs","Carer Manager Plus"] },
  { name:"GitHub",         categories:["SDLC","Version Control"],    triggers:["SDLC","Version Control"],     primarySkill:"Version Control",             gridX:3, gridY:3 },
  { name:"AWS",            categories:["Cloud","Serverless"],        triggers:["Cloud","Serverless"],         primarySkill:"Cloud Hosting",               gridX:4, gridY:3 },
  { name:"Postman",        categories:["API","Integration"],         triggers:["API","Integration"],          primarySkill:"API & Integration Toolkit",    gridX:5, gridY:3, projects:["Carer Manager Plus"] },
];
