<script setup lang="ts">
import {onMounted, onUnmounted, ref} from 'vue'

defineProps({ activeSection: String, isSidebarVisible: Boolean })
const emit = defineEmits(['navigate', 'closeSidebar'])

const sidebarEl = ref<HTMLElement|null>(null)
function clickOutsideElHandler(event:MouseEvent){
  if(!(event.target instanceof Node)) return
  if(sidebarEl.value && !sidebarEl.value.contains(event.target)) emit('closeSidebar')
}

onMounted(()=> document.addEventListener('mousedown', clickOutsideElHandler))
onUnmounted(()=> document.removeEventListener('mousedown', clickOutsideElHandler))

const navGroups = [
  {
    title: 'Foundation',
    items: [
      { id: 'tokens',     href: '#tokens',     label: 'Design Tokens' },
      { id: 'typography', href: '#typography', label: 'Typography' },
      { id: 'foundation', href: '#foundation', label: 'Spacing & Elevation' },
    ],
  },
  {
    title: 'Atoms',
    items: [
      { id: 'buttons', href: '#buttons', label: 'Buttons' },
      { id: 'badges',  href: '#badges',  label: 'Badges' },
      { id: 'forms',   href: '#forms',   label: 'Form Inputs' },
      { id: 'atoms',   href: '#atoms',   label: 'Avatars & Loading' },
    ],
  },
  {
    title: 'Molecules',
    items: [
      { id: 'cards',      href: '#cards',      label: 'Cards' },
      { id: 'feedback',   href: '#feedback',   label: 'Alerts & Toasts' },
      { id: 'navigation', href: '#navigation', label: 'Navigation' },
      { id: 'modals',     href: '#modals',     label: 'Modals' },
    ],
  },
  {
    title: 'Data Display',
    items: [
      { id: 'tables', href: '#tables', label: 'Tables' },
    ],
  },
]
</script>

<template>
  <aside ref="sidebarEl" class="w-[240px] h-auto fixed lg:sticky top-[60px] bottom-0 overflow-y-auto overscroll-y-contain shrink-0
                bg-surface-raised border-r border-edge-subtle px-4 py-6" :class="[{'max-lg:hidden': !isSidebarVisible}]">

    <div v-for="group in navGroups" :key="group.title" class="mb-6">
      <p class="text-[11px] font-semibold tracking-widest uppercase text-content-tertiary
                px-3 mb-2">
        {{ group.title }}
      </p>

      <ul class="list-none space-y-0.5">
        <li v-for="item in group.items" :key="item.href">
          <a
            :href="item.href"
            class="flex items-center gap-2 px-3 py-2 text-sm rounded-md no-underline transition-colors duration-150" :class="[
              activeSection === item.id
                ? 'bg-primary-subtle text-green-700 dark:text-green-400 font-medium'
                : 'text-content-secondary hover:text-content-primary hover:bg-surface-overlay'
            ]"
            @click="$emit('navigate', item.id)"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>
