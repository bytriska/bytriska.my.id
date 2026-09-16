<script lang="ts">
import type { ButtonVariantProps } from '@/styles/button'
</script>

<script setup lang="ts">
import button from '@/styles/button'

export interface LegacyButtonProps {
  block?: ButtonVariantProps['block']
  color?: ButtonVariantProps['color']
  size?: ButtonVariantProps['size']
  square?: ButtonVariantProps['square']
  variant?: ButtonVariantProps['variant']
}

const props = defineProps<LegacyButtonProps>()
</script>

<template>
  <button :class="button(props)">
    <slot name="leading" />
    <slot />
    <slot name="trailing" />
  </button>
</template>
