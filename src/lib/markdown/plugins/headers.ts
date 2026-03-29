import type { HeadersPluginOptions } from '@mdit-vue/plugin-headers'
import type { MarkdownItAsync } from 'markdown-it-async'
import type { MarkdownItHeader } from '@/types'
import { headersPlugin as _headersPlugin } from '@mdit-vue/plugin-headers'

/**
 * Enhanced headers plugin for markdown-it that integrates with Vue layouts.
 *
 * This plugin wraps the @mdit-vue/plugin-headers to ensure that extracted headers
 * are accessible in Vue layouts through the frontmatter. The original plugin adds
 * headers to the rendering environment, but these aren't exported in wrapper components
 * used for layouts. This wrapper merges headers into frontmatter as `_headers`.
 *
 * @param md - The markdown-it-async instance to extend
 * @param opts - Optional configuration for the headers plugin
 */
export function headersPlugin(md: MarkdownItAsync, opts?: HeadersPluginOptions) {
  md.use(_headersPlugin, opts)

  // Override the render method to merge headers into frontmatter
  // This ensures headers are accessible in Vue layouts via frontmatter._headers
  const originalRender = md.render.bind(md)
  md.render = (src, env = {}) => {
    const result = originalRender(src, env)

    // If headers were extracted during rendering, merge them into frontmatter
    if (env.headers) {
      env.frontmatter ??= {}
      env.frontmatter._headers = normalizeHeaders(env.headers)
    }

    return result
  }
}

function normalizeHeaders(headers: MarkdownItHeader[]): MarkdownItHeader[] {
  if (!headers.length) return []

  const hasTree = headers.some(h => h.children && h.children.length > 0)
  if (hasTree) return headers

  const root: MarkdownItHeader[] = []
  const stack: MarkdownItHeader[] = []

  for (const hdr of headers) {
    const node: MarkdownItHeader = { ...hdr, children: [] }

    while (stack.length && stack[stack.length - 1]!.level >= node.level) {
      stack.pop()
    }

    if (!stack.length) {
      root.push(node)
    } else {
      stack[stack.length - 1]!.children!.push(node)
    }

    stack.push(node)
  }

  return root
}
