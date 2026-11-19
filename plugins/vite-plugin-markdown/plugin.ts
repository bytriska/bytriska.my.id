import type { Env } from 'markdown-it'
import type { Plugin } from 'vite'
import type { HighlighterHooks } from './highlighter'
import type { MarkdownHooks, MarkdownOptions, MarkdownRenderer } from './markdown'
import { createMarkdownRenderer } from './markdown'

interface RawMarkdownOptions extends Partial<MarkdownOptions> {}

export interface Options {
  /**
   * Apply layout wrapper to the rendered markdown.
   * @default (html:string) => `<div>${html}</div>`
   */
  applyTemplate?: (html: string, env: Env) => string
  /**
   * Configure markdown renderer
   */
  markdown?: RawMarkdownOptions
}

const MARKDOWN_RE = /\.md$/

export async function markdown(options: Options = {}): Promise<Plugin> {
  const resolvedOptions = resolveOptions(options)
  const lifecycle = new AbortController()

  let markdownRenderer: MarkdownRenderer

  return {
    name: 'local:vite-plugin-markdown',
    async config() {
      markdownRenderer = await createMarkdownRenderer(resolvedOptions.markdown)
    },
    async load(id) {
      if (!MARKDOWN_RE.test(id)) return

      const renderEnv = {} as Env
      const str = await this.fs.readFile(id, { encoding: 'utf8' })
      const html = await markdownRenderer.render(str, { env: renderEnv, signal: lifecycle.signal })

      const { sfcBlocks } = renderEnv

      /** @todo add some hooks to append or prepend custom script maybe? */
      const rawScriptSetupBlock = sfcBlocks?.scriptSetup?.content
      const rawScriptBlock = sfcBlocks?.script?.content

      const templateBlock = `<template>${resolvedOptions.applyTemplate(html, renderEnv)}</template>`
      const stylesBlocks = sfcBlocks?.styles.map(b => b.content) ?? []
      const customBlocks = sfcBlocks?.customBlocks.map(b => b.content) ?? []
      const vuesfc = [
        rawScriptBlock,
        rawScriptSetupBlock,
        templateBlock,
        ...stylesBlocks,
        ...customBlocks,
      ]

      return vuesfc.filter(Boolean).join('\n')
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
  applyTemplate: (html: string, env: Env) => string
  markdown: MarkdownOptions
}

function resolveOptions(options: Options): ResolvedOptions {
  const defaults: ResolvedOptions = {
    applyTemplate: (html: string) => `<div>${html}</div>`,
    markdown: {
      theme: { light: 'github-light', dark: 'github-dark' },
      languages: [],
    },
  }

  return mergeOptions(defaults, options)
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
