// =============================================================================
//  Lagrangian Optimization — the heart of Study Hours
// =============================================================================
//
//  Given N subjects, each with a single 1–10 priority rating:
//      importance  (the user's holistic judgement of how much attention
//                   this subject needs — considering grade weight, difficulty,
//                   and how unprepared they feel)
//
//  Each subject's weight is simply        aᵢ = importanceᵢ
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
 * Run the full Lagrangian allocation.
 *
 * @param {Array<{name:string, importance:number}>} subjects
 * @param {number} totalHours  T, the time budget
 * @returns {{
 *   subjects: Array<{ id, name, importance, a, frac, hours }>,
 *   sumA: number,
 *   totalHours: number
 * }}
 */
export function allocate(subjects, totalHours) {
  const enriched = subjects.map((s, idx) => {
    const importance = clampRating(s.importance);
    return {
      id: idx + 1,
      name: s.name?.trim() || `Subject ${idx + 1}`,
      importance,
      a: importance,
    };
  });

  const sumA = enriched.reduce((acc, s) => acc + s.a, 0);

  enriched.forEach((s) => {
    s.frac = sumA > 0 ? s.a / sumA : 0;
    s.hours = s.frac * totalHours;
  });

  return { subjects: enriched, sumA, totalHours };
}
