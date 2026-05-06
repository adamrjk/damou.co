/*
  Root layout — wraps every page on the site.
  Pages set their own widths now; the layout just provides the nav, footer,
  and global font stack.
*/

import './globals.css'
import Nav from '../components/Nav'
import { getSite } from '../lib/site'

/*
  generateMetadata is the async form of `metadata`. We use it here so we can
  pull the site title/description from content/site.json instead of hardcoding.
*/
export async function generateMetadata() {
  const site = getSite()
  return {
    metadataBase: new URL('https://damou.co'),
    title: {
      default: site.meta.title,
      template: `%s — ${site.meta.title}`,
    },
    description: site.meta.description,
  }
}

export default function RootLayout({ children }) {
  const site = getSite()

  return (
    <html lang="en">
      <head>
        {/* JetBrains Mono for accent labels and code. SF Pro is loaded by the
            system on Apple devices via the font stack — no external request. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        {/* The nav is fixed (position: fixed) so push the page below it. */}
        <main className="pt-14">{children}</main>

        <footer className="mt-32 border-t border-[var(--color-border)]">
          <div className="mx-auto max-w-6xl px-6 py-10 text-sm">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-subtle)]">
              {site.footer.copyright}
            </span>
          </div>
        </footer>
      </body>
    </html>
  )
}
