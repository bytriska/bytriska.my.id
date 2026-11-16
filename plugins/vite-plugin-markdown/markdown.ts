import type { ComponentPluginOptions } from '@mdit-vue/plugin-component'
import type { FrontmatterPluginOptions } from '@mdit-vue/plugin-frontmatter'
import type { HeadersPluginOptions } from '@mdit-vue/plugin-headers'
import type { SfcPluginOptions } from '@mdit-vue/plugin-sfc'
import type { MarkdownItOptions } from 'markdown-it'
import type { CreateHighlighterOptions, ThemeOptions } from './highlighter'
import type { Awaitable } from './utils/types'
import { componentPlugin } from '@mdit-vue/plugin-component'
import { frontmatterPlugin } from '@mdit-vue/plugin-frontmatter'
import { headersPlugin } from '@mdit-vue/plugin-headers'
import { sfcPlugin } from '@mdit-vue/plugin-sfc'
import MarkdownIt from 'markdown-it'
import { createHighlighter } from './highlighter'

export interface MarkdownOptions extends CreateHighlighterOptions, MarkdownItOptions {
  /* -------------------- General Options -------------------- */

  /**
   * Configure markdown-it instance before plugins being applied.
   */
  preConfig?: (md: InstanceType<typeof MarkdownIt>) => Awaitable<void>
  /**
   * Configure markdown-it instance after all plugins being applied.
   */
  config?: (md: InstanceType<typeof MarkdownIt>) => Awaitable<void>

  /* -------------------- Syntax Highlighter Options -------------------- */

  /**
   * Configure shiki theme.
   *
   * @example { theme: 'github-dark' }
   * @example { theme: { light: 'github-light', dark: 'github-dark' } }
   */
  theme?: ThemeOptions

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

export interface RenderOptions {
  env: Record<string, unknown>
  signal?: AbortSignal
}

export interface MarkdownRenderer {
  render: (src: string, options: RenderOptions) => Promise<string>
  dispose: () => Promise<void>
}

const SPACES_CHAR_RE = /\s+/

export async function createMarkdownRenderer(options: MarkdownOptions): Promise<MarkdownRenderer> {
  const {
    loadLanguage,
    highlight,
    dispose: disposeHighlighter,
  } = await createHighlighter(options.theme!, options)
  const md = new MarkdownIt({ html: true, linkify: true, highlight, ...options })

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
    return md.utils.unescapeAll(info).trim().split(SPACES_CHAR_RE)[0]
  }

  return {
    async render(src, { env = {}, signal }) {
      signal?.throwIfAborted()
      const tokens = md.parse(src, env)
      const fences = tokens.filter(t => t.type === 'fence')

      /**
       * Load all language used by shiki in parallel.
       */
      const langs = [...new Set(fences.map(t => langOf(t.info)).filter(Boolean))]
      signal?.throwIfAborted()
      await Promise.all(langs.map(l => loadLanguage(l)))

      signal?.throwIfAborted()
      return md.renderer.render(tokens, md.options, env)
    },
    async dispose() {
      disposeHighlighter()
    },
  }
}
