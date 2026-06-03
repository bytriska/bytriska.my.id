import { createHead } from '@unhead/vue/client'
import { createApp } from '@/main'
import '@/styles/app.css'

const { app, router } = createApp()
const head = createHead()

app.use(head)

router.isReady().then(() => {
  app.mount('#app')
})
