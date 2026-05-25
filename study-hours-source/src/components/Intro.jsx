export default function Intro() {
  return (
    <section className="intro">
      <p className="lede">
        Suppose you are given a fixed budget of hours, several subjects
        clamouring for them, and only the honest goal of doing as well as
        possible across the board.{' '}
        <span className="pull">How ought you divide your time?</span>
      </p>
      <div className="abstract">
        <p>
          <strong>The premise.</strong> Rate every subject on four axes from 1
          to 10. The two on top — <em>W</em> and <em>D</em> — pull time toward
          a subject; the two on the bottom — <em>C</em> and <em>U</em> — push
          time away. The weight is <em>a&nbsp;=&nbsp;WD&nbsp;/&nbsp;CU</em>,
          and your total hours are split in proportion. Work shown line by
          line.
        </p>
        <dl className="legend">
          <dt>W</dt><dd>assessment weight</dd>
          <dt>D</dt><dd>difficulty</dd>
          <dt>C</dt><dd>confidence</dd>
          <dt>U</dt><dd>understanding</dd>
        </dl>
      </div>
    </section>
  );
}
