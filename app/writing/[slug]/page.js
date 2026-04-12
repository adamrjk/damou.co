/*
  Dynamic routes in Next.js use square brackets in the folder name: [slug]
  This single file handles ALL post URLs:
    /writing/hello-world
    /writing/building-betterself
    etc.

  At build time, Next.js calls generateStaticParams() to get the list of all
  slugs, then pre-renders one page per slug. The result is a fully static site —
  no server needed, just files served from a CDN. This is why Vercel deploys are so fast.
*/

import Link from 'next/link'
import { getPost, getAllSlugs } from '../../../lib/posts'
import { notFound } from 'next/navigation'

/*
  generateStaticParams tells Next.js: "here are all the possible values for [slug]."
  It pre-renders a page for each one at build time.
  The return format must be an array of objects matching the dynamic segment name.
*/
export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

/*
  generateMetadata is called once per page to produce the <title> and <meta> tags.
  It receives the same `params` as the page component.
  This is the async version — useful when you need to fetch data to know the title.
*/
export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
  }
}

/*
  The page component receives `params` — an object containing the dynamic
  segments from the URL. For /writing/hello-world, params.slug = "hello-world".
*/
export default async function PostPage({ params }) {
  const { slug } = await params
  const post = await getPost(slug)

  /*
    notFound() is a Next.js function that renders the 404 page.
    We call it if the slug doesn't match any file.
  */
  if (!post) {
    notFound()
  }

  return (
    <article>
      {/* Back link */}
      <div style={{ marginBottom: '2.5rem' }}>
        <Link href="/writing" style={{ color: 'var(--muted)', fontSize: '0.85rem', textDecoration: 'none' }}>
          ← writing
        </Link>
      </div>

      {/* Post header */}
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 600, marginTop: 0, marginBottom: '0.5rem', lineHeight: 1.3 }}>
          {post.title}
        </h1>
        <div style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
          {formatDate(post.date)}
        </div>
      </header>

      {/*
        dangerouslySetInnerHTML is how you inject raw HTML in React.
        It's called "dangerous" because if the HTML came from user input,
        you'd have an XSS vulnerability. Here it's safe because the HTML
        comes from our own markdown files — we control it.

        The double {{ }} is not a mistake: the outer {} is JSX expression syntax,
        the inner {} is a JavaScript object literal. So it reads:
        "set the prop to the object { __html: post.contentHtml }"
      */}
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  )
}

function formatDate(dateStr) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateStr))
}
