import { fmt, roman, hoursToHuman } from '../lib/format.js';

export default function Schedule({ result, onReset }) {
  const { subjects, totalHours: T } = result;
  const sorted = [...subjects].sort((a, b) => b.hours - a.hours);
  const maxHours = Math.max(...sorted.map((s) => s.hours));

  return (
    <div className="schedule-section" style={{ marginTop: 0 }}>
      <div className="schedule-header">
        <div className="schedule-actions">
          <button className="reset-btn" type="button" onClick={onReset}>
            <span className="arrow">↻</span> Reset
          </button>
        </div>
        <div className="schedule-eyebrow">The answer</div>
        <h2 className="schedule-title">Your schedule</h2>
        <div className="schedule-total">
          Total · {fmt(T, 2)} hours across {subjects.length} subject
          {subjects.length === 1 ? '' : 's'}
        </div>
      </div>
      <div className="schedule-list">
        {sorted.map((d, i) => {
          const rowDelay = 0.3 + i * 0.12;
          const fillPct = maxHours > 0 ? (d.hours / maxHours) * 100 : 0;
          return (
            <div
              key={d.id}
              className="schedule-row"
              style={{ animationDelay: `${rowDelay}s` }}
            >
              <span className="schedule-row-num">{roman(i + 1)}</span>
              <div>
                <div className="schedule-row-name">{d.name}</div>
                <div className="schedule-row-meta">
                  weight a = {fmt(d.a, 3)} · {fmt(d.frac * 100, 1)}% of total
                </div>
              </div>
              <div className="schedule-bar">
                <div
                  className="schedule-bar-fill"
                  style={{
                    '--fill-end': `${100 - fillPct}%`,
                    animationDelay: `${rowDelay + 0.2}s`
                  }}
                />
              </div>
              <div className="schedule-row-hours">
                <div className="num">{fmt(d.hours, 2)}</div>
                <div className="unit">hours</div>
                <div className="schedule-row-time">{hoursToHuman(d.hours)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
