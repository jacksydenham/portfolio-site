import type { JournalEntry } from "./JournalRail";

export const journalEntries: JournalEntry[] = [
  {
    id: "j-029",
    date: "2025-10-10",
    title: "Capstone Sprint Submission",
    points: [
      "Pushed the final features for the current sprint.",
      "Completed peer reviews for the team."
    ],
    tags: ["uni", "capstone", "deadline"],
    category: "dev"
  },
  {
    id: "j-028",
    date: "2025-10-08",
    title: "Evening Run",
    points: [
      "5km run to clear my head after coding struggles.",
      "Feeling re-energised for tomorrow."
    ],
    tags: ["cardio", "running"],
    category: "health"
  },
  {
    id: "j-026",
    date: "2025-10-06",
    title: "R3F Documentation Updates",
    points: [
      "Received feedback on my open source PR.",
      "Made 5+ documentation updates to clarify API behaviour based on maintainer comments."
    ],
    tags: ["open-source", "docs", "r3f"],
    category: "dev"
  },
  {
    id: "j-025",
    date: "2025-10-05",
    title: "Rest & Recovery",
    points: [
      "Active recovery day.",
      "Light walk and focused on nutrition."
    ],
    tags: ["rest"],
    category: "health"
  },
  {
    id: "j-024",
    date: "2025-10-04",
    title: "Portfolio UI Polish",
    points: [
      "Refined the styling for this journal component.",
      "Improved the state management with Zustand to handle filtering by category."
    ],
    tags: ["ui", "React", "Zustand"],
    category: "dev"
  },
  {
    id: "j-023",
    date: "2025-10-03",
    title: "Coding Challenge Submitted",
    points: [
      "Completed the assessment well within the time limit.",
      "Solved both problems with optimal solutions in TypeScript."
    ],
    body: "Felt much more confident on this one compared to previous attempts. The LeetCode practice is paying off.",
    tags: ["jobs", "TypeScript"],
    category: "dev"
  },
  {
    id: "j-022",
    date: "2025-10-02",
    title: "Received Coding Challenge",
    points: [
      "Got a technical assessment from a promising grad role application.",
      "Spent the evening brushing up on algorithms and data structures."
    ],
    tags: ["jobs", "assessment", "algorithms"],
    category: "dev"
  },
  {
    id: "j-021",
    date: "2025-10-01",
    title: "Capstone Code Review & Gym",
    points: [
      "Reviewed a teammate's PR for the backend services.",
      "Provided constructive feedback on API design.",
      "Hit the gym for a strength session post-uni work."
    ],
    tags: ["uni", "collaboration", "gym"],
    category: "dev"
  },
  {
    id: "j-019",
    date: "2025-09-29",
    title: "PR for pmndrs/r3f",
    points: [
      "Commited open source code for r3f repo to improve mobile 'cursor' tracking",
    ],
    body: "Pretty cool contributing back to a library I used for this portfolio.",
    tags: ["open-source", "r3f", "React"],
    category: "dev"
  },
  {
    id: "j-018",
    date: "2025-09-28",
    title: "Weekend Hike",
    points: [
      "Needed a break from the screen.",
      "Went for a long hike at the Dandenong Ranges."
    ],
    tags: ["hiking", "outdoors"],
    category: "health"
  },
  {
    id: "j-016",
    date: "2025-09-26",
    title: "Capstone DB Schema & Meal Prep",
    points: [
      "Finalised the PostgreSQL schema for our capstone project using Prisma.",
      "Generated migrations and seeded the database with initial data.",
      "Prepped high-protein meals for the next few days."
    ],
    tags: ["uni", "capstone", "Prisma", "SQL", "food"],
    category: "dev"
  },
  {
    id: "j-015",
    date: "2025-09-25",
    title: "Agent Bond: GPT-4 Command Parsing",
    points: [
      "Developed the prompt logic to transform transcribed voice into structured Jira commands.",
      "Using Zod to validate the JSON output from GPT-4 to ensure data integrity."
    ],
    tags: ["AI", "OpenAI", "NLP", "Zod"],
    category: "dev"
  },
  {
    id: "j-014",
    date: "2025-09-24",
    title: "Agent Bond: Audio Pipeline",
    points: [
      "Built the low-latency audio pipeline in Node.js.",
      "Successfully decoding Discord's Opus streams into PCM for real-time transcription via Azure Speech."
    ],
    body: "Getting the real-time aspect right was tricky but the performance is solid.",
    tags: ["AI", "Node.js", "Azure", "audio"],
    category: "dev"
  },
  {
    id: "j-013",
    date: "2025-09-23",
    title: "Capstone System Design",
    points: [
      "Mapped out the high-level architecture for my final year capstone project.",
      "Decided on a tech stack: Next.js, tRPC, and PostgreSQL.",
    ],
    tags: ["uni", "capstone"],
    category: "dev"
  },
  {
    id: "j-012",
    date: "2025-09-22",
    title: "Resume & Portfolio Upgrades",
    points: [
      "Rewrote descriptions for my Astral experience to better reflect my impact.",
      "Padded my portfolio with the new Agent Bond project."
    ],
    tags: ["jobs", "resume", "portfolio"],
    category: "dev"
  },
  {
    id: "j-011",
    date: "2025-09-21",
    title: "Post-Travel Recovery",
    points: [
      "Back in Melbourne after the Europe trip.",
      "Light workout and mobility session to combat jet lag."
    ],
    tags: ["cardio", "travel"],
    category: "health"
  },
  {
    id: "j-010",
    date: "2025-09-03",
    title: "LeetCode + Mimo Spam",
    points: [
      "Preparing for technical assessment for Seek",
      "Mimo feeling too simple for how time consuming it is, but I feel it's worth it anyway",
    ],
    tags: ["JS", "coding"],
    category: "dev"
  },
  {
    id: "j-009",
    date: "2025-09-02",
    title: "Phase 1/5 Business Dev Complete",
    points: [
      "Twilio VoIP set up",
      "HTTP tunnel attached to call response (nGrok for now)",
      "Custom JS file running through call - will host AI interaction"
    ],
    body: "Smooth first phase, done in one day",
    tags: ["business", "JS"],
    category: "dev"
  },
  {
    id: "j-008",
    date: "2025-09-01",
    title: "Created this Journal for accountability",
    points: [
      "Fixed, left-docked rail with independent scroll",
    ],
    body: "Doesn't interfere with existing content or R3F interactions.",
    tags: ["ui"],
    category: "dev"
  },
  {
    id: "j-007",
    date: "2025-09-01",
    title: "1hr walk: 14 incline / 4.5 speed",
    points: [
      "Spa cooldown after",
      "52nd floor views were elite"
    ],
    tags: ["cardio"],
    category: "health"
  },
  {
    id: "j-006",
    date: "2025-08-31",
    title: "Began RnD: AI Call Automation business",
    points: [
      "Planning call -> booking process and handoff",
      "Mapped candidate tech stack",
      "AI Prompt planning + additional context mgmt"
    ],
    tags: ["AI", "research"],
    category: "dev"
  },
  {
    id: "j-005",
    date: "2025-08-26",
    title: "Uni-Focussed Day",
    points: [
      "Finishing off 6000 word Computing Theory assignment",
      "Met with my two teams from class projects"
    ],
    tags: ["uni"],
    category: "dev"
  },
  {
    id: "j-004",
    date: "2025-08-26",
    title: "Bolognese Pasta Meal Prep",
    points: [
      "6 meals, 800cal / 65g protein each",
    ],
    body: "Insane how much protein is just packed on by some pasta brands",
    tags: ["jobs"],
    category: "health"
  },
  {
    id: "j-003",
    date: "2025-08-24",
    title: "SportsBet Online Assessment",
    points: [
      "More behavioural focus, decent performance",
      "Digital interview answers were great, very org-specific."
    ],
    body: "Perfect oppurtunity to express AI interest here, loved it.",
    tags: ["jobs"],
    category: "dev"
  },
  {
    id: "j-002",
    date: "2025-08-24",
    title: "TikTok Online Assessment",
    points: [
      "Struggled greatly: coding challenges were a little niche with matrix manipulation etc.",
      "One question answered perfectly, a second done well but with a faulty comparison"
    ],
    body: "Not too satisfied with this one, but I'm not discouraged.",
    tags: ["jobs"],
    category: "dev"
  },
  {
    id: "j-001",
    date: "2025-08-23",
    title: "Amazon Online Assessment",
    points: [
      "4 hours...",
      "All tests passed in both coding challenges",
      "Very happy with behavioural sections' performance"
    ],
    body: "Confident with performance overall, awaiting response.",
    tags: ["jobs"],
    category: "dev"
  },
];