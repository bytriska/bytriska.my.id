<script lang="ts">
import type { NavigationMenuItemProps as PrimitiveNavigationMenuItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { NavigationMenuItem, useForwardProps } from 'reka-ui'
import { cn } from 'tailwind-variants'
import { navigationMenuVariants } from './navigation-menu.variants'

export interface NavigationMenuItemProps extends PrimitiveNavigationMenuItemProps {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
const props = defineProps<NavigationMenuItemProps>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
const { item } = navigationMenuVariants()
</script>

<template>
  <NavigationMenuItem
    data-slot="navigation-menu-item"
    v-bind="forwardedProps"
    :class="cn(item(), props.class)"
  >
    <slot />
  </NavigationMenuItem>
</template>
