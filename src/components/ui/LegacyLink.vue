<script lang="ts">
import type { RouterLinkProps } from 'vue-router'
import type { LinkVariantProps } from '@/styles/link'
</script>

<script setup lang="ts">
import { computed } from 'vue'
import link from '@/styles/link'

// TODO: fix this type error
export interface LegacyLinkProps extends /** @vue-ignore */ RouterLinkProps {
  block?: LinkVariantProps['block']
  color?: LinkVariantProps['color']
  size?: LinkVariantProps['size']
  square?: LinkVariantProps['square']
  variant?: LinkVariantProps['variant']
}

const props = defineProps<LegacyLinkProps>()

const isExternal = computed(() => {
  return props.to && typeof props.to === 'string' && props.to.startsWith('http')
})
</script>

<template>
  <a
    v-if="isExternal"
    v-bind="$attrs"
    :href="props.to as string"
    target="_blank"
    rel="noopener noreferrer"
    :class="link(props)"
  >
    <slot />
  </a>
  <RouterLink v-else v-bind="$props" :class="link(props)">
    <slot />
  </RouterLink>
</template>
