<script lang="ts">
import type { ButtonProps } from '../ui/button'
import { ContrastIcon } from '@lucide/vue'
import { useColorMode } from '@vueuse/core'
import { cn } from 'tailwind-variants'
import { Button } from '../ui/button'

export interface ModeSwitcherProps
  extends
    Pick<ButtonProps, 'class' | 'variant'>,
    /** @vue-ignore */ Omit<ButtonProps, 'class' | 'variant'> {}
</script>

<script setup lang="ts">
withDefaults(defineProps<ModeSwitcherProps>(), {
  variant: 'ghost',
})

const mode = useColorMode()
function toggle() {
  mode.value = mode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <Button
    size="icon"
    :variant="$props.variant"
    :class="cn('extend-touch-target', $props.class)"
    @click="toggle"
  >
    <ContrastIcon aria-hidden="true" />
    <span class="sr-only">Toggle theme</span>
  </Button>
</template>
