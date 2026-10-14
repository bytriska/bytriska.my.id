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
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<LinkProps>(), {
  variant: 'link',
})

const slots = defineSlots<LinkSlot>()

const EXTERNAL_URL_RE = /^(?:https?:|\/\/)/i

const isInert = computed(() => props.disabled || props.loading)
const isRouterLink = computed(() => props.to !== undefined && !isInert.value)

const safeHref = computed(() => (props.href && isSafeUrl(props.href) ? props.href : undefined))
const isExternal = computed(() => !!safeHref.value && EXTERNAL_URL_RE.test(safeHref.value))

const target = computed(() => props.target ?? (isExternal.value ? '_blank' : undefined))
const rel = computed(
  () => props.rel ?? (target.value === '_blank' ? 'noopener noreferrer' : undefined)
)

const linkAttrs = computed<LinkProps>(() => {
  if (isInert.value) {
    return { tabindex: -1 }
  }

  const shared: LinkProps = { rel: rel.value, target: target.value }

  if (isRouterLink.value) {
    return {
      ...shared,
      to: props.to,
      replace: props.replace,
      activeClass: props.activeClass,
      exactActiveClass: props.exactActiveClass,
    }
  } else {
    return {
      ...shared,
      href: safeHref.value,
    }
  }
})
</script>

<template>
  <Button
    data-slot="link"
    :as="isRouterLink ? RouterLink : 'a'"
    :variant="props.variant"
    :size="props.size"
    :loading="props.loading"
    :trailing="props.trailing"
    :disabled="props.disabled"
    :class="props.class"
    v-bind="linkAttrs"
  >
    <template v-if="slots.icon" #icon>
      <slot name="icon" />
    </template>
    <slot />
  </Button>
</template>
