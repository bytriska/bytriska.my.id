import type { MarkdownIt } from 'markdown-it'
import type { Plugin } from 'vite'
import type { MarkdownOptions } from './markdown'
import type { Awaitable } from './utils/types'
import { createMarkdownRenderer } from './markdown'

export interface Options {
  markdown?: MarkdownOptions
}
const MARKDOWN_RE = /\.md$/

export async function markdown(options: Options = {}): Promise<Plugin> {
  const resolvedOptions = resolveOptions(options)
  const markdownRenderer = await createMarkdownRenderer(resolvedOptions.markdown)

  const lifecycle = new AbortController()
  const renderEnv = {}
  return {
    name: 'local:vite-plugin-markdown',
    async load(id) {
      if (!MARKDOWN_RE.test(id)) return

      const str = await this.fs.readFile(id, { encoding: 'utf8' })
      return markdownRenderer.render(str, { env: renderEnv, signal: lifecycle.signal })
    },
    configureServer(server) {
      server.httpServer?.on('close', async () => {
        lifecycle.abort()
        await markdownRenderer.dispose()
      })
    },
    async closeBundle() {
      lifecycle.abort()
      await markdownRenderer.dispose()
    },
  }
}

interface ResolvedOptions extends Options {
  markdown: MarkdownOptions
}

function resolveOptions(options: Options): ResolvedOptions {
  const defaults: ResolvedOptions = {
    markdown: {
      theme: { light: 'github-light', dark: 'github-dark' },
    },
  }

  return mergeOptions(defaults, options)
}

function mergeOptions<A extends object, B extends object>(defaults: A, overrides: B): A & B {
  const merged: Record<string, any> = { ...defaults }

  for (const key in overrides) {
    const value = overrides[key]
    if (typeof value === 'undefined') continue

    const existing = merged[key]
    if (typeof existing === 'undefined') {
      merged[key] = value as any
      continue
    }

    if (Array.isArray(existing) && Array.isArray(value)) {
      merged[key] = [...existing, ...value] as any
      continue
    }

    if (isObject(existing) && isObject(value)) {
      if (key === 'markdown') {
        merged[key] = mergeMarkdownOptions(existing, value)
      }
      continue
    }

    merged[key] = value as any
  }

  return merged as A & B
}

function mergeMarkdownOptions(a: MarkdownOptions, b: MarkdownOptions) {
  const merged = mergeOptions(a, b)
  merged.preConfig = mergeMarkdownHooks(a.preConfig, b.preConfig)
  merged.config = mergeMarkdownHooks(a.config, b.config)
  return merged
}

type MarkdownHooks = ((md: InstanceType<typeof MarkdownIt>) => Awaitable<void>) | undefined
function mergeMarkdownHooks(a: MarkdownHooks, b: MarkdownHooks): MarkdownHooks {
  if (!a || !b) {
    return a ?? b
  }

  return async function (md) {
    await a(md)
    await b(md)
  }
}

function isObject(value: unknown): value is Record<string, any> {
  return Object.prototype.toString.call(value) === '[object Object]'
}
