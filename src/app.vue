<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-svh w-full flex flex-col gap-4">
    <main class="w-full grow">
      <RouterView />
    </main>
    <nav class="container w-full flex justify-center gap-4 py-4">
      <RouterLink to="/"> Home </RouterLink>
      <RouterLink to="/posts"> Posts </RouterLink>
      <RouterLink to="/posts/example"> Example Post </RouterLink>
    </nav>
  </div>
</template>

<style scoped></style>
