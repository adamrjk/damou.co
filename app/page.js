/*
  Homepage — /

  All content comes from files (and YouTube RSS) under content/ and lib/:
    content/site.json         → hero copy, elsewhere links
    content/projects/*.md     → projects (featured one surfaces here)
    lib/content.js            → posts + YouTube videos merged for the recent feed
*/

import Link from 'next/link'
import { getContent } from '../lib/content'
import { getFeaturedProject } from '../lib/projects'
import { getSite } from '../lib/site'
import Reveal from '../components/Reveal'

/* Re-fetch this page every 30 minutes so new YouTube uploads appear
   without a redeploy. */
export const revalidate = 1800

export default async function Home() {
  const site = getSite()
  const items = (await getContent()).slice(0, 4)
  const featured = await getFeaturedProject()

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pt-24 sm:pt-32 pb-24 sm:pb-40">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-muted)] mb-8">
            {site.hero.eyebrow}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="text-[clamp(3rem,9vw,8rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
            {site.hero.name}
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-10 max-w-2xl text-xl sm:text-2xl leading-snug text-[var(--color-muted)]">
            {site.hero.tagline.muted}{' '}
            <span className="text-[var(--color-fg)]">
              {site.hero.tagline.main}
            </span>
          </p>
        </Reveal>
      </section>

      {/* ── Featured project ─────────────────────────────────────────── */}
      {featured && <FeaturedSection project={featured} />}

      {/* ── Recent (posts + videos) ──────────────────────────────────── */}
      {items.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 mb-24 sm:mb-32">
          <Reveal>
            <div className="flex items-baseline justify-between mb-10">
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                Recent
              </h2>
              <Link
                href="/content"
                className="text-sm text-[var(--color-muted)] hover:text-[var(--color-fg)]"
              >
                see all →
              </Link>
            </div>
          </Reveal>

          <div className="border-t border-[var(--color-border)]">
            {items.map((item, i) => (
              <Reveal key={item.key} delay={i * 80}>
                <RecentRow item={item} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ── Elsewhere ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 mb-24 sm:mb-32">
        <Reveal>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-10">
            Elsewhere
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {site.elsewhere.map(({ label, handle, href }, i) => (
            <Reveal key={label} delay={i * 60}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-6 rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-purple)] hover:bg-[var(--color-surface)] transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    {label}
                  </span>
                  <span className="text-[var(--color-subtle)] group-hover:text-[var(--color-purple)] group-hover:translate-x-0.5 transition-all">
                    ↗
                  </span>
                </div>
                <div className="text-base text-[var(--color-fg)]">
                  {handle}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}

function FeaturedSection({ project }) {
  const className =
    'cream-card group block relative overflow-hidden rounded-3xl bg-[var(--color-cream)] border border-[var(--color-border)] p-10 sm:p-16 hover:border-[var(--color-purple)] transition-colors'

  const inner = (
    <>
      <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-purple)] mb-6">
        Featured · {project.tags.join(' · ')}
      </div>
      <h2 className="text-5xl sm:text-7xl font-semibold tracking-[-0.02em] leading-[1] text-[var(--color-fg)]">
        {project.name}.
      </h2>
      {project.tagline && (
        <p className="mt-4 text-2xl sm:text-3xl tracking-tight text-[var(--color-purple-deep)]">
          {project.tagline}
        </p>
      )}
      <p className="mt-8 max-w-xl text-base leading-relaxed text-[var(--color-muted)]">
        {project.description}
      </p>
      <span className="inline-flex items-center gap-2 mt-10 text-sm text-[var(--color-fg)]">
        {project.href ? 'Visit' : 'See the project'}
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </span>
    </>
  )

  return (
    <section className="mx-auto max-w-6xl px-6 mb-24 sm:mb-32">
      <Reveal>
        {project.href ? (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
          >
            {inner}
          </a>
        ) : (
          <Link href="/projects" className={className}>
            {inner}
          </Link>
        )}
      </Reveal>
    </section>
  )
}

function RecentRow({ item }) {
  const className =
    'group flex items-start gap-5 py-6 border-b border-[var(--color-border)] hover:bg-[var(--color-row-hover)] transition-colors -mx-4 px-4 rounded-md'

  const inner = (
    <>
      {/* Thumbnail (videos only) */}
      {item.type === 'video' && item.thumbnail && (
        <div className="flex-shrink-0 w-36 sm:w-44 aspect-video overflow-hidden rounded-lg bg-[var(--color-border)]">
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
        <h3 className="text-lg sm:text-xl font-medium tracking-tight">
          {item.title}
          {item.external && (
            <span className="ml-1.5 text-[var(--color-subtle)] group-hover:text-[var(--color-purple)]">
              ↗
            </span>
          )}
        </h3>
        {item.description && (
          <p className="mt-1 text-sm text-[var(--color-muted)] truncate">
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
