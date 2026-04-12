/*
  layout.js is the ROOT LAYOUT — it wraps every single page on the site.
  Think of it like a template. Whatever you put here (nav, footer, fonts)
  appears everywhere without you having to repeat it.

  In Next.js App Router, every folder can have its own layout.js too,
  which lets you nest layouts (e.g., a different sidebar just for /writing).
  But for a personal site, one root layout is plenty.
*/

import './globals.css'
import Nav from '../components/Nav'

/*
  metadata is a special Next.js export — it tells search engines and browsers
  what your site is called and what it's about. Next.js reads this and injects
  the right <title> and <meta> tags automatically.
*/
export const metadata = {
  title: {
    default: 'Adam Kabbaj',
    // %s gets replaced by the page title. So a post called "Hello" becomes
    // "Hello — Adam Kabbaj" in the browser tab.
    template: '%s — Adam Kabbaj',
  },
  description: 'Student, builder, writer.',
}

/*
  RootLayout is a React component. In React, a "component" is just a function
  that returns HTML-like syntax called JSX. Components start with a capital letter.

  { children } is destructuring — we're pulling the `children` prop out of
  the object passed to this function. `children` is whatever page is currently
  being rendered inside the layout.
*/
export default function RootLayout({ children }) {
  return (
    /*
      JSX looks like HTML but it's actually JavaScript. A few key differences:
      - className instead of class (because class is a reserved JS keyword)
      - All tags must be closed, even <br /> and <img />
      - You can embed JS expressions inside { curly braces }
    */
    <html lang="en">
      <head>
        {/* Google Fonts — JetBrains Mono for that clean monospace look */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/*
          This div centers the content and caps its width.
          max-w-2xl with mx-auto = centered column, no more than ~42rem wide.
          px-6 = horizontal padding so content doesn't touch the screen edges on mobile.
        */}
        <div style={{ maxWidth: '42rem', margin: '0 auto', padding: '0 1.5rem' }}>
          <Nav />
          {/*
            `main` is a semantic HTML tag — it tells browsers/screen readers
            where the main content is. py-12 adds vertical padding.
          */}
          <main style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
