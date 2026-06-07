import fs from 'node:fs'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { Unhead as unhead } from '@unhead/vue/vite'
import vue from '@vitejs/plugin-vue'
import matter from 'gray-matter'
import iconsResolver from 'unplugin-icons/resolver'
import icons from 'unplugin-icons/vite'
import components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import vueRouter from 'vue-router/vite'
import markdown from './src/lib/markdown/vite'

const MARKDOWN_RE = /\.md$/
const VUE_SFC_RE = /\.vue$/
const VUE_SUBREQUEST_RE = /\.vue\?vue/
const VUE_X_SUBREQUEST_RE = /\.vue\.[jt]sx?\?vue/

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    markdown(),
    vueRouter({
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
    components({
      dirs: ['src/components', 'src/layouts'],
      extensions: ['vue'],
      include: [VUE_SFC_RE, VUE_SUBREQUEST_RE, VUE_X_SUBREQUEST_RE, MARKDOWN_RE],
      dts: 'src/components.d.ts',
      resolvers: [iconsResolver()],
    }),
    icons(),
    vue({ include: [VUE_SFC_RE, MARKDOWN_RE] }),
    unhead({ streaming: true }),
  ],
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
})
