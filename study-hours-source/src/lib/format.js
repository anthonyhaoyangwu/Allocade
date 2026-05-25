/**
 * Pretty-format a number with up to `d` decimal places, trimming trailing zeros.
 */
export function fmt(x, d = 2) {
  const s = Number(x).toFixed(d);
  return s.replace(/\.?0+$/, '') || '0';
}

/**
 * Escape characters that have special meaning in TeX so user-typed subject
 * names don't blow up KaTeX rendering.
 */
export function escapeTex(s) {
  return String(s).replace(/[\\#$%&_{}^~]/g, '\\$&');
}

/**
 * Roman-numeral converter for small positive integers (1–20).
 */
export function roman(n) {
  const map = [
    '', 'i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x',
    'xi', 'xii', 'xiii', 'xiv', 'xv', 'xvi', 'xvii', 'xviii', 'xix', 'xx'
  ];
  return map[n] || String(n);
}

/**
 * Convert decimal hours to an "H hr MM min" string (or "MM min" when < 1h).
 */
export function hoursToHuman(decimalHours) {
  const mins = Math.round(decimalHours * 60);
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h} hr ${String(m).padStart(2, '0')} min` : `${m} min`;
}

/**
 * Unicode subscript digits for nice variable labels (x₁, x₂, …).
 */
export function toSubscript(n) {
  const subs = ['₀','₁','₂','₃','₄','₅','₆','₇','₈','₉'];
  return String(n).split('').map((d) => subs[+d]).join('');
}
