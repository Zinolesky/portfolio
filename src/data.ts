export type ProjectCategory = "Mobile" | "Backend & APIs" | "Web & Desktop";

export interface Project {
  id: string;
  title: string;
  shortName?: string;
  date: string;
  categories: ProjectCategory[];
  stack: string[];
  flow?: string[];
  points: string[];
  repo?: string;
  live?: string;
  video?: string;
  orientation?: "portrait" | "landscape";
  iconGradient?: string;
  iconKey?: "shield" | "map" | "video" | "pitch";
}

export const profile = {
  name: "Efezino Taigbenu",
  title: "Backend & Mobile Software Engineer",
  summary:
    "Specializing in Python (Django, FastAPI), .NET 8 (C#), Go, and cross-platform mobile development (React Native, Flutter). Experienced in offline-first systems, containerized microservices, spatial databases (PostGIS), and production AI integrations.",
  location: "Lagos, Nigeria",
  email: "taigbenuefezino@gmail.com",
  github: "https://github.com/Zinolesky",
  linkedin: "https://linkedin.com/in/efezino-taigbenu-8a769a285",
  resumeUrl: "/Efezino_Taigbenu_Resume.pdf",
};

export const skills: Record<string, string[]> = {
  Languages: ["Python", "C#", "SQL", "Dart", "JavaScript / TypeScript", "Go", "Kotlin"],
  Backend: [
    "Django",
    "FastAPI",
    "ASP.NET Core (.NET 8)",
    "EF Core",
    "Flask",
    "REST APIs",
    "Microservices Architecture",
    "WPF (MVVM)",
    "PyQt5",
  ],
  Mobile: ["React Native", "Flutter", "CustomPainter", "React Native for Web (PWA)"],
  "Data & Spatial": ["PostgreSQL", "PostGIS", "SQLite (WAL)", "JSI SQLite"],
  "DevOps & AI": ["Docker", "Docker Compose", "Vercel", "Gemini API", "PyMuPDF", "Google Maps API", "pytest", "Git"],
};

export const education = {
  school: "Bowen University",
  location: "Iwo, Nigeria",
  degree: "B.Sc. in Computer Science",
  graduated: "June 2026",
  coursework: [
    "Data Structures & Algorithms",
    "Database Management Systems",
    "System Architecture",
    "Operating Systems",
    "Compiler Design",
    "Artificial Intelligence",
  ],
};

export const experience = [
  {
    company: "Pufferfish Technology Limited",
    location: "Lekki, Lagos State",
    role: "Industrial Training Intern, HR & Administration",
    period: "July - September 2024",
    points: [
      "Engineered structured spreadsheet workflows with automated validation rules across 100+ master employee datasets.",
      "Reduced cross-departmental record request turnaround time by 25% by automating document tracking and reporting pipelines.",
      "Standardized digital record-keeping schemas across HR systems and delivered weekly quantitative audit reports.",
    ],
  },
];

