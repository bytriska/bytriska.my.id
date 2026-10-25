<script lang="ts">
import type { AnchorHTMLAttributes } from 'vue'
import type { LinkVariantProps } from './link.variants'
import { cn } from 'tailwind-variants'
import { computed, reactive, toRef } from 'vue'
import { useLink } from 'vue-router'
import { linkVariants } from './link.variants'

export interface LinkProps extends 
  /* @vue-ignore */ Omit<AnchorHTMLAttributes, 'class' | 'href' | 'rel' | 'target' | 'aria-current'> {
  /** default a attributes */
  class?: AnchorHTMLAttributes['class']
  href?: AnchorHTMLAttributes['href']
  rel?: AnchorHTMLAttributes['rel']
  target?: AnchorHTMLAttributes['target']
  ariaCurrent?: AnchorHTMLAttributes['aria-current']

  /** button variants */
  size?: LinkVariantProps['size']
  variant?: LinkVariantProps['variant']
  block?: boolean
  unstyled?: boolean

  replace?: boolean
  disabled?: boolean
  dataIcon?: 'inline-start' | 'inline-end'
}

const EXTERNAL_URL_RE = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i
const NEW_TAB_URL_RE = /^(?:https?:)?\/\//i
const UNSAFE_URL_RE = /^\s*(?:javascript|data|vbscript):/i
</script>

<script setup lang="ts">
const props = defineProps<LinkProps>()

const url = computed(() => props.href)
const isExternal = computed(() => !!url.value && EXTERNAL_URL_RE.test(url.value))
const isUnsafeUrl = computed(() => 
  /**
   * Only `javascript:`, `data:` and `vbscript:` are blocked here.
   * Still validate user-provided URLs before passing them to `href`.
   */
  !!url.value && UNSAFE_URL_RE.test(url.value)
)
const isDisabled = computed(() => props.disabled || isUnsafeUrl.value)
const isInternal = computed(() => !!url.value && !isExternal.value && !isDisabled.value)

const link = reactive(useLink({
  /**
   * useLink always resolves `to`, so give it a valid location when not internal;
   * the result is only used when isInternal is true
   */
  to: computed(() => (isInternal.value ? url.value! : '/')),
  replace: toRef(props, 'replace')
}))

const resolvedHref = computed(() => {
  if(isDisabled.value || !url.value) return undefined
  return isInternal.value ? link.href : url.value
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

const isActive = computed(() => isInternal.value && link.isActive)
const isExactActive = computed(() => isInternal.value && link.isExactActive)

const resolvedAriaCurrent = computed(() => 
  props.ariaCurrent ?? (isExactActive.value ? 'page' : undefined)
)

const classes = computed(() => cn(
  linkVariants({
    variant: props.variant,
    size: props.size,
    block: props.block,
    unstyled: props.unstyled
  }),
  props.class
))

function handleClick(e: MouseEvent) {
  if(isDisabled.value) {
    e.preventDefault()
    e.stopImmediatePropagation()
    return
  }

  if(isInternal.value) link.navigate(e)
}
</script>

<template>
  <a 
    data-slot="link"
    :role="isDisabled ? 'link' : undefined"
    :href="resolvedHref"
    :rel="resolvedRel"
    :target="resolvedTarget"
    :aria-current="resolvedAriaCurrent"
    :aria-disabled="isDisabled ? 'true' : undefined"
    :data-icon="props.dataIcon"
    :data-active="isActive ? 'true' : undefined"
    :data-exact="isExactActive ? 'true' : undefined"
    :class="classes"
    @click="handleClick"
  >
    <slot />
  </a>
</template>
