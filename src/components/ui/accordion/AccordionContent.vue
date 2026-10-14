<script lang="ts">
import type { AccordionContentProps as PrimitiveAccordionContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { AccordionContent, useForwardProps } from 'reka-ui'
import { cn } from 'tailwind-variants'
import { accordionVariants } from './accordion.variants'

export interface AccordionContentProps extends PrimitiveAccordionContentProps {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
const props = defineProps<AccordionContentProps>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
const { content, contentInner } = accordionVariants()
</script>

<template>
  <AccordionContent data-slot="accordion-content" v-bind="forwardedProps" :class="content()">
    <div :class="cn(contentInner(), props.class)">
      <slot />
    </div>
  </AccordionContent>
</template>
