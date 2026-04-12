/*
  The writing index page — lists all posts.
  URL: /writing
*/

import Link from 'next/link'
import { getPosts } from '../../lib/posts'

/*
  metadata can be exported from any page.js to set the tab title/description
  for that specific page. The template from layout.js applies:
  "Writing — Adam Kabbaj"
*/
export const metadata = {
  title: 'Writing',
  description: 'Posts on things I\'m building, reading, and thinking about.',
}

export default async function WritingPage() {
  const posts = await getPosts()

  return (
    <div>
      <h1 style={{ fontSize: '1.4rem', fontWeight: 600, marginTop: 0, marginBottom: '0.5rem' }}>
        Writing
      </h1>
      <p style={{ color: 'var(--muted)', marginBottom: '3rem', marginTop: 0 }}>
        {posts.length} {posts.length === 1 ? 'post' : 'posts'}
      </p>

      {posts.length === 0 ? (
        <p style={{ color: 'var(--muted)' }}>Nothing published yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/*
            We group posts by year so the list has structure.
            This uses .reduce() — one of the more powerful array methods.

            .reduce(callback, initialValue) iterates over the array and
            "accumulates" a result. Here we're building an object where
            each key is a year and the value is an array of that year's posts.

            e.g. { "2025": [...posts], "2024": [...posts] }
          */}
          {Object.entries(
            posts.reduce((groups, post) => {
              const year = new Date(post.date).getFullYear()
              if (!groups[year]) groups[year] = []
              groups[year].push(post)
              return groups
            }, {})
          )
            /* Sort years descending (newest year first) */
            .sort(([a], [b]) => Number(b) - Number(a))
            .map(([year, yearPosts]) => (
              <div key={year}>
                {/* Year heading */}
                <div style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--muted)',
                  marginBottom: '1rem',
                }}>
                  {year}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {yearPosts.map((post) => (
                    <div key={post.slug} style={{ display: 'grid', gridTemplateColumns: '6rem 1fr', gap: '1rem', alignItems: 'start' }}>
                      {/* Date */}
                      <span style={{ color: 'var(--muted)', fontSize: '0.8rem', paddingTop: '0.1rem' }}>
                        {formatShortDate(post.date)}
                      </span>

                      {/* Title + description */}
                      <div>
                        <Link href={`/writing/${post.slug}`} style={{ textDecoration: 'none', fontWeight: 500 }}>
                          {post.title}
                        </Link>
                        {post.description && (
                          <p style={{ color: 'var(--muted)', margin: '0.2rem 0 0', fontSize: '0.85rem' }}>
                            {post.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

function formatShortDate(dateStr) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateStr))
}
