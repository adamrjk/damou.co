/*
  /about — content lives in content/about.md.
  Edit that file directly. Rendered in italics, deliberately quiet.
*/

import { getAbout } from '../../lib/about'
import Reveal from '../../components/Reveal'

export const metadata = {
  title: 'About',
  description: 'About Adam.',
}

export default async function AboutPage() {
  const { contentHtml } = await getAbout()

  return (
    <div className="mx-auto max-w-3xl px-6 pt-24 sm:pt-32 pb-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-muted)] mb-6">
          A short story
        </p>
      </Reveal>

      <Reveal delay={80}>
        <h1 className="text-5xl sm:text-6xl font-semibold tracking-[-0.025em] leading-[1] mb-12">
          About.
        </h1>
      </Reveal>

      <Reveal delay={150}>
        <div
          className="prose prose-about"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </Reveal>
    </div>
  )
}
