<script lang="ts">
import type { AnchorHTMLAttributes } from 'vue'
import type { RouteLocationRaw, RouterLinkProps } from 'vue-router'
import type { LinkVariantProps } from './link.variants'
import { cn } from 'tailwind-variants'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { linkVariants } from './link.variants'

export interface LinkProps extends 
  /* @vue-ignore */ Omit<AnchorHTMLAttributes, 'class' | 'href' | 'rel' | 'target'>,
  /* @vue-ignore */ Omit<RouterLinkProps, 'to' | 'custom'> {
  /** default a attributes */
  class?: AnchorHTMLAttributes['class']
  /** use 'to' for every kind of URL (internal route, external url, mailto:, etc) */
  href?: never
  rel?: AnchorHTMLAttributes['rel']
  target?: AnchorHTMLAttributes['target']

  /** router link props*/
  to?: RouteLocationRaw
  custom?: never

  /** button variants */
  size?: LinkVariantProps['size']
  variant?: LinkVariantProps['variant']
  block?: boolean
  unstyled?: boolean

  disabled?: boolean
  dataIcon?: 'inline-start' | 'inline-end'
}

const EXTERNAL_URL_RE = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i
const NEW_TAB_URL_RE = /^(?:https?:)?\/\//i
const UNSAFE_URL_RE = /^\s*(?:javascript|data|vbscript):/i
</script>

<script setup lang="ts">
const props = defineProps<LinkProps>()

const url = computed(() => typeof props.to === 'string' ? props.to : undefined)
const isExternal = computed(() => !!url.value && EXTERNAL_URL_RE.test(url.value))
const isUnsafeUrl = computed(() => !!url.value && UNSAFE_URL_RE.test(url.value))
const isDisabled = computed(() => props.disabled || isUnsafeUrl.value)
const shouldRenderAnchor = computed(() => !props.to || isDisabled.value || isExternal.value)

const resolvedHref = computed(() => {
  if(isDisabled.value || !url.value || !isExternal.value) return undefined
  /**
   * Only `javascript:`, `data:` and `vbscript:` are blocked here.
   * Still validate user-provided URLs before passing them to `to`.
   */
  return url.value
})

const resolvedTarget = computed(() => {
  if(isDisabled.value) return undefined
  const shouldOpenNewTab = !!url.value && isExternal.value && NEW_TAB_URL_RE.test(url.value)
  return props.target ?? (shouldOpenNewTab ? '_blank' : undefined)
})

const resolvedRel = computed(() => {
  if(isDisabled.value) return undefined
  const parts = new Set(props.rel?.split(/\s+/).filter(Boolean))
  if(resolvedTarget.value === '_blank'){
    parts.add('noopener')
    parts.add('noreferrer')
  }
  return parts.size ? [...parts].join(' ') : undefined
})

const classes = computed(() => cn(
  linkVariants({
    variant: props.variant,
    size: props.size,
    block: props.block,
    unstyled: props.unstyled
  }),
  props.class
))

function disabledClickGuard(e: MouseEvent) {
  if(!isDisabled.value) return
  e.preventDefault()
  e.stopImmediatePropagation()
}
</script>

<template>
  <a 
    v-if="shouldRenderAnchor"
    data-slot="link"
    :role="isDisabled ? 'link' : undefined"
    :href="resolvedHref"
    :rel="resolvedRel"
    :target="resolvedTarget"
    :aria-disabled="isDisabled ? 'true' : undefined"
    :data-icon="props.dataIcon"
    :class="classes"
    @click="disabledClickGuard"
  >
    <slot />
  </a>
  <RouterLink
    v-else
    data-slot="link"
    :to="props.to!"
    :rel="resolvedRel"
    :target="resolvedTarget"
    :data-icon="props.dataIcon"
    :class="classes"
  >
    <slot />
  </RouterLink>
</template>
