<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { ButtonHTMLAttributes } from 'vue'
import type { ButtonVariantProps } from './button.variants'
import { LoaderCircleIcon } from '@lucide/vue'
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
const isIconOnly = computed(() => props.size === 'icon' && !props.asChild)

function showIcon() {
  const hasIconSlot = !!slots.icon
  const hasDefaultAsIcon = isIconOnly.value && !!slots.default
  return props.loading || hasIconSlot || hasDefaultAsIcon
}

const [DefineIconTemplate, IconTemplate] = createReusableTemplate()
</script>

<template>
  <DefineIconTemplate>
    <LoaderCircleIcon v-if="props.loading" class="size-4 animate-spin shrink-0" />
    <slot v-else-if="slots.icon" name="icon" />
    <slot v-else-if="isIconOnly" />
  </DefineIconTemplate>

  <Primitive
    data-slot="button"
    :data-variant="props.variant"
    :data-size="props.size"
    :as="props.as"
    :as-child="props.asChild"
    v-bind="$attrs"
    :type="props.as === 'button' ? props.type : undefined"
    :disabled="props.as === 'button' ? isDisabled : undefined"
    :data-icon="
      showIcon() && !isIconOnly ? (props.trailing ? 'inline-end' : 'inline-start') : undefined
    "
    :data-loading="props.loading ? '' : undefined"
    :aria-busy="props.loading || undefined"
    :aria-disabled="isDisabled || undefined"
    :class="cn(buttonVariants({ variant: props.variant, size: props.size }), props.class)"
  >
    <IconTemplate v-if="showIcon() && !props.trailing" />
    <slot v-if="!isIconOnly" />
    <IconTemplate v-if="showIcon() && props.trailing" />
  </Primitive>
</template>
