import type { MarkdownItContainerOptions } from '@mdit/plugin-container'
import type { MarkdownItAsync } from 'markdown-it-async'
import { container as _containerPlugin } from '@mdit/plugin-container'
import { extractFenceTitle } from '../utils'

export function containerPlugin(md: MarkdownItAsync) {
  md.use(_containerPlugin, createAlertContainerOptions('tip', md))
  md.use(_containerPlugin, createAlertContainerOptions('info', md))
  md.use(_containerPlugin, createAlertContainerOptions('warning', md))
  md.use(_containerPlugin, createAlertContainerOptions('danger', md))
  md.use(_containerPlugin, createDetailsContainerOptions(md))
  md.use(_containerPlugin, createCodeGroupContainerOptions(md))
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

function createDetailsContainerOptions(md: MarkdownItAsync): MarkdownItContainerOptions {
  const name = 'details'

  return {
    name,
    openRender: (tokens, idx, _opts, _env, self) => {
      const token = tokens[idx]!

      token.attrJoin('class', 'details')
      const attrs = self.renderAttrs(token)
      const title = token.info.trim().slice(name.length).trim() || name.toUpperCase()

      return `<details ${attrs}><summary>${md.renderInline(title)}</summary>`
    },
    closeRender: () => '</details>',
  }
}

function createCodeGroupContainerOptions(md: MarkdownItAsync): MarkdownItContainerOptions {
  const name = 'code-group'
  return {
    name,
    openRender: (tokens, idx, _opts, _env, self) => {
      const token = tokens[idx]!

      let tabs: string = ''
      let checked: string = 'checked'

      for (let i = idx + 1; tokens[i]!.type === 'fence' && tokens[i]!.tag === 'code'; i++) {
        const title = extractFenceTitle(tokens[i]!.info)

        if (title) {
          const htmlName = `${name}-${idx}`
          const htmlId = `${name}-tab-${i}`
          tabs += `<input type="radio" name="${htmlName}" id="${htmlId}" ${checked}><label data-title="${md.utils.escapeHtml(title)}" for="${htmlId}">${title}</label>`

          if (checked) tokens[i]!.info += ' active'
          checked = ''
        }
      }

      token.attrJoin('class', 'code-group')
      const attrs = self.renderAttrs(token)

      if (tabs) return `<div ${attrs}><div class="tabs">${tabs}</div><div class="blocks">`

      return `<div ${attrs}><div class="blocks">`
    },
    closeRender: () => '</div></div>',
  }
}
