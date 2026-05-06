#!/usr/bin/env node
/*
  Scaffold a new project:
    npm run new:project "Bloom"

  Creates content/projects/bloom.md with frontmatter pre-filled.
  Refuses to overwrite an existing file.
*/

import fs from 'node:fs'
import path from 'node:path'

const name = process.argv.slice(2).join(' ').trim()

if (!name) {
  console.error('Usage: npm run new:project "Project name"')
  process.exit(1)
}

const slug = slugify(name)
const year = String(new Date().getFullYear())
const filePath = path.join(process.cwd(), 'content', 'projects', `${slug}.md`)

if (fs.existsSync(filePath)) {
  console.error(`✗ ${path.relative(process.cwd(), filePath)} already exists.`)
  process.exit(1)
}

const body = `---
name: "${escapeYaml(name)}"
tagline: ""
year: "${year}"
tags: []
links:
  - label: ""
    href: ""
featured: false
---

Describe the project here. This body is rendered as markdown on the project card.
`

fs.writeFileSync(filePath, body, 'utf8')
console.log(`✓ Created ${path.relative(process.cwd(), filePath)}`)
console.log(`  Edit it, then it'll appear on /projects on the next reload.`)

function slugify(s) {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

function escapeYaml(s) {
  return s.replace(/"/g, '\\"')
}
