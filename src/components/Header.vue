<script setup lang="ts">
import { createReusableTemplate, useToggle } from '@vueuse/core'
import { ref } from 'vue'

const [DefineLeftTemplate, LeftTemplate] = createReusableTemplate()
const [DefineRightTemplate, RightTemplate] = createReusableTemplate()
const [DefineToggleButton, ToggleButton] = createReusableTemplate()

const isSidebarOpen = ref<boolean>(false)
const toggleSidebar = useToggle(isSidebarOpen)
</script>

<template>
  <DefineToggleButton>
    <slot name="toggle-button" :is-open="isSidebarOpen" @click="toggleSidebar">
      <button
        :title="isSidebarOpen ? 'Hide Sidebar' : 'Show sidebar'"
        class="flex lg:hidden items-center justify-center size-8 rounded-md text-ui-content-toned transition-colors duration-150 hover:bg-ui-surface-accented/80 hover:text-ui-content-base"
        @click="toggleSidebar()"
      >
        <!-- Menu icon -->
        <svg
          v-if="!isSidebarOpen"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>

        <!-- Close icon -->
        <svg
          v-else
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </slot>
  </DefineToggleButton>

  <DefineLeftTemplate>
    <div class="flex items-center gap-4">
      <slot name="left">
        <RouterLink to="/" class="text-sm underline"> bytriska </RouterLink>
      </slot>
    </div>
  </DefineLeftTemplate>

  <DefineRightTemplate>
    <div class="flex items-center justify-end gap-4">
      <slot name="right" />

      <ToggleButton />
    </div>
  </DefineRightTemplate>

  <header
    class="h-(--ui-header-height) w-full bg-ui-surface-base/75 backdrop-blur border-b border-ui-border sticky top-0 z-ui-docked"
  >
    <div
      class="@container w-full max-w-7xl flex items-center justify-between gap-4 mx-auto px-4 py-4 sm:px-6 lg:px-8"
    >
      <LeftTemplate />

      <div class="hidden lg:flex items-center">
        <slot />
      </div>

      <RightTemplate />
    </div>
  </header>

  <slot name="sidebar">
    <div class="lg:hidden isolate">
      <slot name="sidebar-overlay" @close-sidebar="isSidebarOpen = false">
        <div
          v-show="isSidebarOpen"
          class="fixed top-(--ui-header-height) left-0 right-0 bottom-0 bg-ui-surface-base/75 backdrop-blur"
          @click="isSidebarOpen = false"
        />
      </slot>

      <slot name="sidebar-body">
        <aside
          class="fixed top-(--ui-header-height) right-0 bottom-0 w-full max-w-sm bg-ui-surface-muted transition-transform duration-150"
          :class="isSidebarOpen ? 'translate-x-0' : 'translate-x-full'"
        >
          <div class="w-full h-full px-4 sm:px-6 py-4">
            <slot name="sidebar-content" />
          </div>
        </aside>
      </slot>
    </div>
  </slot>
</template>
