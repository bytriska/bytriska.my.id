<script setup lang="ts"></script>

<template>
  <div
    data-slot="layout"
    :data-banner="!!$slots.banner"
    class="layout-home"
  >
    <div v-if="$slots.banner" class="sticky top-0 z-30 [grid-area:banner]">
      <slot name="banner"></slot>
    </div>

    <header class="sticky top-(--layout-row-1) z-20 [grid-area:header]">
      <slot name="header"></slot>
    </header>

    <main class="[grid-area:main]">
      <slot></slot>
    </main>
  </div>
</template>