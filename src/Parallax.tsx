import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import { useParallax } from './hooks/ParallaxContext';

export { ParallaxProvider } from './hooks/ParallaxProvider';

/**
 * Multi-layer ambient background with glowing nebula orbs and drifting grid
 * that move at differential parallax speeds on scroll and mouse interaction.
 */
export function ParallaxBackground() {
  const { scrollY, mouseX, mouseY, isTouch } = useParallax();

  // Subtle mouse dampening for desktop
  const mx = isTouch ? 0 : mouseX * 24;
  const my = isTouch ? 0 : mouseY * 24;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Layer 1: Subtle Drifting Dot Grid */}
      <div
        className="absolute inset-0 opacity-[0.045] transition-transform duration-100 ease-out"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255, 255, 255, 0.7) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          transform: `translate3d(0, ${(-scrollY * 0.08).toFixed(1)}px, 0)`,
        }}
      />

      {/* Layer 2: Deep Indigo / Violet Nebula (Top Left - drifts downward with scroll) */}
      <div
        className="absolute -top-36 -left-36 w-[640px] h-[640px] rounded-full blur-[130px] opacity-25 mix-blend-screen transition-transform duration-200 ease-out"
        style={{
          background:
            'radial-gradient(circle, rgba(99, 102, 241, 0.85) 0%, rgba(139, 92, 246, 0.4) 50%, transparent 70%)',
          transform: `translate3d(${(-mx * 0.7).toFixed(1)}px, ${(scrollY * 0.18 - my * 0.7).toFixed(1)}px, 0)`,
        }}
      />

      {/* Layer 3: Cyan / Teal Accent Glow (Top Right - drifts counter-scroll) */}
      <div
        className="absolute top-20 -right-40 w-[580px] h-[580px] rounded-full blur-[140px] opacity-20 mix-blend-screen transition-transform duration-200 ease-out"
        style={{
          background:
            'radial-gradient(circle, rgba(34, 211, 238, 0.8) 0%, rgba(16, 185, 129, 0.35) 50%, transparent 70%)',
          transform: `translate3d(${(mx * 0.9).toFixed(1)}px, ${(-scrollY * 0.12 + my * 0.9).toFixed(1)}px, 0)`,
        }}
      />

      {/* Layer 4: Stage Atmosphere Orb (Middle / Device Simulator section) */}
      <div
        className="absolute top-[48%] left-[20%] w-[680px] h-[580px] rounded-full blur-[150px] opacity-15 mix-blend-screen transition-transform duration-300 ease-out"
        style={{
          background:
            'radial-gradient(circle, rgba(79, 70, 229, 0.7) 0%, rgba(56, 189, 248, 0.25) 50%, transparent 70%)',
          transform: `translate3d(${(mx * 0.5).toFixed(1)}px, ${(scrollY * 0.1 + my * 0.5).toFixed(1)}px, 0)`,
        }}
      />

      {/* Layer 5: Lower Grid Floor Glow (Behind Projects / Background sections) */}
      <div
        className="absolute -bottom-48 right-[10%] w-[720px] h-[620px] rounded-full blur-[160px] opacity-20 mix-blend-screen transition-transform duration-300 ease-out"
        style={{
          background:
            'radial-gradient(circle, rgba(168, 85, 247, 0.65) 0%, rgba(59, 130, 246, 0.3) 50%, transparent 70%)',
          transform: `translate3d(${(-mx * 0.6).toFixed(1)}px, ${(-scrollY * 0.08).toFixed(1)}px, 0)`,
        }}
      />
    </div>
  );
}

/**
 * ScrollReveal: Hides sections and cards until scrolled into view,
 * then smoothly animates into place with fade, translate, scale, and de-blur.
 */
interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number; // ms
  distance?: number; // px to translate (default 36)
  duration?: number; // ms (default 750)
  threshold?: number; // intersection threshold (default 0.1)
  scale?: number; // initial scale (default 0.97)
  blur?: boolean; // whether to blur initially (default true)
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  distance = 36,
  duration = 750,
  threshold = 0.1,
  scale = 0.97,
  blur = true,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(
    () => typeof window !== 'undefined' && typeof IntersectionObserver === 'undefined',
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? 'blur(0px)' : blur ? 'blur(6px)' : 'none',
        transform: isVisible
          ? 'translate3d(0, 0, 0) scale(1)'
          : `translate3d(0, ${distance}px, 0) scale(${scale})`,
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'opacity, transform, filter',
      }}
    >
      {children}
    </div>
  );
}

/**
 * Interactive 3D Perspective Tilt Card with cursor-tracking specular highlight.
 */
interface ParallaxTiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number; // max tilt degrees (default 4)
}

export function ParallaxTiltCard({
  children,
  className = '',
  maxTilt = 4,
}: ParallaxTiltCardProps) {
  const { isTouch } = useParallax();
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    glareOpacity: 0,
  });

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (isTouch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;

    const rotateY = px * maxTilt * 2;
    const rotateX = -py * maxTilt * 2;

    setStyle({
      rotateX,
      rotateY,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
      glareOpacity: 0.14,
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50,
      glareOpacity: 0,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-200 ease-out [transform-style:preserve-3d] ${className}`}
      style={{
        transform:
          !isTouch && (style.rotateX !== 0 || style.rotateY !== 0)
            ? `perspective(1000px) rotateX(${style.rotateX.toFixed(2)}deg) rotateY(${style.rotateY.toFixed(2)}deg) scale3d(1.008, 1.008, 1.008)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      }}
    >
      {children}

      {/* Dynamic Specular Light Glare Overlay */}
      {!isTouch && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-10"
          style={{
            opacity: style.glareOpacity,
            background: `radial-gradient(circle 300px at ${style.glareX}% ${style.glareY}%, rgba(255, 255, 255, 0.22), transparent 75%)`,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/**
 * Floating tech badge that gently drifts at different parallax scroll rates
 * and follows subtle mouse movement.
 */
interface FloatingBadgeProps {
  label: string;
  icon?: ReactNode;
  scrollFactor?: number;
  mouseFactor?: number;
  className?: string;
}

export function FloatingBadge({
  label,
  icon,
  scrollFactor = 0.15,
  mouseFactor = 12,
  className = '',
}: FloatingBadgeProps) {
  const { scrollY, mouseX, mouseY, isTouch } = useParallax();
  const mx = isTouch ? 0 : mouseX * mouseFactor;
  const my = isTouch ? 0 : mouseY * mouseFactor;

  return (
    <div
      className={`hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/85 border border-slate-700/60 backdrop-blur-md text-xs font-mono text-slate-300 shadow-xl shadow-indigo-950/40 transition-transform duration-150 ease-out select-none ${className}`}
      style={{
        transform: `translate3d(${mx.toFixed(1)}px, ${(scrollY * scrollFactor + my).toFixed(1)}px, 0)`,
      }}
    >
      {icon && <span className="text-indigo-400">{icon}</span>}
      <span>{label}</span>
    </div>
  );
}
