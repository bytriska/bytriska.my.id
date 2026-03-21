<script setup lang="ts">
import type { ButtonVariantProps } from '@/styles/button'
import button from '@/styles/button'

const props = defineProps<{
  block?: ButtonVariantProps['block']
  color?: ButtonVariantProps['color']
  size?: ButtonVariantProps['size']
  square?: ButtonVariantProps['square']
  variant?: ButtonVariantProps['variant']
}>()
</script>

<template>
  <button :class="button(props)">
    <slot name="leading" />
    <slot />
    <slot name="trailing" />
  </button>
</template>
