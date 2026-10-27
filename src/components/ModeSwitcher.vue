<script lang="ts">
import type { ButtonProps } from './ui/button'
import { ContrastIcon } from '@lucide/vue'
import { useColorMode } from '@vueuse/core'
import { cn } from 'tailwind-variants'
import { Button } from './ui/button'

export type ModeSwitcherProps = Pick<ButtonProps, 'class' | 'variant' | 'unstyled'>
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<ModeSwitcherProps>(), {
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
    :variant="props.variant"
    :unstyled="props.unstyled"
    :class="cn('extend-touch-target', props.class)"
    @click="toggle"
  >
    <ContrastIcon 
      class="size-4"
      aria-hidden="true"
    />
    <span class="sr-only">Toggle theme</span>
  </Button>
</template>
