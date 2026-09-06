import { useState, useEffect, type ReactElement } from 'react';

export function ScrollProgressBar(): ReactElement {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollableHeight <= 0) {
        setProgress(0);
        return;
      }

      const currentProgress = Math.min(
        1,
        Math.max(0, window.scrollY / scrollableHeight)
      );
      setProgress(currentProgress);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        updateScrollProgress();
        ticking = true;
        window.requestAnimationFrame(() => {
          ticking = false;
        });
      }
    };

    // Initial check
    updateScrollProgress();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const percentage = Math.round(progress * 100);

  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percentage}
      className="fixed top-0 left-0 right-0 z-50 h-[2.5px] pointer-events-none bg-surface/20 backdrop-blur-[1px]"
    >
      <div
        data-progress-indicator="true"
        style={{
          transform: `scaleX(${progress})`,
        }}
        className="h-full w-full bg-gradient-to-r from-accent via-cyan-400 to-accent origin-left shadow-[0_0_8px_rgba(0,245,212,0.8)] transition-transform duration-75 ease-out"
      />
    </div>
  );
}

export default ScrollProgressBar;
