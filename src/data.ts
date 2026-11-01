export interface Project {
  title: string;
  date: string;
  stack: string[];
  points: string[];
  repo?: string;
  live?: string;
  video?: string;
}

export const profile = {
  name: "Efezino Taigbenu",
  title: "Backend & Mobile Software Engineer",
  summary:
    "Python (Django, FastAPI) and cross-platform mobile (React Native, Flutter). I build containerized microservices, spatial databases, and AI-integrated applications.",
  location: "Lagos, Nigeria",
  email: "taigbenuefezino@gmail.com",
  github: "https://github.com/Zinolesky",
  linkedin: "https://linkedin.com/in/efezino-taigbenu-8a769a285",
};

export const skills: Record<string, string[]> = {
  Languages: ["Python", "SQL", "Dart", "JavaScript/TypeScript", "Go", "Kotlin"],
  Backend: ["Django", "FastAPI", "Flask", "REST APIs", "Microservices"],
  Mobile: ["React Native", "Flutter", "React Native for Web"],
  Data: ["PostgreSQL", "PostGIS", "SQLite"],
  DevOps: ["Docker", "Docker Compose", "Vercel", "pytest", "Git"],
};

export const projects: Project[] = [
  {
    title: "Distributed Anti-Spam Call Screening App",
    date: "October 2026",
    stack: ["React Native", "Kotlin", "JSI SQLite", "FastAPI", "Go", "Docker Compose"],
    points: [
      "Containerized microservices backend in FastAPI and Go, orchestrated with Docker Compose.",
      "Native Android call-screening modules in Kotlin, bridged to a React Native frontend, evaluating caller metadata in real time.",
      "Sub-millisecond on-device caller reputation lookups using JSI SQLite.",
    ],
    live: "https://antispam-docs.vercel.app",
    video: "/videos/hushline.mp4",
  },
  {
    title: "Mobile Campus Navigation System (Final Year Project)",
    date: "June 2026",
    stack: ["React Native", "Django", "PostgreSQL", "PostGIS", "Google Maps API"],
    points: [
      "Venue discovery and routing across a university campus.",
      "PostGIS with GiST spatial indexing for distance queries; ~150ms average response time via Django REST endpoints.",
      "Interactive map, custom markers and polyline navigation through Google Maps APIs.",
    ],
    repo: "https://github.com/Zinolesky/Bowen-Navigation",
    video: "/videos/campus-nav.mp4",
  },
  {
    title: "ChatFlow: Video-First Social App",
    date: "October 2026",
    stack: ["React Native", "Antigravity 2.0"],
    points: [
      "Reel-style hybrid video playback engine in React Native.",
      "State transitions that bridge shared DM video playlists into a continuous discovery feed.",
    ],
    video: "/videos/chatflow.mp4",
  },
  {
    title: "Flutter 2D Football Tactical Whiteboard",
    date: "July 2026",
    stack: ["Flutter", "Dart", "CustomPainter"],
    points: [
      "Interactive pitch drawing, formation modeling and tactic animation.",
      "60 FPS rendering with Flutter's CustomPainter; custom drag-and-drop player tokens.",
    ],
    video: "/videos/tactical-whiteboard.mp4",
  },
  {
    title: "AI-Powered Real Estate PDF Auto-Filler (PWA)",
    date: "October 2026",
    stack: ["React Native for Web", "FastAPI", "PyMuPDF", "Gemini API"],
    points: [
      "Progressive web app that automates real estate contract and form completion.",
      "Gemini API with a FastAPI backend extracts, validates and maps unstructured client data onto document fields.",
      "PyMuPDF handles PDF parsing, coordinate mapping and rendering.",
    ],
  },
  {
    title: "The Road to Python",
    date: "October 2026",
    stack: ["Python", "Vercel"],
    points: [
      "Web platform hosting a structured Python roadmap and video curriculum.",
      "Production environment and automated deployment pipeline on Vercel.",
    ],
  },
  {
    title: "Nero Stream",
    date: "",
    stack: ["JavaScript", "Vercel"],
    points: ["Custom streaming movie site."],
    repo: "https://github.com/Zinolesky/Nero-Stream",
    live: "https://nero-stream.vercel.app",
  },
  {
    title: "Prime Legacy Power Website",
    date: "",
    stack: ["Astro", "Vercel"],
    points: ["Informational website for a business."],
    live: "https://prime-legacy-power-website.vercel.app",
  },
  {
    title: "Automated File Management & Sorting",
    date: "January 2026",
    stack: ["Python", "os", "shutil", "Windows Task Scheduler"],
    points: [
      "Sorts files by extension, renames using creation timestamps and routes them into subfolders.",
      "Runs automatically at log-on via Windows Task Scheduler.",
    ],
    repo: "https://github.com/Zinolesky/Automated-Scripts",
  },
  {
    title: "PyQt5 Desktop Applications",
    date: "September 2025",
    stack: ["Python", "PyQt5", "pytest"],
    points: [
      "Desktop weather app and unit conversion tool with custom event handling.",
      "Conversion logic covered by pytest tests.",
    ],
  },
];
