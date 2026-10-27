<script lang="ts">
export interface PostLayoutProps {}
export interface PostLayoutSlots {
  default?: () => any
  announcement?: () => any
}
</script>

<script setup lang="ts">
defineProps<PostLayoutProps>()
defineSlots<PostLayoutSlots>()
</script>

<template>
  <div 
    data-slot="layout-root"
    class="post-layout__root"
  >
    <div v-if="$slots.announcement" class="post-layout__announcement [grid-area:announcement]">
      <slot name="announcement" />
    </div>

    <header class="post-layout__header [grid-area:header]">
      <div></div>
    </header>

    <div class="post-layout__toc-bar [grid-area:toc-bar] lg:hidden">
      <div></div>
    </div>

    <div class="post-layout__drawer [grid-area:drawer] lg:hidden">
      <div></div>
    </div>

    <main
      tabindex="-1"
      class="post-layout__main [grid-area:main]"
    >
      <div>
        <slot />
      </div>
    </main>

    <aside class="post-layout__toc [grid-area:toc] max-lg:hidden">
      <div></div>
    </aside>

    <footer class="post-layout__footer [grid-area:footer]">
      <div></div>
    </footer>
  </div>
</template>

<style scoped>
@reference "@/styles/app.css";

.post-layout__root {
  --layout-announcement-height: 0px;
  --layout-header-height: 0px;
  --layout-toc-bar-height: 0px;
  --layout-drawer-height: 0px;

  --max-container-width: 0px;
  --max-content-width: 0px;
  --max-toc-width: 0px;

  --layout-row-1: var(--layout-announcement-height);
  --layout-row-2: calc(var(--layout-row-1) + var(--layout-header-height));
  --layout-row-3: calc(var(--layout-row-2) + var(--layout-toc-bar-height));
  --layout-row-4: calc(var(--layout-row-3) + var(--layout-drawer-height));

  display: grid;
  min-height: 100dvh;
  overflow-x: clip;

  grid-template-areas:
    'announcement'
    'header'
    'toc-bar'
    'drawer'
    'main'
    'footer';
  grid-template-rows: 
    minmax(var(--layout-announcement-height), auto)
    minmax(var(--layout-header-height), auto)
    minmax(var(--layout-toc-bar-height), auto)
    minmax(var(--layout-drawer-height), auto)
    1fr
    auto;
  grid-template-columns: minmax(0, 1fr);

  @variant lg {
    grid-template-areas:
      'announcement announcement'
      'header header'
      'main toc'
      'footer footer';
    grid-template-rows:
      minmax(var(--layout-announcement-height), auto)
      minmax(var(--layout-header-height) auto)
      1fr
      auto;
    grid-template-columns: minmax(0, 1fr) minmax(0, var(--max-toc-width))
  }
}
</style>