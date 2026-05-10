<script setup lang="ts">
import { NAVIGATION_ITEMS } from '@/constants'

const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <Transition
    enter-active-class="transition duration-150 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-100 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="open"
      class="fixed inset-0 top-(--ui-header-nav-height) bg-ui-surface-base/75 backdrop-blur-md z-ui-overlay overscroll-contain"
      @click="open = false"
    >
      <div
        class="absolute right-0 h-full w-full sm:w-(--ui-sidebar-width) bg-ui-surface-elevated sm:border-l z-ui-slideover"
        @click.stop
      >
        <slot>
          <div class="h-full flex flex-col gap-2 px-6 py-8">
            <div v-for="nav in NAVIGATION_ITEMS" :key="nav.path" class="border-b -mx-1 px-1 pb-2">
              <Link :to="nav.path" class="-ml-2.5" exact-active-class="text-ui-success">
                {{ nav.title }}
              </Link>
            </div>
          </div>
        </slot>
      </div>
    </div>
  </Transition>
</template>
