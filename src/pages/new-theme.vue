<script lang="ts">
import { HomeLayout } from '@/components/layouts/home'
</script>

<script setup lang="ts">
const greeting = 'hello world'
</script>

<template>
  <HomeLayout>
    <div class="[grid-area:main] h-[100rem] size-full border border-teal-400">
      <h1>{{ greeting }}</h1>
    </div>
  </HomeLayout>
</template>
