import { createHead, transformHtmlTemplate as renderHead } from '@unhead/vue/server'
import { renderToString } from 'vue/server-renderer'
import { createApp } from '@/main'

export default async function render(url: URL) {
  const { app, router } = createApp()
  const head = createHead()
  const ctx = {}

  app.use(head)

  await router.push(url.pathname)
  await router.isReady()

  const page = await renderToString(app, ctx)

  return { page, head }
}

export interface RenderResult {
  page: string
  head: ReturnType<typeof createHead>
}

export function renderHtml(template: string, payload: RenderResult) {
  let html: string
  html = template.replace('<!--ssr-outlet-->', payload.page)
  html = renderHead(payload.head, html)
  return html
}
