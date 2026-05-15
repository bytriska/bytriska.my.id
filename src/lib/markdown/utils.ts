export const HIGHLIGHTER_DEFAULT_LANGUAGE = 'txt'

export const ALERT_TYPES = ['note', 'tip', 'important', 'warning', 'caution'] as const

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
