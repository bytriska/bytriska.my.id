<script lang="ts">
export interface ArticleTemplateProps {
  title?: string
  tagline?: string
}

export interface ArticleTemplateSlots {
  default?: () => any
}
</script>

<script setup lang="ts">
defineProps<ArticleTemplateProps>()
defineSlots<ArticleTemplateSlots>()
</script>

<template>
  <article class="main-content max-w-(--main-content-width) px-4 py-12 lg:py-16 mx-auto">
    <header class="mb-6">
      <div class="flex items-baseline justify-between gap-4 mb-4">
        <h1 class="text-3xl sm:text-4xl font-semibold">
          {{ $props.title }}
        </h1>
      </div>
      <p v-if="$props.tagline" class="text-muted-foreground">
        {{ $props.tagline }}
      </p>
    </header>

    <slot />
  </article>
</template>
