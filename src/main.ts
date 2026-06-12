import { createApp as createClientApp, createSSRApp } from 'vue'
import App from '@/app.vue'
import { router } from '@/router'

export function createApp() {
  const app = import.meta.env.SSR ? createSSRApp(App) : createClientApp(App)

  app.use(router)

  return { app, router }
}
