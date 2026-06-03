import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

export const router = createRouter({
  scrollBehavior(to, _from, savedPosition) {
    if (!to.hash) return savedPosition || { top: 0 }

    const targetElement = document.querySelector(to.hash)
    if (!targetElement) return savedPosition || { top: 0 }

    const marginTop = Number.parseFloat(getComputedStyle(targetElement).scrollMarginTop)
    return {
      el: targetElement,
      top: marginTop,
      behavior: 'smooth',
    }
  },
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
  routes,
})

if (import.meta.hot) {
  handleHotUpdate(router)
}
