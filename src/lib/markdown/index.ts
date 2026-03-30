import type { MarkdownItAsync } from 'markdown-it-async'
import shikiPlugin from '@shikijs/markdown-it'
import {
  transformerMetaHighlight,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
} from '@shikijs/transformers'
import slugify from '@sindresorhus/slugify'
import anchorPlugin from 'markdown-it-anchor'
import attrsPlugin from 'markdown-it-attrs'
import { full as emojiPlugin } from 'markdown-it-emoji'
import { headersPlugin } from './plugins/headers'
import { lineNumberPlugin } from './plugins/line-number'

export async function setupMdItRenderer(md: MarkdownItAsync) {
  const tableOpen =
    md.renderer.rules.table_open ||
    function (tokens, idx, options, _env, self) {
      return self.renderToken(tokens, idx, options)
    }

  md.renderer.rules.table_open = function (tokens, idx, options, env, self) {
    return `<div class="table-wrapper">${tableOpen(tokens, idx, options, env, self)}`
  }
  md.renderer.rules.table_close = function () {
    return '</table></div>'
  }

  md.use(anchorPlugin, {
    slugify: s => slugify(s),
    permalink: anchorPlugin.permalink.linkAfterHeader({
      style: 'visually-hidden',
      assistiveText: title => `Permalink to ${title}`,
      visuallyHiddenClass: 'sr-only',
      placement: 'before',
      wrapper: ['<div class="header-anchor-wrapper">', '</div>'],
    }),
  })

  md.use(
    await shikiPlugin({
      themes: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      },
      transformers: [
        transformerMetaHighlight(),
        transformerNotationDiff(),
        transformerNotationFocus({
          classActiveLine: 'has-focus',
          classActivePre: 'has-focused-lines',
        }),
        transformerNotationHighlight(),
        transformerNotationErrorLevel(),
      ],
    })
  )

  md.use(attrsPlugin)
  md.use(emojiPlugin)
  md.use(headersPlugin)
  md.use(lineNumberPlugin)
}
