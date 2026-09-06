# Stage 12 Revamp: Tangible 3D Architecture, Interactive 3D Cards & Scroll Experience Design

**Status:** Approved  
**Author:** Antigravity AI Engineering Agent  
**Date:** 2026-09-06  
**Target:** Hero 3D Objects, Case Study 3D Cards, and Global Scroll Dynamics  

---

## 1. Executive Summary & Purpose

This specification addresses user feedback regarding the 3D layer and page interactivity:
1. **Tangible 3D Objects in Hero**: Replace faint 2D background particle points with real, solid 3D geometric objects (architectural server nodes, floating microservice blocks, and glowing energy beams) with physical depth and lighting.
2. **True Interactivity**: Enable fluid mouse-following parallax, raycaster hover detection, and node inspection.
3. **Scroll-Driven 3D Storytelling**: As the user scrolls through the Hero, the 3D architecture smoothly explodes and disperses along the Z-axis, creating cinematic depth before pausing when scrolled out of view (0% offscreen GPU).
4. **Interactive 3D Cards**: Implement hardware-accelerated 3D tilt cards with holographic glare and internal Z-layer parallax for Case Studies and Architecture Tiers.
5. **Global Scroll Experience**: Introduce a high-precision technical scroll progress bar and smooth scroll-triggered section reveals.

---

## 2. Hero 3D System: Tangible Architecture Cluster

### 2.1 3D Geometry & Meshes
Instead of simple points and thin lines, the scene renders solid 3D architectural infrastructure:
- **Server Blades & Microservice Pods**:
  - Solid 3D boxes (`THREE.BoxGeometry`) with dark metallic faces (`#0c1322` semi-transparent).
  - Glowing wireframe outlines using `THREE.EdgesGeometry` and `THREE.LineSegments` in neon cyan (`#00F5D4`), sky blue (`#38BDF8`), and emerald (`#34D399`).
- **Core Orchestrator Hub**:
  - A central floating 3D icosahedron / core lattice with an internal glowing point light.
- **Data Conduit Beams**:
  - Connective energy beams (`THREE.CylinderGeometry` or instanced segments) between nodes with moving pulse packets.

### 2.2 Visibility & Contrast Correction
- In `src/sections/Hero/Hero.tsx`, remove the heavy 90% opacity dark gradient blanket covering the canvas.
- Use a soft radial vignette behind the text rather than a fullscreen opaque wash, keeping the 3D objects crisp and bright while maintaining WCAG AAA text legibility.
- Allow pointer events on the 3D canvas so the user can interact directly.

### 2.3 Raycasting & Hover Feedback
- A `THREE.Raycaster` tracks pointer movement across the 3D objects.
- Hovering over an architectural block:
  - Smoothly scales the block up by `1.15x`.
  - Intensifies edge glow and pulses energy to connected nodes.
  - Returns smoothly to base scale on pointer leave.

### 2.4 Scroll-Driven Camera & Node Dispersal
- The scene listens to `window.scrollY` (debounced via RAF).
- As the user scrolls from `0` to `heroHeight`:
  - Camera position translates forward on the Z-axis (`camera.position.z` travels from `30` to `16`).
  - Architecture nodes explode outward along their normal vectors, visually transitioning from an assembled system to an exploded architectural diagram.
  - When the Hero section leaves the viewport, the RAF render loop completely halts (0.0% GPU).

---

## 3. Interactive 3D Perspective Tilt Cards (`Card3D.tsx`)

### 3.1 Mechanics & Performance
- Built as a high-performance React component (`src/components/ui/Card3D.tsx`).
- Uses hardware-accelerated CSS 3D Transforms (`perspective: 1000px`, `transform-style: preserve-3d`).
- Calculates cursor offset relative to the card's center:
  $$\text{rotateX} = -(\text{offsetY} / \text{height}) \times \text{maxTilt}$$
  $$\text{rotateY} = (\text{offsetX} / \text{width}) \times \text{maxTilt}$$
  where $\text{maxTilt} = 10^\circ$.
- Smooth physics dampening via `requestAnimationFrame` or CSS transition `cubic-bezier(0.16, 1, 0.3, 1)`.

### 3.2 Holographic Specular Glare
- An absolute overlay within the card with a dynamic radial gradient:
  `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(0, 245, 212, 0.18), transparent 60%)`
- Follows the user's cursor across the surface, giving the physical sensation of light reflecting off polished glass/metal.

### 3.3 Layered Z-Elevation Parallax
- Card children can define `data-depth="high"` or `className="translate-z-20"` / `translate-z-40`.
- Titles, badges, and metrics physically float above the card surface as the card tilts.

### 3.4 Target Integrations
- Case Study Cards in `src/sections/Work/`
- Architecture Tiers in `src/sections/Capabilities/`

---

## 4. Global Scroll Experience

### 4.1 Technical Scroll Progress Bar (`ScrollProgressBar.tsx`)
- Fixed at the top of the viewport (`top-0 left-0 right-0 z-50 h-[2px]`).
- Backed by an accent cyan glow (`#00F5D4`) with `box-shadow: 0 0 8px rgba(0, 245, 212, 0.6)`.
- Updates smoothly on scroll using `transform: scaleX(progress)` with `transform-origin: left` to prevent layout reflow.

### 4.2 Smooth Scroll Reveal
- Lightweight observer utility attaching `opacity-0 translate-y-6` transitioning to `opacity-100 translate-y-0` as sections and primary elements enter the viewport.
- Respects `prefers-reduced-motion: reduce`.

---

## 5. File Changes & Architecture

```text
src/
├── components/
│   ├── navigation/
│   │   ├── ScrollProgressBar.tsx       # Top precision scroll progress bar
│   │   └── ScrollProgressBar.test.tsx
│   └── ui/
│       ├── Card3D.tsx                  # 3D Tilt Card with glare & depth
│       └── Card3D.test.tsx
├── three/
│   └── HeroScene/
│       ├── createTopologyScene.ts      # Upgraded with solid 3D server blocks, lighting, raycasting & scroll dispersal
│       ├── createTopologyScene.test.ts
│       ├── HeroTopologyScene.tsx       # Upgraded with scroll-tracking & raycasting event bridges
│       └── HeroTopologyScene.test.tsx
└── sections/
    ├── Hero/
    │   └── Hero.tsx                    # Fix background contrast mask & allow interactive canvas
    └── Work/
        └── CaseStudySelector.tsx       # Enhance with Card3D
```

---

## 6. Verification & Quality Gates

- 0% GPU load when scrolled out of view.
- 60+ FPS on desktop; touch gestures unimpeded on mobile.
- Full reduced-motion fallback: tilt and 3D rotations disabled when `prefers-reduced-motion: reduce` is active.
- 100% test pass rate on all existing and new unit tests.
- Zero TypeScript errors (`npm run typecheck`) and zero ESLint warnings (`npm run lint`).
- Clean bundle build with Three.js code-split into its own async chunk.
