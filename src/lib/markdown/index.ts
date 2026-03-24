import type { MarkdownItAsync } from 'markdown-it-async'
import slugify from '@sindresorhus/slugify'
import anchor from 'markdown-it-anchor'
import attrs from 'markdown-it-attrs'
import { full as emoji } from 'markdown-it-emoji'

export function setupMdItRenderer(md: MarkdownItAsync) {
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

  md.use(anchor, {
    slugify: s => slugify(s),
    permalink: anchor.permalink.linkAfterHeader({
      style: 'visually-hidden',
      assistiveText: title => `Permalink to ${title}`,
      visuallyHiddenClass: 'sr-only',
      placement: 'before',
      wrapper: ['<div class="header-anchor-wrapper group relative">', '</div>'],
    }),
  })

  md.use(attrs)
  md.use(emoji)
}
