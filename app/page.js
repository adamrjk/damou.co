/*
  app/page.js = the homepage (/).
  In Next.js App Router, every folder inside `app/` becomes a URL route,
  and the file named `page.js` inside it is what gets rendered.

  So:
    app/page.js         → yourdomain.com/
    app/writing/page.js → yourdomain.com/writing
    app/now/page.js     → yourdomain.com/now

  No router config needed. The file structure IS the routes.
*/

import Link from 'next/link'
import { getPosts } from '../lib/posts'

/*
  This is a Server Component — the default in Next.js App Router.
  It runs on the server at build time (or request time), not in the browser.
  That means it can do things like read files directly, which we use to
  fetch recent blog posts.
*/
export default async function Home() {
  /*
    `async/await` lets us do asynchronous work (like reading files) without
    blocking. The `await` pauses execution until getPosts() is done,
    then continues. This pattern is common in JS since I/O is async.
  */
  const posts = await getPosts()
  const recentPosts = posts.slice(0, 3)

  return (
    <div>
      {/* --- Intro --- */}
      <section style={{ marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '0.75rem', marginTop: 0 }}>
          Adam Kabbaj
        </h1>
        <p style={{ color: 'var(--muted)', maxWidth: '30rem', marginTop: 0 }}>
          Student at EPFL. Building things, writing about what I learn.
          Made <a href="https://youtu.be" target="_blank" rel="noopener noreferrer">videos</a>,
          shipped <Link href="/projects">apps</Link>, thinking about what comes next.
        </p>
      </section>

      {/* --- Recent writing --- */}
      {recentPosts.length > 0 && (
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: '1.5rem', marginTop: 0 }}>
            Recent writing
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/*
              For each post, we render a row with the date and title.
              Notice we destructure the post object in the parameter: { slug, title, date }
              That's the same as writing (post) => ... post.slug, post.title, post.date
              Just shorter.
            */}
            {recentPosts.map(({ slug, title, date }) => (
              <div key={slug} style={{ display: 'flex', gap: '1.5rem', alignItems: 'baseline' }}>
                <span style={{ color: 'var(--muted)', flexShrink: 0, fontSize: '0.8rem' }}>
                  {formatDate(date)}
                </span>
                <Link href={`/writing/${slug}`} style={{ textDecoration: 'none' }}>
                  {title}
                </Link>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <Link href="/writing" style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
              all posts →
            </Link>
          </div>
        </section>
      )}

      {/* --- Quick links --- */}
      <section>
        <h2 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: '1.5rem', marginTop: 0 }}>
          Elsewhere
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            { label: 'YouTube', href: 'https://youtube.com' },
            { label: 'GitHub', href: 'https://github.com' },
            { label: 'X / Twitter', href: 'https://x.com' },
          ].map(({ label, href }) => (
            <div key={label} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <span style={{ color: 'var(--muted)', fontSize: '0.8rem', width: '5rem', flexShrink: 0 }}>
                {label.toLowerCase()}
              </span>
              <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem' }}>
                {href.replace('https://', '')}
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

/*
  Helper function — lives in this file because only this component uses it.
  If multiple pages needed it, we'd move it to lib/utils.js.

  Intl.DateTimeFormat is the browser/Node standard for formatting dates.
  It's locale-aware and handles edge cases better than doing it manually.
*/
function formatDate(dateStr) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateStr))
}
