import type { MarkdownExit } from 'markdown-exit'
import { attrs as attrsPlugin } from '@mdit/plugin-attrs'
import slugify from '@sindresorhus/slugify'
import anchorPlugin from 'markdown-it-anchor'
import { full as emojiPlugin } from 'markdown-it-emoji'
import { containerPlugin } from './plugins/container'
import { gfmAlertPlugin } from './plugins/gfm-alert'
import { preWrapperPlugin } from './plugins/pre-wrapper'
import { tableWrapperPlugin } from './plugins/table-wrapper'
import { tocPlugin } from './plugins/toc'

export * from './highlighter'

export async function markdown(md: MarkdownExit) {
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
}
