<script lang="ts">
import type {
  NavigationMenuLinkEmits as PrimitiveNavigationMenuLinkEmits,
  NavigationMenuLinkProps as PrimitiveNavigationMenuLinkProps,
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { NavigationMenuLink, useForwardPropsEmits } from 'reka-ui'
import { cn } from 'tailwind-variants'
import { navigationMenuVariants } from './navigation-menu.variants'

export interface NavigationMenuLinkProps extends PrimitiveNavigationMenuLinkProps {
  class?: HTMLAttributes['class']
}

export type NavigationMenuLinkEmits = PrimitiveNavigationMenuLinkEmits
</script>

<script setup lang="ts">
const props = defineProps<NavigationMenuLinkProps>()
const emits = defineEmits<NavigationMenuLinkEmits>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps, emits)
const { link } = navigationMenuVariants()
</script>

<template>
  <NavigationMenuLink
    data-slot="navigation-menu-link"
    v-bind="forwardedProps"
    :class="cn(link(), props.class)"
  >
    <slot />
  </NavigationMenuLink>
</template>
