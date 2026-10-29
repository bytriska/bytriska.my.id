<script lang="ts">
import type { AccordionTriggerProps as PrimitiveAccordionTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ChevronDownIcon } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import { AccordionHeader, AccordionTrigger, useForwardProps } from 'reka-ui'
import { cn } from 'tailwind-variants'
import { accordionVariants } from './accordion.variants'

export interface AccordionTriggerProps extends PrimitiveAccordionTriggerProps {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = defineProps<AccordionTriggerProps>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
const { header, trigger, triggerIcon } = accordionVariants()
</script>

<template>
  <AccordionHeader :class="header()">
    <AccordionTrigger
      data-slot="accordion-trigger"
      v-bind="{ ...forwardedProps, ...$attrs }"
      :class="cn(trigger(), props.class)"
    >
      <slot />
      <slot name="icon">
        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          aria-hidden="true"
          :class="triggerIcon()"
        />
      </slot>
    </AccordionTrigger>
  </AccordionHeader>
</template>
