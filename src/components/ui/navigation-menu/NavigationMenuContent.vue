<script lang="ts">
import type {
  NavigationMenuContentEmits as PrimitiveNavigationMenuContentEmits,
  NavigationMenuContentProps as PrimitiveNavigationMenuContentProps,
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { NavigationMenuContent, useForwardPropsEmits } from 'reka-ui'
import { cn } from 'tailwind-variants'
import { navigationMenuVariants } from './navigation-menu.variants'

export interface NavigationMenuContentProps extends PrimitiveNavigationMenuContentProps {
  class?: HTMLAttributes['class']
}

export type NavigationMenuContentEmits = PrimitiveNavigationMenuContentEmits
</script>

<script setup lang="ts">
const props = defineProps<NavigationMenuContentProps>()
const emits = defineEmits<NavigationMenuContentEmits>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps, emits)
const { content } = navigationMenuVariants()
</script>

<template>
  <NavigationMenuContent
    data-slot="navigation-menu-content"
    v-bind="forwardedProps"
    :class="cn(content(), props.class)"
  >
    <slot />
  </NavigationMenuContent>
</template>
