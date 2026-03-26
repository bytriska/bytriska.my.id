import path from 'node:path'
import Tailwindcss from '@tailwindcss/vite'
import Vue from '@vitejs/plugin-vue'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import { setupMdItRenderer } from './src/lib/markdown'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Markdown({
      wrapperComponent: 'PostLayout',
      wrapperClasses:
        'prose grow w-full max-w-7xl mx-auto pt-8 px-6 pb-16 md:pt-12 md:px-8 md:pb-24 lg:pb-0',
      markdownItSetup: md => setupMdItRenderer(md),
    }),

    Tailwindcss(),

    VueRouter({
      routesFolder: 'src/pages',
      extensions: ['.vue', '.md'],
      dts: 'src/typed-router.d.ts',
    }),

    Components({
      dirs: ['src/components', 'src/layouts'],
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
      resolvers: [IconsResolver()],
    }),

    Icons(),

    Vue({ include: [/\.vue$/, /\.md$/] }),
  ],
})
