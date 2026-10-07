<script lang="ts">
import type {
  NavigationMenuRootEmits as PrimitiveNavigationMenuRootEmits,
  NavigationMenuRootProps as PrimitiveNavigationMenuRootProps,
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { NavigationMenuRoot, useForwardPropsEmits } from 'reka-ui'
import { cn } from 'tailwind-variants'
import { navigationMenuVariants } from './navigation-menu.variants'
import NavigationMenuViewport from './NavigationMenuViewport.vue'

export interface NavigationMenuRootProps extends PrimitiveNavigationMenuRootProps {
  class?: HTMLAttributes['class']
  viewport?: boolean
}

export type NavigationMenuRootEmits = PrimitiveNavigationMenuRootEmits
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<NavigationMenuRootProps>(), {
  viewport: true,
})

const emits = defineEmits<NavigationMenuRootEmits>()
const delegatedProps = reactiveOmit(props, 'class', 'viewport')
const forwardedProps = useForwardPropsEmits(delegatedProps, emits)
const { root } = navigationMenuVariants()
</script>

<template>
  <NavigationMenuRoot
    v-slot="slotProps"
    data-slot="navigation-menu-root"
    :data-viewport="viewport"
    v-bind="forwardedProps"
    :class="cn(root(), props.class)"
  >
    <slot v-bind="slotProps" />
    <NavigationMenuViewport v-if="viewport" />
  </NavigationMenuRoot>
</template>
