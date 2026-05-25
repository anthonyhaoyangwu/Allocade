# Study Hours

A study-time allocation planner built around a Lagrangian optimisation
problem. Rate every subject on four 1–10 axes — assessment **W**eight,
**D**ifficulty, **C**onfidence, **U**nderstanding — and the app divides your
total available hours in proportion to a weight `aᵢ = (Wᵢ·Dᵢ)/(Cᵢ·Uᵢ)`.

The closed-form result, `xᵢ* = aᵢ / Σⱼ aⱼ`, is derived from a Lagrange
multiplier on the budget constraint `Σ xᵢ = 1`. The app shows the full
derivation and the applied work, line by line, in KaTeX.

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (typically [http://localhost:5173](http://localhost:5173)).

To build a production bundle:

```bash
npm run build      # outputs to dist/
npm run preview    # serves the production build locally
```

## Folder structure

```
study-hours/
├── index.html               # Vite entry — mounts <App /> into #root
├── package.json             # dependencies + scripts
├── vite.config.js           # Vite + @vitejs/plugin-react
├── .gitignore
├── README.md
└── src/
    ├── main.jsx             # ReactDOM root, imports KaTeX CSS + styles.css
    ├── App.jsx              # top-level state: subjects, totalHours, result
    ├── styles.css           # all visual styles (newspaper aesthetic)
    │
    ├── lib/
    │   ├── optimization.js  # ★ Lagrangian formula lives here ★
    │   └── format.js        # number/text helpers (fmt, roman, hoursToHuman…)
    │
    └── components/
        ├── Header.jsx       # masthead
        ├── Intro.jsx        # lede + abstract
        ├── InputSection.jsx # subject list + total-hours input
        ├── SubjectCard.jsx  # one card with W/D/C/U inputs
        ├── Equation.jsx     # KaTeX renderer
        ├── Results.jsx      # composes Schedule + Derivation + AppliedWork
        ├── Schedule.jsx     # the final allocated hours
        ├── Derivation.jsx   # the math, generically (no user numbers)
        └── AppliedWork.jsx  # the math, with the user's numbers substituted
```

## Where the Lagrangian formula lives

The math is isolated from the UI in **`src/lib/optimization.js`**.

- `computeWeight({ W, D, C, U })` — returns the raw subject weight
  `aᵢ = (W·D)/(C·U)`.
- `allocate(subjects, totalHours)` — runs the full closed-form Lagrangian:
  computes each `aᵢ`, sums them, divides through to get each `xᵢ*`, and
  multiplies by the total time budget `T` to return hours per subject.
- The file's header comment contains the full derivation, including the
  Lagrangian `ℒ = Σ aᵢ·ln(xᵢ) − λ(Σ xᵢ − 1)`, the first-order conditions,
  and the elimination of `λ`.

If you want to swap in a different objective (e.g. a power utility instead of
`ln`), `optimization.js` is the only file you need to touch — the components
just consume `allocate()`'s return shape.

The prose / TeX walk-through that appears on screen lives in
`src/components/Derivation.jsx` (generic form) and
`src/components/AppliedWork.jsx` (with the user's numbers plugged in).

## Tech

- React 18
- Vite 5
- KaTeX for equation rendering
- Cormorant Garamond + Inter + JetBrains Mono via Google Fonts
  (loaded in `index.html`)

No state management library, no routing, no backend — this is a single-page
calculator that holds everything in component state.
