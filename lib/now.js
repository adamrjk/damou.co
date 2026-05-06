/*
  Reads content/now.md — frontmatter holds the "updated" date string,
  body is the markdown shown on /now.
*/

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const NOW_FILE = path.join(process.cwd(), 'content', 'now.md')

export async function getNow() {
  const fileContents = fs.readFileSync(NOW_FILE, 'utf8')
  const { data, content } = matter(fileContents)

  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()

  return {
    updated: data.updated || '',
    contentHtml,
  }
}
