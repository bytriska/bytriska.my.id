<script setup lang="ts">
import type { MarkdownItHeader } from '@/types'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  frontmatter: {
    title: string
    description: string
    _headers?: MarkdownItHeader[]
  }
}>()

const router = useRouter()
const isSidebarOpen = ref(false)
const isTocOpen = ref(false)

const tocHeaders = computed(() => props.frontmatter._headers || [])

function navigateTo(link: string) {
  isTocOpen.value = false
  router.push({ hash: link })
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="min-h-dvh w-full flex flex-col">
    <slot name="header">
      <Header v-model:sidebar="isSidebarOpen">
        <Link to="/" class="font-normal! underline"> Home </Link>
        <Link to="/posts" class="font-normal! underline"> Posts </Link>
        <Link to="/posts/example" class="font-normal! underline"> Example Post </Link>

        <template #sidebar-content>
          <div class="w-full h-full flex flex-col gap-2 px-6 py-8">
            <Link to="/" class="font-normal! underline" block> Home </Link>
            <Link to="/posts" class="font-normal! underline" block> Posts </Link>
            <Link to="/posts/example" class="font-normal! underline" block> Example Post </Link>
          </div>
        </template>

        <template #bottom>
          <div class="w-full h-(--ui-header-bottom-height) bg-ui-surface-base/75 backdrop-blur-sm">
            <div
              class="w-full h-full max-w-7xl flex items-center justify-between border-b border-dashed border-ui-border mx-auto px-6 md:px-8"
            >
              <Button
                variant="ghost"
                size="xs"
                class="space-x-1 -ml-2 text-ui-content-muted"
                @click="isTocOpen = true"
              >
                <template #leading>
                  <i-lucide-align-left />
                </template>
                Table of Contents
              </Button>

              <Button
                variant="ghost"
                size="xs"
                class="space-x-1 -mr-2 text-ui-content-muted"
                @click="scrollToTop"
              >
                <template #trailing>
                  <i-lucide-circle-arrow-up />
                </template>
                Back to top
              </Button>
            </div>
          </div>

          <Transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div
              v-if="isTocOpen"
              class="fixed inset-0 bg-ui-surface-base/75 backdrop-blur-md z-ui-overlay overflow-y-auto overscroll-contain p-6 flex items-start justify-center"
              @click="isTocOpen = false"
            >
              <div
                class="relative w-full max-w-2xl bg-ui-surface-elevated rounded-md shadow-lg mt-16 z-ui-modal"
                @click.stop
              >
                <div class="flex items-center justify-between px-6 py-4 border-b border-ui-border">
                  <h3 class="text-xl font-bold leading-none">Table of Contents</h3>
                  <Button variant="subtle" size="sm" square @click="isTocOpen = false">
                    <i-lucide-x />
                  </Button>
                </div>

                <div class="px-6 py-4">
                  <TocTree
                    v-if="tocHeaders.length"
                    :headers="tocHeaders"
                    @navigate="link => navigateTo(link)"
                  />
                  <p v-else class="text-sm text-ui-content-muted">No headers found on this page.</p>
                </div>
              </div>
            </div>
          </Transition>
        </template>
      </Header>
    </slot>

    <slot />

    <slot name="footer">
      <footer class="w-full max-w-7xl flex flex-col items-center mx-auto py-4 px-6 md:py-8 md:px-8">
        <p class="text-sm text-ui-content-muted">&copy; 2026 bytriska. All rights reserved.</p>
      </footer>
    </slot>
  </div>
</template>

<style scoped>
:global(:root) {
  --ui-header-bottom-height: 2.5rem;
}
</style>
