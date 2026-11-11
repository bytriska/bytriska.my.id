<script lang="ts">
import type { PostFrontmatter } from '@/types'
import { AtSignIcon, ChevronDownIcon, CircleArrowUpIcon, TextAlignStartIcon } from '@lucide/vue'
import { unrefElement, useEventListener, useMediaQuery, useWindowScroll } from '@vueuse/core'
import { nextTick, ref, useTemplateRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ModeSwitcher } from '@/components/mode-switcher'
import { GithubIcon } from '@/components/social-icons'
import { TocTree } from '@/components/toc-tree'
import { Button } from '@/components/ui/button'
import { CollapsibleContent, CollapsibleRoot } from '@/components/ui/collapsible'
import { Link } from '@/components/ui/link'
import { useCodeGroupNav } from '@/composables/code-group-nav'
import { useCopyCode } from '@/composables/copy-code'
import { useSeo } from '@/composables/seo'
import { mainNavigationList } from '../shared'

export interface PostLayoutProps {
  meta: PostFrontmatter
}

export interface PostLayoutSlots {
  default?: () => any
  announcement?: () => any
}

type DrawerId = 'nav' | 'toc'
</script>

<script setup lang="ts">
const props = defineProps<PostLayoutProps>()
defineSlots<PostLayoutSlots>()

useCopyCode()
useCodeGroupNav()
useSeo(props.meta)

const headerDrawer = useTemplateRef('header-drawer')
const drawerTriggerNav = useTemplateRef('header-navbar__drawer-trigger-nav')
const drawerTriggerToc = useTemplateRef('header-tocbar__drawer-trigger-toc')

const activeDrawerId = ref<DrawerId | null>(null)
const renderedDrawerId = ref<DrawerId | null>(null)
watch(
  () => activeDrawerId.value,
  id => {
    if (!id) return
    renderedDrawerId.value = id
    nextTick(() => {
      const drawerEl = unrefElement(headerDrawer)
      drawerEl?.querySelector('a, button')?.focus()
    })
  }
)

function inRegion(node: EventTarget | null) {
  return node instanceof Element && !!node.closest('[data-drawer-region]')
}

function toggle(id: DrawerId) {
  activeDrawerId.value = activeDrawerId.value === id ? null : id
}

function close(shouldReturnFocus: boolean = false) {
  const prev = activeDrawerId.value
  if (!prev) return
  activeDrawerId.value = null

  if (shouldReturnFocus) {
    nextTick(() => {
      const triggerEl = unrefElement(prev === 'nav' ? drawerTriggerNav : drawerTriggerToc)
      triggerEl?.focus()
    })
  }
}

useEventListener('pointerdown', e => {
  if (!inRegion(e.target) && activeDrawerId.value) close()
})
useEventListener('focusin', e => {
  if (!inRegion(e.target) && activeDrawerId.value) close()
})
useEventListener('keydown', e => {
  if (e.key === 'Escape' && activeDrawerId.value) close(true)
})

const route = useRoute()
watch(
  () => route.fullPath,
  () => close()
)

const isSm = useMediaQuery('(width >= 40rem)')
watch(
  () => isSm.value,
  value => value && activeDrawerId.value === 'nav' && close()
)

const isLg = useMediaQuery('(width >= 64rem)')
watch(
  () => isLg.value,
  value => value && close()
)

const scroll = useWindowScroll()
function scrollToTop() {
  scroll.y.value = 0
}
</script>

