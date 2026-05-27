import Equation from './Equation.jsx';
import { fmt, escapeTex } from '../lib/format.js';

/**
 * Shows the Lagrangian formula applied to the user's actual numbers,
 * step by step.
 */
export default function AppliedWork({ result }) {
  const { subjects, sumA, totalHours: T } = result;

  return (
    <div className="work-shown">
      <div className="section-label" style={{ marginBottom: 8 }}>
        Part two — Applied
      </div>
      <h2 className="section-title" style={{ marginBottom: 36 }}>
        Plugged into your subjects
      </h2>

      {/* ---- Step 1 — priority rating becomes the weight ---- */}
      <Step num="i." title="Your priority rating is the weight">
        <p className="step-prose">
          For each subject the weight <em>aᵢ</em> is simply the priority score
          you gave it on the slider. A higher number means you judged this
          subject to need more of your time — whether because of its grade
          weight, its difficulty, or how unprepared you feel.
        </p>
        <div className="equations">
          {subjects.map((d, i) => (
            <div key={d.id} className="equation-line" style={{ animationDelay: `${0.15 + i * 0.12}s` }}>
              <Equation
                tex={`\\text{${escapeTex(d.name)}}: \\quad a_{${d.id}} = ${fmt(d.a, 0)}`}
              />
            </div>
          ))}
        </div>
      </Step>

      {/* ---- Step 2 — sum the weights ---- */}
      <Step
        num="ii."
        title="Add every weight together"
        delay={0.15 + subjects.length * 0.12 + 0.4}
      >
        <p className="step-prose">
          This grand total is the divisor — every subject's slice will be
          measured against it.
        </p>
        <div className="equations">
          <div className="equation-line" style={{ animationDelay: `${0.15 + subjects.length * 0.12 + 0.6}s` }}>
            <Equation
              tex={`\\sum_{i=1}^{${subjects.length}} a_i = ${subjects.map((d) => fmt(d.a, 0)).join(' + ')} = ${fmt(sumA, 0)}`}
            />
          </div>
        </div>
      </Step>

      {/* ---- Step 3 — apply the rule ---- */}
      <Step
        num="iii."
        title="Apply the optimal-allocation rule"
        delay={0.15 + subjects.length * 0.12 + 1.0}
      >
        <p className="step-prose">
          From the derivation above, each subject's fraction of total time is
          its weight divided by the grand total.
        </p>
        <div className="equations">
          <div className="equation-line boxed" style={{ animationDelay: `${0.15 + subjects.length * 0.12 + 1.2}s` }}>
            <Equation tex={'x_i^{*} \\;=\\; \\dfrac{a_i}{\\sum_j a_j}'} />
          </div>
          {subjects.map((d, i) => (
            <div
              key={d.id}
              className="equation-line"
              style={{ animationDelay: `${0.15 + subjects.length * 0.12 + 1.45 + i * 0.1}s` }}
            >
              <Equation
                tex={`x_{${d.id}} = \\dfrac{${fmt(d.a, 0)}}{${fmt(sumA, 0)}} = ${fmt(d.frac, 4)} \\quad (${fmt(d.frac * 100, 1)}\\%)`}
              />
            </div>
          ))}
        </div>
      </Step>

      {/* ---- Step 4 — multiply by T ---- */}
      <Step
        num="iv."
        title="Turn fractions into hours"
        delay={0.15 + subjects.length * 0.12 + 1.5 + subjects.length * 0.1 + 0.3}
      >
        <p className="step-prose">
          Multiply each fraction by the total time budget <em>T = {fmt(T, 2)}</em> hours.
        </p>
        <div className="equations">
          {subjects.map((d, i) => (
            <div
              key={d.id}
              className="equation-line"
              style={{ animationDelay: `${0.15 + subjects.length * 0.12 + 1.7 + subjects.length * 0.1 + 0.3 + i * 0.1}s` }}
            >
              <Equation
                tex={`\\text{${escapeTex(d.name)}}: \\quad ${fmt(d.frac, 4)} \\times ${fmt(T, 2)} = ${fmt(d.hours, 2)} \\text{ h}`}
              />
            </div>
          ))}
        </div>
      </Step>
    </div>
  );
}

function Step({ num, title, delay = 0, children }) {
  return (
    <div className="work-step" style={{ animationDelay: `${delay}s` }}>
      <div className="step-header">
        <span className="step-num">{num}</span>
        <h3 className="step-title">{title}</h3>
      </div>
      {children}
    </div>
  );
}
