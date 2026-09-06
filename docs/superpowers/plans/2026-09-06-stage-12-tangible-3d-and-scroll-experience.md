# Stage 12 Revamp: Tangible 3D Architecture, Interactive 3D Cards & Scroll Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the 3D and scroll experience by introducing tangible, solid 3D architectural objects in the Hero, scroll-driven depth dispersal, interactive 3D perspective tilt cards in Case Studies, and a technical top scroll progress bar.

**Architecture:** Solid 3D Box and Lattice meshes in vanilla Three.js with Raycaster hover detection and scroll-tied camera/node translation. Reusable hardware-accelerated CSS 3D Card component with dynamic holographic glare and internal Z-layer parallax. Zero-blocker chunk splitting with 0% off-screen GPU load.

**Tech Stack:** Three.js, React 19, TypeScript, Tailwind CSS v4, Vitest, Testing Library.

**Spec:** [`docs/superpowers/specs/2026-09-06-stage-12-tangible-3d-and-scroll-experience-design.md`](file:///home/tj/projects/portfolio/docs/superpowers/specs/2026-09-06-stage-12-tangible-3d-and-scroll-experience-design.md)

## Global Constraints

- Real tangible 3D objects with physical volume, wireframe neon edges, and lighting.
- High visibility: 3D objects must be crisp and bright, not washed out by dark overlays.
- 0% GPU utilization when the Hero is out of the viewport.
- Respect `prefers-reduced-motion: reduce` by halting all continuous rotations and 3D tilts.
- Touch-friendly on mobile without interfering with native page scrolling.
- Zero TypeScript errors (`npm run typecheck`), zero ESLint warnings (`npm run lint`), and 100% test pass rate (`npm test`).

---

### Task 1: Interactive 3D Perspective Tilt Card (`Card3D.tsx`)

**Files:**
- Create: `src/components/ui/Card3D.tsx`
- Create: `src/components/ui/Card3D.test.tsx`
- Modify: `src/components/ui/index.ts`

**Interfaces:**
- Produces:
  ```typescript
  export interface Card3DProps {
    readonly children: ReactNode;
    readonly className?: string;
    readonly maxTilt?: number;
    readonly glare?: boolean;
    readonly onClick?: () => void;
  }
  export function Card3D(props: Card3DProps): ReactElement;
  ```

- [ ] **Step 1: Write failing tests in `src/components/ui/Card3D.test.tsx`**
  Cover:
  - Renders children with perspective styling.
  - Updates rotation transforms on mouse movement.
  - Resets rotation transforms smoothly on mouse leave.
  - Renders dynamic glare overlay when `glare=true`.
  - Disables tilt when `prefers-reduced-motion` is active.

- [ ] **Step 2: Run test to verify it fails**
  Run: `npx vitest run src/components/ui/Card3D.test.tsx`
  Expected: FAIL.

- [ ] **Step 3: Implement `src/components/ui/Card3D.tsx` and export from `src/components/ui/index.ts`**
  Implement mouse tracking with normalized coordinates, transform string computation, glare reflection styling, and reduced-motion guard.

- [ ] **Step 4: Run test to verify it passes**
  Run: `npx vitest run src/components/ui/Card3D.test.tsx`
  Expected: PASS.

- [ ] **Step 5: Commit**
  ```bash
  git add src/components/ui/
  git commit -m "feat(ui): implement interactive 3D tilt Card component"
  ```

---

### Task 2: Global Technical Scroll Progress Bar (`ScrollProgressBar.tsx`)

**Files:**
- Create: `src/components/navigation/ScrollProgressBar.tsx`
- Create: `src/components/navigation/ScrollProgressBar.test.tsx`
- Modify: `src/components/layout/RootLayout.tsx`
- Modify: `src/components/layout/Layout.test.tsx`

**Interfaces:**
- Produces:
  ```typescript
  export function ScrollProgressBar(): ReactElement;
  ```

- [ ] **Step 1: Write failing tests in `src/components/navigation/ScrollProgressBar.test.tsx`**
  Cover:
  - Renders with `role="progressbar"`, `aria-label="Reading progress"`.
  - Updates scaleX transform based on window scroll progress.
  - Handles 0 scrollable height without errors.

- [ ] **Step 2: Run test to verify it fails**
  Run: `npx vitest run src/components/navigation/ScrollProgressBar.test.tsx`
  Expected: FAIL.

- [ ] **Step 3: Implement `ScrollProgressBar.tsx` and mount in `RootLayout.tsx`**
  Mount fixed at `top-0 left-0 right-0 z-50 h-[2px]` with accent cyan glow and RAF debounced scroll listener.

- [ ] **Step 4: Run test to verify it passes**
  Run: `npx vitest run src/components/navigation/ScrollProgressBar.test.tsx src/components/layout/Layout.test.tsx`
  Expected: PASS.

- [ ] **Step 5: Commit**
  ```bash
  git add src/components/navigation/ src/components/layout/
  git commit -m "feat(navigation): add technical scroll progress bar"
  ```

---

### Task 3: Core 3D Topology Scene Engine Overhaul (`createTopologyScene.ts`)

**Files:**
- Modify: `src/three/HeroScene/createTopologyScene.ts`
- Modify: `src/three/HeroScene/createTopologyScene.test.ts`
- Modify: `src/three/types.ts`

**Interfaces:**
- Produces:
  ```typescript
  export interface TopologySceneController {
    readonly domElement: HTMLCanvasElement;
    setPointer(x: number, y: number): void;
    setScrollProgress(progress: number): void;
    pause(): void;
    resume(): void;
    resize(width: number, height: number): void;
    dispose(): void;
  }
  ```

- [ ] **Step 1: Update unit tests in `src/three/HeroScene/createTopologyScene.test.ts`**
  Cover:
  - Creates 3D solid box server nodes with edges.
  - Supports `setScrollProgress(progress)` for exploded architecture transformation.
  - Handles raycasting interaction and hover scaling.
  - Disposes all solid geometries, edge lines, and materials.

- [ ] **Step 2: Run test to verify failure**
  Run: `npx vitest run src/three/HeroScene/createTopologyScene.test.ts`
  Expected: FAIL.

- [ ] **Step 3: Implement 3D solid server objects, raycasting, and scroll dispersal in `createTopologyScene.ts`**
  Implement:
  - Architectural node clusters using `THREE.BoxGeometry` + `THREE.EdgesGeometry` + `THREE.LineSegments`.
  - Central 3D core hub with dynamic lighting.
  - Connective energy lines with pulse packets.
  - Raycaster detecting hover on node meshes.
  - `setScrollProgress(progress)` adjusting camera Z-position and dispersing node offsets.
  - Comprehensive disposal of all meshes, materials, and geometries.

- [ ] **Step 4: Run test to verify it passes**
  Run: `npx vitest run src/three/HeroScene/createTopologyScene.test.ts`
  Expected: PASS.

- [ ] **Step 5: Commit**
  ```bash
  git add src/three/
  git commit -m "feat(three): overhaul topology engine with solid 3D objects and scroll dispersal"
  ```

---

### Task 4: Hero Visibility & Interactive Bridge Integration

**Files:**
- Modify: `src/three/HeroScene/HeroTopologyScene.tsx`
- Modify: `src/three/HeroScene/HeroTopologyScene.test.tsx`
- Modify: `src/sections/Hero/Hero.tsx`
- Modify: `src/sections/Hero/Hero.test.tsx`

- [ ] **Step 1: Update `HeroTopologyScene.tsx`**
  - Add scroll event listener passing normalized `scrollProgress` (0 to 1) into `controller.setScrollProgress()`.
  - Forward pointer move coordinates for raycaster hover and parallax.

- [ ] **Step 2: Update `Hero.tsx`**
  - Remove heavy dark gradient blanket over the canvas.
  - Use soft radial vignette around text so 3D objects shine through with high contrast and clarity.
  - Remove `pointer-events-none` from canvas layer so raycasting works on mouse hover.

- [ ] **Step 3: Run Hero tests to verify they pass**
  Run: `npx vitest run src/sections/Hero/Hero.test.tsx src/three/HeroScene/HeroTopologyScene.test.tsx`
  Expected: PASS.

- [ ] **Step 4: Commit**
  ```bash
  git add src/sections/Hero/ src/three/HeroScene/
  git commit -m "feat(hero): fix 3D visibility, enable raycasting, and connect scroll transformations"
  ```

---

### Task 5: 3D Cards in Case Studies & Capabilities

**Files:**
- Modify: `src/sections/Work/CaseStudySelector.tsx`
- Modify: `src/sections/Work/CaseStudySelector.test.tsx`
- Modify: `src/sections/Capabilities/CapabilityGroupCard.tsx`

- [ ] **Step 1: Update `src/sections/Work/CaseStudySelector.tsx`**
  - Wrap case study selector cards in `<Card3D glare={true}>` with floating Z-depth elements.

- [ ] **Step 2: Update `src/sections/Capabilities/CapabilityGroupCard.tsx`**
  - Wrap capability pillar cards in `<Card3D glare={true}>`.

- [ ] **Step 3: Run Work & Capabilities test suites**
  Run: `npx vitest run src/sections/Work/ src/sections/Capabilities/`
  Expected: PASS.

- [ ] **Step 4: Commit**
  ```bash
  git add src/sections/Work/ src/sections/Capabilities/
  git commit -m "feat(work): integrate interactive 3D perspective tilt cards into case studies and capabilities"
  ```

---

### Task 6: Full Verification & Performance Audit

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
  Expected: 100% test suites pass.

- [ ] **Step 4: Run production build and verify bundle splitting**
  Run: `npm run build`
  Expected: Exit code 0, Three.js cleanly isolated in async vendor chunk.

- [ ] **Step 5: Final commit and update task tracking**
