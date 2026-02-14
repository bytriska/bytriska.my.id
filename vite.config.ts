import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueRouter from "unplugin-vue-router/vite"
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
     vueRouter({
      routesFolder: "src/pages",
     }),
      vue()
    ],
})
