# Stage 12: Hero 3D Distributed Architecture Topology Design Specification

**Status:** Approved  
**Author:** Antigravity AI Engineering Agent  
**Date:** 2026-09-06  
**Target:** Hero Section (`#hero`) Atmospheric Visual Enhancement  

---

## 1. Executive Summary & Purpose

The purpose of Stage 12 is to implement a high-performance, subtle, and narrative-driven 3D background layer for the Hero section of Tajinder Singh's portfolio. 

In accordance with `.agents/DESIGN_DIRECTION.md` and `.agents/TECHNOLOGY_ARCHITECTURE.md`:
- **Storytelling first, performance second, visual novelty third.**
- The 3D scene must not be a generic technology demo or floating polygon cluster.
- The 3D scene directly embodies **Distributed Architecture Topology**: interconnected microservices, API gateways, database persistences, and event queues with subtle flowing telemetry pulses.
- The core portfolio content must **never** depend on WebGL. Initial page load must not be blocked.
- When scrolled out of view, the render loop halts immediately to achieve **0% GPU usage**.

---

## 2. Visual & Narrative Design

### 2.1 The Topology Graph
The 3D space represents a multi-tiered distributed cloud architecture:
1. **Edge / Client Nodes**: Outer boundary tier communicating inbound requests.
2. **API Gateway & Routing Layer**: Central routing nodes orchestrating traffic.
3. **Core Services & Business Logic**: Interconnected application workers and microservice clusters.
4. **Data Persistence & Cache Mesh**: Clustered nodes representing relational databases (PostgreSQL/MySQL) and fast caches (Redis).
5. **Event Stream / Message Bus**: Connective edges with animated telemetry packet pulses.

### 2.2 Color & Contrast Palette
- **Background**: Transparent canvas overlaying the existing `#0a0a0a` hero dark gradient.
- **Node Sprites**: `#00F5D4` (accent cyan), `#38BDF8` (sky blue), `#34D399` (emerald), and `#64748B` (slate).
- **Network Edges**: Low-opacity lines (`rgba(100, 116, 139, 0.2)` to `rgba(0, 245, 212, 0.35)`).
- **Telemetry Pulses**: Bright cyan packets (`#00F5D4`) traversing active network paths.
- **Text Legibility Protection**: Max overall scene opacity is calibrated between 15% and 35%, ensuring foreground typography (headlines, lead descriptions, badges) exceeds WCAG AAA contrast ratios.

### 2.3 Interaction Model
- **Pointer Parallax**: Mouse movements on desktop slightly tilt the camera (`±0.06` radians) with linear easing (`lerp`), giving physical depth without causing nausea or distracting from text.
- **Node Proximity Glow**: Moving the cursor over the canvas illuminates the nearest node cluster and active connection routes.
- **Mobile Touch Handling**: On screens `< 768px` or touch-primary devices, pointer raycasting is disabled. The scene renders a calm, low-frequency ambient float so touch-drag gestures scroll the page smoothly without input capture conflicts.

---

## 3. Technical Architecture & Component Tree

### 3.1 Component Hierarchy
```text
src/sections/Hero/Hero.tsx
└── src/three/ThreeBoundary.tsx (WebGL & Reduced-Motion Gate)
    └── React.Suspense (Fallback: Atmospheric CSS Gradient)
        └── React.lazy(() => import('@/three/HeroScene/HeroTopologyScene'))
            └── <canvas ref={canvasRef} />
                └── createTopologyScene() [Vanilla Three.js Controller]
```

### 3.2 File Structure
```text
src/three/
├── HeroScene/
│   ├── HeroTopologyScene.tsx      # React wrapper managing lifecycle, lazy loading, and resize
│   ├── createTopologyScene.ts     # Pure Three.js graph: buffer geometries, pulse animation, disposal
│   ├── HeroTopologyScene.test.tsx # Unit & integration tests for mounting, observer, disposal
│   └── index.ts                   # Public export
├── ThreeBoundary.tsx              # Progressive enhancement boundary (existing)
└── types.ts                       # Typed configuration interfaces
```

---

## 4. Performance & Resource Management Lifecycle

### 4.1 Zero-Blocker Bundle Splitting
- `three` will be added as a dependency and tree-shaken.
- Because `HeroTopologyScene` is loaded exclusively via `React.lazy`, the initial main bundle size increases by **0 KB**.
- Critical CSS, typography, and Hero DOM elements paint immediately. The WebGL canvas hydrates asynchronously in the background.

### 4.2 0% Off-Screen GPU Throttling
- An `IntersectionObserver` observes the canvas element.
- When `intersectionRatio < 0.05` (e.g. user scrolls down to `#work` or `#experience`):
  - `cancelAnimationFrame(animationFrameId)` is invoked immediately.
  - The render loop stops completely.
  - GPU and CPU consumption for the 3D canvas drop to **0.0%**.
- When the Hero scrolls back into view (`intersectionRatio >= 0.05`), the RAF loop resumes smoothly.

### 4.3 Deterministic Disposal (Zero Memory Leaks)
On React component unmount or hot-module replacement:
1. `cancelAnimationFrame` is called.
2. `window.removeEventListener('resize')` and `pointermove` listeners are detached.
3. `IntersectionObserver.disconnect()` is executed.
4. All Three.js objects are traversed:
   - `geometry.dispose()` on node points and edge line segments.
   - `material.dispose()` on point and line materials.
   - `texture.dispose()` on any sprite textures.
5. `renderer.dispose()` and `renderer.forceContextLoss()` are executed.
6. The `<canvas>` element is cleaned up from the DOM.

### 4.4 Device Adaptation & Reduced Motion
- **`window.devicePixelRatio`**: Clamped to `Math.min(window.devicePixelRatio, 1.75)` to eliminate GPU fill-rate strain on 4K / Retina displays.
- **`prefers-reduced-motion: reduce`**:
  - Automatically detected by `ThreeBoundary.tsx`.
  - Rotations and telemetry packet travels are halted, rendering a static, balanced architectural topology snapshot.
- **Mobile Optimization (`< 768px`)**:
  - Node count reduced from 54 to 22.
  - Edge connections reduced from 80 to 28.
  - Raycaster disabled.

---

## 5. Testing & Verification Strategy

1. **Unit Tests (`src/three/HeroScene/HeroTopologyScene.test.tsx`)**:
   - Verify fallback displays when WebGL is unsupported.
   - Verify `prefers-reduced-motion` suppresses animation loops.
   - Verify `IntersectionObserver` pauses and resumes the render loop.
   - Verify clean teardown and call to `.dispose()` on unmount.
2. **Type Safety**:
   - Strict TypeScript verification (`npm run typecheck`).
3. **Linting**:
   - Zero warnings or errors (`npm run lint`).
4. **End-to-End Build**:
   - Production bundle generation verified via `npm run build`.
   - Chunk inspection: Three.js isolated in a deferred dynamic chunk, not in `index.html` main bundle.
