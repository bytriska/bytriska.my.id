import type { Options } from 'unplugin-vue-markdown/types'
import type { Plugin } from 'vite'
import type { Highlighter } from './highlighter'
import { attrs as attrsPlugin } from '@mdit/plugin-attrs'
import slugify from '@sindresorhus/slugify'
import anchorPlugin from 'markdown-it-anchor'
import { full as emojiPlugin } from 'markdown-it-emoji'
import originalMarkdownPlugin from 'unplugin-vue-markdown/vite'
import { createHighlighter } from './highlighter'
import { containerPlugin } from './plugins/container'
import { gfmAlertPlugin } from './plugins/gfm-alert'
import { preWrapperPlugin } from './plugins/pre-wrapper'
import { tableWrapperPlugin } from './plugins/table-wrapper'
import { tocPlugin } from './plugins/toc'
import { mergeConfig, resolveLayoutNameByPath } from './utils'

export default function markdown(userOpts?: Options): Plugin<any> {
  let highlighter: Highlighter

  const defaultMarkdownPluginOptions: Options = {
    wrapperDiv: false,
    headEnabled: true,
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
