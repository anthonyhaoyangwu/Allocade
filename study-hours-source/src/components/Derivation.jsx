import Equation from './Equation.jsx';

/**
 * The derivation that produces  xᵢ* = aᵢ / Σⱼ aⱼ.
 * Pure presentation — the actual math lives in src/lib/optimization.js.
 */
export default function Derivation() {
  let dt = 0.1;
  const bump = (extra) => { dt += extra; return dt; };

  return (
    <div className="derivation">
      <div className="section-label" style={{ marginBottom: 8, color: 'var(--teal)' }}>
        Part one — The derivation
      </div>
      <h2 className="section-title" style={{ marginBottom: 28 }}>
        Where the formula comes from
      </h2>
      <p className="derivation-intro">
        Before plugging your numbers in, here is the calculus that produced the
        rule <em>xᵢ = aᵢ / Σaⱼ</em>. It starts from the two-subject case,
        generalises to <em>N</em> subjects, and uses a Lagrange multiplier to
        land on a single clean expression.
      </p>

      <Step
        label="The initial logarithmic model"
        prose={<>Treat <em>t</em> as hours on subject one and <em>T − t</em> as hours on subject two. Logarithms capture diminishing returns: the first hour helps more than the fifth.</>}
        equations={[
          { tex: 'Z(t) \\;=\\; a\\ln(t) \\;+\\; b\\ln(T - t)', display: true }
        ]}
        bump={bump}
      />

      <Step
        label="Generalisation to N subjects"
        prose={<>Let <em>xᵢ</em> be the fraction of total time on subject <em>i</em>, with weights <em>aᵢ</em>. Maximise total benefit subject to the constraint that the fractions sum to one.</>}
        equations={[
          { tex: '\\text{Maximize } \\;\\; Z \\;=\\; \\sum_{i=1}^{N} a_i \\ln(x_i)', display: true },
          { tex: '\\text{subject to } \\;\\; \\sum_{i=1}^{N} x_i \\;=\\; 1', display: true }
        ]}
        bump={bump}
      />

      <Step
        label="Applying the Lagrangian"
        prose={<>Fold the constraint into the objective with a multiplier <em>λ</em>. Now we can maximise without thinking about the constraint separately.</>}
        equations={[
          { tex: '\\mathcal{L}(x_1, \\dots, x_N, \\lambda) \\;=\\; \\sum_{i=1}^{N} a_i \\ln(x_i) \\;-\\; \\lambda\\!\\left(\\sum_{i=1}^{N} x_i - 1\\right)', display: true }
        ]}
        bump={bump}
      />

      <Step
        label="Taking the partial derivative to solve for x"
        prose={<>Take the partial derivative with respect to each <em>xᵢ</em> and set it equal to zero.</>}
        equations={[
          { tex: '\\dfrac{\\partial \\mathcal{L}}{\\partial x_i} \\;=\\; \\dfrac{a_i}{x_i} \\;-\\; \\lambda \\;=\\; 0', display: true },
          { type: 'arrow', text: '⟹' },
          { tex: 'x_i \\;=\\; \\dfrac{a_i}{\\lambda}', display: true }
        ]}
        bump={bump}
      />

      <Step
        label="Elimination λ using the constraint"
        prose={<>Sum both sides over all <em>i</em>. The left side is the constraint itself, so it equals one.</>}
        equations={[
          { tex: '\\sum_{i=1}^{N} x_i \\;=\\; \\sum_{i=1}^{N} \\dfrac{a_i}{\\lambda} \\;=\\; \\dfrac{1}{\\lambda} \\sum_{i=1}^{N} a_i', display: true },
          { type: 'arrow', text: '↓   the constraint says ∑ xᵢ = 1' },
          { tex: '1 \\;=\\; \\dfrac{\\sum_i a_i}{\\lambda} \\quad\\Longrightarrow\\quad \\lambda \\;=\\; \\sum_{i=1}^{N} a_i', display: true }
        ]}
        bump={bump}
      />

      <div className="deriv-conclusion" style={{ animationDelay: `${bump(0.5)}s` }}>
        <div className="deriv-label">The result</div>
        <p className="deriv-prose" style={{ marginBottom: 12 }}>
          Substitute λ back into <em>xᵢ = aᵢ ⁄ λ</em> and the optimal
          allocation falls out:
        </p>
        <div className="deriv-equation display" style={{ animationDelay: `${bump(0.3)}s` }}>
          <Equation tex="x_i^{*} \;=\; \dfrac{a_i}{\sum_{j=1}^{N} a_j}" />
        </div>
      </div>

      <div className="derivation-step" style={{ animationDelay: `${bump(0.4)}s`, marginTop: 20 }}>
        <p className="deriv-prose" style={{ marginBottom: 0, fontStyle: 'italic', color: 'var(--ink-faded)' }}>
          Each subject gets a fraction of total time proportional to its
          weight. Now we apply this to your numbers.
        </p>
      </div>
    </div>
  );
}

function Step({ label, prose, equations, bump }) {
  return (
    <div className="derivation-step" style={{ animationDelay: `${bump(0.3)}s` }}>
      <div className="deriv-label">{label}</div>
      {prose && <p className="deriv-prose">{prose}</p>}
      <div className="deriv-eqs">
        {equations.map((eq, i) => {
          if (eq.type === 'arrow') {
            return (
              <div key={i} className="deriv-arrow" style={{ animationDelay: `${bump(0.2)}s` }}>
                {eq.text || '↓'}
              </div>
            );
          }
          return (
            <div
              key={i}
              className={`deriv-equation${eq.display ? ' display' : ''}`}
              style={{ animationDelay: `${bump(0.2)}s` }}
            >
              <Equation tex={eq.tex} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
