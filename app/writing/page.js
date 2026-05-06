/*
  /writing — list of all posts, grouped by year.
*/

import Link from 'next/link'
import { getPosts } from '../../lib/posts'
import Reveal from '../../components/Reveal'

export const metadata = {
  title: 'Writing',
  description: "Posts on things I'm building, reading, and thinking about.",
}

export default async function WritingPage() {
  const posts = await getPosts()

  return (
    <div className="mx-auto max-w-3xl px-6 pt-24 sm:pt-32 pb-20">
      {/* Page header */}
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-muted)] mb-6">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </p>
      </Reveal>

      <Reveal delay={80}>
        <h1 className="text-5xl sm:text-6xl font-semibold tracking-[-0.025em] leading-[1] mb-16">
          Writing.
        </h1>
      </Reveal>

      {posts.length === 0 ? (
        <Reveal>
          <p className="text-[var(--color-muted)]">Nothing published yet.</p>
        </Reveal>
      ) : (
        <div className="flex flex-col gap-14">
          {/*
            Group posts by year, then sort years descending.
            .reduce() builds an object like { "2025": [...], "2024": [...] }.
          */}
          {Object.entries(
            posts.reduce((groups, post) => {
              const year = new Date(post.date).getFullYear()
              if (!groups[year]) groups[year] = []
              groups[year].push(post)
              return groups
            }, {})
          )
            .sort(([a], [b]) => Number(b) - Number(a))
            .map(([year, yearPosts]) => (
              <Reveal key={year}>
                <section>
                  <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-subtle)] mb-4">
                    {year}
                  </div>

                  <div className="border-t border-[var(--color-border)]">
                    {yearPosts.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/writing/${post.slug}`}
                        className="group grid grid-cols-[5rem_1fr] gap-6 py-5 border-b border-[var(--color-border)] hover:bg-[var(--color-purple-soft)]/40 transition-colors -mx-4 px-4 rounded-md"
                      >
                        <span className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-subtle)] pt-1">
                          {formatShortDate(post.date)}
                        </span>
                        <div>
                          <h2 className="text-lg font-medium tracking-tight group-hover:text-[var(--color-purple)] transition-colors">
                            {post.title}
                          </h2>
                          {post.description && (
                            <p className="mt-1 text-sm text-[var(--color-muted)]">
                              {post.description}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              </Reveal>
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
