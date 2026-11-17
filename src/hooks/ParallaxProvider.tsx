import { useEffect, useState, type ReactNode } from 'react';
import { ParallaxContext } from './ParallaxContext';

const checkIsTouch = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

export function ParallaxProvider({ children }: { children: ReactNode }) {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isTouch] = useState(checkIsTouch);

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const top = window.scrollY;
        const maxScroll = Math.max(
          1,
          document.documentElement.scrollHeight - window.innerHeight,
        );
        setScrollY(top);
        setScrollProgress(Math.min(1, Math.max(0, top / maxScroll)));
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setMouse({ x: nx, y: ny });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <ParallaxContext.Provider
      value={{
        scrollY,
        scrollProgress,
        mouseX: mouse.x,
        mouseY: mouse.y,
        isTouch,
      }}
    >
      {children}
    </ParallaxContext.Provider>
  );
}
