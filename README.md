# adamdamou.com

Personal site. Built with Next.js, Tailwind CSS, and Markdown.

## Stack

- [Next.js](https://nextjs.org) — React framework, file-system routing, static site generation
- [Tailwind CSS](https://tailwindcss.com) — utility-first CSS
- Markdown + [gray-matter](https://github.com/jonschlinkert/gray-matter) + [remark](https://github.com/remarkjs/remark) — blog posts

## Pages

| Route | Description |
|---|---|
| `/` | Home |
| `/writing` | Blog post index |
| `/writing/[slug]` | Individual post |
| `/projects` | Things I've built |
| `/now` | What I'm up to right now |

## Adding a post

Create a `.md` file in `content/posts/` with this frontmatter:

```markdown
---
title: "Post title"
date: "2025-04-12"
description: "One-line summary."
tags: ["tag"]
---

Post content here.
```

The post appears automatically at `/writing/your-filename`.

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploying

Push to GitHub, import the repo on [Vercel](https://vercel.com), done.
