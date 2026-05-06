/*
  OG image — what shows up in iMessage / Twitter / Slack link previews.
  Next.js generates a 1200×630 PNG from this JSX at request time.
  No extra dependencies needed; ImageResponse is built into Next.
*/

import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Adam'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#fff8e1',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '0 100px',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 36,
            color: '#525252',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: 30,
            fontFamily: 'monospace',
          }}
        >
          damou.co
        </div>
        <div
          style={{
            fontSize: 260,
            fontWeight: 700,
            color: '#0a0a0a',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            display: 'flex',
          }}
        >
          Adam
          <span style={{ color: '#6d28d9' }}>.</span>
        </div>
        <div
          style={{
            fontSize: 36,
            color: '#525252',
            marginTop: 24,
            maxWidth: 900,
            lineHeight: 1.3,
          }}
        >
          Student at EPFL. I build software, ship apps, and write about what I learn.
        </div>
      </div>
    ),
    size
  )
}
