<script lang="ts">
import type { PageFrontmatter, PostFrontmatter } from '@/types'
import { HomeLayout } from '@/components/layouts/home'
import { PostLayout } from '@/components/layouts/post'
import { ArticleTemplate } from '@/components/templates/article-template'
import { computed } from 'vue'

export interface MarkdownWrapperProps {
  frontmatter: PageFrontmatter | PostFrontmatter
}

export interface MarkdownWrapperSlots {
  default?: () => any
}
</script>

<script setup lang="ts">
const props = defineProps<MarkdownWrapperProps>()
defineSlots<MarkdownWrapperSlots>()

function isPost(fm: PageFrontmatter | PostFrontmatter): fm is PostFrontmatter {
  return 'publishedAt' in fm
}

const post = computed(() => (isPost(props.frontmatter) ? props.frontmatter : null))
const page = computed(() => (isPost(props.frontmatter) ? null : props.frontmatter))
</script>

<template>
  <PostLayout v-if="post" :meta="post">
    <ArticleTemplate :title="post.title" :tagline="post.description">
      <slot />
    </ArticleTemplate>
  </PostLayout>
  <HomeLayout v-else-if="home" :meta="home">
    <ArticleTemplate :title="home.title" :tagline="home.description">
      <slot />
    </ArticleTemplate>
  </HomeLayout>
</template>