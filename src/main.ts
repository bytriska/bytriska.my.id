import type { RouterOptions } from 'vite-ssg'
import { ViteSSG } from 'vite-ssg'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'
import App from '@/app.vue'
import '@/styles/app.css'

const routerOptions: RouterOptions = {
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (!to.hash) return savedPosition || { top: 0 }

    const el = document.querySelector(to.hash)

    if (el) {
      const scrollMarginTop = Number.parseFloat(getComputedStyle(el).scrollMarginTop)

      return {
        el,
        behavior: 'smooth',
        top: scrollMarginTop,
      }
    }

    return savedPosition || { top: 0 }
  },
}

export const createApp = ViteSSG(App, routerOptions, ctx => {
  if (import.meta.hot) handleHotUpdate(ctx.router)
})
