import type { Plugin } from 'vite'
import type { ModuleRenderer, RenderResult } from './types'
import fs from 'node:fs/promises'
import process from 'node:process'
import { transformHtmlTemplate as renderHead } from '@unhead/vue/server'
import { isViteAsset } from '../utils'

export default function ssr(): Plugin {
  return {
    name: 'vite-plugin-ssr',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (process.env.NODE_ENV !== 'production') return next()
        if (!req.url || isViteAsset(req.url)) return next()

        try {
          let template: string
          template = await fs.readFile('./index.html', 'utf8')
          template = await server.transformIndexHtml(req.url, template)

          const { render } = (await server.ssrLoadModule('/src/entry-server.ts')) as ModuleRenderer

          const payload = await render({ url: req.url })
          const html = renderPage(template, payload)

          res.statusCode = 200
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.end(html)
        } catch (e) {
          server.ssrFixStacktrace(e as Error)
          console.error(e)
          res.statusCode = 500
          res.end('Internal Server Error')
        }
      })
    },
    async configurePreviewServer(server) {
      const sirv = (await import('sirv')).default

      server.middlewares.use(server.config.base, sirv('./dist/client'))
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || isViteAsset(req.url)) return next()
        try {
          const template = await fs.readFile('./dist/client/index.html', 'utf-8')
          // @ts-expect-error - vite built assets
          const { render } = (await import('../../../dist/server/entry-server.js').catch(
            () => {}
          )) as ModuleRenderer

          const payload = await render({ url: req.url })
          const html = renderPage(template, payload)

          res.statusCode = 200
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.end(html)
        } catch (e) {
          console.error(e)
          res.statusCode = 500
          res.end('Internal Server Error')
        }
      })
    },
  }
}

function renderPage(template: string, payload: RenderResult) {
  let html: string
  html = template.replace('<!--ssr-outlet-->', payload.html)
  html = renderHead(payload.head, html)
  return html
}
