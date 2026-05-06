/*
  /writing/[slug] — a single post.
  Square brackets in the folder name mean the segment is dynamic;
  this one file renders every post.
*/

import Link from 'next/link'
import { getPost, getAllSlugs } from '../../../lib/posts'
import { notFound } from 'next/navigation'

/* Tell Next.js the full list of slugs at build time so each post becomes
   a static HTML file. Result: instant loads from the CDN. */
export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
  }
}

export default async function PostPage({ params }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="mx-auto max-w-3xl px-6 pt-24 sm:pt-32 pb-20">
      {/* Back link */}
      <div className="mb-12">
        <Link
          href="/content"
          className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] hover:text-[var(--color-fg)]"
        >
          ← content
        </Link>
      </div>

      {/* Post header */}
      <header className="mb-12">
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-subtle)] mb-4">
          {formatDate(post.date)}
        </div>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.02em] leading-[1.05]">
          {post.title}
        </h1>
        {post.description && (
          <p className="mt-5 text-lg text-[var(--color-muted)] leading-snug">
            {post.description}
          </p>
        )}
      </header>

      {/*
        dangerouslySetInnerHTML injects raw HTML. Safe here because
        the HTML comes from our own markdown files — we control the input.
      */}
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  )
}

function formatDate(dateStr) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateStr))
}
