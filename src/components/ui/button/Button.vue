<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { ButtonHTMLAttributes } from 'vue'
import type { ButtonVariantProps } from './button.variants'
import { createReusableTemplate } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { cn } from 'tailwind-variants'
import { computed } from 'vue'
import { buttonVariants } from './button.variants'

export interface ButtonProps extends /* @vue-ignore */ Omit<
  ButtonHTMLAttributes,
  'type' | 'disabled' | 'class'
> {
  class?: ButtonHTMLAttributes['class']
  variant?: ButtonVariantProps['variant']
  size?: ButtonVariantProps['size']
  type?: 'submit' | 'reset' | 'button'
  disabled?: boolean
  asChild?: PrimitiveProps['asChild']
  as?: PrimitiveProps['as']
  loading?: boolean
  trailing?: boolean
}

export interface ButtonSlot {
  default?: () => any
  icon?: () => any
}
</script>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'button',
  type: 'button',
  disabled: false,
  loading: false,
  trailing: false,
})

const slots = defineSlots<ButtonSlot>()
const isDisabled = computed(() => props.disabled || props.loading)
function hasIcon() {
  return props.loading || !!slots.icon
}

const [DefineIconTemplate, IconTemplate] = createReusableTemplate()
</script>

<template>
  <DefineIconTemplate>
    <i-lucide-loader-circle v-if="loading" class="size-4 animate-spin shrink-0" />
    <slot v-else name="icon" />
  </DefineIconTemplate>

  <Primitive
    data-slot="button"
    :data-variant="variant"
    :data-size="size"
    :as="as"
    :as-child="asChild"
    v-bind="$attrs"
    :type="as === 'button' ? type : undefined"
    :disabled="as === 'button' ? isDisabled : undefined"
    :data-loading="loading ? '' : undefined"
    :aria-busy="loading || undefined"
    :aria-disabled="isDisabled || undefined"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <IconTemplate v-if="hasIcon() && !trailing" />
    <slot />
    <IconTemplate v-if="hasIcon() && trailing" />
  </Primitive>
</template>
