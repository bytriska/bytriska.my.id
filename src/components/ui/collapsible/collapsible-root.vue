<script lang="ts">
import type { CollapsibleRootEmits, CollapsibleRootProps } from 'reka-ui'
import { CollapsibleRoot, useForwardPropsEmits } from 'reka-ui'

export type { CollapsibleRootEmits, CollapsibleRootProps }
</script>

<script setup lang="ts">
const props = defineProps<CollapsibleRootProps>()
const emits = defineEmits<CollapsibleRootEmits>()
const forwardedProps = useForwardPropsEmits(props, emits)
</script>

<template>
  <CollapsibleRoot v-slot="slotProps" data-slot="collapsible-root" v-bind="forwardedProps">
    <slot v-bind="slotProps" />
  </CollapsibleRoot>
</template>
