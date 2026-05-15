import type { ViteDevServer } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import Tailwindcss from '@tailwindcss/vite'
import Vue from '@vitejs/plugin-vue'
import matter from 'gray-matter'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import { defineConfig } from 'vite'
import VueRouter from 'vue-router/vite'
import { clearHighlighter, createHighlighter, markdown } from './src/lib/markdown'

const MARKDOWN_RE = /\.md$/
const VUE_SFC_RE = /\.vue$/
const VUE_SUBREQUEST_RE = /\.vue\?vue/
const VUE_X_SUBREQUEST_RE = /\.vue\.[jt]sx?\?vue/

// https://vite.dev/config/
export default defineConfig(async () => {
  const highlighter = await createHighlighter()

  return {
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    plugins: [
      VueRouter({
        routesFolder: 'src/pages',
        extensions: ['.vue', '.md'],
        dts: 'src/typed-router.d.ts',
        extendRoute(route) {
          const src = route.component
          if (!src || !src.endsWith('.md')) return

          const frontmatter = matter(fs.readFileSync(src, 'utf-8'))
          route.addToMeta(frontmatter.data)
        },
      }),

      Tailwindcss(),

      {
        name: 'markdown-it-cleanup',
        closeBundle() {
          clearHighlighter()
        },
        configureServer(server: ViteDevServer) {
          server.httpServer?.on('close', clearHighlighter)
        },
      },

      Markdown({
        wrapperComponent: id => (id.includes('/posts/') ? 'PostLayout' : 'PageLayout'),
        markdownOptions: { highlight: highlighter },
        markdownSetup: markdown,
      }),

      Components({
        dirs: ['src/components', 'src/layouts'],
        extensions: ['vue'],
        include: [VUE_SFC_RE, VUE_SUBREQUEST_RE, VUE_X_SUBREQUEST_RE, MARKDOWN_RE],
        dts: 'src/components.d.ts',
        resolvers: [IconsResolver()],
      }),

      Icons(),

      Vue({ include: [VUE_SFC_RE, MARKDOWN_RE] }),
    ],
  }
})
