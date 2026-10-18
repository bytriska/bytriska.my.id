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
    <slot name="banner" />

    <slot name="header">
      <Header />
    </slot>

    <slot />
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
  grid-template-rows: minmax(var(--layout-banner-height), auto) minmax(
      var(--layout-header-height),
      auto
    ) 1fr;
  grid-template-columns: minmax(0, 1fr);
}
</style>
