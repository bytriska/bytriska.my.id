import type { MarkdownExit, Token } from 'markdown-exit'
import type { MarkdownHeading } from '../../../types'
import strSlugify from '@sindresorhus/slugify'
import { escapeHtml } from '../utils'

export interface RenderTitleOptions {
  shouldAllowHtml: boolean
  shouldEscapeText: boolean
}

export interface TocPluginOptions extends RenderTitleOptions {
  level: number[]
  shouldAllowNested: boolean
  slugify?: (str: string) => string
  format?: (str: string) => string
}

export function tocPlugin(md: MarkdownExit, opts = {} as TocPluginOptions) {
  const {
    level = [2, 3],
    shouldAllowNested = false,
    shouldAllowHtml = false,
    shouldEscapeText = false,
    slugify = strSlugify,
    format,
  } = opts

  md.core.ruler.push('extract_toc', state => {
    const headings: MarkdownHeading[] = []
    const stack: MarkdownHeading[] = []

    const push = (node: MarkdownHeading) => {
      while (stack.length > 0 && (stack.at(-1)?.level ?? 0) >= node.level) {
        stack.pop()
      }

      if (stack.length === 0) headings.push(node)
      else stack.at(-1)!.children.push(node)

      stack.push(node)
    }

    for (const [idx, token] of state.tokens.entries()) {
      if (token.type !== 'heading_open') continue
      if (token.level !== 0 && !shouldAllowNested) continue

      const headingLevel = Number.parseInt(token.tag.slice(1), 10)
      if (!level.includes(headingLevel)) continue

      const contentToken = state.tokens[idx + 1]
      if (!contentToken) continue

      const title = renderTitle(contentToken, {
        shouldAllowHtml,
        shouldEscapeText,
      })

      const slug = token.attrGet('id') ?? slugify!(title)

      push({
        level: headingLevel,
        title: format ? format(title) : title,
        slug,
        path: `#${slug}`,
        children: [],
      })
    }

    state.env.toc = headings

    state.env.frontmatter ??= {}
    state.env.frontmatter.toc = headings
  })
}

function renderTitle(token: Token, opts = {} as RenderTitleOptions) {
  const { shouldAllowHtml = false, shouldEscapeText = true } = opts

  const parts: string[] = []

  const allowedTokenType = ['text', 'emoji', 'code_inline']
  if (shouldAllowHtml) allowedTokenType.push('html_inline')

  const tokens = (token.children ?? []).filter(node => allowedTokenType.includes(node.type))

  for (const node of tokens) {
    if (shouldEscapeText) {
      if (node.type === 'text' || node.type === 'code_inline') parts.push(escapeHtml(node.content))
    }

    parts.push(node.content)
  }

  return parts.join('').trim()
}
