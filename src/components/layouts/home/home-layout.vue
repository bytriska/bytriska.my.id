<script lang="ts">
import Header from './parts/header.vue'

export interface LayoutSlots {
  default?: () => any
  banner?: () => any
  header?: () => any
}
</script>

<script setup lang="ts">
const slots = defineSlots<LayoutSlots>()
</script>

<template>
  <div data-slot="layout-root" :data-banner="!!slots.banner" class="home-layout">
    <div v-if="slots.banner" class="[grid-area:banner]">
      <slot name="banner" />
    </div>

    <header class="[grid-area:header]">
      <slot name="header">
        <Header />
      </slot>
    </header>

    <main class="[grid-area:main]">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.home-layout {
  --layout-banner-height: 0px;
  --layout-header-height: 0px;

  --layout-row-1: var(--layout-banner-height);
  --layout-row-2: calc(var(--layout-row-1) + var(--layout-header-height));

  display: grid;
  min-height: 100dvh;
  overflow-x: clip;

  grid-template-areas:
    'banner'
    'header'
    'main';
  grid-template-rows: var(--layout-banner-height) var(--layout-header-height) 1fr;
  grid-template-columns: minmax(0, 1fr);
}
</style>
