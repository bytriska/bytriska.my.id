<script setup lang="ts">
import type { MarkdownHeading } from '@/types'

defineProps<{
  toc: MarkdownHeading[]
}>()

const emit = defineEmits<{ navigate: [link: string] }>()
</script>

<template>
  <ul class="space-y-1 text-sm">
    <li v-for="heading in toc" :key="heading.slug">
      <a
        :href="heading.path"
        class="block text-ui-content-base hover:text-ui-content-highlighted transition-colors truncate"
        @click.prevent="emit('navigate', heading.path)"
      >
        {{ heading.title }}
      </a>
      <div v-if="heading.children?.length" class="pl-4 mt-1">
        <TocTree :toc="heading.children" @navigate="emit('navigate', $event)" />
      </div>
    </li>
  </ul>
</template>
