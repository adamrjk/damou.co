/*
  Sticky top navigation. Transparent at the top of the page, switches to a
  frosted-glass white once you start scrolling — same trick apple.com uses.

  Client component (uses scroll state and the current pathname).
*/
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { href: '/content', label: 'Content' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
]

export default function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/75 backdrop-blur-xl border-b border-[var(--color-border)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-[15px] font-semibold tracking-tight hover:opacity-70"
        >
          Adam
        </Link>

        <div className="flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const active =
              pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  active
                    ? 'text-[var(--color-fg)] font-medium'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-fg)]'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
