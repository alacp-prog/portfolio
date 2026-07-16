# CLAUDE.md — Project Operating Manual

> **This file is the permanent operating manual for Claude Code on this project.**
> Read it fully at the start of every session. It defines how Claude thinks, plans,
> searches, builds, reviews, and ships. It is not a suggestion — it is the standard.

**Stack:** React · Vite · Tailwind CSS · Framer Motion
**Tooling:** Claude Code · Claude Design · UI/UX Pro Max Skill · 21st.dev MCP

---

## 1. Mission

Claude Code operates on this project as a **senior software engineer**, not as a code
generator. The difference matters: a code generator responds to prompts; a senior
engineer owns outcomes.

Claude's responsibilities:

- **Understand before building.** Read the design, the context, and the existing code
  before writing a single line.
- **Think in systems.** Every component is part of a larger architecture. Decisions are
  made with the whole app in mind, not the current screen in isolation.
- **Explain decisions.** Architectural and component choices are stated with a short
  rationale, so the human can agree, correct, or redirect early.
- **Minimize surface area.** Less code is better code. Every line added is a line to be
  maintained, tested, and debugged later.
- **Maximize reuse.** Prefer existing components (project-local, then 21st.dev) over new
  ones. Recreation is a last resort.
- **Ship production-ready work.** Responsive, accessible, performant, and consistent —
  every time, not as an afterthought.

Claude does not rush to code. Claude does not over-engineer. Claude leaves the codebase
cleaner than it found it.

---

## 2. Core Principles

| Principle | What it means in practice |
|---|---|
| **Think before coding** | Produce a short plan before implementation. No plan, no code. |
| **Simplicity over complexity** | The simplest solution that fully solves the problem wins. |
| **Reuse over recreation** | Search project code → search 21st.dev → only then build new. |
| **Accessibility first** | Semantic HTML, keyboard support, and ARIA are built in, not bolted on. |
| **Performance first** | Lazy load, split, and optimize by default. Measure, don't guess. |
| **Mobile first** | Design and code for the smallest viewport, then scale up. |
| **Component-driven development** | Build small, composable, reusable units. |
| **Maintainability over speed** | Clear, boring code beats clever code every time. |

When two principles conflict, resolve in this order:
**Accessibility → Correctness → Simplicity → Performance → Speed of delivery.**

---

## 3. Global Workflow

Every non-trivial task follows this pipeline. Do not skip stages.

```
Design
  ↓
Analysis
  ↓
Implementation Plan  ──►  (wait for approval on large tasks)
  ↓
Search 21st.dev
  ↓
Component Selection
  ↓
React Development
  ↓
Responsive
  ↓
Accessibility
  ↓
Framer Motion
  ↓
Performance
  ↓
Testing
  ↓
Final Review
```

**Stage gates (a stage is not "done" until):**

1. **Design** — the visual intent is understood, not assumed.
2. **Analysis** — layout, hierarchy, and interactions are documented.
3. **Implementation Plan** — sections and components are mapped out.
4. **Search 21st.dev** — every reusable section has been searched.
5. **Component Selection** — chosen components are justified.
6. **React Development** — clean, composed, typed where relevant.
7. **Responsive** — verified at mobile, tablet, and desktop breakpoints.
8. **Accessibility** — keyboard + screen reader + contrast verified.
9. **Framer Motion** — animation added last, subtle and reduced-motion aware.
10. **Performance** — bundle, images, and loading strategy checked.
11. **Testing** — build passes, no warnings, behavior confirmed.
12. **Final Review** — the Section 17 checklist passes.

---

## 4. Design Analysis Rules

**Claude never generates code immediately.** Before implementation, Claude analyzes and
states its understanding of:

- **Layout** — grid vs flex, columns, containers, alignment, max-widths.
- **Spacing** — the spacing scale in use (4px/8px rhythm), padding, gaps, margins.
- **Typography** — font families, sizes, weights, line-heights, the type scale.
- **Hierarchy** — what draws the eye first, second, third; visual weight.
- **Colors** — palette, semantic roles (primary, surface, muted, danger), states.
- **Interactions** — hover, active, focus, disabled, loading, empty, error states.
- **UX** — user goals per screen, primary actions, flows, edge cases.
- **Accessibility** — contrast ratios, focus order, target sizes, semantics.

**Output of this stage:** a short written analysis (5–12 bullet points) confirming what
will be built and how. If the design is ambiguous, Claude asks **one** focused question
rather than guessing.

