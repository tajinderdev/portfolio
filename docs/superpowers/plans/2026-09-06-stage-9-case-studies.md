# Stage 9: Case Studies Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a senior engineering-focused Case Studies section (`#work`) demonstrating systems thinking, architectural reasoning, and practical problem-solving across 4 confidentiality-safe case studies without inventing metrics or exposing client identities.

**Architecture:** Extend content data models with an 11-dimension engineering reasoning schema (`CaseStudyReasoning`) and architecture topology (`CaseStudyArchitectureDiagram`). Implement reusable presentational components (`CaseStudySelector`, `CaseStudyDiagram`, `CaseStudyDetails`, `CaseStudies`) wrapped in `<Section id="work">` that mount inside `src/app/App.tsx`.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, Lucide icons (or SVG icons), Vitest, Testing Library.

**Spec:** Stage 9 prompt instructions and `.agents/content/projects/`, `.agents/Tajinder_Senior_Software_Engineer_Profile_Final.md`.

## Global Constraints

- Never invent metrics, client names, project names, or technologies not present in `.agents/`.
- Strict client/project confidentiality: use domain-oriented descriptions (Enterprise Content Publishing Platform, Subscription & Customer Management Platform, E-commerce Platform, CRM-Integrated Business Platform).
- All 11 engineering dimensions must be supported: Context, Problem, Constraints, Engineering approach, Architecture/system thinking, Integrations, Security considerations, Performance considerations, Delivery/collaboration, Outcome, Lessons/engineering insight.
- Reusable component architecture so additional case studies can be added via data models alone without rewriting components.
- Accessible by keyboard, screen readers, and respecting `prefers-reduced-motion`.
- Do NOT implement Contact or the AI section yet.

---

### Task 1: Data Model Expansion & Content Population

**Files:**
- Modify: `src/content/models/index.ts`
- Modify: `src/content/data/projects.ts`
- Test: `src/content/content.test.ts`

**Interfaces:**
- Consumes: `ProjectCaseStudy`, `PublicReference`
- Produces: Enhanced `ProjectCaseStudy` with `CaseStudyReasoning` (11 dimensions) and `CaseStudyArchitectureDiagram`

- [ ] **Step 1: Write the failing test for case study models and data**
Add tests asserting that each case study contains non-empty strings and arrays for all 11 dimensions and valid diagram nodes.

- [ ] **Step 2: Run test to verify it fails**
Run: `npm test -- src/content/content.test.ts`
Expected: FAIL due to missing reasoning fields in `projectsData`.

- [ ] **Step 3: Update `src/content/models/index.ts`**
Define `CaseStudyArchitectureNode`, `CaseStudyArchitectureDiagram`, and `CaseStudyReasoning` interfaces. Update `ProjectCaseStudy`.

- [ ] **Step 4: Enrich `src/content/data/projects.ts`**
Add rich, verified, confidentiality-safe data for the 4 core case studies (Content Publishing, Subscription Management, E-commerce, CRM Platform).

- [ ] **Step 5: Run tests and verify they pass**
Run: `npm test -- src/content/content.test.ts`
Expected: PASS with all case studies meeting the 11-dimension criteria.

---

### Task 2: Architectural Diagram Visualizer Component (`CaseStudyDiagram.tsx`)

**Files:**
- Create: `src/sections/Work/CaseStudyDiagram.tsx`
- Test: `src/sections/Work/CaseStudyDiagram.test.tsx`

**Interfaces:**
- Consumes: `CaseStudyArchitectureDiagram` from `src/content/models`
- Produces: `<CaseStudyDiagram diagram={diagram} />`

- [ ] **Step 1: Write failing test for `CaseStudyDiagram`**
Verify that diagram title, architecture nodes, badges, and directional data flow steps are rendered accessibly with SVG arrows or CSS pipelines.

- [ ] **Step 2: Run test to verify it fails**
Run: `npm test -- src/sections/Work/CaseStudyDiagram.test.tsx`
Expected: FAIL due to component not existing yet.

- [ ] **Step 3: Implement `CaseStudyDiagram.tsx`**
Create lightweight, responsive, accessible architecture diagram visualizer that maps tiers (`client`, `gateway`, `app`, `data`, `external`, `worker`) with clean connectors and data flow narratives.

