import { createApp as createClientApp, createSSRApp } from 'vue'
import App from '@/app.vue'
import { CodeBlock } from '@/components/markdown-ui/code-block'
import { MarkdownWrapper } from '@/components/markdown-wrapper'
import { router } from '@/router'

export function createApp() {
  const app = import.meta.env.SSR ? createSSRApp(App) : createClientApp(App)

  app.component('MarkdownWrapper', MarkdownWrapper)
  app.component('CodeBlock', CodeBlock)
  app.use(router)

  return { app, router }
}
