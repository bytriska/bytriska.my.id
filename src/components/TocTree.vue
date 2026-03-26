<script setup lang="ts">
import type { MarkdownItHeader } from '@/types'

defineProps<{
  headers: MarkdownItHeader[]
}>()

const emit = defineEmits<{ navigate: [link: string] }>()
</script>

<template>
  <ul class="space-y-1 text-sm">
    <li v-for="header in headers" :key="header.slug">
      <a
        :href="header.link"
        class="block text-ui-content-base hover:text-ui-content-highlighted transition-colors"
        @click.prevent="emit('navigate', header.link)"
      >
        {{ header.title }}
      </a>
      <div v-if="header.children?.length" class="pl-4 mt-1">
        <TocTree :headers="header.children" @navigate="emit('navigate', $event)" />
      </div>
    </li>
  </ul>
</template>
