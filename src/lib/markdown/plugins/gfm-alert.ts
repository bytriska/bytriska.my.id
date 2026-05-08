import type { MarkdownItAlertOptions } from '@mdit/plugin-alert'
import type { MarkdownItAsync } from 'markdown-it-async'
import { alert as alertPlugin } from '@mdit/plugin-alert'
import { ALERT_TYPES } from '../utils'

export function gfmAlertPlugin(md: MarkdownItAsync) {
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

  md.use(alertPlugin, options)
}