export const projects: Project[] = [
  {
    id: "pos-system",
    title: "Prime Supermarket POS (v2.2) — Hybrid Offline-First Retail System",
    shortName: "Prime POS",
    date: "November 2026",
    categories: ["Backend & APIs", "Web & Desktop"],
    stack: [".NET 8 (C#)", "WPF (MVVM)", "ASP.NET Core", "EF Core 8", "SQLite (WAL)", "PostgreSQL", "Docker Compose"],
    flow: ["WPF Terminal + SQLite (WAL)", "Sub-15ms Auth + Hot Backups", "Outbox Sync + DLQ", "ASP.NET Core + PostgreSQL 16"],
    points: [
      "Enterprise offline-first retail POS terminal in .NET 8 and WPF (MVVM) with sub-15ms local authentication (Argon2id + Windows DPAPI), automated SQLite WAL hot backups, and an ASP.NET Core Minimal API + PostgreSQL 16 sync backend.",
      "Bidirectional Outbox cloud synchronization engine with idempotent sales/returns replication, exponential retry backoff, and a Dead-Letter Queue (DLQ) for per-item inspection and replay.",
      "Full supermarket cashier & back-office suite supporting GS1 variable-measure EAN-13 barcodes, wholesale tier pricing, customer loyalty & store credit wallets, CSV catalog import/export, raw ESC/POS thermal receipt spooling, and blind Z-Report shift reconciliation.",
    ],
    repo: "https://github.com/Zinolesky/pos-system",
    video: "/videos/prime-pos.mp4",
  },
  {
    id: "antispam",
    title: "Distributed Anti-Spam Call Screening App",
    shortName: "HushLine",
    date: "October 2026",
    categories: ["Mobile", "Backend & APIs"],
    stack: ["React Native", "Kotlin", "JSI SQLite", "FastAPI", "Go", "Docker Compose"],
    flow: ["Kotlin CallScreeningService", "JSI SQLite (<1ms)", "FastAPI + Go", "Docker Compose"],
    points: [
      "Containerized microservices backend in Python FastAPI and Go, orchestrated with Docker Compose for horizontal scalability.",
      "Native Android call-screening modules in Kotlin bridged to a React Native frontend to intercept and evaluate caller metadata in real time.",
      "Sub-millisecond local caller reputation lookups on-device using JSI SQLite for high-speed offline querying.",
    ],
    live: "https://antispam-docs.vercel.app",
    video: "/videos/hushline.mp4",
    orientation: "portrait",
    iconGradient: "from-emerald-500 to-teal-700",
    iconKey: "shield",
  },
  {
    id: "campus-nav",
    title: "Mobile Campus Navigation System (Final Year Project)",
    shortName: "Campus Nav",
    date: "June 2026",
    categories: ["Mobile", "Backend & APIs"],
    stack: ["React Native", "Django", "PostgreSQL", "PostGIS", "Google Maps API"],
    flow: ["React Native", "Google Maps API", "Django REST (<150ms)", "PostGIS (GiST)"],
    points: [
      "Full-stack mobile spatial application delivering venue discovery and turn-by-turn routing across Bowen University campus.",
      "PostgreSQL database with PostGIS GiST spatial indexing serving spatial search queries under 150ms average response time via Django REST endpoints.",
      "Real-time interactive mapping, custom venue markers, and polyline walking/driving paths integrated with Google Maps APIs.",
    ],
    repo: "https://github.com/Zinolesky/Bowen-Navigation",
    video: "/videos/campus-nav.mp4",
    orientation: "portrait",
    iconGradient: "from-sky-500 to-indigo-600",
    iconKey: "map",
  },
  {
    id: "chatflow",
    title: "ChatFlow — Video-First Social App",
    shortName: "ChatFlow",
    date: "October 2026",
    categories: ["Mobile"],
    stack: ["React Native", "Antigravity 2.0"],
    flow: ["Home Feed", "DM Video Playlists", "Hybrid Reel Engine", "Discovery Feed"],
    points: [
      "Mobile video-sharing application featuring a hybrid Reel-style playback engine built in React Native.",
      "Seamless state transitions bridging shared direct-message (DM) video playlists directly into a continuous algorithmic discovery feed.",
    ],
    video: "/videos/chatflow.mp4",
    orientation: "portrait",
    iconGradient: "from-fuchsia-500 to-indigo-600",
    iconKey: "video",
  },
  {
    id: "tactical-whiteboard",
    title: "Flutter 2D Football Tactical Whiteboard",
    shortName: "Tactical 2D",
    date: "July 2026",
    categories: ["Mobile"],
    stack: ["Flutter", "Dart", "CustomPainter"],
    flow: ["Team & Kit Loader", "Drag & Drop Tokens", "CustomPainter (60 FPS)"],
    points: [
      "Interactive football strategy tool for real-time pitch drawing, authentic team formation modeling, and chalkboard tactic animation.",
      "Smooth 60 FPS graphics rendering via Flutter's CustomPainter API with custom gesture-handling and drag-and-drop player tokens.",
    ],
    video: "/videos/tactical-whiteboard.mp4",
    orientation: "landscape",
    iconGradient: "from-green-500 to-emerald-800",
    iconKey: "pitch",
  },
  {
    id: "pdf-autofiller",
    title: "AI-Powered Universal PDF Auto-Filler (PWA)",
    date: "October 2026",
    categories: ["Backend & APIs", "Web & Desktop"],
    stack: ["React Native for Web", "FastAPI", "PyMuPDF", "Gemini API"],
    flow: ["Any Uploaded PDF", "FastAPI + Gemini API", "Field Coordinate Mapping", "PyMuPDF Render"],
    points: [
      "Cross-platform Progressive Web App that automates form and document completion for any PDF uploaded by an end user.",
      "Integrates the Google Gemini API with a FastAPI backend to extract, validate, and map unstructured user data onto structured document fields.",
      "Automates programmatic PDF parsing, coordinate mapping, and document stamping with PyMuPDF, eliminating repetitive manual form entry.",
    ],
  },
  {
    id: "road-to-python",
    title: "The Road to Python — Interactive Curriculum Platform",
    date: "October 2026",
    categories: ["Backend & APIs", "Web & Desktop"],
    stack: ["Python", "Django", "Vercel"],
    flow: ["Django Backend", "9-Phase Curriculum", "Vercel Deployment"],
    points: [
      "Centralized full-stack web platform hosting a structured 9-phase Python programming roadmap and multimedia video curriculum.",
      "Configured cloud production environment and automated deployment pipeline on Vercel.",
    ],
    repo: "https://github.com/Zinolesky/the-road-to-python",
    live: "https://the-road-to-python.vercel.app",
  },
  {
    id: "nero-stream",
    title: "Nero Stream",
    date: "",
    categories: ["Web & Desktop"],
    stack: ["JavaScript", "Vercel"],
    points: ["Custom movie streaming web application with video embed aggregation and responsive playback UI."],
    repo: "https://github.com/Zinolesky/Nero-Stream",
    live: "https://nero-stream.vercel.app",
  },
  {
    id: "prime-legacy",
    title: "Prime Legacy Power Website",
    date: "",
    categories: ["Web & Desktop"],
    stack: ["Astro", "Vercel"],
    points: ["Fast static business website built with Astro and deployed on Vercel."],
    live: "https://prime-legacy-power-website.vercel.app",
  },
  {
    id: "file-sorter",
    title: "Automated File Management & Sorting System",
    date: "January 2026",
    categories: ["Backend & APIs", "Web & Desktop"],
    stack: ["Python", "os", "shutil", "Windows Task Scheduler"],
    points: [
      "Filters files by extension, applies creation-timestamp metadata to renames, and routes assets into structured subfolders, cutting manual sorting overhead by 90%.",
      "Runs automatically at system log-on via Windows Task Scheduler.",
    ],
    repo: "https://github.com/Zinolesky/Automated-Scripts",
  },
  {
    id: "pyqt5-apps",
    title: "PyQt5 Desktop Applications",
    date: "September 2025",
    categories: ["Web & Desktop"],
    stack: ["Python", "PyQt5", "pytest"],
    points: [
      "Modular desktop weather application and unit conversion utility with custom event handling and responsive layouts.",
      "Automated unit test suite using pytest to validate conversion calculations and prevent UI state crashes.",
    ],
  },
];
