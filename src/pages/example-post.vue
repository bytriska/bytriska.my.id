<script lang="ts">
import { PostLayout } from '@/components/layouts/post'
</script>

<script setup lang="ts">
const greeting = 'hello world'
</script>

<template>
  <PostLayout
    class="font-sans"
    :title="greeting"
    tagline="My name is Triska, a tofu maker who interested in software engineering and open source."
  >
    <main class="h-[100rem] size-full">
      <h1>{{ greeting }}</h1>
    </main>
  </PostLayout>
</template>
