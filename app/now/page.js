/*
  The /now page — popularized by Derek Sivers (sive.rs/now).
  It's a "what I'm focused on right now" snapshot, updated every month or two.
  More alive than a bio, less ephemeral than social media.

  This page has no dynamic data — it's just hardcoded content you update manually.
  For something this simple, that's the right approach. No database needed.
*/

export const metadata = {
  title: 'Now',
  description: 'What I\'m up to right now.',
}

export default function NowPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 600, margin: 0 }}>
          Now
        </h1>
        {/* Last updated date — change this whenever you update the page */}
        <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>
          Updated April 2025
        </span>
      </div>

      <div className="prose">
        <h2>School</h2>
        <p>
          Finishing up my semester at EPFL. Studying computer science,
          spending most of my time on algorithms and systems courses.
          Starting at Imperial College London in the fall.
        </p>

        <h2>Building</h2>
        <p>
          Working on BetterSelf — habit tracking and daily reflection for iOS.
          Also building this website, partly to practice React and partly
          because I want a place to write.
        </p>

        <h2>Reading</h2>
        <p>
          <em>The Pragmatic Programmer</em> — slowly.
          Taking notes, trying to apply things immediately instead of
          just collecting highlights.
        </p>

        <h2>Thinking about</h2>
        <p>
          What kind of work I want to be doing in five years. Leaning toward
          building products rather than purely engineering. Trying to figure
          out what that path looks like from here.
        </p>

        <hr />

        <p>
          This is a <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer">/now page</a>.
          If you have your own site, you should have one too.
        </p>
      </div>
    </div>
  )
}
