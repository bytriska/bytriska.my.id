// markdown-it plugin to remove line numbers options from code blocks,
// TODO: add line numbers support in the future

import type { MarkdownItAsync } from 'markdown-it-async'

export function lineNumberPlugin(md: MarkdownItAsync) {
  const fence = md.renderer.rules.fence!
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args
    const token = tokens[idx]!
    const rawInfo = token.info || ''

    token.info = rawInfo
      .replace(/:no-line-numbers\b/, '')
      .replace(/:line-numbers(=(\d+))?\b/, '')
      .trim()

    return fence(...args)
  }
}
