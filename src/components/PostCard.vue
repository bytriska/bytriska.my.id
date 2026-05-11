<script setup lang="ts">
import type { Post } from '@/types'
import { useTimeAgo } from '@vueuse/core'

const props = defineProps<Post>()
const publishedAt = useTimeAgo(new Date(props.meta.publishedAt))
</script>

<template>
  <div class="flex flex-col gap-y-2 p-4 rounded-md border">
    <Link :to="props.path" class="w-fit p-0!">
      <h4 class="font-semibold text-lg text-ui-content-highlighted outline-none">
        {{ props.meta.title }}
      </h4>
    </Link>
    <div class="flex items-center text-ui-content-muted text-sm">
      <i-lucide-user class="inline-block mr-1 -mt-px size-3.5" />{{ props.meta.author }} ·
      {{ publishedAt }}{{ props.meta.readingTime ? ` · ${props.meta.readingTime} min read` : '' }}
    </div>
  </div>
</template>
