<script setup lang="ts">
import type { MarkdownItHeader } from '@/types'
import { computed, ref } from 'vue'

const props = defineProps<{
  frontmatter: {
    title: string
    description: string
    _headers?: MarkdownItHeader[]
  }
}>()

const isSidebarOpen = ref(false)
const isTocOpen = ref(false)

function normalizeHeaders(headers: MarkdownItHeader[]): MarkdownItHeader[] {
  if (!headers.length) return []

  const hasTree = headers.some(h => h.children && h.children.length > 0)
  if (hasTree) return headers

  const root: MarkdownItHeader[] = []
  const stack: MarkdownItHeader[] = []

  for (const hdr of headers) {
    const node: MarkdownItHeader = { ...hdr, children: [] }

    while (stack.length && stack[stack.length - 1]!.level >= node.level) {
      stack.pop()
    }

    if (!stack.length) {
      root.push(node)
    } else {
      stack[stack.length - 1]!.children!.push(node)
    }

    stack.push(node)
  }

  return root
}

const tocHeaders = computed(() => normalizeHeaders(props.frontmatter._headers ?? []))

function navigateTo(link: string) {
  isTocOpen.value = false
  requestAnimationFrame(() => {
    const id = link.replace(/^#/, '')
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
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
          <div class="flex flex-col gap-2">
            <Link to="/" class="font-normal! underline" block> Home </Link>
            <Link to="/posts" class="font-normal! underline" block> Posts </Link>
            <Link to="/posts/example" class="font-normal! underline" block> Example Post </Link>
          </div>
        </template>
      </Header>
    </slot>

    <div
      class="w-full bg-ui-surface-base/75 backdrop-blur sticky top-(--ui-header-height) z-ui-sticky"
    >
      <div
        class="w-full max-w-7xl flex items-center justify-between border-b border-dashed border-ui-border mx-auto py-2 px-6 md:px-8"
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

    <slot />

    <slot name="footer">
      <footer class="w-full max-w-7xl flex flex-col items-center mx-auto py-4 px-6 md:py-8 md:px-8">
        <p class="text-sm text-ui-content-muted">&copy; 2026 bytriska. All rights reserved.</p>
      </footer>
    </slot>
  </div>
</template>
