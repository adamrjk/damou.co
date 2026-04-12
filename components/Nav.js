/*
  This is a React component file. It exports one thing: the Nav component.
  Components are the core building block of React — each one is responsible
  for a single piece of the UI.

  `'use client'` tells Next.js this component runs in the browser (not on the server).
  We need it here because usePathname() reads the current URL, which only
  makes sense client-side.
*/
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

/*
  NAV_LINKS is defined outside the component because it never changes.
  Putting constants outside means they're only created once, not re-created
  every time the component renders.
*/
const NAV_LINKS = [
  { href: '/', label: 'home' },
  { href: '/writing', label: 'writing' },
  { href: '/projects', label: 'projects' },
  { href: '/now', label: 'now' },
]

export default function Nav() {
  /*
    usePathname() is a React "hook" — hooks let components tap into
    browser/Next.js features. This one returns the current URL path,
    e.g. "/writing" or "/now". We use it to highlight the active link.

    Hooks always start with `use`. You can only call them at the top level
    of a component, never inside loops or if-statements.
  */
  const pathname = usePathname()

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: '2rem',
      paddingBottom: '2rem',
      borderBottom: '1px solid var(--border)',
      marginBottom: '1rem',
    }}>

      {/* Site name / logo — links back to home */}
      <Link href="/" style={{ textDecoration: 'none', fontWeight: 600 }}>
        ak
      </Link>

      {/*
        We .map() over the NAV_LINKS array to turn it into a list of <Link> elements.
        .map() is JavaScript's way of transforming an array — for each item,
        run a function and collect the results into a new array.

        The `key` prop is required by React when rendering lists. It helps React
        figure out which items changed when the list updates. Use something unique
        (like the href here).
      */}
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href ||
            (link.href !== '/' && pathname.startsWith(link.href))

          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                textDecoration: 'none',
                color: isActive ? 'var(--fg)' : 'var(--muted)',
                fontWeight: isActive ? 500 : 400,
                transition: 'color 0.15s',
              }}
            >
              {link.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
