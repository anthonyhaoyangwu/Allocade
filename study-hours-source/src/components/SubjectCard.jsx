import { toSubscript } from '../lib/format.js';

const RATING_FIELDS = [
  { letter: 'W', name: 'weight',        role: 'numerator'   },
  { letter: 'D', name: 'difficulty',    role: 'numerator'   },
  { letter: 'C', name: 'confidence',    role: 'denominator' },
  { letter: 'U', name: 'understanding', role: 'denominator' }
];

export default function SubjectCard({ subject, index, onUpdate, onRemove, canRemove }) {
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
      <div className="ratings-grid">
        {RATING_FIELDS.map(({ letter, name, role }) => (
          <div key={letter} className="rating-field" data-role={role}>
            <div className="rating-label">
              <span className="rating-letter">{letter}</span>
              <span className="rating-name">{name}</span>
            </div>
            <input
              className={`rating-input rating-${letter}`}
              type="number"
              min="1"
              max="10"
              step="1"
              value={subject[letter]}
              onChange={(e) => onUpdate({ [letter]: e.target.value })}
            />
            <div className="rating-scale">scale of 1—10</div>
          </div>
        ))}
      </div>
    </div>
  );
}
