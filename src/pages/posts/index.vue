<script setup lang="ts">
import type { BaseMeta } from '@/types'
import PostCard from '@/components/PostCard.vue'
import { usePosts } from '@/composables/posts'

const meta: Partial<BaseMeta> = {
  title: 'Posts',
  description: 'A collection of all my posts.',
}

const { allPosts } = usePosts()
</script>

<template>
  <DefaultLayout v-bind="meta">
    <div>
      <PostCard v-for="post in allPosts" :key="post.path" v-bind="post" />
    </div>
  </DefaultLayout>
</template>
