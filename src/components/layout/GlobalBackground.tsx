import { lazy, Suspense, useEffect, useState, type ReactElement } from 'react';
import { ThreeBoundary } from '@/three';

const HeroTopologyScene = lazy(() => import('@/three/HeroScene'));

export function GlobalBackground(): ReactElement {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    let ticking = false;
    let rafId: number | null = null;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = window.requestAnimationFrame(() => {
          const scrollableHeight = Math.max(
            1,
            document.documentElement.scrollHeight - window.innerHeight
          );
          const progress = Math.min(
            1,
            Math.max(0, window.scrollY / scrollableHeight)
          );
          setScrollProgress(progress);
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Parallax scroll transforms for hypnotic liquid clusters
  const cluster1Transform = `translate3d(${Math.sin(scrollProgress * Math.PI) * 140}px, ${scrollProgress * 320}px, 0) scale(${1 + scrollProgress * 0.2}) rotate(${scrollProgress * 60}deg)`;
  const cluster2Transform = `translate3d(${-scrollProgress * 180}px, ${-scrollProgress * 280 + 80}px, 0) scale(${0.85 + scrollProgress * 0.3}) rotate(${-scrollProgress * 75}deg)`;
  const cluster3Transform = `translate3d(${scrollProgress * 120}px, ${-scrollProgress * 200}px, 0) scale(${1 - scrollProgress * 0.15}) rotate(${scrollProgress * 45}deg)`;
  const cluster4Transform = `translate3d(${-Math.cos(scrollProgress * Math.PI) * 100}px, ${scrollProgress * 220 - 50}px, 0) scale(${0.9 + scrollProgress * 0.2})`;

  return (
    <div
      className="fixed inset-0 w-screen h-screen select-none overflow-hidden z-0 pointer-events-none"
      aria-hidden="true"
    >
      {/* Base background color to ensure strong contrast in both modes */}
      <div className="absolute inset-0 bg-background transition-colors duration-500" />

      {/* Hypnotic Multi-Color Fluid Field (Monopo Saigon & Zona de Propulsão aesthetic) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Layer 1: Electric Indigo & Royal Cobalt Current */}
        <div
          style={{ transform: cluster1Transform }}
          className="absolute top-1/10 left-1/4 -translate-x-1/2 w-[42rem] h-[42rem] transition-transform duration-150 ease-out will-change-transform"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-indigo-600/35 via-blue-500/30 to-sky-400/25 dark:from-indigo-600/40 dark:via-blue-600/35 dark:to-cyan-400/25 blur-[120px] animate-hypnotic-1" />
        </div>

        {/* Layer 2: Hypnotic Magenta / Fuchsia Neon & Violet Blob */}
        <div
          style={{ transform: cluster2Transform }}
          className="absolute top-1/3 right-1/10 w-[38rem] h-[38rem] transition-transform duration-150 ease-out will-change-transform"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-bl from-fuchsia-500/30 via-pink-500/25 to-purple-600/25 dark:from-fuchsia-600/35 dark:via-rose-500/30 dark:to-purple-700/30 blur-[130px] animate-hypnotic-2" />
        </div>

        {/* Layer 3: Cyber Turquoise & Electric Cyan Stream */}
        <div
          style={{ transform: cluster3Transform }}
          className="absolute bottom-1/8 left-1/8 w-[36rem] h-[36rem] transition-transform duration-150 ease-out will-change-transform"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-r from-cyan-400/25 via-teal-400/20 to-sky-500/25 dark:from-cyan-400/30 dark:via-sky-500/25 dark:to-indigo-600/20 blur-[110px] animate-hypnotic-3" />
        </div>

        {/* Layer 4: Sunset Warm Coral & Amber Flare */}
        <div
          style={{ transform: cluster4Transform }}
          className="absolute bottom-1/4 right-1/4 w-[34rem] h-[34rem] transition-transform duration-150 ease-out will-change-transform"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-tl from-rose-500/20 via-orange-400/20 to-amber-300/15 dark:from-rose-600/25 dark:via-orange-500/20 dark:to-amber-400/15 blur-[120px] animate-hypnotic-4" />
        </div>

        {/* Layer 5: Deep Ultraviolet Ambient Pulse */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[48rem] h-[48rem] rounded-full bg-gradient-radial from-violet-600/15 via-indigo-900/10 to-transparent dark:from-violet-600/20 dark:via-purple-950/15 dark:to-transparent blur-[140px]" />
      </div>

      {/* Frosted Glass Diffuser: Seamlessly blends hypnotic fluid gradients for peak contrast */}
      <div className="absolute inset-0 bg-background/65 dark:bg-background/55 backdrop-blur-3xl pointer-events-none transition-colors duration-500" />

      {/* 3D WebGL Distributed System Topology (100% sharp, luminous dots effect) */}
      <div className="absolute inset-0 opacity-100">
        <ThreeBoundary
          className="w-full h-full absolute inset-0"
          fallback={
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
          }
        >
          <Suspense fallback={null}>
            <HeroTopologyScene />
          </Suspense>
        </ThreeBoundary>
      </div>
    </div>
  );
}


