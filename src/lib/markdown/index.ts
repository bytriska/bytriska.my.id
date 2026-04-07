import type { MarkdownItAsync } from 'markdown-it-async'
import slugify from '@sindresorhus/slugify'
import anchorPlugin from 'markdown-it-anchor'
import { full as emojiPlugin } from 'markdown-it-emoji'
import { containerPlugin } from './plugins/container'
import { headersPlugin } from './plugins/headers'
import { clearHighlighter, highlighterPlugin } from './plugins/highlighter'
import { preWrapperPlugin } from './plugins/pre-wrapper'
import { tableWrapperPlugin } from './plugins/table-wrapper'

export function cleanupMdItRenderer() {
  clearHighlighter()
}

export async function setupMdItRenderer(md: MarkdownItAsync) {
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

  // md.use(attrsPlugin) // there a conflict with shiki transformer highlight
  md.use(containerPlugin)
  md.use(emojiPlugin)
  md.use(headersPlugin)
  md.use(highlighterPlugin)
  // md.use(lineNumberPlugin)
  md.use(preWrapperPlugin)
  md.use(tableWrapperPlugin)
}
