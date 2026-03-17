import path from 'node:path'
import Tailwindcss from '@tailwindcss/vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Markdown({
      wrapperComponent: 'DefaultLayout',
      wrapperClasses:
        'grow w-full max-w-7xl flex items-center justify-center mx-auto px-4 sm:px-6 lg:px-8',
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
    }),

    Vue({ include: [/\.vue$/, /\.md$/] }),
  ],
})
