import type { MarkdownItAsync } from 'markdown-it-async'
import { extractFenceActive, extractFenceLanguage } from '../utils'

export function preWrapperPlugin(md: MarkdownItAsync) {
  const fence = md.renderer.rules.fence!

  md.renderer.rules.fence = (tokens, idx, ...rest) => {
    const token = tokens[idx]!

    const active = extractFenceActive(token.info)
    const lang = extractFenceLanguage(token.info)

    const copyEl = `<button class="copy-button" data-lang="${lang}"><span class="sr-only">Copy</span></button>`
    const labelEl = `<span class="label">${lang.toUpperCase()}</span>`

    return `<div class="language-${lang} ${active}">${copyEl}${labelEl}${fence(tokens, idx, ...rest)}</div>`
  }
}
