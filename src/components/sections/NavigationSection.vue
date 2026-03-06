<script setup>
import { ref } from 'vue'
import PreviewBox    from '../ui/PreviewBox.vue'
import SectionHeader from '../ui/SectionHeader.vue'

const activeTab = ref('Overview')

const tabs = [
  { label: 'Overview' },
  { label: 'Members', count: 12 },
  { label: 'Settings' },
  { label: 'Billing' },
]

const breadcrumbs = [
  { label: 'Workspace' },
  { label: 'Projects' },
  { label: 'Design System' },
  { label: 'Components', active: true },
]

const sidebarGroups = [
  {
    title: 'Foundation',
    items: [
      { label: 'Tokens',     active: false },
      { label: 'Typography', active: true  },
      { label: 'Spacing',    active: false },
    ],
  },
  {
    title: 'Components',
    items: [
      { label: 'Buttons', active: false },
      { label: 'Forms',   active: false },
      { label: 'Cards',   active: false },
    ],
  },
]
</script>

<template>
  <section>
    <SectionHeader title="Navigation" section-id="navigation">
      <strong>Tabs</strong> for switching between peer-level views within a page.
      <strong>Breadcrumbs</strong> for deep hierarchical structures.
      Use the <strong>Navbar</strong> for global navigation and the <strong>Sidebar</strong>
      for section-level navigation with many links.
      Active state uses <code class="font-code text-xs bg-primary-subtle text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded">bg-primary-subtle</code>
      with <code class="font-code text-xs bg-primary-subtle text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded">text-green-700</code>.
    </SectionHeader>

    <!-- Tabs -->
    <PreviewBox label="Tabs" class="mb-4">
      <div class="px-4 pt-4">
        <nav class="flex border-b border-edge-subtle">
          <button v-for="tab in tabs" :key="tab.label"
                  class="flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors duration-150" :class="[
                    activeTab === tab.label
                      ? 'text-green-700 dark:text-green-400 border-green-600'
                      : 'text-content-tertiary border-transparent hover:text-content-primary'
                  ]"
                  @click="activeTab = tab.label">
            {{ tab.label }}
            <span v-if="tab.count"
                  class="inline-flex items-center h-[18px] px-1.5 rounded-full text-[10px] font-semibold
                         bg-surface-overlay text-content-secondary border border-edge">
              {{ tab.count }}
            </span>
          </button>
        </nav>
        <div class="py-4">
          <p class="text-sm text-content-secondary">
            Content for the <strong class="text-content-primary">{{ activeTab }}</strong> tab.
          </p>
        </div>
      </div>
    </PreviewBox>

    <!-- Breadcrumbs -->
    <PreviewBox label="Breadcrumbs" class="mb-4">
      <nav class="px-5 py-3.5">
        <ol class="flex flex-wrap items-center gap-1 list-none text-sm">
          <li v-for="(crumb, i) in breadcrumbs" :key="crumb.label" class="flex items-center gap-1">
            <span v-if="i > 0" class="text-content-disabled text-xs">›</span>
            <a v-if="!crumb.active"
               href="#"
               class="text-content-tertiary no-underline transition-colors duration-150 hover:text-blue-600">
              {{ crumb.label }}
            </a>
            <span v-else class="text-content-primary font-medium">{{ crumb.label }}</span>
          </li>
        </ol>
      </nav>
    </PreviewBox>

    <!-- Sidebar mini-demo -->
    <PreviewBox label="Sidebar Navigation" sublabel="section-level nav with group labels">
      <div class="flex max-h-72 overflow-hidden rounded-b-lg">
        <aside class="w-48 shrink-0 bg-surface-raised border-r border-edge-subtle px-3 py-4 overflow-y-auto">
          <div v-for="group in sidebarGroups" :key="group.title" class="mb-4">
            <p class="text-[10px] font-semibold tracking-widest uppercase text-content-tertiary px-3 mb-1.5">
              {{ group.title }}
            </p>
            <ul class="list-none space-y-0.5">
              <li v-for="item in group.items" :key="item.label">
                <a href="#"
                   class="flex items-center gap-2 px-3 py-1.5 text-xs rounded-md no-underline transition-colors duration-150" :class="[
                     item.active
                       ? 'bg-primary-subtle text-green-700 dark:text-green-400 font-medium'
                       : 'text-content-secondary hover:text-content-primary hover:bg-surface-overlay'
                   ]">
                  {{ item.label }}
                </a>
              </li>
            </ul>
          </div>
        </aside>
        <div class="flex-1 p-4 bg-surface-base">
          <p class="text-sm text-content-tertiary">Main content area</p>
        </div>
      </div>
    </PreviewBox>
  </section>
</template>
