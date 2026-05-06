#!/usr/bin/env node
/*
  Scaffold a new post:
    npm run new:post "On learning React"

  Creates content/posts/on-learning-react.md with frontmatter pre-filled.
  Refuses to overwrite an existing file.
*/

import fs from 'node:fs'
import path from 'node:path'

const title = process.argv.slice(2).join(' ').trim()

if (!title) {
  console.error('Usage: npm run new:post "Post title"')
  process.exit(1)
}

const slug = slugify(title)
const date = new Date().toISOString().slice(0, 10) // YYYY-MM-DD
const filePath = path.join(process.cwd(), 'content', 'posts', `${slug}.md`)

if (fs.existsSync(filePath)) {
  console.error(`✗ ${path.relative(process.cwd(), filePath)} already exists.`)
  process.exit(1)
}

const body = `---
title: "${escapeYaml(title)}"
date: "${date}"
description: ""
tags: []
---

Write here.
`

fs.writeFileSync(filePath, body, 'utf8')
console.log(`✓ Created ${path.relative(process.cwd(), filePath)}`)
console.log(`  URL: /writing/${slug}`)

function slugify(s) {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '') // strip accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

function escapeYaml(s) {
  return s.replace(/"/g, '\\"')
}
