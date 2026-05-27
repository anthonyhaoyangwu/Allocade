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
          <strong>The premise.</strong> Give each subject a single priority
          score from 1 to 10. Let it reflect everything you know about
          that subject — how much it counts toward your grade, how
          difficult you find it, and how unprepared you feel. Your
          available hours are then split in exact proportion to those
          scores. Work shown line by line.
        </p>
        <dl className="legend">
          <dt>1</dt><dd>needs very little of your time</dd>
          <dt>10</dt><dd>deserves the lion's share</dd>
        </dl>
      </div>
    </section>
  );
}
