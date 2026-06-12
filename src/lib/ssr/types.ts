import type { createHead } from '@unhead/vue/server'

export interface ModuleRenderer {
  render: (ctx: RenderContext) => Promise<RenderResult>
}

export interface RenderContext {
  url: string
}

export interface RenderResult {
  html: string
  head: ReturnType<typeof createHead>
}
