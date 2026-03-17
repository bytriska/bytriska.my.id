<script setup lang="ts"></script>

<template>
  <div class="min-h-dvh w-full flex flex-col">
    <slot name="header">
      <header
        class="@container w-full max-w-7xl flex items-center justify-end gap-4 mx-auto px-4 py-4 sm:px-6 lg:px-8"
      >
        <RouterLink to="/" class="text-sm underline"> Home </RouterLink>
        <RouterLink to="/posts" class="text-sm underline"> Posts </RouterLink>
        <RouterLink to="/posts/example" class="text-sm underline"> Example Post </RouterLink>
      </header>
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
