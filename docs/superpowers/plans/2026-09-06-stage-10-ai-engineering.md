# Stage 10: AI / Modern Engineering Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a senior engineering-focused AI / Modern Engineering section (`#ai`) communicating practical, restrained use of Generative AI as an engineering multiplier with human architectural control, featuring an interactive 6-stage engineering workflow visualizer and dual-sphere capability breakdown.

**Architecture:** Extend content models with `AIEngineeringModel`, `AIWorkflowStep`, and `AICapabilitySphere`. Implement reusable presentational components (`WorkflowPipeline`, `GovernanceMatrix`, `ApplicationCapabilities`, `AIEngineering`) wrapped in `<Section id="ai">` and mount between `#domains` and `#about` in `src/app/App.tsx`.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, Vitest, Testing Library.

**Spec:** Stage 10 prompt instructions, `.agents/Tajinder_Senior_Software_Engineer_Profile_Final.md`, and `.agents/DESIGN_DIRECTION.md`.

## Global Constraints

- Never position Tajinder as an AI researcher; position him as a Senior Software Engineer using AI as an engineering multiplier.
- Never invent AI models, metrics, or client implementations not supported by `.agents/`.
- Clear distinction between what AI accelerates (speed, prototyping, test vectors) versus what remains human-governed (architecture, security, verification).
- Interactive 6-stage workflow (`Idea → Reason → Architect → Build → Validate → Improve`) must be lightweight, responsive, and keyboard accessible.
- Complements, does not dominate, the portfolio.
- Do NOT implement Contact form or downstream sections.

---

### Task 1: Data Model Expansion & Content Population

**Files:**
- Modify: `src/content/models/index.ts`
- Create: `src/content/data/aiEngineering.ts`
- Modify: `src/content/index.ts`
- Test: `src/content/content.test.ts`

**Interfaces:**
- Consumes: Portfolio data models
- Produces: `AIEngineeringModel`, `AIWorkflowStep`, `AICapabilitySphere`, and `aiEngineeringData` exported in `getPortfolioContent()`

- [ ] **Step 1: Write failing test in `src/content/content.test.ts`**
Assert that `content.aiEngineering` exists, has positioning statement, 6 workflow steps with AI role & human governance, and 2 capability spheres (Developer Workflow Acceleration & In-Application AI Capabilities).

- [ ] **Step 2: Run test to verify it fails**
Run: `npm test -- src/content/content.test.ts`
Expected: FAIL due to `aiEngineering` not existing on `content`.

- [ ] **Step 3: Define TypeScript interfaces in `src/content/models/index.ts`**
Add `AIWorkflowStep`, `AICapabilitySphere`, and `AIEngineeringModel` interfaces. Update `PortfolioData`.

- [ ] **Step 4: Create `src/content/data/aiEngineering.ts`**
Populate rich, verified data grounded strictly in `.agents/Tajinder_Senior_Software_Engineer_Profile_Final.md`.

- [ ] **Step 5: Export in `src/content/index.ts` and verify test passes**
Run: `npm test -- src/content/content.test.ts`
Expected: PASS.

---

### Task 2: Interactive 6-Stage Workflow Pipeline Component (`WorkflowPipeline.tsx`)

**Files:**
- Create: `src/sections/AI/WorkflowPipeline.tsx`
- Test: `src/sections/AI/WorkflowPipeline.test.tsx`

**Interfaces:**
- Consumes: `readonly AIWorkflowStep[]`, active step state, selection handler
- Produces: `<WorkflowPipeline steps={steps} activeStepIndex={index} onSelectStep={handler} />`

- [ ] **Step 1: Write failing test for `WorkflowPipeline`**
Test rendering of 6 stages (`Idea`, `Reason`, `Architect`, `Build`, `Validate`, `Improve`), interactive selection, keyboard accessibility (`role="tablist"` / `role="tab"`), and display of AI multiplier vs human control.

