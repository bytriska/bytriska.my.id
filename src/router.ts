import type { RouteLocationNormalized, RouterScrollBehavior, ScrollBehavior } from 'vue-router'
import { START_LOCATIOM, createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'
import { findHashTarget, getScrollOffset, prefersReducedMotion } from '@/lib/dom'

function scrollBehavior(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  savedPosition: ScrollBehavior | null
): ReturnType<RouterScrollBehavior> {
  if(savedPosition) return {...savedPosition, behavior: 'instant'}

  const samePage = from !== START_LOCATIOM && to.path === from.path
  const target = to.hash ? findHashTarget(to.hash) : null

  if(!target) {
    /** invalid target hash */
    if(to.hash && samePage) return false
    
    return { top: 0, behavior: 'instant'}
  }

  return {
    el: target,
    top: getScrollOffset(target),
    behavior: samePage && !prefersReducedMotion() ? 'smooth' : 'instant'
  }
}

export const router = createRouter({
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
  routes,
  scrollBehavior
})

if (import.meta.hot) {
  handleHotUpdate(router)
}
