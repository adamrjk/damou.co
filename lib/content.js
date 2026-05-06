/*
  The unified Content feed: blog posts (manual markdown) + YouTube videos
  (auto-pulled from the channel RSS), merged and sorted by date.
*/

import { getPosts } from './posts'
import { getVideos } from './youtube'

export async function getContent() {
  const [posts, videos] = await Promise.all([getPosts(), getVideos()])

  const postItems = posts.map((p) => ({
    type: 'post',
    key: `post-${p.slug}`,
    title: p.title,
    description: p.description,
    date: p.date,
    href: `/writing/${p.slug}`,
    external: false,
  }))

  const videoItems = videos.map((v) => ({
    type: 'video',
    key: `video-${v.videoId}`,
    title: v.title,
    description: '',
    date: v.date,
    href: v.href,
    thumbnail: v.thumbnail,
    external: true,
  }))

  return [...postItems, ...videoItems].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )
}
