import type { MarkdownItContainerOptions } from '@mdit/plugin-container'
import type { MarkdownItAsync } from 'markdown-it-async'
import { container as _containerPlugin } from '@mdit/plugin-container'

export function containerPlugin(md: MarkdownItAsync) {
  md.use(_containerPlugin, createAlertContainerOptions('tip'))
  md.use(_containerPlugin, createAlertContainerOptions('info'))
  md.use(_containerPlugin, createAlertContainerOptions('warning'))
  md.use(_containerPlugin, createAlertContainerOptions('danger'))
}

function createAlertContainerOptions(name: string): MarkdownItContainerOptions {
  return {
    name,
    openRender: (tokens, idx, _opts, _env, self) => {
      const token = tokens[idx]!

      token.attrJoin('class', `alert ${name}`)
      const attrs = self.renderAttrs(token)
      const title = token.info.trim().slice(name.length).trim() || name.toUpperCase()

      return `<div ${attrs}><div class="alert-title">${title}</div>`
    },
  }
}
