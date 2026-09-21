import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

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

export const VUE_EXT_RE = /\.(vue|md)(?:$|\?)/
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

class SafeHtml {
  readonly __safeHtml = true as const
  private readonly __value: string

  constructor(value: string) {
    this.__value = value
  }

  render() {
    return this.__value
  }
}

export function unsafeHtml(value: string): SafeHtml {
  return new SafeHtml(value)
}

export function isSafeHtml(value: unknown): value is SafeHtml {
  return value instanceof SafeHtml
}

const HTML_ESCAPE_RE = /[&<>"']/g
export function escapeHtml(value: unknown): string {
  if (value == null || value === false) return ''
  if (isSafeHtml(value)) return value.render()

  const str = String(value)
  return str.replace(HTML_ESCAPE_RE, char => {
    switch (char) {
      case '&':
        return '&amp;'
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case "'":
        return '&#39;'
      case '"':
        return '&quot;'
      default:
        return char
    }
  })
}

type Interpolated = string | number | boolean | null | undefined | SafeHtml | Interpolated[]

function renderValue(value: Interpolated): string {
  if (Array.isArray(value)) return value.map(renderValue).join('')
  return escapeHtml(value)
}

export function html(strings: TemplateStringsArray, ...values: Interpolated[]): SafeHtml {
  const rendered = strings.reduce((result, str, i) => result + renderValue(values[i - 1]) + str)
  return new SafeHtml(rendered)
}

export function truncate(value: string, max: number) {
  return value.length > max ? `${value.slice(0, max - 1)}...` : value
}

export function parseIntOr(value: string | null, fallback: number) {
  const n = value ? Number.parseInt(value, 10) : Number.NaN
  return Number.isFinite(n) ? n : fallback
}

export function cn(...input: ClassValue[]) {
  return twMerge(clsx(input))
}

export const SAFE_PROTOCOL_RE = /^(https?:|mailto:|tel:|\/\/|[/#?])/i
export function isSafeUrl(url: string): boolean {
  if (!url) return false
  if (!SAFE_PROTOCOL_RE.test(url)) {
    if (import.meta.env.DEV) console.warn(`[Link] Blocked unsafe url: ${url}`)

    return false
  }

  return true
}
