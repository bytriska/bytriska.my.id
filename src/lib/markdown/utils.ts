export const HIGHLIGHTER_DEFAULT_LANGUAGE = 'txt'

export const RE_FENCE_ACTIVE = /\bactive\b/
export const RE_FENCE_LANGUAGE = /^(\w[\w-]*)/
export const RE_FENCE_TITLE = /\[((?:[^[\]]|\[[^[\]]*\])*)\]/

export function extractFenceActive(tokenInfo: string): string {
  return tokenInfo.match(RE_FENCE_ACTIVE)?.[0] || ''
}

export function extractFenceLanguage(tokenInfo: string): string {
  return tokenInfo.match(RE_FENCE_LANGUAGE)?.[1] || HIGHLIGHTER_DEFAULT_LANGUAGE
}

export function extractFenceTitle(tokenInfo: string): string {
  return tokenInfo.match(RE_FENCE_TITLE)?.[1] || ''
}
