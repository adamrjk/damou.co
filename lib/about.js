/*
  Reads content/about.md for the /about page.
*/

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const ABOUT_FILE = path.join(process.cwd(), 'content', 'about.md')

export async function getAbout() {
  const fileContents = fs.readFileSync(ABOUT_FILE, 'utf8')
  const { content } = matter(fileContents)
  const processed = await remark().use(html).process(content)
  return { contentHtml: processed.toString() }
}
