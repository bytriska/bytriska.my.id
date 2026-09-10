import type { NavigationItem, OgSize, OgSizeKey } from './types'

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { title: 'Home', path: '/' },
  { title: 'Posts', path: '/posts' },
  { title: 'Post Guide', path: '/posts/writing-guide' },
]

export const SITE_NAME = 'Bytriska'
export const SITE_TITLE = 'Triska Mahfud Khoiri'
export const SITE_TITLE_TEMPLATE = '%s | Bytriska'
export const SITE_URL = 'https://bytriska.my.id'

export const OG_IMAGE_URL_PATHNAME = '/og/image.webp'
export const OG_IMAGE_FORMAT = 'webp'
export const OG_IMAGE_SIZES: Record<OgSizeKey, OgSize> = {
  default: { width: 1200, height: 630 },
  twitter: { width: 1200, height: 675 },
  square: { width: 1200, height: 1200 },
} as const
