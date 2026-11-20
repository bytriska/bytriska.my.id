import type { Plugin } from 'vite'
import type { HighlighterHooks } from './highlighter.ts'
import type { MarkdownHooks, MarkdownOptions, RenderResult } from './markdown.ts'
import { createMarkdownRenderer } from './markdown.ts'

interface RawMarkdownOptions extends Partial<MarkdownOptions> {}

interface CacheEntry {
  source: string
  output: Promise<string>
}

export interface Options {
  /**
   * Apply layout wrapper to the rendered markdown.
   * @default ({html}) => `<div>${html}</div>`
   */
  applyTemplate?: (result: RenderResult) => string
  /**
   * Configure markdown renderer
   */
  markdown?: RawMarkdownOptions
}

const MARKDOWN_RE = /\.md$/

export function markdown(options: Options = {}): Plugin {
  const resolvedOptions = resolveOptions(options)
  const cache = new Map<string, CacheEntry>()

  let renderContext: Promise<RenderContext> | undefined

  function getRenderContext() {
    return (renderContext ??= createRenderContext(resolvedOptions.markdown).catch(e => {
      renderContext = undefined
      throw e
    }))
  }

  async function disposeRenderContext() {
    if (!renderContext) return

    const current = renderContext
    renderContext = undefined

    await current.then(
      ctx => ctx.dispose(),
      () => {}
    )
  }

  async function compile(source: string) {
    const ctx = await getRenderContext()
    const result = await ctx.render(source)

    const templateBlock = `<template>${resolvedOptions.applyTemplate(result)}</template>`

    return [
      result.sfc?.script?.content,
      result.sfc?.scriptSetup?.content,
      templateBlock,
      ...(result.sfc?.styles.map(b => b.content) ?? []),
      ...(result.sfc?.customBlocks.map(b => b.content) ?? []),
    ]
      .filter(Boolean)
      .join('\n')
  }

  return {
    name: 'local:vite-plugin-markdown',
    load: {
      filter: { id: MARKDOWN_RE },
      async handler(id) {
        this.environment.logger.info(`\n[vite-plugin-markdown] Loading file ${id}`)
        const source = await this.fs.readFile(id, { encoding: 'utf8' })

        const hit = cache.get(id)
        if (hit && hit.source === source) return hit.output

        this.environment.logger.info(`\n[vite-plugin-markdown] Rendering ${id}`)
        const output = compile(source)
        const entry: CacheEntry = { source, output }
        cache.set(id, entry)

        /**
         * Never cache a failure, the check is to prevent changing new entry
         * over a late failure entry from pending process.
         */
        output.catch(() => {
          if (cache.get(id) === entry) cache.delete(id)
        })

        return output
      },
    },
    configureServer(server) {
      server.httpServer?.once('close', disposeRenderContext)
    },
    async closeBundle() {
      if (this.meta.watchMode) return
      await disposeRenderContext()
    },
    async closeWatcher() {
      await disposeRenderContext()
    },
  }
}

interface ResolvedOptions extends Options {
  applyTemplate: (result: RenderResult) => string
  markdown: MarkdownOptions
}

function resolveOptions(options: Options): ResolvedOptions {
  const defaults: ResolvedOptions = {
    applyTemplate: ({ html }) => `<div>${html}</div>`,
    markdown: {
      theme: { light: 'github-light', dark: 'github-dark' },
      languages: [],
    },
  }

  return mergeOptions(defaults, options)
}

interface RenderContext {
  render: (source: string) => Promise<RenderResult>
  dispose: () => Promise<void>
}

async function createRenderContext(options: MarkdownOptions): Promise<RenderContext> {
  const renderer = await createMarkdownRenderer(options)
  const queue = new Set<Promise<unknown>>()

  let disposing: Promise<void> | undefined

  return {
    render(source) {
      if (disposing) {
        return Promise.reject(new Error('[vite-plugin-markdown] RenderContext is disposed'))
      }

      const task = renderer.render(source)
      queue.add(task)

      /** force promise to resolve, so it never cause unhandled rejection */
      const settle = () => void queue.delete(task)
      task.then(settle, settle)

      return task
    },
    async dispose() {
      return (disposing ??= (async function () {
        await Promise.allSettled(queue)
        await renderer.dispose()
      })())
    },
  }
}

function mergeOptions<A extends object, B extends object>(
  defaults: A,
  overrides: B,
  isRoot: boolean = true
): A & B {
  const merged: Record<string, any> = { ...defaults }

  for (const key in overrides) {
    const value = overrides[key]
    if (value == null) continue

    const existing = merged[key]
    if (Array.isArray(existing) && Array.isArray(value)) {
      merged[key] = [...existing, ...value] as any
      continue
    }

    if (isObject(existing) && isObject(value)) {
      if (isRoot && key === 'markdown') {
        merged[key] = mergeMarkdownOptions(existing, value)
      } else {
        merged[key] = mergeOptions(existing, value, false)
      }
      continue
    }

    merged[key] = value as any
  }

  return merged as A & B
}

function mergeMarkdownOptions(a: RawMarkdownOptions, b: RawMarkdownOptions) {
  const merged = mergeOptions(a, b, false)
  merged.preConfig = mergeMarkdownHooks(a.preConfig, b.preConfig)
  merged.config = mergeMarkdownHooks(a.config, b.config)
  merged.shikiConfig = mergeHighlighterHooks(a.shikiConfig, b.shikiConfig)
  return merged
}

function mergeMarkdownHooks(
  a: MarkdownHooks | undefined,
  b: MarkdownHooks | undefined
): MarkdownHooks | undefined {
  if (!a || !b) {
    return a ?? b
  }

  return async function (md) {
    await a(md)
    await b(md)
  }
}

function mergeHighlighterHooks(
  a: HighlighterHooks | undefined,
  b: HighlighterHooks | undefined
): HighlighterHooks | undefined {
  if (!a || !b) {
    return a ?? b
  }

  return async function (hl) {
    await a(hl)
    await b(hl)
  }
}

function isObject(value: unknown): value is Record<string, any> {
  return Object.prototype.toString.call(value) === '[object Object]'
}
