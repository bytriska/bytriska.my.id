<script lang="ts">
import { HomeLayout } from '@/components/layouts/home'
</script>

<script setup lang="ts">
const greeting = 'hello world'
</script>

<template>
  <HomeLayout
    class="font-sans"
    :title="greeting"
    tagline="My name is Triska, a tofu maker who interested in software engineering and open source."
  >
    <div class="[grid-area:main] h-[100rem] size-full">
      <h1>{{ greeting }}</h1>
    </div>
  </HomeLayout>
</template>