- [ ] **Step 2: Run test to verify it fails**
Run: `npm test -- src/sections/AI/WorkflowPipeline.test.tsx`
Expected: FAIL due to missing component.

- [ ] **Step 3: Implement `src/sections/AI/WorkflowPipeline.tsx`**
Responsive pipeline stepper with monospace indices (`01`–`06`), status pills, directional connectors, and deep-dive panel showing "AI Role (Multiplier)" and "Human Control (Governance)".

- [ ] **Step 4: Run test to verify it passes**
Run: `npm test -- src/sections/AI/WorkflowPipeline.test.tsx`
Expected: PASS.

---

### Task 3: AI Governance Matrix & Application Capabilities Components

**Files:**
- Create: `src/sections/AI/GovernanceMatrix.tsx`
- Create: `src/sections/AI/ApplicationCapabilities.tsx`
- Test: `src/sections/AI/GovernanceMatrix.test.tsx`
- Test: `src/sections/AI/ApplicationCapabilities.test.tsx`

**Interfaces:**
- Consumes: Governance principles and `AICapabilitySphere[]`
- Produces: `<GovernanceMatrix />` and `<ApplicationCapabilities spheres={spheres} />`

- [ ] **Step 1: Write failing tests for GovernanceMatrix and ApplicationCapabilities**
Test rendering of speed vs governance comparison cards and both capability spheres (Developer Workflow vs In-App Capabilities).

- [ ] **Step 2: Run tests to verify they fail**
Run: `npm test -- src/sections/AI/GovernanceMatrix.test.tsx src/sections/AI/ApplicationCapabilities.test.tsx`
Expected: FAIL due to missing components.

- [ ] **Step 3: Implement `GovernanceMatrix.tsx`**
Card displaying the core thesis: "AI Multiplies Speed & Exploration" vs "Engineering Controls Rigor & Architecture", with concrete examples from the source material.

- [ ] **Step 4: Implement `ApplicationCapabilities.tsx`**
Structured 2-column layout showing the two spheres: "Developer Productivity & Tooling" and "In-Application AI Features & Guardrails".

- [ ] **Step 5: Run tests to verify they pass**
Run: `npm test -- src/sections/AI/GovernanceMatrix.test.tsx src/sections/AI/ApplicationCapabilities.test.tsx`
Expected: PASS.

---

### Task 4: Composite Section Component (`AIEngineering.tsx`) & App Integration

**Files:**
- Create: `src/sections/AI/AIEngineering.tsx`
- Create: `src/sections/AI/index.ts`
- Modify: `src/sections/index.ts`
- Modify: `src/app/App.tsx`
- Test: `src/sections/AI/AIEngineering.test.tsx`
- Modify: `src/app/App.test.tsx`

**Interfaces:**
- Consumes: `content.aiEngineering`
- Produces: `<AIEngineering data={content.aiEngineering} />` anchored at `id="ai"`

- [ ] **Step 1: Write failing test in `AIEngineering.test.tsx` and update `App.test.tsx`**
Assert rendering within `<section id="ai">`, header `05 / MODERN ENGINEERING`, tabs, governance matrix, and integration into `App.tsx`.

- [ ] **Step 2: Run test to verify it fails**
Run: `npm test -- src/sections/AI/AIEngineering.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement `src/sections/AI/AIEngineering.tsx` & export in `src/sections/AI/index.ts`**
Composite component managing interactive state, integrating SectionHeader, GovernanceMatrix, WorkflowPipeline, and ApplicationCapabilities.

- [ ] **Step 4: Re-export in `src/sections/index.ts` and mount in `src/app/App.tsx`**
Mount between `<Domains />` and `<About />`.

- [ ] **Step 5: Run tests to verify they pass**
Run: `npm test -- src/sections/AI/AIEngineering.test.tsx src/app/App.test.tsx`
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
Verify no researcher exaggerations, strict source-based claims, subtle performant interactions, and all constraints satisfied.
