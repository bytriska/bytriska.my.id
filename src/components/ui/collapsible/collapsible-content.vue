<script lang="ts">
import type { CollapsibleContentProps } from 'reka-ui'
import { CollapsibleContent } from 'reka-ui'

export type { CollapsibleContentProps }
</script>

<script setup lang="ts">
const props = defineProps<CollapsibleContentProps>()
</script>

<template>
  <CollapsibleContent data-slot="collapsible-content" v-bind="props">
    <slot />
  </CollapsibleContent>
</template>
