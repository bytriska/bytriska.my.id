<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { ButtonHTMLAttributes, VNode } from 'vue'
import type { ButtonVariantProps } from './button.variants'
import { createReusableTemplate } from '@vueuse/core'
import { computed, useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import buttonVariants from './button.variants'

export interface ButtonProps extends /* @vue-ignore */ Omit<
  ButtonHTMLAttributes,
  'type' | 'disabled'
> {
  variant?: ButtonVariantProps['variant']
  size?: ButtonVariantProps['size']
  type?: 'submit' | 'reset' | 'button'
  disabled?: boolean | 'true' | 'false'
  asChild?: PrimitiveProps['asChild']
  as?: PrimitiveProps['as']
  loading?: boolean
  trailing?: boolean
}

export interface ButtonSlot {
  default?: () => VNode
  icon?: () => VNode
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
const slot = defineSlots<ButtonSlot>()
const attrs = useAttrs()

const [DefineIconTemplate, IconTemplate] = createReusableTemplate()

const isDisabled = computed(() => props.disabled || props.loading)
const showIcon = computed(() => props.loading || !!slot.icon)
</script>

<template>
  <DefineIconTemplate>
    <i-lucide-loader-circle v-if="loading" class="size-4 animate-spin shrink-0" />
    <slot v-else name="icon" />
  </DefineIconTemplate>

  <RekaPrimitive
    data-slot="button"
    :data-variant="variant"
    :data-size="size"
    :data-loading="loading ? '' : undefined"
    :as="as"
    :as-child="asChild"
    :type="as === 'button' ? type : undefined"
    :disabled="isDisabled"
    :aria-busy="loading || undefined"
    :aria-disabled="isDisabled || undefined"
    :class="cn(buttonVariants({ variant, size }), props.class)"
    v-bind="attrs"
  >
    <IconTemplate v-if="showIcon && !trailing" />
    <slot />
    <IconTemplate v-if="showIcon && trailing" />
  </RekaPrimitive>
</template>
