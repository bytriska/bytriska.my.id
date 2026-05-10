import type { RouteRecord } from 'vue-router'
import type { Post, PostFrontmatter } from '@/types'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export function usePosts() {
  const router = useRouter()

  const allPosts = computed<Post[]>(() =>
    router
      .getRoutes()
      .filter(isPostRoute)
      .map(route => ({
        path: route.path,
        meta: route.meta,
      }))
      .sort(
        (a, b) => new Date(b.meta.publishedAt).getTime() - new Date(a.meta.publishedAt).getTime()
      )
  )

  const allCategories = computed(() => {
    const counts = new Map<string, number>()
    for (const post of allPosts.value) {
      const category = post.meta.category
      counts.set(category, (counts.get(category) ?? 0) + 1)
    }

    return [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
  })

  const allTags = computed(() => {
    const counts = new Map<string, number>()
    for (const post of allPosts.value) {
      for (const tag of post.meta.tags ?? []) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1)
      }
    }

    return [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
  })

  const allSeries = computed(() => {
    const map = new Map<string, Post[]>()
    for (const post of allPosts.value) {
      if (!post.meta.series) continue

      const existing = map.get(post.meta.series)
      map.set(post.meta.series, [...(existing ?? []), post])
    }

    return [...map.entries()].map(([name, posts]) => ({
      name,
      count: posts.length,
      posts: posts.sort((a, b) => (a.meta.seriesOrder ?? 0) - (b.meta.seriesOrder ?? 0)),
    }))
  })

  const featuredPosts = computed(() => allPosts.value.filter(post => post.meta.featured))

  function byCategory(category: string) {
    return computed(() =>
      allPosts.value.filter(post => post.meta.category.toLowerCase() === category.toLowerCase())
    )
  }

  function byTag(tag: string) {
    return computed(() =>
      allPosts.value.filter(post =>
        post.meta.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
      )
    )
  }

  function bySeries(seriesName: string) {
    return computed(() =>
      allPosts.value
        .filter(post => post.meta.series?.toLowerCase() === seriesName.toLowerCase())
        .sort((a, b) => (a.meta.seriesOrder ?? 0) - (b.meta.seriesOrder ?? 0))
    )
  }

  return { allPosts, allCategories, allTags, allSeries, featuredPosts, byCategory, byTag, bySeries }
}

function isPostRoute(route: RouteRecord): route is RouteRecord & { meta: PostFrontmatter } {
  const meta = route.meta

  return (
    route.path.startsWith('/posts/') &&
    route.path !== '/posts/' &&
    typeof meta.title === 'string' &&
    typeof meta.publishedAt === 'string' &&
    !meta.draft &&
    !meta.noIndex
  )
}