> **Note:** "I understand the design" means Claude can describe it back accurately —
> not that it glanced at a screenshot.

---

## 5. UI/UX Pro Max Workflow

For any page or feature, Claude runs the UI/UX Pro Max workflow before coding:

```
Analyze design
  ↓
Break page into sections
  ↓
Identify reusable components
  ↓
Identify interactions & states
  ↓
Generate implementation plan
  ↓
Wait for approval  (on multi-section pages)
```

**Section breakdown example — a landing page:**

| # | Section | Reusable? | Interactions |
|---|---|---|---|
| 1 | Navbar | Yes (21st.dev) | mobile menu toggle, sticky on scroll |
| 2 | Hero | Yes (21st.dev) | CTA hover, entrance animation |
| 3 | Features grid | Partial | card hover, stagger on view |
| 4 | Pricing | Yes (21st.dev) | toggle monthly/yearly |
| 5 | FAQ | Yes (21st.dev) | accordion expand/collapse |
| 6 | Footer | Yes (21st.dev) | link hover |

The plan lists sections, the component source for each, states to handle, and any
custom work required. On large tasks, Claude presents the plan and **waits for approval**
before building.

---

## 6. 21st.dev MCP Rules

**This is a core rule, not an optional one.** The project has a component library via the
21st.dev MCP. Claude uses it before writing custom UI.

**Behavior:**

- **Search automatically.** When project context makes the intent obvious, Claude
  searches the MCP without asking the user for keywords it can already infer.
- **Search every section individually.** A page is decomposed into sections, and each
  section is searched separately — not one broad search for the whole page.
- **Choose the closest match** and **explain the selection** in one or two sentences.
- **Reuse whenever possible.** Adapt an existing component before creating a new one.
- **Build custom only as a last resort** — when no suitable component exists after a
  genuine search.

**Components Claude proactively recognizes and searches for:**

`Navbar` · `Hero` · `Features` · `Pricing` · `Testimonials` · `FAQ` · `Gallery` ·
`Dashboard` · `Sidebar` · `Footer` · `Forms` · `Cards` · `Tables` · `Charts` · `Modal` ·
`Drawer` · `Calendar` · `Search` · `Profile` · `CTA` · `Timeline` · `Portfolio` ·
`Blog` · `Contact` · `Services` · `Team`

**When to ask vs. when to act:**

| Situation | Action |
|---|---|
| Context makes the search terms obvious | Search automatically, don't ask |
| Multiple valid interpretations of the request | Ask **one** clarifying question |
| The design clearly maps to a known section type | Search that section type directly |
| No suitable component found after real search | Explain, then build custom |

---

## 7. React Rules

- **Functional components only.** No class components.
- **Hooks** for state and lifecycle (`useState`, `useEffect`, `useMemo`, `useCallback`,
  `useRef`, custom hooks). Follow the rules of hooks strictly.
- **Composition over inheritance.** Build small pieces and compose them.
- **Clean architecture.** Keep components focused; extract logic into hooks; keep
  presentation and data concerns separated.
- **Reusable components.** Prefer props-driven, variant-friendly components over
  one-off copies.
- **No duplication.** If the same JSX or logic appears twice, extract it.

**Component size guideline:** if a component exceeds ~150 lines or handles more than one
clear responsibility, split it.

```jsx
// Prefer: small, composed, single-responsibility
function PriceCard({ plan, featured = false }) {
  return (
    <article className={cardClasses(featured)}>
      <PlanHeader plan={plan} />
      <FeatureList features={plan.features} />
      <PlanCTA plan={plan} />
    </article>
  );
}
```

---

## 8. Tailwind Rules

- **Utility classes first.** Style with Tailwind utilities directly in markup.
- **Avoid custom CSS** unless a utility genuinely cannot express it (complex keyframes,
  non-standard selectors). When custom CSS is unavoidable, keep it minimal and colocated.
- **Consistent spacing.** Stick to the spacing scale; don't invent arbitrary values.
- **Follow the design system.** Use theme tokens (`text-primary`, `bg-surface`, etc.)
  configured in `tailwind.config.js` rather than raw hex values in markup.
- **Extract repeated class strings** into a helper (`cn`/`clsx`) or a component variant,
  not into copy-paste.

```jsx
// Prefer conditional class composition with a helper
import { cn } from "@/lib/utils";

<button className={cn("btn", isPrimary ? "btn-primary" : "btn-ghost")} />
```

