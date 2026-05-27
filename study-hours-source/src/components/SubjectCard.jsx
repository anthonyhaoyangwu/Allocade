import { toSubscript } from '../lib/format.js';

export default function SubjectCard({ subject, index, onUpdate, onRemove, canRemove }) {
  const v = subject.importance;

  return (
    <div className="subject-card entering">
      <div className="subject-header">
        <span className="subject-tag">x{toSubscript(index + 1)}</span>
        <input
          className="subject-name-input"
          type="text"
          value={subject.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          placeholder="Name your subject"
        />
        <button
          className="remove-btn"
          type="button"
          aria-label="Remove subject"
          title={canRemove ? 'Remove' : 'Need at least one subject'}
          onClick={onRemove}
        >
          ×
        </button>
      </div>

      <div className="importance-section">
        <div className="importance-header">
          <span className="importance-label">Priority</span>
          <span className="importance-value">{v}</span>
          <span className="importance-out-of">/ 10</span>
        </div>

        <input
          type="range"
          className="importance-slider"
          style={{ '--v': v }}
          min="1"
          max="10"
          step="1"
          value={v}
          onChange={(e) => onUpdate({ importance: Number(e.target.value) })}
        />

        <div className="importance-ticks">
          {Array.from({ length: 10 }, (_, i) => (
            <span
              key={i + 1}
              className={`importance-tick${v === i + 1 ? ' active' : ''}`}
            >
              {i + 1}
            </span>
          ))}
        </div>

        <p className="importance-hints">
          Consider: <em>how much this subject counts toward your grade</em>,{' '}
          <em>how difficult you find it</em>, and{' '}
          <em>how unprepared you feel</em>.
        </p>
      </div>
    </div>
  );
}
