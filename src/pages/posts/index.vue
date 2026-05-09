<script setup lang="ts">
import { usePosts } from '@/composables/posts'

const { allPosts, allCategories, allTags, allSeries, featuredPosts } = usePosts()
</script>

<template>
  <DefaultLayout>
    <div
      class="grow w-full max-w-7xl flex flex-col items-center justify-center mx-auto px-4 sm:px-6 lg:px-8"
    >
      <h1>Greetings from posts</h1>

      <div>{{ allPosts }}</div>
      <div>{{ allCategories }}</div>
      <div>{{ allTags }}</div>
      <div>{{ allSeries }}</div>
      <div>{{ featuredPosts }}</div>
    </div>
  </DefaultLayout>
</template>
