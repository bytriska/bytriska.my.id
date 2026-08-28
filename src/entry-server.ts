import { createHead, transformHtmlTemplate as renderHead } from '@unhead/vue/server'
import { renderToString } from 'vue/server-renderer'
import { createApp } from '@/main'

export default async function fetch(req: Request) {
  const url = new URL(req.url)

  const { app, router } = createApp()
  const head = createHead()
  const ctx = {}

  app.use(head)

  await router.push(url.pathname)
  await router.isReady()

  // @ts-expect-error -- virtual module
  const template = (await import('virtual:index-html')).default
  const page = await renderToString(app, ctx)

  const html = renderHtml(template, { page, head })
  return new Response(html, { headers: { 'content-type': 'text/html' } })
}

export interface RenderPayload {
  page: string
  head: ReturnType<typeof createHead>
}

function renderHtml(template: string, payload: RenderPayload) {
  let html: string
  html = template.replace('<!--ssr-outlet-->', payload.page)
  html = renderHead(payload.head, html)
  return html
}
