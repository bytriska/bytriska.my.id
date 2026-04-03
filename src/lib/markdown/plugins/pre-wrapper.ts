import type { MarkdownItAsync } from 'markdown-it-async'
import { langRE } from './highlighter'

export function preWrapperPlugin(md: MarkdownItAsync) {
  const fence = md.renderer.rules.fence!
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args
    const token = tokens[idx]!

    token.info = token.info.replace(/\[.*\]/, '')

    const lang = extractLang(token.info)
    const label = lang.replace(/_/g, ' ').toLocaleUpperCase()

    return (
      // eslint-disable-next-line prefer-template
      `<div class="language-${lang}">` +
      `<button class="copy-button" data-lang="${lang}"><span class="sr-only">Copy</span></button>` +
      `<span class="label">${label}</span>` +
      fence(...args) +
      `</div>`
    )
  }
}

function extractLang(info: string) {
  const match = info.match(langRE)

  return match?.[0].toLowerCase() ?? ''
}
