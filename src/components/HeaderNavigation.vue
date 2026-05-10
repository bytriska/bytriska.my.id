<script setup lang="ts">
import { NAVIGATION_ITEMS } from '@/constants'
</script>

<template>
  <ul class="list-none flex items-center gap-2">
    <li v-for="nav in NAVIGATION_ITEMS" :key="nav.path">
      <Link :to="nav.path" exact-active-class="text-ui-success">
        {{ nav.title }}
      </Link>
    </li>
  </ul>
</template>
