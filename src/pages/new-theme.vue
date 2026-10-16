<script lang="ts">
import { HomeLayout } from '@/components/layouts/home'
</script>

<script setup lang="ts"></script>

<template>
  <HomeLayout>
    <template #banner>
      <div class="size-full border border-yellow-400">im-banner</div>
    </template>
    <template #header>
      <div class="size-full border border-fuchsia-400">im-header</div>
    </template>

    <div class="size-full border border-teal-400">
      <h1>hello world</h1>
    </div>
  </HomeLayout>
</template>
