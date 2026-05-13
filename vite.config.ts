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
import { clearHighlighter, createHighlighter, setupMdItRenderer } from './src/lib/markdown'

const RE_MARKDOWN = /\.md$/
const RE_VUE_SFC = /\.vue$/
const RE_VUE_SUBREQUEST = /\.vue\?vue/
const RE_VUE_X_SUBREQUEST = /\.vue\.[jt]sx?\?vue/

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
        markdownItOptions: { highlight: highlighter },
        markdownItSetup: setupMdItRenderer,
      }),

      Components({
        dirs: ['src/components', 'src/layouts'],
        extensions: ['vue'],
        include: [RE_VUE_SFC, RE_VUE_SUBREQUEST, RE_VUE_X_SUBREQUEST, RE_MARKDOWN],
        dts: 'src/components.d.ts',
        resolvers: [IconsResolver()],
      }),

      Icons(),

      Vue({ include: [RE_VUE_SFC, RE_MARKDOWN] }),
    ],
  }
})
