<script lang="ts">
import type { PageFrontmatter, PostFrontmatter } from '@/types'
import { useRoute } from 'vue-router'
import { HomeLayout } from '@/components/layouts/home'
import { PostLayout } from '@/components/layouts/post'
import { ArticleTemplate } from '@/components/templates/article'
import { isHome, isPost } from '@/lib/route'

export interface MarkdownWrapperProps {
  frontmatter: PageFrontmatter | PostFrontmatter
}

export interface MarkdownWrapperSlots {
  default?: () => any
}
</script>

<script setup lang="ts">
defineProps<MarkdownWrapperProps>()
defineSlots<MarkdownWrapperSlots>()

const route = useRoute()
</script>

<template>
  <PostLayout v-if="isPost(route)" :meta="$props.frontmatter">
    <ArticleTemplate :title="$props.frontmatter.title" :tagline="$props.frontmatter.description">
      <section class="prose">
        <slot />
      </section>
    </ArticleTemplate>
  </PostLayout>
  <HomeLayout v-else-if="isHome(route)" :meta="$props.frontmatter">
    <ArticleTemplate :title="$props.frontmatter.title" :tagline="$props.frontmatter.description">
      <section class="prose">
        <slot />
      </section>
    </ArticleTemplate>
  </HomeLayout>
</template>
