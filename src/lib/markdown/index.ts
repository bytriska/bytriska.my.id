import type { MarkdownItAsync } from 'markdown-it-async'
import { attrs as attrsPlugin } from '@mdit/plugin-attrs'
import anchorPlugin from 'markdown-it-anchor'
import { full as emojiPlugin } from 'markdown-it-emoji'
import { containerPlugin } from './plugins/container'
import { gfmAlertPlugin } from './plugins/gfm-alert'
import { headersPlugin } from './plugins/headers'
import { preWrapperPlugin } from './plugins/pre-wrapper'
import { tableWrapperPlugin } from './plugins/table-wrapper'

export * from './highlighter'

export async function setupMdItRenderer(md: MarkdownItAsync) {
  md.use(anchorPlugin, {
    permalink: anchorPlugin.permalink.linkAfterHeader({
      placement: 'before',
      wrapper: ['<div class="header-anchor-wrapper">', '</div>'],
      visuallyHiddenClass: 'sr-only',
      assistiveText: title => `Permalink to ${title}`,
    }),
  })

  md.use(headersPlugin)

  md.use(preWrapperPlugin)
  md.use(tableWrapperPlugin)

  md.use(attrsPlugin, {
    left: '[[',
    right: ']]',
  })

  md.use(gfmAlertPlugin)
  md.use(containerPlugin)
  md.use(emojiPlugin)
}
