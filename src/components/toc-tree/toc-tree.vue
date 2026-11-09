<script lang="ts">
import type { MarkdownHeading } from '@/types'
import { Link } from '@/components/ui/link'

export interface TocTreeProps {
  toc?: MarkdownHeading[]
}
</script>

<script setup lang="ts">
defineProps<TocTreeProps>()
</script>

<template>
  <ul
    v-if="$props.toc?.length"
    class="flex flex-col list-none [&_a]:font-normal [&_a]:text-foreground [&_a]:justify-start [&_a]:px-0"
  >
    <li v-for="heading in $props.toc" :key="heading.slug">
      <Link :href="heading.path" block>
        {{ heading.title }}
      </Link>
      <TocTree v-if="heading.children.length" :toc="heading.children" class="ms-4" />
    </li>
  </ul>
  <p v-else class="text-sm text-muted-foreground">Empty heading</p>
</template>
