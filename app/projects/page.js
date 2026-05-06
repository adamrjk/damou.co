/*
  /projects — reads everything from content/projects/*.md.
  Add a project: run `npm run new:project "Name"`, then edit the file.
*/

import { getProjects } from '../../lib/projects'
import Reveal from '../../components/Reveal'

export const metadata = {
  title: 'Projects',
  description: "Things I've built.",
}

export default async function ProjectsPage() {
  const projects = await getProjects()
  const featured = projects.find((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <div className="mx-auto max-w-6xl px-6 pt-24 sm:pt-32 pb-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-muted)] mb-6">
          Selected work
        </p>
      </Reveal>

      <Reveal delay={80}>
        <h1 className="text-5xl sm:text-6xl font-semibold tracking-[-0.025em] leading-[1] mb-16">
          Projects.
        </h1>
      </Reveal>

      {featured && (
        <Reveal delay={150}>
          <FeaturedCard project={featured} />
        </Reveal>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
        {rest.map((project, i) => (
          <Reveal key={project.slug} delay={i * 80}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}

function FeaturedCard({ project }) {
  const cardClass =
    'cream-card group relative overflow-hidden rounded-3xl bg-[var(--color-cream)] border border-[var(--color-border)] p-10 sm:p-16 block hover:border-[var(--color-purple)] transition-colors'

  const inner = (
    <>
      <div className="flex items-center justify-between mb-8">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-purple)]">
          Featured · {project.tags.join(' · ')}
        </div>
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-subtle)]">
          {project.year}
        </div>
      </div>

      <h2 className="text-5xl sm:text-7xl font-semibold tracking-[-0.02em] leading-[1] text-[var(--color-fg)]">
        {project.name}.
      </h2>
      {project.tagline && (
        <p className="mt-4 text-2xl sm:text-3xl tracking-tight text-[var(--color-purple-deep)]">
          {project.tagline}
        </p>
      )}
      <div
        className="prose mt-8 text-[var(--color-muted)]"
        dangerouslySetInnerHTML={{ __html: project.descriptionHtml }}
      />

      {project.href && (
        <span className="inline-flex items-center gap-2 mt-10 text-sm text-[var(--color-fg)]">
          {prettyHost(project.href)}
          <span className="transition-transform group-hover:translate-x-1">↗</span>
        </span>
      )}
    </>
  )

  if (project.href) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
      >
        {inner}
      </a>
    )
  }
  return <div className={cardClass}>{inner}</div>
}

function prettyHost(url) {
  try {
    return new URL(url).host.replace(/^www\./, '')
  } catch {
    return url
  }
}

function ProjectCard({ project }) {
  return (
    <div className="group h-full p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-purple)] transition-colors flex flex-col">
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="text-xl font-semibold tracking-tight">{project.name}</h3>
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-subtle)]">
          {project.year}
        </span>
      </div>

      {project.tagline && (
        <p className="text-base text-[var(--color-purple-deep)] mb-3">
          {project.tagline}
        </p>
      )}

      <p className="text-sm text-[var(--color-muted)] leading-relaxed flex-1">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border border-[var(--color-border)] text-[var(--color-muted)]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-4 mt-5">
        {project.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--color-fg)] hover:text-[var(--color-purple)] inline-flex items-center gap-1"
          >
            {link.label}
            <span className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
