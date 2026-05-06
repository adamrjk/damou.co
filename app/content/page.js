/*
  /content — the unified feed.
  Posts come from content/posts/*.md (manual).
  Videos come from your YouTube channel RSS (auto, refreshed every 30 min).
*/

import Link from 'next/link'
import { getContent } from '../../lib/content'
import Reveal from '../../components/Reveal'

/*
  Incremental Static Regeneration. Next.js will rebuild this page in the
  background every 30 minutes, so new YouTube uploads appear automatically
  on damou.co — no push needed.
*/
export const revalidate = 1800

export const metadata = {
  title: 'Content',
  description: 'Recent posts and videos.',
}

export default async function ContentPage() {
  const items = await getContent()

  return (
    <div className="mx-auto max-w-3xl px-6 pt-24 sm:pt-32 pb-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-muted)] mb-6">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </p>
      </Reveal>

      <Reveal delay={80}>
        <h1 className="text-5xl sm:text-6xl font-semibold tracking-[-0.025em] leading-[1] mb-16">
          Content.
        </h1>
      </Reveal>

      {items.length === 0 ? (
        <Reveal>
          <p className="text-[var(--color-muted)]">Nothing yet.</p>
        </Reveal>
      ) : (
        <div className="border-t border-[var(--color-border)]">
          {items.map((item, i) => (
            <Reveal key={item.key} delay={Math.min(i * 50, 400)}>
              <ContentRow item={item} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}

function ContentRow({ item }) {
  const className =
    'group flex items-start gap-5 py-5 border-b border-[var(--color-border)] hover:bg-[var(--color-purple-soft)]/40 transition-colors -mx-4 px-4 rounded-md'

  const inner = (
    <>
      {/* Thumbnail (videos only) */}
      {item.type === 'video' && item.thumbnail && (
        <div className="flex-shrink-0 w-32 sm:w-40 aspect-video overflow-hidden rounded-lg bg-[var(--color-border)]">
          <img
            src={item.thumbnail}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex-1 min-w-0 self-center">
        <div className="flex items-center justify-between gap-3 mb-1.5">
          <span
            className={`font-mono text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border ${
              item.type === 'video'
                ? 'border-[var(--color-purple)] text-[var(--color-purple)]'
                : 'border-[var(--color-border-strong)] text-[var(--color-muted)]'
            }`}
          >
            {item.type === 'video' ? 'Video' : 'Post'}
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-subtle)] flex-shrink-0">
            {formatShortDate(item.date)}
          </span>
        </div>
        <h2 className="text-lg font-medium tracking-tight group-hover:text-[var(--color-purple)] transition-colors">
          {item.title}
          {item.external && (
            <span className="ml-1.5 text-[var(--color-subtle)] group-hover:text-[var(--color-purple)]">
              ↗
            </span>
          )}
        </h2>
        {item.description && (
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            {item.description}
          </p>
        )}
      </div>
    </>
  )

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    )
  }
  return (
    <Link href={item.href} className={className}>
      {inner}
    </Link>
  )
}

function formatShortDate(dateStr) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateStr))
}
