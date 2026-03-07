<script setup>
defineProps({ isDark: Boolean, isSidebarVisible: Boolean })
defineEmits(['toggleDark', 'toggleSidebar'])

const navLinks = [
  { href: '#tokens',     label: 'Tokens' },
  { href: '#typography', label: 'Typography' },
  { href: '#buttons',    label: 'Buttons' },
  { href: '#forms',      label: 'Forms' },
  { href: '#cards',      label: 'Cards' },
  { href: '#feedback',   label: 'Feedback' },
  { href: '#navigation', label: 'Navigation' },
  { href: '#tables',     label: 'Data' },
]
</script>

<template>
  <nav class="h-(--ui-header-height) flex items-center gap-6 px-6
              bg-ui-surface-base border-b border-edge-subtle
              sticky top-0 z-[200] shadow-xs">

    <!-- Brand -->
    <a href="#" class="font-display text-lg font-semibold text-ui-content-base no-underline shrink-0">
      <span class="text-green-600">◆</span>&nbsp;DesignSys
    </a>

    <!-- Nav links -->
    <ul class="flex items-center gap-1 list-none flex-1 max-lg:hidden">
      <li v-for="link in navLinks" :key="link.href">
        <a :href="link.href"
           class="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md no-underline
                  text-content-secondary transition-colors duration-150
                  hover:text-content-primary hover:bg-surface-overlay">
          {{ link.label }}
        </a>
      </li>
    </ul>

    <!-- Actions -->
    <div class="flex items-center gap-2 ml-auto">
      <!-- Dark mode toggle -->
      <button
        :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        class="flex items-center justify-center w-9 h-9 rounded-md
               text-ui-content-toned transition-colors duration-150
               hover:bg-ui-surface-accented/80 hover:text-ui-content-base"
        @click="$emit('toggleDark')"
      >
        <!-- Sun icon (light mode) -->
        <svg v-if="isDark" width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"/>
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        </svg>
        <!-- Moon icon (dark mode) -->
        <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </button>

      <!-- Sidebar toggle -->
      <button
        :title="isSidebarVisible ? 'Hide Sidebar' : 'Show sidebar'"
        class="flex items-center justify-center w-9 h-9 rounded-md
               text-ui-content-toned transition-colors duration-150
               hover:bg-ui-surface-accented/80 hover:text-ui-content-base"
        @click="$emit('toggleSidebar')"
      >
        <!-- Menu icon -->
        <svg v-if="!isSidebarVisible" width="20" height="20" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <line x1="3" y1="6"  x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        <!-- Close icon -->
        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <line x1="18" y1="6"  x2="6"  y2="18" />
          <line x1="6"  y1="6"  x2="18" y2="18" />
        </svg>
      </button>

      <!-- Version badge -->
      <span class="inline-flex items-center gap-1.5 h-6 px-3 rounded-full text-[11px] font-semibold
                   bg-status-success-surface text-green-700 dark:text-green-400
                   border border-status-success-edge">
        <span class="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></span>
        v2026
      </span>
    </div>
  </nav>
</template>
