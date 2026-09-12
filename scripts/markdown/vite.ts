import type { Options } from 'unplugin-vue-markdown/types'
import type { Plugin } from 'vite'
import type { Highlighter } from './highlighter.ts'
import { attrs as attrsPlugin } from '@mdit/plugin-attrs'
import slugify from '@sindresorhus/slugify'
import anchorPlugin from 'markdown-it-anchor'
import { full as emojiPlugin } from 'markdown-it-emoji'
import originalMarkdownPlugin from 'unplugin-vue-markdown/vite'
import { isObject } from '../../src/lib/utils.ts'
import { createHighlighter } from './highlighter.ts'
import { containerPlugin } from './plugins/container.ts'
import { gfmAlertPlugin } from './plugins/gfm-alert.ts'
import { preWrapperPlugin } from './plugins/pre-wrapper.ts'
import { tableWrapperPlugin } from './plugins/table-wrapper.ts'
import { tocPlugin } from './plugins/toc.ts'

export default function markdown(userOpts?: Options): Plugin<any> {
  let highlighter: Highlighter

  const defaultMarkdownPluginOptions: Options = {
    wrapperDiv: false,
    headEnabled: false,
    wrapperComponent: resolveLayoutNameByPath,
    markdownSetup: async md => {
      highlighter = createHighlighter()

      md.use(await (md => highlighter.highlighterPlugin(md)))
      md.use(md =>
        anchorPlugin(md as any, {
          slugify,
          permalink: anchorPlugin.permalink.linkAfterHeader({
            placement: 'before',
            wrapper: ['<div class="header-anchor-wrapper">', '</div>'],
            visuallyHiddenClass: 'sr-only',
            assistiveText: title => `Permalink to ${title}`,
          }),
        })
      )

      md.use(tocPlugin)

      md.use(preWrapperPlugin)
      md.use(tableWrapperPlugin)

      md.use(md =>
        attrsPlugin(md as any, {
          left: '[[',
          right: ']]',
        })
      )

      md.use(gfmAlertPlugin)
      md.use(md => containerPlugin(md as any))
      md.use(md => emojiPlugin(md as any))
    },
  }

  const resolvedConfig = mergeConfig(defaultMarkdownPluginOptions, userOpts ?? {})
  const pluginInstance = originalMarkdownPlugin(resolvedConfig)

  return {
    ...pluginInstance,

    name: 'vite-plugin-markdown',
    closeBundle() {
      highlighter?.clearHighlighter()
    },
    configureServer(server) {
      server.httpServer?.on('close', () => highlighter.clearHighlighter())
    },
  }
}

function resolveLayoutNameByPath(id: string): string {
  return id.includes('/posts/') ? 'PostLayout' : 'PageLayout'
}

function mergeConfig(defaults: Options, overrides: Options): Options {
  const merged: Partial<Options> = { ...defaults }

  function isMarkdownSetupFn(value: unknown): value is Options['markdownSetup'] {
    return typeof value === 'function'
  }

  for (const key of Object.keys(overrides) as Array<keyof Options>) {
    const value = overrides[key]
    if (typeof value === 'undefined') continue

    const existing = merged[key]
    if (typeof existing === 'undefined') {
      merged[key] = value as any
      continue
    }

    if (key === 'markdownSetup' && isMarkdownSetupFn(existing) && isMarkdownSetupFn(value)) {
      merged[key] = md => {
        existing(md)
        value(md)
      }
    }

    if (Array.isArray(existing) && Array.isArray(value)) {
      merged[key] = [...existing, ...value] as any
      continue
    }

    if (isObject(existing) && isObject(value)) {
      merged[key] = { ...existing, ...value } as any
      continue
    }

    merged[key] = value as any
  }

  return merged as Options
}
