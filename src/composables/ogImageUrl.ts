import type { MaybeRefOrGetter } from 'vue'
import type { BaseMeta, OgSizeKey } from '@/types'
import { computed, toValue } from 'vue'
import { OG_IMAGE_URL_PATHNAME, SITE_URL } from '@/constants'

export interface UseOgImageUrlOptions {
  size?: MaybeRefOrGetter<OgSizeKey>
}

export function useOgImageUrl(
  meta: MaybeRefOrGetter<Pick<BaseMeta, 'title' | 'description'>>,
  options: UseOgImageUrlOptions = {}
) {
  return computed(() => {
    const payload = toValue(meta)
    const params = new URLSearchParams({ title: payload.title, description: payload.description })

    const size = toValue(options.size)
    if (size) params.append('size', size)

    return `${SITE_URL}${OG_IMAGE_URL_PATHNAME}?${params.toString()}`
  })
}
