/*
  lib/ is the convention for utility/helper code that isn't a component or a page.
  Think of it like your "model" layer — it knows how to fetch and transform data.

  This file has two jobs:
  1. getPosts() — return all posts sorted by date (for the writing index and homepage)
  2. getPost(slug) — return one post including its rendered HTML (for the post page)
*/

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

/*
  path.join() safely joins path segments regardless of OS.
  process.cwd() is the project root when running with Next.js.
  So this points to: /your-project/content/posts/
*/
const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

/*
  getPosts() reads all .md files from the posts directory and returns
  an array of post metadata (no body content — we don't need the full
  content just to render a list).
*/
export async function getPosts() {
  /*
    fs.readdirSync reads a directory and returns an array of filenames.
    The 'Sync' suffix means it blocks until done — fine here since this
    runs at build time on the server, not in the browser.
  */
  const filenames = fs.readdirSync(POSTS_DIR)

  const posts = filenames
    /*
      .filter() keeps only items where the function returns true.
      We only want .md files, not any stray .DS_Store or other files.
    */
    .filter((name) => name.endsWith('.md'))
    .map((filename) => {
      /*
        The "slug" is the URL-friendly version of the filename.
        "hello-world.md" → slug: "hello-world" → URL: /writing/hello-world
      */
      const slug = filename.replace(/\.md$/, '')

      /*
        fs.readFileSync reads the file contents as a string ('utf8' encoding).
        matter() from gray-matter parses out the frontmatter (the --- block
        at the top of each .md file) and separates it from the body content.
      */
      const fileContents = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title,
        date: data.date,
        description: data.description || '',
        tags: data.tags || [],
      }
    })

  /*
    Sort posts by date descending (newest first).
    .sort() takes a comparator: if result is negative, a comes before b.
    Comparing date strings as ISO format ("2024-01-15") works alphabetically.
  */
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

/*
  getPost() is used by the individual post page [slug]/page.js.
  It returns everything including the rendered HTML body.
*/
export async function getPost(slug) {
  const filePath = path.join(POSTS_DIR, `${slug}.md`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  /*
    matter() with the full call returns both `data` (frontmatter) and
    `content` (the markdown body after the --- block).
  */
  const { data, content } = matter(fileContents)

  /*
    remark is a markdown processor. We pipe the raw markdown through
    remark-html to get an HTML string we can render.

    `await` is needed because remark.process() is async.
    .toString() converts the VFile result object to a plain string.
  */
  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()

  return {
    slug,
    title: data.title,
    date: data.date,
    description: data.description || '',
    tags: data.tags || [],
    contentHtml,
  }
}

/*
  getAllSlugs() is used for generateStaticParams() — it tells Next.js
  which slugs to pre-render at build time. This makes the site fully static.
*/
export function getAllSlugs() {
  const filenames = fs.readdirSync(POSTS_DIR)
  return filenames
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''))
}
