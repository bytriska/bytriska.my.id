<script lang="ts">
import type { NavigationMenuViewportProps as PrimitiveNavigationMenuViewportProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { NavigationMenuViewport, useForwardProps } from 'reka-ui'
import { cn } from 'tailwind-variants'
import { navigationMenuVariants } from './navigation-menu.variants'

export interface NavigationMenuViewportProps extends PrimitiveNavigationMenuViewportProps {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
const props = defineProps<NavigationMenuViewportProps>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
const { viewport } = navigationMenuVariants()
</script>

<template>
  <div
    class="cn-navigation-menu-viewport-wrapper absolute top-full left-0 isolate z-50 flex justify-center"
  >
    <NavigationMenuViewport
      data-slot="navigation-menu-viewport"
      v-bind="forwardedProps"
      :class="cn(viewport(), props.class)"
    />
  </div>
</template>
