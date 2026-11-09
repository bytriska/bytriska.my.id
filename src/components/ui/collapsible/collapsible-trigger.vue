<script lang="ts">
import type { CollapsibleTriggerProps } from 'reka-ui'
import { CollapsibleTrigger } from 'reka-ui'

export type { CollapsibleTriggerProps }
</script>

<script setup lang="ts">
const props = defineProps<CollapsibleTriggerProps>()
</script>

<template>
  <CollapsibleTrigger data-slot="collapsible-trigger" v-bind="props">
    <slot />
  </CollapsibleTrigger>
</template>
