<script lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import type { ButtonProps } from '../button'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { isSafeUrl } from '@/lib/utils'
import { Button } from '../button'

type BaseLinkProps = Omit<ButtonProps, 'as' | 'asChild' | 'type'>

export interface LinkProps extends BaseLinkProps {
  to?: RouteLocationRaw
  href?: string
  replace?: boolean
  activeClass?: string
  exactActiveClass?: string
  target?: string
  rel?: string
}

export interface LinkSlot {
  default?: () => any
  icon?: () => any
}

const EXTERNAL_URL_RE = /^(?:https?:|\/\/)/i
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<LinkProps>(), {
  variant: 'link',
})

defineSlots<LinkSlot>()

const isInert = computed(() => props.disabled || props.loading)
const isRouterLink = computed(() => props.to !== undefined && !isInert.value)

const safeHref = computed(() => (props.href && isSafeUrl(props.href) ? props.href : undefined))
const isExternal = computed(() => !!safeHref.value && EXTERNAL_URL_RE.test(safeHref.value))

const resolvedTarget = computed(() => props.target ?? (isExternal.value ? '_blank' : undefined))
const resolvedRel = computed(
  () => props.rel ?? (resolvedTarget.value === '_blank' ? 'noopener noreferrer' : undefined)
)
</script>

<template>
  <Button
    data-slot="link"
    :as="isRouterLink ? RouterLink : 'a'"
    :variant="variant"
    :size="size"
    :loading="loading"
    :trailing="trailing"
    :disabled="disabled"
    :class="props.class"
    :to="isRouterLink ? to : undefined"
    :replace="isRouterLink ? replace : undefined"
    :active-class="isRouterLink ? activeClass : undefined"
    :exact-active-class="isRouterLink ? exactActiveClass : undefined"
    :href="!isRouterLink && !isInert ? safeHref : undefined"
    :target="isInert ? undefined : resolvedTarget"
    :rel="isInert ? undefined : resolvedRel"
    :tabindex="isInert ? -1 : undefined"
  >
    <template v-if="$slots.icon" #icon>
      <slot name="icon" />
    </template>
    <slot />
  </Button>
</template>
