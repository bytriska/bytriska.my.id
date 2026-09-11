import type { BaseMeta } from '@/types'
import { useSeoMeta } from '@unhead/vue'
import { toValue } from 'vue'
import { OG_IMAGE_FORMAT, OG_IMAGE_SIZES, SITE_TITLE, SITE_TITLE_TEMPLATE } from '@/constants'
import { getOgUrl } from '@/lib/og'

export function useSeo(meta: BaseMeta) {
  const title = SITE_TITLE_TEMPLATE.replace('%s', meta.title ?? SITE_TITLE)
  const ogImageUrl = getOgUrl(meta)

  useSeoMeta({
    title,
    description: meta.description,
    ogTitle: title,
    ogDescription: meta.description,
    ogImage: {
      url: toValue(ogImageUrl),
      type: `image/${OG_IMAGE_FORMAT}`,
      alt: meta.title,
      width: OG_IMAGE_SIZES.default?.width,
      height: OG_IMAGE_SIZES.default?.height,
    },
  })
}
