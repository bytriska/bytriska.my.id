<script lang="ts">
import type { VNode } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import type { ButtonProps } from '../button'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { isSafeUrl } from '@/lib/utils'

type BaseLinkProps = Omit<ButtonProps, 'as' | 'asChild' | 'type' | 'disabled'>

export interface LinkProps extends BaseLinkProps {
  to?: RouteLocationRaw
  href?: string
  replace?: boolean
  activeClass?: string
  exactActiveClass?: string
  target?: string
  rel?: string
  disabled?: boolean
}

export interface LinkSlot {
  default?: () => VNode
  icon?: () => VNode
}

const EXTERNAL_URL_RE = /^(?:https?:|\/\/)/i
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<LinkProps>(), {
  variant: 'link',
  disabled: false,
})

const isRouterLink = computed(() => props.to !== undefined)
const safeHref = computed(() => {
  if (props.href && isSafeUrl(props.href)) return props.href
  return undefined
})

const isExternal = computed(() => {
  if (!safeHref.value) return false
  return EXTERNAL_URL_RE.test(safeHref.value)
})

const resolvedTarget = computed(() => props.target ?? (isExternal.value ? '_blank' : undefined))
const resolvedRel = computed(
  () => props.rel ?? (isExternal.value ? 'noopener noreferrer' : undefined)
)

function onClick(e: MouseEvent) {
  if (props.disabled) {
    e.preventDefault()
    e.stopPropagation()
  }
}
</script>

<template>
  <Button
    data-slot="link"
    :as="isRouterLink ? RouterLink : 'a'"
    :variant="variant"
    :size="size"
    :loading="loading"
    :trailing="trailing"
    :class="props.class"
    :to="isRouterLink ? to : undefined"
    :replace="isRouterLink ? replace : undefined"
    :active-class="isRouterLink ? activeClass : undefined"
    :exact-active-class="isRouterLink ? exactActiveClass : undefined"
    :href="!isRouterLink ? safeHref : undefined"
    :target="resolvedTarget"
    :rel="resolvedRel"
    :aria-disabled="disabled || undefined"
    :tabindex="disabled ? -1 : undefined"
    @click="onClick"
  >
    <template #icon>
      <slot name="icon" />
    </template>
    <slot />
  </Button>
</template>
