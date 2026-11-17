import { createContext, useContext } from 'react';

export interface ParallaxContextType {
  scrollY: number;
  scrollProgress: number; // 0 to 1
  mouseX: number; // -1 to 1 normalized
  mouseY: number; // -1 to 1 normalized
  isTouch: boolean;
}

export const ParallaxContext = createContext<ParallaxContextType>({
  scrollY: 0,
  scrollProgress: 0,
  mouseX: 0,
  mouseY: 0,
  isTouch: false,
});

export function useParallax() {
  return useContext(ParallaxContext);
}
