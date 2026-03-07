<script setup>
import { ref } from 'vue'
import DocNavbar      from '~/components/layout/DocNavbar.vue'
import DocSidebar     from '~/components/layout/DocSidebar.vue'
import AtomsSection   from '~/components/sections/AtomsSection.vue'
import BadgesSection  from '~/components/sections/BadgesSection.vue'
import ButtonsSection from '~/components/sections/ButtonsSection.vue'
import CardsSection   from '~/components/sections/CardsSection.vue'
import FeedbackSection from '~/components/sections/FeedbackSection.vue'
import FormsSection   from '~/components/sections/FormsSection.vue'
import FoundationSection from '~/components/sections/FoundationSection.vue'
import ModalsSection  from '~/components/sections/ModalsSection.vue'
import NavigationSection from '~/components/sections/NavigationSection.vue'
import TablesSection  from '~/components/sections/TablesSection.vue'
import TokensSection  from '~/components/sections/TokensSection.vue'
import TypographySection from '~/components/sections/TypographySection.vue'

const isDark = ref(false)
const isSidebarVisible = ref(false)
const activeSection = ref('tokens')

function toggleDark() {
  isDark.value = !isDark.value
}

function toggleSidebar(){
  isSidebarVisible.value = !isSidebarVisible.value
}

function closeSidebar(){
  isSidebarVisible.value = false
}

function setActive(id) {
  activeSection.value = id
}

const tags = ['Tailwind v4', 'CSS Custom Properties', 'Dark Mode Ready', 'WCAG AA', '4px Grid', 'Vue 3 SFC']
</script>

<template>
  <div class="min-h-screen bg-ui-surface-base text-ui-content-base transition-colors duration-200" :class="[{ dark: isDark }]">

    <DocNavbar :is-dark="isDark" @toggle-dark="toggleDark" :is-sidebar-visible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />

    <div class="flex">
      <DocSidebar :active-section="activeSection" @navigate="setActive" :is-sidebar-visible="isSidebarVisible" @close-sidebar="closeSidebar" />

      <main class="flex-1 min-w-0 max-w-[860px] px-4 md:px-8 pb-24">

        <div class="pt-12 pb-8">
          <p class="text-xs font-semibold tracking-widest uppercase text-content-tertiary mb-3">
            Design System — v2026
          </p>
          <h1 class="font-display text-4xl tracking-tight text-content-primary mb-3">
            Component & Token Reference
          </h1>
          <p class="text-lg leading-relaxed text-content-secondary max-w-xl">
            A token-first design system built on Tailwind CSS v4.
            Stone neutrals · Green primary · Blue secondary.
            Full dark mode via CSS variable chains.
          </p>
          <div class="flex flex-wrap gap-2 mt-5">
            <span v-for="tag in tags" :key="tag"
              class="inline-flex items-center h-6 px-3 rounded-full text-[11px] font-semibold
                     bg-secondary-subtle text-blue-700 dark:text-blue-400 border border-status-info-edge">
              {{ tag }}
            </span>
          </div>
        </div>

        <TokensSection id="tokens" />
        <TypographySection id="typography" />
        <FoundationSection id="foundation" />
        <ButtonsSection id="buttons" />
        <BadgesSection id="badges" />
        <FormsSection id="forms" />
        <AtomsSection id="atoms" />
        <CardsSection id="cards" />
        <FeedbackSection id="feedback" />
        <NavigationSection id="navigation" />
        <ModalsSection id="modals" />
        <TablesSection id="tables" />

      </main>
    </div>
  </div>
</template>
