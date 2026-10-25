<script lang="ts">
import type { ButtonHTMLAttributes, ClassValue } from 'vue'
import type { ButtonVariantProps } from './button.variants'
import { cn } from 'tailwind-variants'
import { computed } from 'vue'
import { buttonVariants } from './button.variants'

export interface ButtonProps extends 
  /** @vue-ignore */ Omit<ButtonHTMLAttributes, 'class' | 'disabled' | 'type'> {
  /** default button attributes */
  class?: ClassValue
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'

  /** button variants */
  size?: ButtonVariantProps['size']
  variant?: ButtonVariantProps['variant']
  block?: boolean
  unstyled?: boolean

  dataIcon?: 'inline-start' | 'inline-end'
}
</script>

<script setup lang="ts">
const props = defineProps<ButtonProps>()

const classes = computed(() => cn(
  buttonVariants({
    variant: props.variant,
    size: props.size,
    block: props.block,
    unstyled: props.unstyled,
  }),
  props.class
))
</script>

<template>
  <button
    data-slot="button"
    :type="props.type"
    :disabled="props.disabled ? true : undefined"
    :aria-disabled="props.disabled ? 'true' : undefined"
    :data-icon="props.dataIcon"
    :class="classes"
  >
    <slot />
  </button>
</template>
