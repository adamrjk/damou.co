/*
  Fetches recent videos from your YouTube channel via the public RSS feed.
  No API key needed. The feed updates within minutes of a new upload.

  We use Next.js's fetch revalidation: on the live site, the response is
  cached for 30 minutes, then refetched in the background. So a new video
  shows up on damou.co within ~30 min of publishing — fully passive.
*/

const CHANNEL_ID = 'UCL5sKnuTo8CoCBbIkzgEGbw' // Adamgoal
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`

export async function getVideos() {
  try {
    const res = await fetch(FEED_URL, {
      next: { revalidate: 1800 }, // 30 min
    })
    if (!res.ok) return []
    const xml = await res.text()
    return parseEntries(xml)
  } catch (err) {
    console.error('YouTube RSS fetch failed:', err)
    return []
  }
}

/*
  The YouTube feed is a stable Atom XML schema. Each <entry> has the
  fields we care about. A lightweight regex extractor is more than enough
  here — no XML library needed.
*/
function parseEntries(xml) {
  const out = []
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) || []

  for (const block of entries) {
    const videoId = pick(block, /<yt:videoId>([^<]+)<\/yt:videoId>/)
    const title = pick(block, /<title>([^<]+)<\/title>/)
    const published = pick(block, /<published>([^<]+)<\/published>/)
    const thumb = pick(block, /<media:thumbnail url="([^"]+)"/)

    if (!videoId || !title || !published) continue

    out.push({
      videoId,
      title: decodeXml(title),
      date: published,
      thumbnail: thumb || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      href: `https://www.youtube.com/watch?v=${videoId}`,
    })
  }

  return out
}

function pick(s, re) {
  const m = s.match(re)
  return m ? m[1] : null
}

function decodeXml(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}
