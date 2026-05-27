import { useState } from 'react';
import Header from './components/Header.jsx';
import Intro from './components/Intro.jsx';
import InputSection from './components/InputSection.jsx';
import Results from './components/Results.jsx';
import { allocate } from './lib/optimization.js';

let _key = 0;
const nextKey = () => ++_key;

function makeSubject(name = '') {
  return { key: nextKey(), name, importance: 5 };
}

const INITIAL_SUBJECTS = [makeSubject('Mathematics'), makeSubject('History')];

export default function App() {
  const [subjects, setSubjects] = useState(INITIAL_SUBJECTS);
  const [totalHours, setTotalHours] = useState(5);
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const T = Number(totalHours);
    if (!T || T <= 0) return;
    setResult(allocate(subjects, T));
  };

  const handleReset = () => {
    setSubjects([makeSubject('Mathematics'), makeSubject('History')]);
    setTotalHours(5);
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateSubject = (i, patch) =>
    setSubjects((s) => s.map((sub, idx) => (idx === i ? { ...sub, ...patch } : sub)));

  const removeSubject = (i) =>
    setSubjects((s) => (s.length <= 1 ? s : s.filter((_, idx) => idx !== i)));

  const addSubject = (placeholder) =>
    setSubjects((s) => [...s, makeSubject(placeholder)]);

  return (
    <div className="container">
      <Header />
      <Intro />

      <InputSection
        subjects={subjects}
        totalHours={totalHours}
        onSubjectChange={updateSubject}
        onSubjectRemove={removeSubject}
        onSubjectAdd={addSubject}
        onTotalHoursChange={setTotalHours}
      />

      <div className="calculate-section">
        <button className="calculate-btn" type="button" onClick={handleCalculate}>
          Calculate time allocation
        </button>
      </div>

      <div id="results">
        {result && <Results key={result.totalHours + ':' + result.subjects.length + ':' + result.sumA} result={result} onReset={handleReset} />}
      </div>

      <footer>
        <span>Pen, paper, and a little calculus</span>
        <span className="signature">— Anthony's Calc E project, 2026</span>
      </footer>
    </div>
  );
}
