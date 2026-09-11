import type { Plugin, ViteDevServer } from 'vite'
import fs from 'node:fs/promises'

const id = 'virtual:index-html'
const resolvedId = `\0${id}`

export default function virtualIndexHtml(): Plugin {
  let server: ViteDevServer | undefined

  return {
    name: 'vite-plugin-virtual-index-html',
    configureServer(server_) {
      server = server_
    },
    resolveId(source) {
      if (source === id) return resolvedId
      return null
    },
    async load(id) {
      if (id === resolvedId) {
        let html: string
        if (server) {
          this.addWatchFile('./index.html')

          const template = await fs.readFile('./index.html', 'utf8')
          html = await server.transformIndexHtml('/', template)
        } else {
          html = await fs.readFile('./dist/client/index.html', 'utf-8')
        }

        return `export default ${JSON.stringify(html)}`
      }
      return null
    },
  }
}