<template>
  <div
    data-slot="layout-root"
    class="post-layout__root root:[--scroll-padding-top:var(--layout-scroll-padding-top)]!"
  >
    <Link
      href="#main"
      variant="outline"
      class="sr-only focus:not-sr-only focus:fixed focus:inset-s-4 focus:top-4 focus:z-50"
    >
      Skip to main
    </Link>

    <div v-if="$slots.announcement" class="post-layout__announcement">
      <slot name="announcement" />
    </div>

    <header
      class="post-layout__header root:[--layout-container-width:var(--container-5xl)]! root:[--header-navbar-height:3.5rem]! root:[--header-tocbar-height:2.5rem]! border-b bg-background/80 backdrop-blur-sm"
    >
      <div
        class="w-full min-h-(--header-navbar-height) max-w-(--layout-container-width) flex items-center gap-4 px-4 mx-auto"
      >
        <Link href="/" class="text-base gap-2" unstyled>
          <AtSignIcon aria-hidden="true" class="size-4.5" />
          <span>bytriska</span>
        </Link>

        <nav aria-label="Main" data-show="sm md lg xl">
          <ul class="flex items-center list-none [&_a]:font-normal [&_a]:text-foreground">
            <li v-for="navigation in mainNavigationList" :key="navigation.href">
              <Link :href="navigation.href">
                {{ navigation.title }}
              </Link>
            </li>
          </ul>
        </nav>

        <div class="flex items-center gap-4 ms-auto">
          <ModeSwitcher data-show="sm md lg xl" unstyled />
          <Link href="https://github.com/bytriska" data-show="sm md lg xl" unstyled>
            <GithubIcon aria-hidden="true" />
            <span class="sr-only">Github (open in new tab)</span>
          </Link>
          <Button
            ref="header-navbar__drawer-trigger-nav"
            unstyled
            data-drawer-region
            data-show="base"
            aria-controls="header-drawer__content"
            :aria-expanded="activeDrawerId === 'nav' ? 'true' : 'false'"
            @click="toggle('nav')"
          >
            <ChevronDownIcon
              aria-hidden="true"
              class="size-4.5 motion-safe:transition-transform group-aria-expanded/button:rotate-180"
            />
            <span class="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      <div class="absolute inset-x-2 h-px bg-border" />

      <div
        data-show="base sm md"
        class="w-full min-h-(--header-tocbar-height) max-w-(--layout-container-width) flex items-center gap-4 px-4 mx-auto [&_button]:font-normal [&_button]:text-muted-foreground [&_button]:gap-2"
      >
        <Button
          ref="header-tocbar__drawer-trigger-toc"
          unstyled
          data-drawer-region
          data-icon="inline-start"
          aria-controls="header-drawer__content"
          :aria-expanded="activeDrawerId === 'toc' ? 'true' : 'false'"
          class="flex-1 min-w-0 justify-start"
          :class="{
            'text-foreground!': activeDrawerId === 'toc',
          }"
          @click="toggle('toc')"
        >
          <TextAlignStartIcon aria-hidden="true" />
          <span class="truncate" aria-hidden="true">Example placeholder table of content</span>
          <span class="sr-only">On this page</span>
        </Button>
        <Button unstyled data-icon="inline-end" class="flex-none" @click="scrollToTop">
          <span>Back to top</span>
          <CircleArrowUpIcon aria-hidden="true" />
        </Button>
      </div>

      <CollapsibleRoot
        ref="header-drawer"
        data-drawer-region
        data-show="base sm md"
        :open="activeDrawerId !== null"
      >
        <CollapsibleContent
          id="header-drawer__content"
          class="overflow-hidden motion-safe:data-[state=open]:animate-collapsible-down motion-safe:data-[state=closed]:animate-collapsible-up"
        >
          <div class="absolute inset-x-2 h-px bg-border" />

          <div
            class="max-h-[calc(70dvh-var(--layout-row-2))] overflow-y-auto overscroll-contain p-4 pt-2"
          >
            <div v-if="renderedDrawerId === 'nav'">
              <nav aria-label="Main">
                <ul
                  class="flex flex-col list-none [&_a]:font-normal [&_a]:text-foreground [&_a]:justify-start [&_a]:px-0 [&_a]:gap-2"
                >
                  <li v-for="navigation in mainNavigationList" :key="navigation.href">
                    <Link block :href="navigation.href" data-icon="inline-start">
                      <component :is="navigation.icon" aria-hidden="true" />
                      <span>{{ navigation.title }}</span>
                    </Link>
                  </li>
                </ul>
              </nav>

              <div class="flex items-center gap-4 mt-4 *:nth-2:ms-auto">
                <Link href="https://github.com/bytriska" unstyled>
                  <GithubIcon aria-hidden="true" />
                  <span class="sr-only">Github (open in new tab)</span>
                </Link>
                <ModeSwitcher unstyled />
              </div>
            </div>

            <div v-if="renderedDrawerId === 'toc'">
              <nav aria-label="On this page">
                <TocTree :toc="$props.meta.toc" />
              </nav>
            </div>
          </div>
        </CollapsibleContent>
      </CollapsibleRoot>
    </header>

    <main
      id="main"
      class="post-layout__main root:[--layout-container-width:var(--container-5xl)]! root:[--main-content-width:var(--container-2xl)]! lg:layout:[--main-toc-width:268px]!"
    >
      <slot />

      <aside data-show="lg xl" class="main-toc">
        <div class="main-toc__inner py-16 pe-4">
          <h2 id="toc__title" class="inline-flex items-center gap-2 [&_svg]:size-4">
            <TextAlignStartIcon aria-hidden="true" />
            <span>On this page</span>
          </h2>

          <nav aria-labelledby="toc__title">
            <TocTree :toc="$props.meta.toc" class="mt-6" />
          </nav>
        </div>
      </aside>
    </main>

    <footer
      class="post-layout__footer root:[--layout-container-width:var(--container-5xl)]! border-t"
    >
      <div class="w-full max-w-(--layout-container-width) p-4 mx-auto">
        <p class="text-sm text-center text-muted-foreground">
          &copy; 2026 bytriska. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
