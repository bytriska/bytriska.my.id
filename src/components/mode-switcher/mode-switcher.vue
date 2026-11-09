<script lang="ts">
import type { ButtonProps } from '../ui/button'
import { ContrastIcon } from '@lucide/vue'
import { useColorMode } from '@vueuse/core'
import { Toggle } from 'reka-ui'
import { cn } from 'tailwind-variants'
import { computed } from 'vue'
import { Button } from '../ui/button'

export interface ModeSwitcherProps extends Pick<ButtonProps, 'class' | 'unstyled' | 'variant'> {}
</script>

<script setup lang="ts">
withDefaults(defineProps<ModeSwitcherProps>(), {
  variant: 'ghost',
})

const mode = useColorMode()
const isDark = computed({
  get: () => mode.value === 'dark',
  set: (value) => { mode.value = (value ? 'dark' : 'light') }
})
</script>

<template>
  <Toggle
    v-model="isDark"
    :as="Button"
    size="icon"
    :unstyled="$props.unstyled"
    :variant="$props.variant"
    :class="cn('extend-touch-target', $props.class)"
  >
    <ContrastIcon aria-hidden="true" />
    <span class="sr-only">Dark mode toggle</span>
  </Toggle>
</template>
