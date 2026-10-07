<script lang="ts">
import type { NavigationMenuTriggerProps as PrimitiveNavigationMenuTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { NavigationMenuTrigger, useForwardProps } from 'reka-ui'
import { cn } from 'tailwind-variants'
import { navigationMenuVariants } from './navigation-menu.variants'

export interface NavigationMenuTriggerProps extends PrimitiveNavigationMenuTriggerProps {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
const props = defineProps<NavigationMenuTriggerProps>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
const { trigger, triggerIcon } = navigationMenuVariants()
</script>

<template>
  <NavigationMenuTrigger
    data-slot="navigation-menu-trigger"
    v-bind="forwardedProps"
    :class="cn(trigger(), 'group', props.class)"
  >
    <slot />
    <i-lucide-chevron-down :class="triggerIcon()" aria-hidden="true" />
  </NavigationMenuTrigger>
</template>
