import type { MarkdownItAlertOptions } from '@mdit/plugin-alert'
import type { MarkdownExit } from 'markdown-exit'
import { alert as alertPlugin } from '@mdit/plugin-alert'

const ALERT_TYPES = ['note', 'tip', 'important', 'warning', 'caution'] as const

export function gfmAlertPlugin(md: MarkdownExit) {
  const options: MarkdownItAlertOptions = {
    alertNames: [...ALERT_TYPES],
    openRender: (tokens, idx, _opts, _env, self) => {
      const token = tokens[idx]!

      token.attrJoin('class', `alert ${token.markup}`)
      const attrs = self.renderAttrs(token)

      return `<div ${attrs}>`
    },
    closeRender: () => '</div>',
    titleRender: (tokens, idx, _opts, _env, self) => {
      const token = tokens[idx]!

      token.attrJoin('class', 'alert-title')
      const attrs = self.renderAttrs(token)

      return `<div ${attrs}>${token.content}</div>`
    },
  }

  md.use(md => alertPlugin(md as any, options))
}
