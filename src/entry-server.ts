import { VueHeadMixin } from '@unhead/vue/client'
import { createStreamableHead } from '@unhead/vue/stream/server'
import { renderToWebStream } from 'vue/server-renderer'
import { createApp } from '@/main'

export async function render(url: string, template: string) {
  const { app, router } = createApp()
  const { head, wrapStream } = createStreamableHead()

  app.use(head)
  app.mixin(VueHeadMixin)

  // set the router to the desired URL before rendering
  await router.push(url)
  await router.isReady()

  let stream: ReadableStream

  // passing SSR context object which will be available via useSSRContext()
  // @vitejs/plugin-vue injects code into a component's setup() that registers
  // itself on ctx.modules. After the render, ctx.modules would contain all the
  // components that have been instantiated during this render call.
  const ctx = {}
  stream = renderToWebStream(app, ctx)
  stream = await wrapStream(stream, template)

  return { stream }
}