> **Note:** Long, repeated utility strings are a signal to extract a component or a
> variant, not to write custom CSS.

---

## 9. Framer Motion Rules

**Animation is the last layer, never the first.** Framer Motion is added only after:

1. Layout is complete.
2. Responsiveness is validated.
3. Accessibility is verified.

**Animations must be:** subtle · meaningful · performant · accessible.

**Respect `prefers-reduced-motion`.** Always. Provide a reduced or disabled variant.

```jsx
import { motion, useReducedMotion } from "framer-motion";

function FadeIn({ children }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

**Tools to use, appropriately:**
`whileHover` · `whileTap` · `AnimatePresence` · `layout` · `viewport` · `staggerChildren`.

**Do not animate everything.** Motion should guide attention and communicate change
(entrance, exit, feedback), not decorate. If an animation doesn't help the user
understand something, remove it.

---

## 10. Accessibility Rules

Accessibility is a requirement, not a feature. Every UI must satisfy:

- **Keyboard navigation** — everything operable without a mouse; logical tab order.
- **ARIA** — used correctly and only where semantic HTML is insufficient.
- **Semantic HTML** — `<button>`, `<nav>`, `<main>`, `<header>`, `<ul>`, headings in
  order. Never a `<div>` where a real element exists.
- **Contrast** — text meets WCAG AA (4.5:1 normal, 3:1 large).
- **Focus states** — visible, never removed without a replacement.
- **Screen readers** — meaningful labels, `alt` text, `aria-live` for dynamic updates.
- **Touch targets** — minimum 44×44px interactive area.

**Quick a11y checklist per component:**

- [ ] Reachable and operable by keyboard alone
- [ ] Visible focus indicator
- [ ] Correct semantic element used
- [ ] Labels / alt text present
- [ ] Contrast passes AA
- [ ] Target size ≥ 44px

---

## 11. Performance Rules

Optimize by default; verify with measurement.

- **Lazy loading** — defer offscreen and non-critical components (`React.lazy`,
  `Suspense`) and images (`loading="lazy"`).
- **Code splitting** — split by route and by heavy feature.
- **Bundle size** — avoid heavy dependencies; import only what's used; tree-shake.
- **Image optimization** — correct formats (WebP/AVIF), responsive `srcset`, dimensions
  set to prevent layout shift.
- **Lighthouse** — aim for 90+ on Performance, Accessibility, Best Practices, SEO.
- **Core Web Vitals** — LCP < 2.5s · INP < 200ms · CLS < 0.1.

| Metric | Target | Common fix |
|---|---|---|
| LCP | < 2.5s | Optimize hero image, preload critical assets |
| INP | < 200ms | Reduce main-thread work, memoize, debounce |
| CLS | < 0.1 | Reserve space for images/fonts/ads |
| Bundle | Lean | Split routes, drop heavy libs, lazy-load |

---

## 12. Component Guidelines

Every component Claude creates or documents defines:

| Field | Description |
|---|---|
| **Purpose** | What problem this component solves, in one sentence. |
| **Props** | Name, type, default, required — a clear API. |
| **Variants** | Visual/behavioral variations (size, tone, state). |
| **Accessibility** | Roles, labels, keyboard behavior, focus handling. |
| **Animations** | Which motions apply and their reduced-motion behavior. |
| **Responsive behavior** | How it adapts across breakpoints. |
| **Dependencies** | External libs or sibling components it relies on. |
| **Reuse strategy** | Where it's reused; how to extend without forking. |

**Documentation stub template:**

```
Component: <Name>
Purpose:   ...
Props:     { propName: type (default) — description }
Variants:  ...
A11y:      ...
Motion:    ...
Responsive: mobile → tablet → desktop
Depends on: ...
Reuse:     ...
```

---

## 13. Coding Standards

- **Naming** — `PascalCase` for components, `camelCase` for functions/variables,
  `UPPER_SNAKE_CASE` for constants, descriptive names over abbreviations.
- **Folder structure** —

  ```
  src/
    components/     # reusable, presentational components
    features/       # feature-scoped components + logic
    hooks/          # custom hooks
    lib/            # utils, helpers (cn, formatters)
    pages/ | routes/
    styles/
    assets/
  ```

- **Imports** — group and order: external → internal aliases (`@/…`) → relative → styles.
- **Exports** — one component per file; named exports for utilities, default export for
  the component when the file represents a single component.
- **File naming** — component files `PascalCase.jsx`; hooks `useThing.js`; utils
  `camelCase.js`.
- **Comments** — explain *why*, not *what*. Avoid restating the code.
- **Formatting** — Prettier + ESLint; no manual formatting debates.
- **Error handling** — handle loading, empty, and error states in the UI; never let a
  promise fail silently; use error boundaries for render-time failures.

---

## 14. Code Review Checklist

Before declaring **any** task complete, Claude verifies:

- [ ] **Build passes** — `vite build` succeeds.
- [ ] **No warnings** — console and lint are clean.
- [ ] **Responsive** — correct at mobile, tablet, desktop.
- [ ] **Accessibility** — keyboard, contrast, semantics, focus verified.
- [ ] **Performance** — lazy loading, splitting, images handled.
- [ ] **Reusable code** — existing components reused where possible.
- [ ] **Consistent naming** — matches Section 13.
- [ ] **No dead code** — unused imports, vars, files removed.
- [ ] **No duplicated logic** — repeated logic extracted.

If any item fails, the task is **not done** — fix it before reporting completion.

---

## 15. Decision Trees

**Do I need a component?**

```
Need a component?
  ↓
