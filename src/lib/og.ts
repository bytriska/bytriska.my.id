import type { ImageResponseOptions } from 'takumi-js/response'
import type { FontLoader } from 'takumi-js/wasm'
import type { BaseMeta, OgSize, OgSizeKey } from '@/types'
import {
  OG_IMAGE_FORMAT,
  OG_IMAGE_SIZES,
  OG_IMAGE_URL_PATHNAME,
  SITE_NAME,
  SITE_URL,
} from '@/constants'
import { html, parseIntOr } from '@/lib/utils'
import appcss from '@/styles/app.css?inline'

const MIN_DIMENSION = 200
const MAX_DIMENSION = 2400

function clamp(n: number) {
  return Math.min(MAX_DIMENSION, Math.max(MIN_DIMENSION, n))
}

function getDimension(params: URLSearchParams) {
  const size = (params.get('size') ?? 'default') as OgSizeKey
  const defaultSize = (OG_IMAGE_SIZES[size] ?? OG_IMAGE_SIZES.default) as OgSize

  const width = clamp(parseIntOr(params.get('width'), defaultSize.width))
  const height = clamp(parseIntOr(params.get('height'), defaultSize.height))
  return { width, height }
}

export async function getImageResponseOptions({
  assets,
  requestUrl,
}: {
  assets: Fetcher
  requestUrl: URL
}): Promise<ImageResponseOptions> {
  const { width, height } = getDimension(requestUrl.searchParams)
  const geistFont: Promise<FontLoader> = assets
    .fetch(new URL('/fonts/Geist-Variable.woff2', requestUrl.origin))
    .then(async res => ({
      name: 'Geist',
      range: [[100, 900]],
      data: await res.arrayBuffer(),
    }))

  return {
    width,
    height,
    css: appcss,
    format: OG_IMAGE_FORMAT,
    fonts: await Promise.all([geistFont]),
  }
}

export interface OgTemplateProps {
  title: string
  description?: string
}

export function defaultOgTemplate(props: OgTemplateProps): string {
  const template = html`
<div class="size-full flex flex-col justify-between bg-ui-surface-base text-ui-content-base p-16">
  <div class="flex flex-col gap-4">
    <h1 class="text-7xl font-extrabold text-ellipsis line-clamp-2 text-pretty m-0">${props.title}</h1>
    <p class="text-4xl text-ellipsis line-clamp-2 text-pretty m-0">${props.description ?? ''}</p>
  </div>
  <div class="flex flex-row gap-2>
    <p class="text-3xl font-semibold m-0">${SITE_NAME}</p>
  </div>
</div>
`

  return template.render()
}

export interface GetOgUrlOptions {
  size?: OgSizeKey
}

export function getOgUrl(
  meta: Pick<BaseMeta, 'title' | 'description'>,
  options: GetOgUrlOptions = {}
) {
  const params = new URLSearchParams({ title: meta.title, description: meta.description })
  if (options.size) params.append('size', options.size)

  return `${SITE_URL}${OG_IMAGE_URL_PATHNAME}?${params.toString()}`
}
