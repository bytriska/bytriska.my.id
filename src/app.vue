<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-dvh w-full flex flex-col items-center justify-center gap-4">
    <main class="w-screen">
      <RouterView />
    </main>
    <nav class="container-ds flex gap-4">
      <RouterLink to="/"> Home </RouterLink>
      <RouterLink to="/posts"> Posts </RouterLink>
      <RouterLink to="/posts/example"> Example Post </RouterLink>
      <RouterLink to="/design-system"> Design System </RouterLink>
    </nav>
  </div>
</template>

<style scoped></style>
