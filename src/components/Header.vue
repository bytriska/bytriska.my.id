<script setup lang="ts">
import { createReusableTemplate, useDark, useToggle } from '@vueuse/core'

const [DefineLeftTemplate, LeftTemplate] = createReusableTemplate()
const [DefineRightTemplate, RightTemplate] = createReusableTemplate()
const [DefineSidebarTemplate, SidebarTemplate] = createReusableTemplate()
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

  <DefineSidebarTemplate>
    <slot name="sidebar">
      <Transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isSidebarOpen"
          class="fixed inset-0 top-(--ui-header-nav-height) bg-ui-surface-base/75 backdrop-blur-md z-ui-overlay overscroll-contain"
          @click="isSidebarOpen = false"
        >
          <div
            class="absolute right-0 h-full w-full max-w-2xl bg-ui-surface-elevated z-ui-slideover"
            @click.stop
          >
            <slot name="sidebar-content" />
          </div>
        </div>
      </Transition>
    </slot>
  </DefineSidebarTemplate>

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

  <div class="sticky top-0 h-(--ui-header-height) w-full z-ui-sticky" v-bind="$attrs">
    <slot name="top" />

    <header
      class="h-(--ui-header-nav-height) w-full bg-ui-surface-base/75 backdrop-blur-sm border-b border-ui-border"
    >
      <div
        class="@container w-full h-full max-w-7xl flex items-center justify-between gap-4 mx-auto px-6 md:px-8"
      >
        <LeftTemplate />

        <div class="hidden lg:flex items-center">
          <slot />
        </div>

        <RightTemplate />
      </div>
    </header>

    <slot name="bottom" />

    <SidebarTemplate />
  </div>
</template>
