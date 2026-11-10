/** browser-only utils */

function parsePx(value: string) {
  return Number.parseFloat(value) || 0
}

/**
 * Check whether user enable reduce motion
 */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Resolve a url hash (#some-id) to an element
 */
export function findHashTarget(hash: string) {
  try {
    const parsed = decodeURIComponent(hash.slice(1))
    return document.getElementById(parsed)
  } catch {
    return null
  }
}

/**
 * Calculate the scroll offset of the target element
 */
export function getScrollOffset(target: Element) {
  return (
    parsePx(getComputedStyle(target).scrollMarginTop)
    + parsePx(getComputedStyle(document.documentElement).scrollPaddingTop)
  )
}