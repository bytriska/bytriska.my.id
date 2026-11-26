import type { MarkdownIt } from 'markdown-it'
import { normalizeFenceInfo, parseFenceInfo } from '../utils/parse.ts'
import { escapeVueProps } from '../utils/render.ts'

export function codeBlockPlugin(md: InstanceType<typeof MarkdownIt>) {
  const fence = md.renderer.rules.fence!

  md.renderer.rules.fence = (tokens, idx, ...rest) => {
    const token = tokens[idx]

    const normalizedInfo = normalizeFenceInfo(token.info)
    const parsedInfo = parseFenceInfo(normalizedInfo)

    const props = escapeVueProps({
      language: parsedInfo.language ?? 'txt',
      title: parsedInfo.title,
      class: { 'line-numbers': !!parsedInfo.lineNumbers },
      style:
        typeof parsedInfo.lineNumbers === 'number'
          ? { '--line-numbers-start': String(parsedInfo.lineNumbers) }
          : undefined,
    })

    token.info = normalizedInfo

    const pre = fence(tokens, idx, ...rest)
    return `<CodeBlock v-bind="${props}">${pre}</CodeBlock>`
  }
}
