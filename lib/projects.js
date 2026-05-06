/*
  Reads content/projects/*.md — same pattern as posts.
  Each file's frontmatter holds the structured data (name, year, tags, links,
  featured), the markdown body holds the description.
*/

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const PROJECTS_DIR = path.join(process.cwd(), 'content', 'projects')

export async function getProjects() {
  const filenames = fs.readdirSync(PROJECTS_DIR)

  /*
    Promise.all() lets us await an array of async operations in parallel.
    We need it because rendering each project's markdown body is async.
  */
  const projects = await Promise.all(
    filenames
      .filter((name) => name.endsWith('.md'))
      .map(async (filename) => {
        const slug = filename.replace(/\.md$/, '')
        const fileContents = fs.readFileSync(
          path.join(PROJECTS_DIR, filename),
          'utf8'
        )
        const { data, content } = matter(fileContents)

        const processedContent = await remark().use(html).process(content)
        const descriptionHtml = processedContent.toString()

        return {
          slug,
          name: data.name,
          tagline: data.tagline || '',
          year: data.year || '',
          href: data.href || '',
          tags: data.tags || [],
          links: data.links || [],
          featured: Boolean(data.featured),
          description: content.trim(),
          descriptionHtml,
        }
      })
  )

  /* Featured first, then by year descending. */
  return projects.sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return Number(b.year) - Number(a.year)
  })
}

export async function getFeaturedProject() {
  const projects = await getProjects()
  return projects.find((p) => p.featured) || null
}
