import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Award,
  Briefcase,
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Maximize2,
  Play,
  Smartphone,
  X,
} from 'lucide-react';
import {
  certification,
  education,
  experience,
  profile,
  projects,
  skills,
  type Project,
  type ProjectCategory,
} from './data';
import { DeviceSimulator } from './DeviceSimulator';
import {
  ParallaxProvider,
  ParallaxBackground,
  ScrollProgressBar,
  ParallaxTiltCard,
  FloatingBadge,
  ScrollReveal,
} from './Parallax';

const FILTERS: Array<'All' | ProjectCategory> = ['All', 'Mobile', 'Backend & APIs', 'Web & Desktop'];
const CURRENT_YEAR = new Date().getFullYear();

const actionLink =
  'inline-flex items-center gap-1.5 text-xs font-medium text-indigo-300 hover:text-white transition-colors';

function PortfolioContent() {
  const mobileApps = useMemo(() => projects.filter((p) => Boolean(p.video) && p.categories.includes('Mobile')), []);
  const [selectedAppId, setSelectedAppId] = useState<string | null>(mobileApps[0]?.id ?? null);
  const [activeFilter, setActiveFilter] = useState<'All' | ProjectCategory>('All');
  const [activeVideo, setActiveVideo] = useState<Project | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveVideo(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((p) => p.categories.includes(activeFilter));
  }, [activeFilter]);

  const countFor = (filter: 'All' | ProjectCategory) =>
    filter === 'All' ? projects.length : projects.filter((p) => p.categories.includes(filter)).length;

  const handleLoadInPhone = (projectId: string) => {
    setSelectedAppId(projectId);
    document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Scroll Reading Progress Bar */}
      <ScrollProgressBar />

      {/* Multi-layer Ambient Parallax Background */}
      <ParallaxBackground />

      {/* Sticky Top Navbar */}
      <nav className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#060913]/85 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-xs font-extrabold text-white shadow-md shadow-indigo-500/20">
              ET
            </span>
            <span className="font-bold text-white text-sm sm:text-base tracking-tight">
              {profile.name}
            </span>
          </a>

          <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-400">
            <a href="#simulator" className="hover:text-white transition-colors">
              Device Stage
            </a>
            <a href="#projects" className="hover:text-white transition-colors">
              Projects
            </a>
            <a href="#skills" className="hover:text-white transition-colors">
              Skills
            </a>
            <a href="#background" className="hover:text-white transition-colors">
              Background
            </a>
          </div>

          <a
            href={profile.resumeUrl}
            download="Efezino_Taigbenu_Resume.pdf"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Resume PDF</span>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative max-w-6xl w-full mx-auto px-5 sm:px-6 pt-14 pb-10 z-10">
        {/* Floating Parallax Accents - subtle depth on desktop */}
        <div className="absolute right-4 top-10 pointer-events-none hidden xl:flex flex-col gap-3.5 items-end z-10">
          <FloatingBadge label="Sub-15ms Local Auth" icon="⚡" scrollFactor={-0.12} mouseFactor={16} />
          <FloatingBadge label="Offline-First & SQLite WAL" icon="🛡️" scrollFactor={-0.2} mouseFactor={-14} />
          <FloatingBadge label="PostGIS Spatial · <150ms" icon="📍" scrollFactor={-0.08} mouseFactor={22} />
          <FloatingBadge label="60 FPS CustomPainter" icon="🎯" scrollFactor={-0.24} mouseFactor={-18} />
          <FloatingBadge label="Docker Microservices · Go" icon="🐳" scrollFactor={-0.15} mouseFactor={14} />
        </div>

        <div className="max-w-3xl">
          <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300 mb-5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available for Backend & Mobile Roles</span>
            <span className="text-slate-600">·</span>
            <span className="inline-flex items-center gap-1 text-slate-400">
              <MapPin className="w-3 h-3 text-indigo-400" /> {profile.location}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            {profile.name}
          </h1>
          <p className="text-xl sm:text-2xl font-medium bg-gradient-to-r from-indigo-300 via-cyan-200 to-indigo-300 bg-clip-text text-transparent mt-2">
            {profile.title}
          </p>
          <p className="text-slate-300 mt-4 max-w-2xl text-sm sm:text-base leading-relaxed">
            {profile.summary}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <a
              href={profile.resumeUrl}
              download="Efezino_Taigbenu_Resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-950 hover:bg-slate-200 text-xs sm:text-sm font-semibold transition-colors shadow-lg shadow-white/5"
            >
              <Download className="w-4 h-4" /> Download Resume
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs sm:text-sm font-medium transition-colors"
            >
              GitHub <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs sm:text-sm font-medium transition-colors"
            >
              LinkedIn <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs sm:text-sm font-medium transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-indigo-400" /> {profile.email}
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl w-full mx-auto px-5 sm:px-6 pb-20 space-y-20 z-10">
        {/* Option A: Interactive Smartphone Simulator & Android Launcher */}
        <ScrollReveal distance={40} duration={850}>
          <DeviceSimulator
            apps={mobileApps}
            selectedAppId={selectedAppId}
            onSelectApp={setSelectedAppId}
            onExpandVideo={setActiveVideo}
          />
        </ScrollReveal>

        {/* All Projects Grid with Category Filter Chips */}
        <section id="projects" className="scroll-mt-24">
          <ScrollReveal distance={30} duration={650}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Projects</h2>
                <p className="text-sm text-slate-400 mt-1">
                  Mobile apps, backend microservices, AI tools, and web deployments.
                </p>
              </div>

              {/* Filter Chips */}
              <div className="flex flex-wrap gap-1.5">
                {FILTERS.map((f) => {
                  const active = activeFilter === f;
                  return (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setActiveFilter(f)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                        active
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                          : 'bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {f}{' '}
                      <span className={active ? 'text-indigo-200' : 'text-slate-500'}>
                        ({countFor(f)})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2">
            {filteredProjects.map((p, idx) => (
              <ScrollReveal
                key={p.id}
                delay={(idx % 4) * 80}
                distance={45}
                duration={750}
                className="h-full"
              >
                <div
                  className={`h-full ${
                    ['animate-tile-float-1', 'animate-tile-float-2', 'animate-tile-float-3'][idx % 3]
                  }`}
                >
                  <ParallaxTiltCard className="h-full" maxTilt={3.5}>
                    <article className="group h-full rounded-2xl border border-slate-800/90 hover:border-indigo-500/50 bg-slate-900/60 backdrop-blur-sm p-6 flex flex-col transition-all duration-200 hover:shadow-xl hover:shadow-indigo-950/30">
                      {p.video && (
                        <div className="relative mb-5 h-72 w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-center">
                          <video
                            src={p.video}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            onClick={() => setActiveVideo(p)}
                            className="h-full w-full object-contain cursor-pointer"
                          />
                          <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5">
                            {p.categories.includes('Mobile') && (
                              <button
                                type="button"
                                onClick={() => handleLoadInPhone(p.id)}
                                className="inline-flex items-center gap-1 rounded-lg bg-indigo-600/90 hover:bg-indigo-500 px-2.5 py-1 text-xs font-medium text-white shadow cursor-pointer"
                              >
                                <Smartphone className="w-3 h-3" /> In Phone
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => setActiveVideo(p)}
                              className="inline-flex items-center gap-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 px-2.5 py-1 text-xs text-slate-200 border border-slate-700/80 cursor-pointer"
                            >
                              <Maximize2 className="w-3 h-3" /> Expand
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="text-lg font-semibold text-white group-hover:text-indigo-200 transition-colors">
                          {p.title}
                        </h3>
                        {p.date && (
                          <span className="text-xs font-mono text-slate-500 whitespace-nowrap">
                            {p.date}
                          </span>
                        )}
                      </div>

                      {p.flow && (
                        <div className="flex flex-wrap items-center gap-1 mt-3">
                          {p.flow.map((step, stepIdx) => (
                            <span key={step} className="inline-flex items-center gap-1">
                              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-indigo-300">
                                {step}
                              </span>
                              {stepIdx < p.flow!.length - 1 && (
                                <ArrowRight className="w-2.5 h-2.5 text-slate-600" />
                              )}
                            </span>
                          ))}
                        </div>
                      )}

                      <ul className="mt-3.5 space-y-1.5 text-sm text-slate-300 list-disc pl-4 leading-relaxed">
                        {p.points.map((pt) => (
                          <li key={pt}>{pt}</li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {p.stack.map((s) => (
                          <span
                            key={s}
                            className="text-xs px-2.5 py-0.5 rounded-md bg-slate-800/90 border border-slate-700/50 text-slate-300"
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      {(p.repo || p.live || p.video) && (
                        <div className="flex flex-wrap items-center gap-5 mt-auto pt-5 border-t border-slate-800/60">
                          {p.video && (
                            <button
                              type="button"
                              onClick={() => setActiveVideo(p)}
                              className={`${actionLink} cursor-pointer`}
                            >
                              Demo <Play className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {p.live && (
                            <a className={actionLink} href={p.live} target="_blank" rel="noreferrer">
                              Live <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {p.repo && (
                            <a className={actionLink} href={p.repo} target="_blank" rel="noreferrer">
                              Code <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      )}
                    </article>
                  </ParallaxTiltCard>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Technical Skills */}
        <section id="skills" className="scroll-mt-24">
          <ScrollReveal distance={30} duration={600}>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-6">
              Technical Skills
            </h2>
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skills).map(([group, items], idx) => (
              <ScrollReveal
                key={group}
                delay={(idx % 3) * 75}
                distance={35}
                duration={650}
                className="h-full"
              >
                <ParallaxTiltCard maxTilt={3} className="h-full">
                  <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-sm p-5 h-full">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-indigo-300 mb-3">
                      {group}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((item) => (
                        <span
                          key={item}
                          className="text-xs px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </ParallaxTiltCard>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Experience & Education */}
        <section id="background" className="scroll-mt-24 grid gap-6 md:grid-cols-2">
          <ScrollReveal delay={0} distance={40} duration={750} className="h-full">
            <ParallaxTiltCard maxTilt={2.5} className="h-full">
              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-sm p-6 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-300 mb-4">
                    <Briefcase className="w-4 h-4" />
                    <span>Experience</span>
                  </div>
                  {experience.map((exp) => (
                    <div key={exp.company}>
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="text-base font-semibold text-white">{exp.role}</h3>
                        <span className="text-xs font-mono text-slate-500">{exp.period}</span>
                      </div>
                      <p className="text-sm text-indigo-300 mt-0.5">
                        {exp.company} · {exp.location}
                      </p>
                      <ul className="mt-3 space-y-1.5 text-sm text-slate-300 list-disc pl-4 leading-relaxed">
                        {exp.points.map((pt) => (
                          <li key={pt}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </ParallaxTiltCard>
          </ScrollReveal>

          <ScrollReveal delay={120} distance={40} duration={750} className="h-full">
            <ParallaxTiltCard maxTilt={2.5} className="h-full">
              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-sm p-6 flex flex-col justify-between gap-6 h-full">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-300 mb-4">
                    <GraduationCap className="w-4 h-4" />
                    <span>Education</span>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-base font-semibold text-white">{education.degree}</h3>
                    <span className="text-xs font-mono text-slate-500">{education.graduated}</span>
                  </div>
                  <p className="text-sm text-indigo-300 mt-0.5">
                    {education.school} · {education.location}
                  </p>
                  <div className="mt-4">
                    <div className="text-xs font-mono text-slate-500 mb-2">Relevant Coursework</div>
                    <div className="flex flex-wrap gap-1.5">
                      {education.coursework.map((c) => (
                        <span
                          key={c}
                          className="text-xs px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-800/80">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-300 mb-3">
                    <Award className="w-4 h-4" />
                    <span>Certification</span>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-sm font-semibold text-white">
                      {certification.issuer} — {certification.title}
                    </h3>
                    <span className="text-xs font-mono text-slate-500 whitespace-nowrap">
                      {certification.credential}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {certification.topics.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ParallaxTiltCard>
          </ScrollReveal>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 py-8 z-10">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <span>
            © {CURRENT_YEAR} {profile.name} · {profile.location}
          </span>
          <div className="flex items-center gap-5">
            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-slate-300">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-slate-300">
              LinkedIn
            </a>
            <a href={`mailto:${profile.email}`} className="hover:text-slate-300">
              {profile.email}
            </a>
          </div>
        </div>
      </footer>

      {/* Fullscreen Video Lightbox */}
      {activeVideo?.video && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-2xl border border-slate-800 bg-slate-900 p-4 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-white">{activeVideo.title}</h3>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                aria-label="Close video"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <video
              src={activeVideo.video}
              controls
              autoPlay
              loop
              playsInline
              className="max-h-[80vh] w-auto rounded-lg bg-black"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ParallaxProvider>
      <PortfolioContent />
    </ParallaxProvider>
  );
}
