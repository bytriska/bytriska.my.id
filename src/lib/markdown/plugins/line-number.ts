// markdown-it plugin to remove line numbers options from code blocks,
// TODO: add line numbers support in the future

import type { MarkdownItAsync } from 'markdown-it-async'

const RE_NO_LINE_NUMBERS = /:no-line-numbers\b/
const RE_LINE_NUMBERS = /:line-numbers(=(\d+))?\b/

export function lineNumberPlugin(md: MarkdownItAsync) {
  const fence = md.renderer.rules.fence!
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args
    const token = tokens[idx]!
    const rawInfo = token.info || ''

    token.info = rawInfo.replace(RE_NO_LINE_NUMBERS, '').replace(RE_LINE_NUMBERS, '').trim()

    return fence(...args)
  }
}