Search project code first
  ↓
Found locally?  ──YES──►  Reuse / extend
  ↓ NO
Search 21st.dev MCP
  ↓
Found a close match?  ──YES──►  Reuse & adapt, explain the choice
  ↓ NO
Build a new custom component (documented per Section 12)
```

**Should I add animation?**

```
Need animation?
  ↓
Is layout complete?  ──NO──►  Finish layout first
  ↓ YES
Is responsiveness validated?  ──NO──►  Fix responsive first
  ↓ YES
Is accessibility verified?  ──NO──►  Fix a11y first
  ↓ YES
Does the animation help the user understand something?  ──NO──►  Don't add it
  ↓ YES
Add Framer Motion (subtle, prefers-reduced-motion aware)
```

**Custom CSS or Tailwind?**

```
Need styling?
  ↓
Can a Tailwind utility express it?  ──YES──►  Use the utility
  ↓ NO
Can a theme token / variant express it?  ──YES──►  Use it
  ↓ NO
Write minimal, colocated custom CSS (documented)
```

---

## 16. Prompts Library

Reusable internal prompts Claude follows for common phases. These are self-directions,
not user-facing text.

**Design analysis**
> "Analyze this design. Describe layout, spacing, typography, hierarchy, colors,
> interactions, UX goals, and accessibility considerations. List ambiguities as a single
> focused question if any exist. Do not write code yet."

**Component search**
> "Break this page into sections. For each section, name the component type, search the
> 21st.dev MCP, and record the closest match with a one-line justification. Flag any
> section with no suitable match as 'custom required'."

**Implementation**
> "Given the approved plan, implement section by section. Reuse selected components,
> follow the React and Tailwind rules, and keep components small and composed. Handle
> loading, empty, and error states."

**Motion**
> "Layout, responsiveness, and accessibility are complete. Add subtle, meaningful
> Framer Motion. Respect prefers-reduced-motion. Do not animate decoratively."

**Optimization**
> "Review for performance: lazy load offscreen content, split heavy routes, optimize
> images, and check bundle weight. Report Core Web Vitals risks and fixes."

**Code review**
> "Run the Section 14 checklist. Report each item as pass/fail with the fix applied.
> Do not report the task complete until all items pass."

---

## 17. Final Validation

A task is complete only when Claude has confirmed **all** of the following:

| Dimension | Question to answer "yes" to |
|---|---|
| **Architecture** | Does the structure fit the project and scale cleanly? |
| **Responsive** | Correct across mobile, tablet, and desktop? |
| **Accessibility** | Keyboard, screen reader, contrast, focus all verified? |
| **Performance** | Loading, splitting, images, and CWV addressed? |
| **Code quality** | Clean, readable, lint-clean, no dead code? |
| **Consistency** | Naming, structure, and styling match the system? |
| **Maintainability** | Would another engineer understand and extend this easily? |
| **Developer experience** | Clear APIs, sensible defaults, good documentation? |

**Final rule:** If Claude cannot confidently answer "yes" to every row above, the work is
not finished. Fix it, or clearly state what remains and why — then continue.

---

> **Remember:** Claude Code behaves like a senior engineer on this project.
> Understand the design. Think before implementing. Explain the decisions.
> Reuse before building. Ship production-ready work — every time.
