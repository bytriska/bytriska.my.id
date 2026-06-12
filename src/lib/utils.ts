export function isPromise<T = unknown>(value: unknown): value is Promise<T> {
  return (
    value instanceof Promise ||
    (typeof value === 'object' &&
      value !== null &&
      'then' in value &&
      typeof (value as Record<string, unknown>).then === 'function' &&
      'catch' in value &&
      typeof (value as Record<string, unknown>).catch === 'function')
  )
}

export function isObject(value: unknown): value is Record<string, any> {
  return Object.prototype.toString.call(value) === '[object Object]'
}

const URL_TRAILING_COMPONENTS_RE = /[?#].*$/s
export function cleanUrl(url: string): string {
  return url.replace(URL_TRAILING_COMPONENTS_RE, '')
}

//
export const VUE_EXT_RE = /\.(vue|md)(?:$|\?)/

//
export const JS_EXT_RE = /\.(mjs|jsx?|mts|tsx?)(?:$|\?)/
export const CSS_EXT_RE = /\.(css|less|sass|scss|styl|stylus|pcss|postcss|sss)(?:$|\?)/
export const ASSETS_EXT_RE =
  /\.(apng|bmp|png|jpe?g|jfif|pjpeg|pjp|gif|svg|ico|webp|avif|cur|jxl|mp4|webm|ogg|mp3|wav|flac|aac|opus|mov|m4a|vtt|woff2?|eot|ttf|otf|webmanifest|pdf|txt)(?:$|\?)/

export function isViteAsset(id: string): boolean {
  return (
    id.startsWith('/@') ||
    id.startsWith('/node_modules') ||
    id.includes('__vite') ||
    VUE_EXT_RE.test(id) ||
    JS_EXT_RE.test(id) ||
    CSS_EXT_RE.test(id) ||
    ASSETS_EXT_RE.test(id)
  )
}
