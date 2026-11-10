import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BatteryCharging,
  ChevronLeft,
  Compass,
  ExternalLink,
  FileText,
  FolderGit2,
  Grid,
  LayoutGrid,
  Mail,
  MapPin,
  Maximize2,
  Monitor,
  Play,
  RotateCw,
  Shield,
  Signal,
  Smartphone,
  Video,
  Wifi,
} from 'lucide-react';
import { profile, type Project } from './data';

interface DeviceSimulatorProps {
  apps: Project[];
  selectedAppId: string | null; // null = Android Home Launcher screen
  onSelectApp: (id: string | null) => void;
  onExpandVideo: (project: Project) => void;
}

function AppIconGlyph({ iconKey, className = 'w-6 h-6' }: { iconKey?: Project['iconKey']; className?: string }) {
  switch (iconKey) {
    case 'shield':
      return <Shield className={className} />;
    case 'map':
      return <Compass className={className} />;
    case 'video':
      return <Video className={className} />;
    case 'pitch':
      return <LayoutGrid className={className} />;
    case 'pos':
      return <Monitor className={className} />;
    default:
      return <Smartphone className={className} />;
  }
}

export function DeviceSimulator({ apps, selectedAppId, onSelectApp, onExpandVideo }: DeviceSimulatorProps) {
  const [lagosTime, setLagosTime] = useState<{ time: string; date: string }>({ time: '12:00', date: 'Sun, Nov 1' });

  useEffect(() => {
    const updateClock = () => {
      try {
        const now = new Date();
        const time = new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'Africa/Lagos',
        }).format(now);
        const date = new Intl.DateTimeFormat('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          timeZone: 'Africa/Lagos',
        }).format(now);
        setLagosTime({ time, date });
      } catch {
        // fallback
      }
    };
    updateClock();
    const id = setInterval(updateClock, 30000);
    return () => clearInterval(id);
  }, []);

  const activeApp = apps.find((a) => a.id === selectedAppId) ?? null;
  const isLandscape = activeApp?.orientation === 'landscape';

  return (
    <section
      id="simulator"
      className="rounded-3xl border border-slate-800/90 bg-slate-900/45 backdrop-blur-md p-5 sm:p-8 shadow-2xl shadow-indigo-950/20"
    >
      {/* Top App Switcher Dock */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-300">
          <Smartphone className="w-4 h-4 text-indigo-400" />
          <span>Interactive Mobile Device Stage</span>
          {isLandscape && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[11px] text-emerald-300 normal-case font-sans">
              <RotateCw className="w-3 h-3" /> Landscape Mode
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => onSelectApp(null)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              selectedAppId === null
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            Launcher
          </button>

          {apps.map((app) => {
            const active = selectedAppId === app.id;
            return (
              <button
                key={app.id}
                type="button"
                onClick={() => onSelectApp(app.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  active
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
                }`}
              >
                <AppIconGlyph iconKey={app.iconKey} className="w-3.5 h-3.5" />
                {app.shortName ?? app.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Split Stage: Device Frame + Live App Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left/Center: Realistic Smartphone Hardware Frame */}
        <div
          className={`${
            isLandscape ? 'lg:col-span-7' : 'lg:col-span-5'
          } flex flex-col items-center justify-center transition-all duration-300`}
        >
          <div
            className={`relative bg-slate-950 p-2.5 shadow-[0_20px_60px_-15px_rgba(79,70,229,0.35)] border-[3px] border-slate-700/90 ring-1 ring-white/10 transition-all duration-300 ${
              isLandscape
                ? 'w-full max-w-[540px] rounded-[34px]'
                : 'w-[282px] sm:w-[300px] h-[590px] rounded-[44px]'
            }`}
          >
            {/* Hardware Side Buttons (Portrait) */}
            {!isLandscape && (
              <>
                <div className="absolute -left-[5px] top-28 w-[3px] h-10 bg-slate-700 rounded-l" />
                <div className="absolute -left-[5px] top-42 w-[3px] h-10 bg-slate-700 rounded-l" />
                <div className="absolute -right-[5px] top-36 w-[3px] h-14 bg-slate-700 rounded-r" />
              </>
            )}

            {/* Inner OLED Display */}
            <div
              className={`relative w-full h-full overflow-hidden bg-[#070b14] flex flex-col border border-slate-800/90 ${
                isLandscape ? 'rounded-[24px]' : 'rounded-[35px]'
              }`}
            >
              {/* Android Status Bar */}
              <div className="flex items-center justify-between px-5 pt-2.5 pb-1.5 text-[11px] font-medium text-slate-300 bg-slate-950/90 z-10 shrink-0">
                <span className="font-mono">{lagosTime.time}</span>
                {!isLandscape && (
                  <div className="w-3 h-3 rounded-full bg-black border border-slate-800" />
                )}
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Signal className="w-3 h-3" />
                  <Wifi className="w-3 h-3" />
                  <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>

              {/* Screen Viewport: Either Active App Video OR Android Launcher Home Screen */}
              {activeApp?.video ? (
                <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
                  <video
                    key={activeApp.id}
                    src={activeApp.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={
                      isLandscape
                        ? 'w-full aspect-video object-contain bg-black'
                        : 'w-full h-full object-contain bg-black'
                    }
                  />
                </div>
              ) : (
                /* Interactive Android Launcher Home Screen */
                <div className="flex-1 flex flex-col justify-between p-5 bg-gradient-to-b from-indigo-950/50 via-slate-950 to-[#060913]">
                  {/* Clock & Location Widget */}
                  <div className="mt-3 text-center">
                    <div className="text-4xl font-bold tracking-tight text-white font-mono">
                      {lagosTime.time}
                    </div>
                    <div className="mt-1 inline-flex items-center gap-1 text-xs text-slate-400">
                      <span>{lagosTime.date}</span>
                      <span>·</span>
                      <MapPin className="w-3 h-3 text-indigo-400" />
                      <span>Lagos, NG</span>
                    </div>
                  </div>

                  {/* Launcher App Icons Grid */}
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 text-center mb-3">
                      Tap an app to launch live demo
                    </div>
                    <div className="grid grid-cols-3 gap-y-5 gap-x-3">
                      {apps.map((app) => (
                        <button
                          key={app.id}
                          type="button"
                          onClick={() => onSelectApp(app.id)}
                          className="group flex flex-col items-center gap-1.5 cursor-pointer"
                        >
                          <div
                            className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${
                              app.iconGradient ?? 'from-indigo-500 to-purple-600'
                            } flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform ring-1 ring-white/15`}
                          >
                            <AppIconGlyph iconKey={app.iconKey} className="w-6 h-6" />
                          </div>
                          <span className="text-[11px] text-slate-200 font-medium leading-tight text-center">
                            {app.shortName ?? app.title}
                          </span>
                        </button>
                      ))}

                      <a
                        href={profile.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex flex-col items-center gap-1.5"
                      >
                        <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform ring-1 ring-white/15">
                          <FileText className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] text-slate-200 font-medium leading-tight text-center">
                          Resume
                        </span>
                      </a>

                      <a
                        href={profile.github}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex flex-col items-center gap-1.5"
                      >
                        <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform ring-1 ring-white/15">
                          <FolderGit2 className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] text-slate-200 font-medium leading-tight text-center">
                          GitHub
                        </span>
                      </a>
                    </div>
                  </div>

                  {/* Bottom Launcher Dock */}
                  <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-2.5 flex items-center justify-around">
                    <a
                      href="#projects"
                      className="text-xs text-slate-300 hover:text-white flex flex-col items-center gap-0.5"
                      title="All Projects"
                    >
                      <Grid className="w-4 h-4 text-indigo-400" />
                      <span className="text-[10px]">All Work</span>
                    </a>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-xs text-slate-300 hover:text-white flex flex-col items-center gap-0.5"
                      title="Email"
                    >
                      <Mail className="w-4 h-4 text-cyan-400" />
                      <span className="text-[10px]">Email</span>
                    </a>
                    <a
                      href={profile.resumeUrl}
                      download="Efezino_Taigbenu_Resume.pdf"
                      className="text-xs text-slate-300 hover:text-white flex flex-col items-center gap-0.5"
                      title="Download CV"
                    >
                      <FileText className="w-4 h-4 text-emerald-400" />
                      <span className="text-[10px]">CV PDF</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Android System Navigation Bar */}
              <div className="flex items-center justify-around py-2 px-6 bg-slate-950 border-t border-slate-800/80 text-slate-400 shrink-0">
                <button
                  type="button"
                  onClick={() => onSelectApp(null)}
                  className="p-1 hover:text-white transition-colors cursor-pointer"
                  title="Back to Home Screen"
                  aria-label="Back to Home Screen"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onSelectApp(null)}
                  className="p-1 hover:text-white transition-colors cursor-pointer"
                  title="Launcher Home Screen"
                  aria-label="Launcher Home Screen"
                >
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-current" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (activeApp) onExpandVideo(activeApp);
                    else onSelectApp(apps[0]?.id ?? null);
                  }}
                  className="p-1 hover:text-white transition-colors cursor-pointer"
                  title={activeApp ? 'Expand Fullscreen' : 'Open App'}
                  aria-label={activeApp ? 'Expand Fullscreen' : 'Open App'}
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Active App Specs & Architecture Panel */}
        <div className={`${isLandscape ? 'lg:col-span-5' : 'lg:col-span-7'} space-y-5`}>
          {activeApp ? (
            <>
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-indigo-300 font-mono mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30">
                    Running on Device
                  </span>
                  {activeApp.date && <span className="text-slate-500">{activeApp.date}</span>}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {activeApp.title}
                </h3>
              </div>

              {/* System Architecture Pipeline */}
              {activeApp.flow && (
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2">
                    Architecture Pipeline
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {activeApp.flow.map((step, i) => (
                      <span key={step} className="inline-flex items-center gap-1.5">
                        <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-950/90 border border-slate-800 text-indigo-200">
                          {step}
                        </span>
                        {i < activeApp.flow!.length - 1 && (
                          <ArrowRight className="w-3 h-3 text-slate-600" />
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <ul className="space-y-2 text-sm text-slate-300 list-disc pl-4 leading-relaxed">
                {activeApp.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5">
                {activeApp.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-md bg-slate-800/90 border border-slate-700/60 text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onExpandVideo(activeApp)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" /> Fullscreen Player
                </button>
                {activeApp.live && (
                  <a
                    href={activeApp.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                  >
                    Live Site <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {activeApp.repo && (
                  <a
                    href={activeApp.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                  >
                    Source Code <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => onSelectApp(null)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-400 hover:text-white text-xs transition-colors cursor-pointer"
                >
                  <Grid className="w-3.5 h-3.5" /> Home Screen
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 rounded-full">
                <span>Android Launcher Ready</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Tap Any App on the Phone Screen
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                Launch real device recordings directly inside the simulator — including portrait React Native builds and automatic landscape rotation for the 60 FPS Flutter tactical board.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {apps.map((app) => (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => onSelectApp(app.id)}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/70 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/40 text-left transition-all cursor-pointer"
                  >
                    <div
                      className={`w-9 h-9 rounded-xl bg-gradient-to-br ${
                        app.iconGradient ?? 'from-indigo-500 to-purple-600'
                      } flex items-center justify-center text-white shrink-0`}
                    >
                      <AppIconGlyph iconKey={app.iconKey} className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-white truncate">
                        {app.shortName ?? app.title}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {app.stack.slice(0, 3).join(' · ')}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
