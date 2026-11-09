<script lang="ts">
import type { PageFrontmatter } from '@/types'
import { AtSignIcon, ChevronDownIcon } from '@lucide/vue'
import { unrefElement, useEventListener, useMediaQuery } from '@vueuse/core'
import { nextTick, ref, useTemplateRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ModeSwitcher } from '@/components/mode-switcher'
import { GithubIcon } from '@/components/social-icons'
import { Button } from '@/components/ui/button'
import { CollapsibleContent, CollapsibleRoot } from '@/components/ui/collapsible'
import { Link } from '@/components/ui/link'
import { useSeo } from '@/composables/seo'
import { mainNavigationList } from '../shared'

export interface HomeLayoutProps {
  meta: PageFrontmatter
}

export interface HomeLayoutSlots {
  announcement?: () => any
  default?: () => any
}
</script>

<script setup lang="ts">
const props = defineProps<HomeLayoutProps>()
defineSlots<HomeLayoutSlots>()

useSeo(props.meta)

const headerDrawer = useTemplateRef('header-drawer')
const drawerTrigger = useTemplateRef('header-navbar__drawer-trigger')

const openDrawer = ref<boolean>(false)
watch(
  () => openDrawer.value,
  () =>
    nextTick(() => {
      const drawerEl = unrefElement(headerDrawer)
      drawerEl?.querySelector('a, button')?.focus()
    })
)

function inRegion(node: EventTarget | null) {
  return node instanceof Element && !!node.closest('[data-drawer-region]')
}

function toggle() {
  openDrawer.value = !openDrawer.value
}

function close(shouldReturnFocus: boolean = false) {
  if (!openDrawer.value) return
  openDrawer.value = false

  if (shouldReturnFocus) {
    nextTick(() => {
      const triggerEl = unrefElement(drawerTrigger)
      triggerEl?.focus()
    })
  }
}

useEventListener('pointerdown', e => {
  if (!inRegion(e.target) && openDrawer.value) close()
})
useEventListener('focusin', e => {
  if (!inRegion(e.target) && openDrawer.value) close()
})
useEventListener('keydown', e => {
  if (e.key === 'Escape' && openDrawer.value) close(true)
})

const route = useRoute()
watch(
  () => route.fullPath,
  () => close()
)

const isSm = useMediaQuery('(width >= 40rem)')
watch(
  () => isSm.value,
  value => value && close()
)
</script>

<template>
  <div data-slot="layout-root" class="home-layout__root">
    <Link
      href="#main"
      variant="outline"
      class="sr-only focus:not-sr-only focus:fixed focus:inset-s-4 focus:top-4 focus:z-50"
    >
      Skip to main
    </Link>

    <div v-if="$slots.announcement" class="home-layout__announcement">
      <slot name="announcement" />
    </div>

    <header
      class="home-layout__header root:[--layout-container-width:var(--container-5xl)]! root:[--header-navbar-height:3.5rem]! border-b bg-background/80 backdrop-blur-sm"
    >
      <div
        class="w-full max-w-(--layout-container-width) min-h-(--header-navbar-height) flex items-center gap-4 px-4 mx-auto"
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
            ref="header-navbar__drawer-trigger"
            unstyled
            data-drawer-region
            data-show="base"
            aria-controls="header-drawer__content"
            :aria-expanded="openDrawer ? 'true' : 'false'"
            @click="toggle"
          >
            <ChevronDownIcon
              aria-hidden="true"
              class="size-4.5 motion-safe:transition-transform group-aria-expanded/button:rotate-180"
            />
            <span class="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      <CollapsibleRoot ref="header-drawer" data-drawer-region data-show="base" :open="openDrawer">
        <CollapsibleContent
          id="header-drawer__content"
          class="overflow-hidden motion-safe:data-[state=open]:animate-collapsible-down motion-safe:data-[state=closed]:animate-collapsible-up"
        >
          <div class="absolute inset-x-2 h-px bg-border" />

          <div
            class="max-h-[calc(70dvh-var(--layout-row-2))] overflow-y-auto overscroll-contain p-4 pt-2"
          >
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
        </CollapsibleContent>
      </CollapsibleRoot>
    </header>

    <main id="main" class="home-layout__main root:[--main-content-width:var(--container-2xl)]!">
      <slot />
    </main>

    <footer
      class="home-layout__footer root:[--layout-container-width:var(--container-5xl)]! border-t"
    >
      <div class="w-full max-w-(--layout-container-height) p-4 mx-auto">
        <p class="text-sm text-muted-foreground text-center">
          &copy; 2026 bytriska. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
:global(:root) {
  --header-navbar-height: 0px;
  --header-drawer-height: 0px;

  --main-content-width: 0px;

  --layout-announcement-height: 0px;
  --layout-header-height: calc(var(--header-navbar-height) + var(--header-drawer-height));

  --layout-container-width: 0px;

  --layout-row-1: var(--layout-announcement-height);
  --layout-row-2: calc(var(--layout-row-1) + var(--layout-header-height));

  /* override root var */
  --scroll-padding-top: var(--layout-row-2);
}

.home-layout__root {
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

.home-layout__announcement,
.home-layout__header {
  position: sticky;
  z-index: 30;
}

.home-layout__announcement {
  grid-area: announcement;
  top: 0px;
}

.home-layout__header {
  grid-area: header;
  top: var(--layout-row-1);
}

.home-layout__main {
  grid-area: main;
}

.home-layout__footer {
  grid-area: footer;
}
</style>
