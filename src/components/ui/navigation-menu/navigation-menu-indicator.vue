<script lang="ts">
import type { NavigationMenuIndicatorProps as PrimitiveNavigationMenuIndicatorProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { NavigationMenuIndicator, useForwardProps } from 'reka-ui'
import { cn } from 'tailwind-variants'
import { navigationMenuVariants } from './navigation-menu.variants'

export interface NavigationMenuIndicatorProps extends PrimitiveNavigationMenuIndicatorProps {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
const props = defineProps<NavigationMenuIndicatorProps>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
const { indicator, indicatorArrow } = navigationMenuVariants()
</script>

<template>
  <NavigationMenuIndicator
    data-slot="navigation-menu-indicator"
    v-bind="forwardedProps"
    :class="cn(indicator(), props.class)"
  >
    <div :class="indicatorArrow()" />
  </NavigationMenuIndicator>
</template>
