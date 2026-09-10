import renderPage, { renderHtml } from '@/entry-server'

export default async function handle(req: Request) {
  const url = new URL(req.url)

  // @ts-expect-error -- virtual module
  const template = (await import('virtual:index-html')).default
  const htmlPayload = await renderPage(url)

  const html = renderHtml(template, htmlPayload)
  return new Response(html, { headers: { 'content-type': 'text/html' } })
}
