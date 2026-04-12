export const metadata = {
  title: 'Projects',
  description: 'Things I\'ve built.',
}

/*
  No database, no API — just a plain array of objects defined in the file.
  For a personal site this is the right call. If you had 100+ projects
  you'd move this to a content file, but for ~5 items, keep it simple.
*/
const PROJECTS = [
  {
    name: 'BetterSelf',
    description: 'iOS app for tracking habits and reflecting on your day. Built in Swift with Firebase.',
    tags: ['Swift', 'Firebase', 'iOS'],
    links: [
      { label: 'App Store', href: 'https://apps.apple.com' },
    ],
    year: '2024',
  },
  {
    name: 'YouTube channel',
    description: 'Videos on building things, learning, and whatever I find interesting.',
    tags: ['Video'],
    links: [
      { label: 'YouTube', href: 'https://youtube.com' },
    ],
    year: '2023',
  },
  {
    name: 'This website',
    description: 'Personal site built with Next.js and Tailwind CSS. Also my excuse to learn React.',
    tags: ['Next.js', 'React'],
    links: [
      { label: 'GitHub', href: 'https://github.com' },
    ],
    year: '2025',
  },
]

export default function ProjectsPage() {
  return (
    <div>
      <h1 style={{ fontSize: '1.4rem', fontWeight: 600, marginTop: 0, marginBottom: '3rem' }}>
        Projects
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {PROJECTS.map((project) => (
          <div key={project.name}>
            {/* Header row: name + year */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>
                {project.name}
              </h2>
              <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>
                {project.year}
              </span>
            </div>

            {/* Description */}
            <p style={{ color: 'var(--muted)', margin: '0 0 0.75rem', fontSize: '0.9rem' }}>
              {project.description}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              {project.tags.map((tag) => (
                <span key={tag} style={{
                  fontSize: '0.7rem',
                  padding: '0.15rem 0.5rem',
                  border: '1px solid var(--border)',
                  borderRadius: '3px',
                  color: 'var(--muted)',
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '0.85rem' }}
                >
                  {link.label} →
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
