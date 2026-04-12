export const RE_FENCE_ACTIVE = /\bactive\b/
export const RE_FENCE_TITLE = /\[((?:[^[\]]|\[[^[\]]*\])*)\]/

export function extractFenceActive(tokenInfo: string): string | undefined {
  return tokenInfo.match(RE_FENCE_ACTIVE)?.[0]
}

export function extractFenceTitle(tokenInfo: string): string | undefined {
  return tokenInfo.match(RE_FENCE_TITLE)?.[1]
}
