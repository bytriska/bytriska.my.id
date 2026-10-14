<script lang="ts">
import type {
  AccordionRootEmits as PrimitiveAccordionRootEmits,
  AccordionRootProps as PrimitiveAccordionRootProps,
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { AccordionRoot, useForwardPropsEmits } from 'reka-ui'
import { cn } from 'tailwind-variants'
import { accordionVariants } from './accordion.variants'

export interface AccordionRootProps extends PrimitiveAccordionRootProps {
  class?: HTMLAttributes['class']
}

export type AccordionRootEmits = PrimitiveAccordionRootEmits
</script>

<script setup lang="ts">
const props = defineProps<AccordionRootProps>()
const emits = defineEmits<AccordionRootEmits>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps, emits)
const { root } = accordionVariants()
</script>

<template>
  <AccordionRoot
    v-slot="slotProps"
    data-slot="accordion-root"
    v-bind="forwardedProps"
    :class="cn(root(), props.class)"
  >
    <slot v-bind="slotProps" />
  </AccordionRoot>
</template>
