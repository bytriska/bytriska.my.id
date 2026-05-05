import type { MarkdownItAsync } from 'markdown-it-async'

export function tableWrapperPlugin(md: MarkdownItAsync) {
  md.renderer.rules.table_open = function (tokens, idx, options, _env, self) {
    return `<div class="table-wrapper">${self.renderToken(tokens, idx, options)}`
  }

  md.renderer.rules.table_close = function () {
    return '</table></div>'
  }
}
