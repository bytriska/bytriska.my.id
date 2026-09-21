<script setup lang="ts">
import { NAVIGATION_ITEMS } from '@/constants'
</script>

<template>
  <ul class="list-none flex items-center gap-2">
    <li v-for="nav in NAVIGATION_ITEMS" :key="nav.path">
      <LegacyLink :to="nav.path" exact-active-class="text-ui-success">
        {{ nav.title }}
      </LegacyLink>
    </li>
  </ul>
</template>
