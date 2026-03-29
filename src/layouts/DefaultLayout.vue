<script setup lang="ts">
import { ref } from 'vue'

const isSidebarOpen = ref<boolean>(false)
</script>

<template>
  <div class="min-h-dvh w-full flex flex-col">
    <slot name="header">
      <Header v-model:sidebar="isSidebarOpen">
        <Link to="/" class="font-normal! underline"> Home </Link>
        <Link to="/posts" class="font-normal! underline"> Posts </Link>
        <Link to="/posts/example" class="font-normal! underline"> Example Post </Link>

        <template #sidebar-content>
          <div class="w-full h-full flex flex-col gap-2 px-6 py-8">
            <Link to="/" class="font-normal! underline" block> Home </Link>
            <Link to="/posts" class="font-normal! underline" block> Posts </Link>
            <Link to="/posts/example" class="font-normal! underline" block> Example Post </Link>
          </div>
        </template>
      </Header>
    </slot>

    <slot />

    <slot name="footer">
      <footer
        class="@container w-full max-w-7xl flex items-center justify-center mx-auto px-4 py-4 sm:px-6 lg:px-8"
      >
        <p class="text-sm text-ui-content-muted">&copy; 2026 bytriska. All rights reserved.</p>
      </footer>
    </slot>
  </div>
</template>
