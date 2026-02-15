<script setup lang="ts">
import { RouterLink } from 'vue-router';


</script>

<template>
  <div class="min-h-dvh flex flex-col items-center justify-center gap-4">
    <main>
    <RouterView />
    </main>
    <nav class="flex gap-4">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/posts">Posts</RouterLink>
    <RouterLink to="/posts/example">Example Post</RouterLink>
    </nav>
  </div>
</template>

<style scoped>

</style>
