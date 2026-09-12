<script lang="ts">
import type { Post } from '@/types'
</script>

<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'

// TODO: fix this type error
export interface PostCardProps {
  post: Post
}

const props = defineProps<PostCardProps>()
const post = props.post
const publishedAt = useTimeAgo(new Date(post.meta.publishedAt))
</script>

<template>
  <div class="flex flex-col gap-y-2 p-4 rounded-md border">
    <Link :to="post.path" class="w-fit p-0!">
      <h4 class="font-semibold text-lg text-ui-content-highlighted outline-none">
        {{ post.meta.title }}
      </h4>
    </Link>
    <div class="flex items-center text-ui-content-muted text-sm">
      <i-lucide-user class="inline-block mr-1 -mt-px size-3.5" />{{ post.meta.author }} ·
      {{ publishedAt }}{{ post.meta.readingTime ? ` · ${post.meta.readingTime} min read` : '' }}
    </div>
  </div>
</template>
