<script setup lang="ts">
import type { PageFrontmatter } from '@/types'

const props = defineProps<{
  frontmatter: PageFrontmatter
}>()
</script>

<template>
  <div class="min-h-dvh w-full flex flex-col">
    <slot name="header">
      <Header class="[--ui-header-height:4rem]" />
    </slot>

    <main class="prose">
      <slot name="title">
        <h1>{{ props.frontmatter.title }}</h1>
      </slot>
      <slot name="description">
        <p>{{ props.frontmatter.description }}</p>
      </slot>
      <hr />

      <slot />
    </main>

    <slot name="footer">
      <footer
        class="w-full max-w-7xl flex items-center justify-center mx-auto px-4 py-4 sm:px-6 lg:px-8"
      >
        <p class="text-sm text-ui-content-muted">&copy; 2026 bytriska. All rights reserved.</p>
      </footer>
    </slot>
  </div>
</template>
