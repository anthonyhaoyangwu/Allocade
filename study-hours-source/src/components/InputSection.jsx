import SubjectCard from './SubjectCard.jsx';

const PLACEHOLDERS = [
  'Mathematics', 'History', 'Spanish', 'Biology',
  'English', 'Physics', 'Chemistry', 'Economics'
];

export default function InputSection({
  subjects,
  totalHours,
  onSubjectChange,
  onSubjectRemove,
  onSubjectAdd,
  onTotalHoursChange
}) {
  const handleAdd = () => {
    const n = subjects.length;
    onSubjectAdd(PLACEHOLDERS[n] || `Subject ${n + 1}`);
  };

  return (
    <section className="input-section">
      <div className="section-label">Part one — Inputs</div>
      <h2 className="section-title">Your subjects</h2>

      <div className="subjects-list">
        {subjects.map((subject, i) => (
          <SubjectCard
            key={subject.key}
            subject={subject}
            index={i}
            canRemove={subjects.length > 1}
            onUpdate={(patch) => onSubjectChange(i, patch)}
            onRemove={() => onSubjectRemove(i)}
          />
        ))}
      </div>

      <div className="controls-row">
        <button className="add-subject-btn" type="button" onClick={handleAdd}>
          <span className="plus">+</span> Add another subject
        </button>
        <div className="hours-input-group">
          <span className="hours-label">I have</span>
          <input
            className="hours-input"
            type="number"
            value={totalHours}
            min="0.25"
            step="0.25"
            onChange={(e) => onTotalHoursChange(e.target.value)}
          />
          <span className="hours-suffix">hours to study</span>
        </div>
      </div>
    </section>
  );
}
