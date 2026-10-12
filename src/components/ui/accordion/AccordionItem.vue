<script lang="ts">
import type { AccordionItemProps as PrimitiveAccordionItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { AccordionItem, useForwardProps } from 'reka-ui'
import { cn } from 'tailwind-variants'
import { accordionVariants } from './accordion.variants'

export interface AccordionItemProps extends PrimitiveAccordionItemProps {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
const props = defineProps<AccordionItemProps>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
const { item } = accordionVariants()
</script>

<template>
  <AccordionItem
    v-slot="slotProps"
    data-slot="accordion-item"
    v-bind="forwardedProps"
    :class="cn(item(), props.class)"
  >
    <slot v-bind="slotProps" />
  </AccordionItem>
</template>
