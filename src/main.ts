import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import App from '@/app.vue'
import '@/styles/app.css'

const router = createRouter({
  history: createWebHistory(),
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
})

createApp(App).use(router).mount('#app')
