import type { MarkdownExit } from 'markdown-exit'
import { isPromise } from '../../utils'
import { extractFenceActive, extractFenceLanguage, FENCE_DEFAULT_LANG } from '../utils'

export function preWrapperPlugin(md: MarkdownExit) {
  const fence = md.renderer.rules.fence!

  md.renderer.rules.fence = (tokens, idx, ...rest) => {
    const token = tokens[idx]!

    const active = extractFenceActive(token.info)
    const lang = extractFenceLanguage(token.info)
    const langWithDefault = lang || FENCE_DEFAULT_LANG

    const copyEl = `<button class="copy-button" data-lang="${langWithDefault}"><span class="sr-only">Copy</span></button>`
    const labelEl = `<span class="label">${lang.toUpperCase()}</span>`

    function finalize(fenced: string) {
      return `<div class="language-${langWithDefault} ${active}">${copyEl}${labelEl}${fenced}</div>`
    }

    const result = fence(tokens, idx, ...rest)
    return isPromise<string>(result) ? result.then(finalize) : finalize(result)
  }
}
