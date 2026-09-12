<script setup lang="ts">
import type { BaseMeta } from '@/types'
import { usePosts } from '@/composables/posts'

const meta: BaseMeta = {
  title: 'Posts',
  description: 'A collection of all my posts.',
  draft: false,
}

const { allPosts } = usePosts()
</script>

<template>
  <DefaultLayout v-bind="{ meta }">
    <div>
      <PostCard v-for="post in allPosts" :key="post.path" :post="post" />
    </div>
  </DefaultLayout>
</template>
