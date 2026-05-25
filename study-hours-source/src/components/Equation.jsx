import { useEffect, useRef } from 'react';
import katex from 'katex';

/**
 * Renders a single TeX expression. `displayMode` is intentionally false — the
 * surrounding CSS handles centering / block layout via .deriv-equation.display.
 */
export default function Equation({ tex, className = '', style }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    try {
      katex.render(tex, ref.current, { throwOnError: false, displayMode: false });
    } catch {
      ref.current.textContent = tex;
    }
  }, [tex]);

  return <span ref={ref} className={className} style={style} />;
}
