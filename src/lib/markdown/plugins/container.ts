import type { MarkdownItContainerOptions } from '@mdit/plugin-container'
import type { MarkdownItAsync } from 'markdown-it-async'
import { container as _containerPlugin } from '@mdit/plugin-container'

export function containerPlugin(md: MarkdownItAsync) {
  md.use(_containerPlugin, createAlertContainerOptions('tip', md))
  md.use(_containerPlugin, createAlertContainerOptions('info', md))
  md.use(_containerPlugin, createAlertContainerOptions('warning', md))
  md.use(_containerPlugin, createAlertContainerOptions('danger', md))
}

function createAlertContainerOptions(
  name: string,
  md: MarkdownItAsync
): MarkdownItContainerOptions {
  return {
    name,
    openRender: (tokens, idx, _opts, _env, self) => {
      const token = tokens[idx]!

      token.attrJoin('class', `alert ${name}`)
      const attrs = self.renderAttrs(token)
      const title = token.info.trim().slice(name.length).trim() || name.toUpperCase()

      return `<div ${attrs}><div class="alert-title">${md.renderInline(title)}</div>`
    },
  }
}
