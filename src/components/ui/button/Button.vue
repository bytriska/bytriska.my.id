<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { ButtonHTMLAttributes } from 'vue'
import type { ButtonVariantProps } from './button.variants'
import { LoaderCircleIcon } from '@lucide/vue'
import { Primitive } from 'reka-ui'
import { cn } from 'tailwind-variants'
import { computed } from 'vue'
import { buttonVariants } from './button.variants'

export interface ButtonProps extends /* @vue-ignore */ Omit<
  ButtonHTMLAttributes,
  'type' | 'disabled' | 'class'
> {
  /** default button attributes */
  class?: ButtonHTMLAttributes['class']
  disabled?: boolean
  type?: ButtonHTMLAttributes['type']

  /** button variants */
  size?: ButtonVariantProps['size']
  variant?: ButtonVariantProps['variant']
  block?: boolean
  unstyled?: boolean

  /** primitive component props */
  as?: PrimitiveProps['as']
  asChild?: never

  loading?: boolean
  dataIcon?: 'inline-start' | 'inline-end'
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'button',
  type: 'button'
})

const isDisabled = computed(() => props.disabled || props.loading)
const iconSide = computed(() => props.dataIcon ?? (props.loading ? 'inline-start' : undefined))
</script>

<template>
  <Primitive
    data-slot="button"
    :as="props.as"
    :type="props.as === 'button' ? props.type : undefined"
    :disabled="props.as === 'button' ? isDisabled : undefined"
    :aria-disabled="isDisabled || undefined"
    :data-loading="props.loading ? '' : undefined"
    :aria-busy="props.loading || undefined"
    :data-icon="iconSide"
    :class="cn(
      buttonVariants({
        variant: props.variant,
        size: props.size,
        block: props.block,
        unstyled: props.unstyled
      }),
      props.loading && '[&_svg:not([data-slot=loading-icon])]:hidden',
      props.class
    )"
  >
    <LoaderCircleIcon
      v-if="props.loading"
      data-slot="loading-icon"
      aria-hidden="true"
      focusable="false"
      :class="cn('motion-safe:animate-spin', iconSide === 'inline-end' && 'order-last')"
    />

    <slot />
  </Primitive>
</template>
