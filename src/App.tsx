import { useState } from 'react';
import { ExternalLink, Mail, Maximize2, Play, X } from 'lucide-react';
import { profile, projects, skills, type Project } from './data';

const link = 'inline-flex items-center gap-1.5 text-sm text-indigo-300 hover:text-indigo-200 transition-colors';

export default function App() {
  const [activeVideo, setActiveVideo] = useState<Project | null>(null);

  return (
    <div className="min-h-screen">
      <header className="max-w-5xl mx-auto px-6 pt-20 pb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-white">{profile.name}</h1>
        <p className="text-xl text-indigo-300 mt-2">{profile.title}</p>
        <p className="text-slate-300 mt-4 max-w-2xl">{profile.summary}</p>
        <div className="flex flex-wrap gap-5 mt-6">
          <a className={link} href={profile.github} target="_blank" rel="noreferrer">GitHub <ExternalLink className="w-3.5 h-3.5" /></a>
          <a className={link} href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ExternalLink className="w-3.5 h-3.5" /></a>
          <a className={link} href={`mailto:${profile.email}`}><Mail className="w-3.5 h-3.5" /> {profile.email}</a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-semibold text-white mb-6">Projects</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <article key={p.title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col">
              {p.video && (
                <button
                  type="button"
                  onClick={() => setActiveVideo(p)}
                  className="group relative mb-5 h-72 w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-center cursor-pointer"
                  aria-label={`Expand ${p.title} demo video`}
                >
                  <video
                    src={p.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-contain"
                  />
                  <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded-md bg-slate-900/85 px-2 py-1 text-xs text-slate-200 border border-slate-700/80 opacity-80 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3 h-3" /> Expand
                  </span>
                </button>
              )}

              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                {p.date && <span className="text-xs text-slate-500 whitespace-nowrap">{p.date}</span>}
              </div>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-300 list-disc pl-4">
                {p.points.map((pt) => <li key={pt}>{pt}</li>)}
              </ul>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {p.stack.map((s) => (
                  <span key={s} className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300">{s}</span>
                ))}
              </div>
              {(p.repo || p.live || p.video) && (
                <div className="flex flex-wrap gap-5 mt-auto pt-5">
                  {p.video && (
                    <button type="button" onClick={() => setActiveVideo(p)} className={`${link} cursor-pointer`}>
                      Demo <Play className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {p.live && <a className={link} href={p.live} target="_blank" rel="noreferrer">Live <ExternalLink className="w-3.5 h-3.5" /></a>}
                  {p.repo && <a className={link} href={p.repo} target="_blank" rel="noreferrer">Code <ExternalLink className="w-3.5 h-3.5" /></a>}
                </div>
              )}
            </article>
          ))}
        </div>

        <h2 className="text-2xl font-semibold text-white mt-16 mb-6">Skills</h2>
        <dl className="space-y-3 text-sm">
          {Object.entries(skills).map(([k, v]) => (
            <div key={k} className="flex gap-4">
              <dt className="w-24 shrink-0 text-slate-500">{k}</dt>
              <dd className="text-slate-300">{v.join(' · ')}</dd>
            </div>
          ))}
        </dl>
      </main>

      {activeVideo?.video && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative max-w-3xl w-full rounded-2xl border border-slate-800 bg-slate-900 p-4 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-white">{activeVideo.title}</h3>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
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
              className="max-h-[78vh] w-auto rounded-lg bg-black"
            />
          </div>
        </div>
      )}
    </div>
  );
}
