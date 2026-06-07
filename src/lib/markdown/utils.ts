import type { Options } from 'unplugin-vue-markdown/types'
import { isObject } from '../utils'

export const ALERT_TYPES = ['note', 'tip', 'important', 'warning', 'caution'] as const

export const FENCE_DEFAULT_LANG = 'txt'
export const FENCE_DEFAULT_THEMES = { light: 'vitesse-light', dark: 'vitesse-dark' }
export const FENCE_ACTIVE_RE = /\bactive\b/
export const FENCE_LANGUAGE_RE = /^(\w[\w-]*)/
export const FENCE_TITLE_RE = /\[((?:[^[\]]|\[[^[\]]*\])*)\]/

export function extractFenceActive(tokenInfo: string): string {
  return tokenInfo.match(FENCE_ACTIVE_RE)?.[0] ?? ''
}

export function extractFenceLanguage(tokenInfo: string): string {
  return tokenInfo.match(FENCE_LANGUAGE_RE)?.[1]?.toLowerCase() ?? ''
}

export function extractFenceTitle(tokenInfo: string): string {
  return tokenInfo.match(FENCE_TITLE_RE)?.[1] ?? ''
}

const HTML_ESCAPE_TEST_RE = /[&<>'"]/
const HTML_ESCAPE_REPLACE_RE = /[&<>'"]/g
const HTML_REPLACEMENTS: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;',
}

function replaceUnsafeChar(ch: string): string {
  return HTML_REPLACEMENTS[ch]!
}

export function escapeHtml(str: string): string {
  if (HTML_ESCAPE_TEST_RE.test(str)) return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar)

  return str
}

export function resolveLayoutNameByPath(id: string): string {
  return id.includes('/posts/') ? 'PostLayout' : 'PageLayout'
}

export function mergeConfig(defaults: Options, overrides: Options): Options {
  const merged: Partial<Options> = { ...defaults }

  function isMarkdownSetupFn(value: unknown): value is Options['markdownSetup'] {
    return typeof value === 'function'
  }

  for (const key of Object.keys(overrides) as Array<keyof Options>) {
    const value = overrides[key]
    if (typeof value === 'undefined') continue

    const existing = merged[key]
    if (typeof existing === 'undefined') {
      merged[key] = value as any
      continue
    }

    if (key === 'markdownSetup' && isMarkdownSetupFn(existing) && isMarkdownSetupFn(value)) {
      merged[key] = md => {
        existing(md)
        value(md)
      }
    }

    if (Array.isArray(existing) && Array.isArray(value)) {
      merged[key] = [...existing, ...value] as any
      continue
    }

    if (isObject(existing) && isObject(value)) {
      merged[key] = { ...existing, ...value } as any
      continue
    }

    merged[key] = value as any
  }

  return merged as Options
}
