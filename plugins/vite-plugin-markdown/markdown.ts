import type { ComponentPluginOptions } from '@mdit-vue/plugin-component'
import type { FrontmatterPluginOptions } from '@mdit-vue/plugin-frontmatter'
import type { HeadersPluginOptions } from '@mdit-vue/plugin-headers'
import type { SfcPluginOptions } from '@mdit-vue/plugin-sfc'
import type { Env, MarkdownItOptions } from 'markdown-it'
import type { CreateHighlighterOptions } from './highlighter.ts'
import type { Awaitable } from './utils/types.ts'
import { componentPlugin } from '@mdit-vue/plugin-component'
import { frontmatterPlugin } from '@mdit-vue/plugin-frontmatter'
import { headersPlugin } from '@mdit-vue/plugin-headers'
import { sfcPlugin } from '@mdit-vue/plugin-sfc'
import MarkdownIt from 'markdown-it'
import { createHighlighter } from './highlighter.ts'

export type MarkdownHooks = (md: InstanceType<typeof MarkdownIt>) => Awaitable<void>

export interface MarkdownOptions extends CreateHighlighterOptions, MarkdownItOptions {
  /* -------------------- General Options -------------------- */

  /**
   * Configure markdown-it instance before plugins being applied.
   */
  preConfig?: MarkdownHooks
  /**
   * Configure markdown-it instance after all plugins being applied.
   */
  config?: MarkdownHooks

  /* -------------------- Vue Integration -------------------- */

  /**
   * Options for '@mdit-vue/plugin-component'.
   */
  component?: ComponentPluginOptions
  /**
   * Options for '@mdit-vue/plugin-frontmatter'.
   */
  frontmatter?: FrontmatterPluginOptions
  /**
   * Options for '@mdit-vue/plugin-headers'.
   */
  headers?: HeadersPluginOptions
  /**
   * Options for '@mdit-vue/plugin-sfc'.
   */
  sfc?: SfcPluginOptions
}

export interface RenderResult {
  html: string
  frontmatter: Env['frontmatter']
  headers: Env['headers']
  sfc: Env['sfcBlocks']
}

export interface MarkdownRenderer {
  render: (source: string) => Promise<RenderResult>
  dispose: () => Promise<void>
}

const SPACES_CHAR_RE = /\s+/

export async function createMarkdownRenderer(options: MarkdownOptions): Promise<MarkdownRenderer> {
  const highlighter = await createHighlighter(options)
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    highlight: highlighter.highlight,
    ...options,
  })

  md.linkify.set({ fuzzyLink: false })

  if (options.preConfig) {
    await options.preConfig(md)
  }

  ;(options.frontmatter ??= {}).grayMatterOptions ??= {}

  componentPlugin(md, options.component)
  frontmatterPlugin(md, options.frontmatter)
  headersPlugin(md, options.headers)
  sfcPlugin(md, options.sfc)

  if (options.config) {
    await options.config(md)
  }

  function langOf(info: string) {
    return md.utils.unescapeAll(info).trim().split(SPACES_CHAR_RE)[0] ?? ''
  }

  return {
    async render(source) {
      const env = {} as Env
      const tokens = md.parse(source, env)

      /**
       * Load every language the document uses in parallel
       */
      const langs = [
        ...new Set(tokens.filter(t => t.type === 'fence').map(t => langOf(t.info))),
      ].filter(Boolean)
      await highlighter.loadLanguage(langs)

      const html = md.renderer.render(tokens, md.options, env)

      return {
        html,
        frontmatter: env.frontmatter,
        headers: env.headers,
        sfc: env.sfcBlocks,
      }
    },
    async dispose() {
      highlighter.dispose()
    },
  }
}
