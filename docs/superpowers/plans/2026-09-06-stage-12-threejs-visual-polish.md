# Stage 12: Hero 3D Distributed Architecture Topology Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a high-performance, subtle, narrative-driven 3D background layer for the Hero section representing a distributed architecture topology, with 0% off-screen GPU usage, zero memory leaks, and accessible fallbacks.

**Architecture:** A vanilla Three.js scene encapsulated in React and dynamically loaded via `React.lazy()` inside `ThreeBoundary`. An `IntersectionObserver` halts the render loop completely when the Hero leaves the viewport (0% GPU usage). Geometries and materials are exhaustively disposed of on unmount.

**Tech Stack:** Three.js, React 19, TypeScript, Vite 6, Vitest, Testing Library.

**Spec:** [`docs/superpowers/specs/2026-09-06-stage-12-threejs-visual-polish-design.md`](file:///home/tj/projects/portfolio/docs/superpowers/specs/2026-09-06-stage-12-threejs-visual-polish-design.md)

## Global Constraints

- Storytelling first, performance second, visual novelty third.
- Never make the core website content depend on WebGL; text and actions must render immediately.
- Zero WebGL memory leaks: deterministic cleanup of geometries, materials, listeners, and renderer.
- 0% GPU utilization when scrolled out of the Hero viewport.
- Respect `prefers-reduced-motion: reduce` by halting animation and rendering a static topology snapshot.
- All test suites must pass (`npm test`), TypeScript must have 0 errors (`npm run typecheck`), ESLint 0 errors (`npm run lint`), and `npm run build` must succeed with clean chunk splitting.

---

### Task 1: Three.js Dependency Installation & ThreeBoundary Enhancement

**Files:**
- Modify: `package.json`
- Modify: `src/three/ThreeBoundary.tsx`
- Modify: `src/three/ThreeBoundary.test.tsx`

**Interfaces:**
- Produces:
  ```typescript
  export interface ThreeSceneProps {
    readonly className?: string;
    readonly fallback?: ReactNode;
    readonly children?: ReactNode;
  }
  ```

- [ ] **Step 1: Install `three` and `@types/three`**
  Run: `npm install three && npm install -D @types/three`

- [ ] **Step 2: Write tests in `src/three/ThreeBoundary.test.tsx`**
  Cover:
  - Renders fallback when WebGL is unavailable.
  - Renders fallback when `prefers-reduced-motion: reduce` is active.
  - Renders children when WebGL is supported and reduced motion is false.

- [ ] **Step 3: Run test to verify behavior**
  Run: `npx vitest run src/three/ThreeBoundary.test.tsx`
  Expected: PASS.

- [ ] **Step 4: Commit**
  ```bash
  git add package.json package-lock.json src/three/
  git commit -m "feat(three): install three.js and enhance ThreeBoundary"
  ```

---

### Task 2: Core Topology Scene Engine (`createTopologyScene.ts`)

**Files:**
- Create: `src/three/HeroScene/createTopologyScene.ts`
- Create: `src/three/HeroScene/createTopologyScene.test.ts`
- Modify: `src/three/types.ts`

**Interfaces:**
- Produces:
  ```typescript
  export interface TopologySceneOptions {
    readonly isReducedMotion?: boolean;
    readonly isMobile?: boolean;
    readonly dpr?: number;
  }

  export interface TopologySceneController {
    readonly domElement: HTMLCanvasElement;
    setPointer(x: number, y: number): void;
    pause(): void;
    resume(): void;
    resize(width: number, height: number): void;
    dispose(): void;
  }

  export function createTopologyScene(
    container: HTMLElement,
    options?: TopologySceneOptions
  ): TopologySceneController;
  ```

- [ ] **Step 1: Write unit tests in `src/three/HeroScene/createTopologyScene.test.ts`**
  Cover:
  - Initializes canvas, scene, camera, and attaches to container.
  - Generates nodes and edge lines.
  - Supports `pause()` and `resume()` without throwing.
  - Handles `setPointer()` to update parallax coordinates.
  - `dispose()` cleans up geometries, materials, and calls renderer disposal.

- [ ] **Step 2: Run test to verify it fails**
  Run: `npx vitest run src/three/HeroScene/createTopologyScene.test.ts`
  Expected: FAIL (module not found).

- [ ] **Step 3: Implement `src/three/HeroScene/createTopologyScene.ts`**
  Implement:
  - Three.js scene, perspective camera, WebGLRenderer with `alpha: true`, antialias, and clamped DPR (`Math.min(window.devicePixelRatio, 1.75)`).
  - Node clusters (Edge, Gateway, Core Services, Database/Cache) using `BufferGeometry` and `PointsMaterial`.
  - Connecting network edges using `LineSegments` and `LineBasicMaterial`.
  - Telemetry pulse particles traveling along pathways.
  - Animation loop with ease-in/out parallax (`lerp`), frame delta calculation, and `pause`/`resume` controls.
  - Complete `dispose()` method calling `.dispose()` on all buffers and materials, detaching canvas, and forcing context loss.

- [ ] **Step 4: Run test to verify it passes**
  Run: `npx vitest run src/three/HeroScene/createTopologyScene.test.ts`
  Expected: PASS.

- [ ] **Step 5: Commit**
  ```bash
  git add src/three/
  git commit -m "feat(three): implement createTopologyScene core engine"
  ```

---

### Task 3: React Wrapper Component (`HeroTopologyScene.tsx`)

**Files:**
- Create: `src/three/HeroScene/HeroTopologyScene.tsx`
- Create: `src/three/HeroScene/HeroTopologyScene.test.tsx`
- Create: `src/three/HeroScene/index.ts`
- Modify: `src/three/index.ts`

**Interfaces:**
- Produces:
  ```typescript
  export interface HeroTopologySceneProps {
    readonly className?: string;
  }
  export function HeroTopologyScene(props: HeroTopologySceneProps): ReactElement;
  export default HeroTopologyScene;
  ```

- [ ] **Step 1: Write tests in `src/three/HeroScene/HeroTopologyScene.test.tsx`**
  Cover:
  - Renders container div and canvas element.
  - Uses `IntersectionObserver` to pause scene when out of viewport and resume when visible.
  - Disposes controller on component unmount.

- [ ] **Step 2: Run test to verify it fails**
  Run: `npx vitest run src/three/HeroScene/HeroTopologyScene.test.tsx`
  Expected: FAIL.

- [ ] **Step 3: Implement `HeroTopologyScene.tsx`**
  Implement:
  - Ref container for Three.js canvas.
  - Pointer movement event listener on container.
  - Window resize observer/listener updating camera aspect and renderer size.
  - `IntersectionObserver` tracking container visibility (`threshold: [0, 0.05]`) to pause/resume rendering.
  - Unmount cleanup invoking `controller.dispose()`.

- [ ] **Step 4: Run test to verify it passes**
  Run: `npx vitest run src/three/HeroScene/HeroTopologyScene.test.tsx`
  Expected: PASS.

- [ ] **Step 5: Commit**
  ```bash
  git add src/three/HeroScene/
  git commit -m "feat(three): implement HeroTopologyScene React wrapper"
  ```

---

### Task 4: Hero Section Integration & Dynamic Chunk Verification

**Files:**
- Modify: `src/sections/Hero/Hero.tsx`
- Modify: `src/sections/Hero/Hero.test.tsx`

- [ ] **Step 1: Update `src/sections/Hero/Hero.test.tsx`**
  Cover:
  - Hero renders headline and content immediately.
  - `ThreeBoundary` is mounted in the background layer with fallback intact.

- [ ] **Step 2: Run test to verify existing behavior**
  Run: `npx vitest run src/sections/Hero/Hero.test.tsx`
  Expected: PASS.

- [ ] **Step 3: Integrate `HeroTopologyScene` into `src/sections/Hero/Hero.tsx`**
  - Dynamically load `const HeroTopologyScene = React.lazy(() => import('@/three/HeroScene'));`
  - Mount inside `<ThreeBoundary>` with `<Suspense fallback={null}>` in the absolute atmospheric background layer (`z-0`).
  - Set `pointer-events-none` on background wrapper so clicks and text selection are unobstructed.

- [ ] **Step 4: Run Hero section tests**
  Run: `npx vitest run src/sections/Hero/Hero.test.tsx`
  Expected: PASS.

- [ ] **Step 5: Commit**
  ```bash
  git add src/sections/Hero/
  git commit -m "feat(hero): integrate lazy-loaded 3D topology scene"
  ```

---

### Task 5: Full Verification & Bundle Splitting Audit

**Files:**
- Modify: `task.md`

- [ ] **Step 1: Run full TypeScript check**
  Run: `npm run typecheck`
  Expected: 0 errors.

- [ ] **Step 2: Run full ESLint check**
  Run: `npm run lint`
  Expected: 0 errors, 0 warnings.

- [ ] **Step 3: Run full Vitest suite**
  Run: `npm test`
  Expected: All test files pass.

- [ ] **Step 4: Run production build and verify bundle splitting**
  Run: `npm run build`
  Expected: Exit code 0, Three.js isolated in a separate lazy chunk (`assets/HeroTopologyScene-*.js`), keeping the initial main entry bundle lightweight.

- [ ] **Step 5: Commit & update task tracking**
  ```bash
  git commit -m "chore: complete Stage 12 Three.js visual polish verification"
  ```
