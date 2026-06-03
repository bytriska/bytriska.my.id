import { createSSRApp } from 'vue'
import App from '@/app.vue'
import { router } from '@/router'

export function createApp() {
  const app = createSSRApp(App)
  app.use(router)
  return { app, router }
}
