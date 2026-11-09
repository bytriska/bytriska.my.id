<script setup lang="ts">
import { computed } from 'vue'
import { HomeLayout } from '@/components/layouts/home'
import { PostCard } from '@/components/post-card'
import { CollectionTemplate } from '@/components/templates/collection'
import { usePosts } from '@/composables/posts'

const meta = computed(() => ({
  title: 'Posts',
  description: 'A collection of all my posts.',
  draft: false,
}))

const { allPosts } = usePosts()
</script>

<template>
  <HomeLayout v-bind="{ meta }">
    <CollectionTemplate :title="meta.title" :tagline="meta.description">
      <PostCard v-for="post in allPosts" :key="post.path" :post="post" />
    </CollectionTemplate>
  </HomeLayout>
</template>
