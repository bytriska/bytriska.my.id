<script lang="ts">
import Footer from './parts/footer.vue'
import Header from './parts/header.vue'
import MainPage from './parts/main-page.vue'

export interface LayoutProps {
  title?: string
  tagline?: string
}

export interface LayoutSlots {
  default?: () => any
  banner?: () => any
  header?: () => any
  main?: () => any
  footer?: () => any
}
</script>

<script setup lang="ts">
const props = defineProps<LayoutProps>()
const slots = defineSlots<LayoutSlots>()
</script>

<template>
  <div data-slot="layout-root" :data-banner="!!slots.banner" class="home-layout">
    <slot name="banner" />

    <slot name="header">
      <Header />
    </slot>

    <slot name="main">
      <MainPage :title="props.title" :tagline="props.tagline">
        <slot />
      </MainPage>
    </slot>

    <slot name="footer">
      <Footer />
    </slot>
  </div>
</template>

<style scoped>
@reference "@/styles/app.css";

.home-layout {
  --layout-banner-height: 0px;
  --layout-header-height: 0px;

  --layout-row-1: var(--layout-banner-height);
  --layout-row-2: calc(var(--layout-row-1) + var(--layout-header-height));

  --container-width: 100%;

  @variant sm {
    --container-width: var(--breakpoint-sm);
  }
  @variant md {
    --container-width: var(--breakpoint-md);
  }
  @variant lg {
    --container-width: var(--breakpoint-lg);
  }
  @variant xl {
    --container-width: var(--breakpoint-xl);
  }

  display: grid;
  min-height: 100dvh;
  overflow-x: clip;

  grid-template-areas:
    'banner'
    'header'
    'main'
    'footer';
  grid-template-rows:
    minmax(var(--layout-banner-height), auto) minmax(var(--layout-header-height), auto)
    1fr auto;
  grid-template-columns: minmax(0, 1fr);
}
</style>
