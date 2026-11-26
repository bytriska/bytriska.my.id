import type { RouteRecord } from 'vue-router'
import type { PostFrontmatter } from '@/types'

export function isPostRoute(route: RouteRecord): route is RouteRecord & { meta: PostFrontmatter } {
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
