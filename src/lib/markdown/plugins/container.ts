import type { MarkdownItContainerOptions } from '@mdit/plugin-container'
import type { MarkdownExit } from 'markdown-exit'
import { container as _containerPlugin } from '@mdit/plugin-container'
import { ALERT_TYPES, extractFenceTitle } from '../utils'

export function containerPlugin(md: MarkdownExit) {
  for (const name of ALERT_TYPES) {
    md.use(md => _containerPlugin(md as any, createAlertContainerOptions(name, md)))
  }

  md.use(md => _containerPlugin(md as any, createDetailsContainerOptions(md)))
  md.use(md => _containerPlugin(md as any, createCodeGroupContainerOptions(md)))
}

function createAlertContainerOptions(name: string, md: MarkdownExit): MarkdownItContainerOptions {
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

function createDetailsContainerOptions(md: MarkdownExit): MarkdownItContainerOptions {
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

function createCodeGroupContainerOptions(md: MarkdownExit): MarkdownItContainerOptions {
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
