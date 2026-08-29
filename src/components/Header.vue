<script setup lang="ts">
import { createReusableTemplate, useDark, useMounted, useToggle } from '@vueuse/core'
import { ref } from 'vue'

const [DefineLeftTemplate, LeftTemplate] = createReusableTemplate()
const [DefineRightTemplate, RightTemplate] = createReusableTemplate()
const [DefineSidebarTemplate, SidebarTemplate] = createReusableTemplate()
const [DefineToggleButton, ToggleButton] = createReusableTemplate()

const sidebarOpen = ref<boolean>(false)
const toggleSidebar = useToggle(sidebarOpen)

const isMounted = useMounted()
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <DefineToggleButton>
    <slot name="toggle-button" :open="sidebarOpen" @click="toggleSidebar">
      <Button
        variant="subtle"
        square
        :title="sidebarOpen ? 'Hide Sidebar' : 'Show sidebar'"
        class="lg:hidden"
        @click="toggleSidebar()"
      >
        <i-lucide-x v-if="sidebarOpen" />
        <i-lucide-menu v-else />
      </Button>
    </slot>
  </DefineToggleButton>

  <DefineSidebarTemplate>
    <slot name="sidebar">
      <SidebarNavigation v-model:open="sidebarOpen" />
    </slot>
  </DefineSidebarTemplate>

  <DefineLeftTemplate>
    <div class="flex items-center gap-2">
      <slot name="left">
        <Link to="/" class="text-base! font-bold -ml-2.5"> bytriska </Link>
      </slot>
    </div>
  </DefineLeftTemplate>

  <DefineRightTemplate>
    <div class="flex items-center justify-end gap-2">
      <slot name="right" :is-dark="isDark" :toggle-dark="toggleDark">
        <Button
          variant="subtle"
          square
          :disabled="!isMounted"
          :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          @click="toggleDark()"
        >
          <i-lucide-moon v-if="isMounted && isDark" />
          <i-lucide-sun v-if="isMounted && !isDark" />
          <i-lucide-dot v-if="!isMounted" />
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
        class="w-full h-full max-w-7xl flex items-center justify-between gap-4 mx-auto px-6 md:px-8"
      >
        <LeftTemplate />

        <div class="hidden lg:block">
          <slot>
            <HeaderNavigation />
          </slot>
        </div>

        <RightTemplate />
      </div>
    </header>

    <slot name="bottom" />

    <SidebarTemplate />
  </div>
</template>
