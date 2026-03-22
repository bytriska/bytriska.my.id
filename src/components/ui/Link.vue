<script setup lang="ts">
import type { RouterLinkProps } from 'vue-router'
import type { LinkVariantProps } from '@/styles/link'
import { computed } from 'vue'
import link from '@/styles/link'

const props = defineProps<
  RouterLinkProps & {
    block?: LinkVariantProps['block']
    color?: LinkVariantProps['color']
    size?: LinkVariantProps['size']
    square?: LinkVariantProps['square']
    variant?: LinkVariantProps['variant']
  }
>()

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
