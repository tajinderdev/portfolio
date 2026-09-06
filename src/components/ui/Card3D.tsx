import {
  useState,
  useRef,
  useCallback,
  type ReactNode,
  type ReactElement,
  type MouseEvent,
} from 'react';
import { cn } from '@/lib/utils';

export interface Card3DProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly innerClassName?: string;
  readonly maxTilt?: number;
  readonly glare?: boolean;
  readonly onClick?: () => void;
  readonly 'aria-label'?: string;
}

export function Card3D({
  children,
  className = '',
  innerClassName = '',
  maxTilt = 10,
  glare = true,
  onClick,
  'aria-label': ariaLabel,
}: Card3DProps): ReactElement {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>(
    'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  );
  const [glareState, setGlareState] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });

  const isReducedMotion = useCallback(() => {
    return (
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion() || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotX = (0.5 - y) * maxTilt * 2;
    const rotY = (x - 0.5) * maxTilt * 2;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
    );

    if (glare) {
      setGlareState({
        x: Math.round(x * 100),
        y: Math.round(y * 100),
        opacity: 0.25,
      });
    }
  };

  const handleMouseLeave = () => {
    setTransformStyle(
      'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    );
    if (glare) {
      setGlareState((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  return (
    <div
      ref={cardRef}
      className={cn('relative group [perspective:1000px]', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <div
        data-card3d-inner="true"
        style={{
          transform: transformStyle,
          transformStyle: 'preserve-3d',
          transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className={cn(
          'relative w-full h-full rounded-xl border border-border-subtle/80 bg-surface/80 backdrop-blur-sm',
          'transition-colors duration-200 hover:border-accent/40',
          innerClassName
        )}
      >
        {/* Holographic Specular Glare Overlay */}
        {glare && (
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 z-30 overflow-hidden"
            style={{
              opacity: glareState.opacity,
              background: `radial-gradient(circle at ${glareState.x}% ${glareState.y}%, rgba(0, 245, 212, 0.22), transparent 60%)`,
            }}
          />
        )}

        {/* Card Content with 3D Layer Elevation */}
        <div className="relative z-10 [transform-style:preserve-3d]">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Card3D;