- [ ] **Step 4: Run test to verify it passes**
Run: `npm test -- src/sections/Work/CaseStudyDiagram.test.tsx`
Expected: PASS.

---

### Task 3: Case Study Selector & Details Components

**Files:**
- Create: `src/sections/Work/CaseStudySelector.tsx`
- Create: `src/sections/Work/CaseStudyDetails.tsx`
- Test: `src/sections/Work/CaseStudySelector.test.tsx`
- Test: `src/sections/Work/CaseStudyDetails.test.tsx`

**Interfaces:**
- Consumes: `ProjectCaseStudy` array, active case study ID, selection callback
- Produces: Reusable `<CaseStudySelector />` and `<CaseStudyDetails />`

- [ ] **Step 1: Write failing tests for Selector and Details**
Test tab selection, aria-selected attributes, keyboard accessibility, and rendering of all 11 engineering dimensions (Problem, Approach, Constraints, Security, Performance, Outcome, Insight, etc.).

- [ ] **Step 2: Run tests to verify they fail**
Run: `npm test -- src/sections/Work/CaseStudySelector.test.tsx src/sections/Work/CaseStudyDetails.test.tsx`
Expected: FAIL due to components not existing yet.

- [ ] **Step 3: Implement `CaseStudySelector.tsx`**
Horizontal/grid selector with indices, confidentiality indicators, domain tags, active states, and full ARIA tablist semantics.

- [ ] **Step 4: Implement `CaseStudyDetails.tsx`**
Structured, editorial layout grouping the 11 dimensions into clear visual sections (Problem & Constraints, Architecture & Approach with Diagram, Engineering Deep Dive [Integrations, Security, Performance], and Results & Lessons [Delivery, Outcome, Insight]).

- [ ] **Step 5: Run tests to verify they pass**
Run: `npm test -- src/sections/Work/CaseStudySelector.test.tsx src/sections/Work/CaseStudyDetails.test.tsx`
Expected: PASS.

---

### Task 4: Composite Section Component (`CaseStudies.tsx`) & App Integration

**Files:**
- Create: `src/sections/Work/CaseStudies.tsx`
- Create: `src/sections/Work/index.ts`
- Modify: `src/sections/index.ts`
- Modify: `src/app/App.tsx`
- Test: `src/sections/Work/CaseStudies.test.tsx`
- Modify: `src/app/App.test.tsx`

**Interfaces:**
- Consumes: `content.projects`
- Produces: `<CaseStudies projects={content.projects} />` anchored at `id="work"`

- [ ] **Step 1: Write failing test for `CaseStudies.test.tsx` and update `App.test.tsx`**
Assert rendering within `<section id="work">`, header `01 / SELECTED WORK & CASE STUDIES`, switching between case studies, and integration into `App.tsx`.

- [ ] **Step 2: Run test to verify it fails**
Run: `npm test -- src/sections/Work/CaseStudies.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement `CaseStudies.tsx` & export in `index.ts`**
Composite component managing active state, rendering `<Section id="work">`, `<SectionHeader>`, `<CaseStudySelector>`, and `<CaseStudyDetails>`.

- [ ] **Step 4: Integrate into `src/app/App.tsx`**
Replace the temporary `#work` placeholder with `<CaseStudies projects={content.projects} />`.

- [ ] **Step 5: Run tests to verify they pass**
Run: `npm test -- src/sections/Work/CaseStudies.test.tsx src/app/App.test.tsx`
Expected: PASS.

---

### Task 5: Full Verification Suite

**Files:**
- Verification only

- [ ] **Step 1: Run TypeScript typecheck**
Run: `npm run typecheck`
Expected: 0 errors.

- [ ] **Step 2: Run ESLint**
Run: `npm run lint`
Expected: 0 errors, 0 warnings.

- [ ] **Step 3: Run entire test suite**
Run: `npm test`
Expected: All test suites pass.

- [ ] **Step 4: Run production build**
Run: `npm run build`
Expected: Exit code 0, bundles successfully.

- [ ] **Step 5: Review against prompt requirements**
Verify no invented metrics, no leaked client identities, all 11 dimensions present, diagrams included, and no downstream sections touched.
