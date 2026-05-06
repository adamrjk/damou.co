/*
  Reveal — wraps any content and fades it in when it scrolls into view.
  This is a CLIENT component (note the 'use client' directive at the top)
  because it uses browser APIs: useEffect, IntersectionObserver, useRef.

  Usage:
    <Reveal>          ...content...   </Reveal>
    <Reveal delay={150}>  ...content...   </Reveal>

  How it works:
  1. We attach a ref to the wrapper div.
  2. IntersectionObserver watches when that div enters the viewport.
  3. On the first intersection we flip a `shown` state, which adds the `.in`
     class. The CSS in globals.css does the rest.
  4. We disconnect the observer after firing — once revealed, stays revealed.
*/
'use client'

import { useEffect, useRef, useState } from 'react'

export default function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? 'in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
