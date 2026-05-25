// =============================================================================
//  Lagrangian Optimization — the heart of Study Hours
// =============================================================================
//
//  Given N subjects, each with four 1–10 ratings:
//      W = assessment weight     (numerator — pulls time toward subject)
//      D = difficulty            (numerator — pulls time toward subject)
//      C = confidence            (denominator — pushes time away)
//      U = understanding         (denominator — pushes time away)
//
//  Each subject's weight is        aᵢ = (Wᵢ · Dᵢ) / (Cᵢ · Uᵢ)
//
//  We maximise total log-benefit subject to the budget constraint:
//
//      maximize   Z = Σ aᵢ · ln(xᵢ)
//      subject to Σ xᵢ = 1
//
//  Lagrangian:
//
//      ℒ = Σ aᵢ · ln(xᵢ) − λ ( Σ xᵢ − 1 )
//
//  ∂ℒ/∂xᵢ = aᵢ/xᵢ − λ = 0    ⟹    xᵢ = aᵢ / λ
//  Summing and applying the constraint:    λ = Σ aⱼ
//
//      ┌───────────────────────────────┐
//      │   xᵢ* = aᵢ / Σⱼ aⱼ            │
//      └───────────────────────────────┘
//
//  Hours allocated to subject i = xᵢ* · T, where T is the total time budget.
// =============================================================================

/**
 * Clamp a rating to the integer interval [1, 10].
 */
export function clampRating(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return 1;
  return Math.max(1, Math.min(10, Math.round(n)));
}

/**
 * Compute the raw weight for a single subject:  a = (W · D) / (C · U)
 */
export function computeWeight({ W, D, C, U }) {
  return (W * D) / (C * U);
}

/**
 * Run the full Lagrangian allocation.
 *
 * @param {Array<{name:string, W:number, D:number, C:number, U:number}>} subjects
 * @param {number} totalHours  T, the time budget
 * @returns {{
 *   subjects: Array<{ id, name, W, D, C, U, a, frac, hours }>,
 *   sumA: number,
 *   totalHours: number
 * }}
 */
export function allocate(subjects, totalHours) {
  const enriched = subjects.map((s, idx) => {
    const W = clampRating(s.W);
    const D = clampRating(s.D);
    const C = clampRating(s.C);
    const U = clampRating(s.U);
    const a = computeWeight({ W, D, C, U });
    return {
      id: idx + 1,
      name: s.name?.trim() || `Subject ${idx + 1}`,
      W, D, C, U, a
    };
  });

  const sumA = enriched.reduce((acc, s) => acc + s.a, 0);

  enriched.forEach((s) => {
    s.frac = sumA > 0 ? s.a / sumA : 0;
    s.hours = s.frac * totalHours;
  });

  return { subjects: enriched, sumA, totalHours };
}
