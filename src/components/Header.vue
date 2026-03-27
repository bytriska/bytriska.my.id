<script setup lang="ts">
import { createReusableTemplate, useDark, useToggle } from '@vueuse/core'

const [DefineLeftTemplate, LeftTemplate] = createReusableTemplate()
const [DefineRightTemplate, RightTemplate] = createReusableTemplate()
const [DefineToggleButton, ToggleButton] = createReusableTemplate()

const isSidebarOpen = defineModel<boolean>('sidebar', { default: false })
const toggleSidebar = useToggle(isSidebarOpen)

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <DefineToggleButton>
    <slot name="toggle-button" :is-open="isSidebarOpen" @click="toggleSidebar">
      <Button
        variant="subtle"
        square
        :title="isSidebarOpen ? 'Hide Sidebar' : 'Show sidebar'"
        @click="toggleSidebar()"
      >
        <i-lucide-x v-if="isSidebarOpen" />
        <i-lucide-menu v-else />
      </Button>
    </slot>
  </DefineToggleButton>

  <DefineLeftTemplate>
    <div class="flex items-center gap-2">
      <slot name="left">
        <Link to="/" class="text-base! font-bold! underline"> bytriska </Link>
      </slot>
    </div>
  </DefineLeftTemplate>

  <DefineRightTemplate>
    <div class="flex items-center justify-end gap-2">
      <slot name="right" :is-dark="isDark" :toggle-dark="toggleDark">
        <Button
          variant="subtle"
          square
          :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          @click="toggleDark()"
        >
          <i-lucide-moon v-if="isDark" />
          <i-lucide-sun v-else />
        </Button>
      </slot>

      <ToggleButton />
    </div>
  </DefineRightTemplate>

  <header
    class="h-(--ui-header-height) w-full bg-ui-surface-base/75 backdrop-blur border-b border-ui-border sticky top-0 z-ui-sticky"
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
    <div class="lg:hidden">
      <slot name="sidebar-overlay" @close-sidebar="isSidebarOpen = false">
        <div
          v-if="isSidebarOpen"
          class="fixed top-(--ui-header-height) left-0 right-0 bottom-0 bg-ui-surface-base/75 backdrop-blur z-ui-overlay"
          @click="isSidebarOpen = false"
        />
      </slot>

      <slot name="sidebar-body">
        <aside
          class="fixed top-(--ui-header-height) right-0 bottom-0 w-full max-w-sm bg-ui-surface-muted transition-transform duration-150 z-ui-slideover"
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