:global(:root) {
  --header-navbar-height: 0px;
  --header-tocbar-height: 0px;
  --header-drawer-height: 0px;

  --main-content-width: 0px;
  --main-toc-width: 0px;

  --layout-announcement-height: 0px;
  --layout-header-height: calc(
    var(--header-navbar-height) + var(--header-tocbar-height) + var(--header-drawer-height)
  );

  --layout-container-width: 0px;

  --layout-row-1: var(--layout-announcement-height);
  --layout-row-2: calc(var(--layout-row-1) + var(--layout-header-height));

  --layout-scroll-padding-top: calc(
    var(--layout-row-1) + var(--header-navbar-height) + var(--header-tocbar-height)
  );
}

.post-layout__root {
  display: grid;
  min-height: 100dvh;
  overflow-x: clip;

  grid-template-areas:
    'announcement'
    'header'
    'main'
    'footer';
  grid-template-rows:
    minmax(var(--layout-announcement-height), auto)
    minmax(var(--layout-header-height), auto)
    1fr
    auto;
  grid-template-columns: minmax(0, 1fr);
}

.post-layout__announcement,
.post-layout__header {
  position: sticky;
  z-index: 30;
}

.post-layout__announcement {
  grid-area: announcement;

  top: 0px;
}

.post-layout__header {
  grid-area: header;

  top: var(--layout-row-1);
}

.post-layout__main {
  grid-area: main;
  max-width: var(--layout-container-width);
  margin-inline: auto;

  display: grid;
  grid-template-columns: minmax(0, var(--main-content-width));
  justify-content: center;

  @media (width >= 64rem) {
    grid-template-columns:
      minmax(0, var(--main-content-width))
      minmax(0, var(--main-toc-width));
  }

  .main-toc__inner {
    position: sticky;
    top: var(--layout-row-2);
    max-height: calc(100dvh - var(--layout-row-2));

    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-width: thin;
    scrollbar-gutter: stable;
  }
}

.post-layout__footer {
  grid-area: footer;
}
</style>
