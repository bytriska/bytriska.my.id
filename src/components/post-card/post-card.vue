<script lang="ts">
import type { Post } from '@/types'
import { useTimeAgo } from '@vueuse/core'
import { computed } from 'vue'

export interface PostCardProps {
  post: Post
}
</script>

<script setup lang="ts">
const props = defineProps<PostCardProps>()
const postHref = computed(() => props.post.path)
const postMeta = computed(() => props.post.meta)
const publishedAt = useTimeAgo(new Date(postMeta.value.publishedAt))
</script>

<template>
  <div class="relative flex flex-col gap-y-2 p-4 rounded-md border">
    <h3 class="font-semibold text-lg text-ui-content-highlighted outline-none">
      <Link
        :href="postHref"
        block
        class="justify-start text-base text-foreground font-medium px-0 after:absolute after:inset-0"
      >
        {{ postMeta.title }}
      </Link>
    </h3>
    <div class="flex items-center text-ui-content-muted text-sm">
      <i-lucide-user class="inline-block mr-1 -mt-px size-3.5" />{{ postMeta.author }} ·
      {{ publishedAt }}{{ postMeta.readingTime ? ` · ${postMeta.readingTime} min read` : '' }}
    </div>
  </div>
</template>
