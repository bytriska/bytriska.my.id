import type { MarkdownItAsync } from 'markdown-it-async'

export function tableWrapperPlugin(md: MarkdownItAsync) {
  const tableOpen =
    md.renderer.rules.table_open ||
    function (tokens, idx, options, _env, self) {
      return self.renderToken(tokens, idx, options)
    }

  md.renderer.rules.table_open = function (tokens, idx, options, env, self) {
    return `<div class="table-wrapper">${tableOpen(tokens, idx, options, env, self)}`
  }
  md.renderer.rules.table_close = function () {
    return '</table></div>'
  }
}
