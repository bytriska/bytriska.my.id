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
    parsePx(getComputedStyle(target).scrollMarginTop) +
    parsePx(getComputedStyle(document.documentElement).scrollPaddingTop)
  )
}

function nextFrame() {
  return new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Wait until finite animations and transitions have ended
 * and the DOM updates. Gives up after `timeout`.
 */
export async function animationSettled(timeout: number = 500) {
  const deadline = performance.now() + timeout

  await nextFrame()
  await nextFrame()

  while (performance.now() < deadline) {
    const running = document
      .getAnimations()
      .filter(a => a.effect?.getComputedTiming().iterations !== Infinity)
    if (!running.length) return

    await Promise.race([
      Promise.allSettled(running.map(a => a.finished)),
      sleep(deadline - performance.now()),
    ])

    await nextFrame()
  }
}
