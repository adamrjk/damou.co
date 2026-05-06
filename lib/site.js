/*
  Reads content/site.json — the small config file holding hero copy,
  social links, and footer info. One source of truth for static text.
*/

import fs from 'fs'
import path from 'path'

const SITE_FILE = path.join(process.cwd(), 'content', 'site.json')

export function getSite() {
  const raw = fs.readFileSync(SITE_FILE, 'utf8')
  return JSON.parse(raw)
}
