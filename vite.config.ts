import Tailwindcss from '@tailwindcss/vite'
import Vue from '@vitejs/plugin-vue'
import Markdown from "unplugin-vue-markdown/vite"
import VueRouter from "unplugin-vue-router/vite"
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      Markdown({}),
    Tailwindcss(),
     VueRouter({
      routesFolder: "src/pages",
      extensions: [".vue", ".md"]
     }),
      Vue({include: [/\.vue$/, /\.md$/]})
    



    ],
})
