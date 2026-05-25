import { useEffect, useRef } from 'react';
import Schedule from './Schedule.jsx';
import Derivation from './Derivation.jsx';
import AppliedWork from './AppliedWork.jsx';

export default function Results({ result, onReset }) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (rootRef.current) {
      rootRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [result]);

  return (
    <div ref={rootRef} className="results-visible">
      <Schedule result={result} onReset={onReset} />

      <div className="math-divider" style={{ animationDelay: '0.6s' }}>
        <div className="math-divider-line" />
        <span className="math-divider-ornament">∫</span>
        <span className="math-divider-title">The math explained</span>
        <span className="math-divider-ornament">∂</span>
        <div className="math-divider-line" />
      </div>

      <Derivation />
      <AppliedWork result={result} />
    </div>
  );
}
