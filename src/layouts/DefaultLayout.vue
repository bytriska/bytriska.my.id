<script setup lang="ts">
import type { BaseMeta } from '@/types'

const props = defineProps<Partial<BaseMeta>>()
</script>

<template>
  <div class="min-h-dvh w-full flex flex-col">
    <slot name="header">
      <Header class="[--ui-header-height:4rem]" />
    </slot>

    <main
      class="grow w-full max-w-7xl mx-auto font-body text-base font-normal text-ui-content-base break-words overflow-x-hidden pt-8 px-6 pb-16 md:pt-12 md:px-8 md:pb-24 lg:pb-0"
    >
      <slot name="title">
        <h1
          v-if="props.title"
          class="relative font-semibold text-ui-content-highlighted outline-none font-display tracking-tight text-3xl text-center text-pretty my-4"
        >
          {{ props.title }}
        </h1>
      </slot>
      <slot name="description">
        <p v-if="props.description" class="my-4 text-center text-pretty">
          {{ props.description }}
        </p>
      </slot>
      <hr class="my-4 border-0 border-t" />

      <slot />
    </main>

    <slot name="footer">
      <footer
        class="@container w-full max-w-7xl flex items-center justify-center mx-auto px-4 py-4 sm:px-6 lg:px-8"
      >
        <p class="text-sm text-ui-content-muted">&copy; 2026 bytriska. All rights reserved.</p>
      </footer>
    </slot>
  </div>
</template>
