import type { RouteMeta } from 'vue-router'
import type { PageFrontmatter, PostFrontmatter } from '@/types'

export function isPost<T extends { path: string; meta: RouteMeta }>(
  route: T
): route is T & { meta: PostFrontmatter } {
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

export function isHome<T extends { path: string; meta: RouteMeta }>(
  route: T
): route is T & { meta: PageFrontmatter } {
  const meta = route.meta

  return (
    !(route.path.startsWith('/posts/') && route.path !== '/posts/') &&
    typeof meta.title === 'string' &&
    !meta.publishedAt
  )
}
