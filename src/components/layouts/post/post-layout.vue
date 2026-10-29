<script lang="ts">
import {
  ChevronDownIcon,
  CircleArrowUpIcon,
  FolderGit2Icon,
  HatGlassesIcon,
  HeartIcon,
  LayoutGridCirclesIcon,
  NewspaperIcon,
  TextAlignStartIcon,
} from '@lucide/vue'
import { unrefElement, useEventListener, useMediaQuery, useWindowScroll } from '@vueuse/core'
import { nextTick, ref, useTemplateRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import ModeSwitcher from '@/components/ModeSwitcher.vue'
import { GithubIcon } from '@/components/social-icons'
import { AccordionItem, AccordionRoot } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { CollapsibleContent, CollapsibleRoot } from '@/components/ui/collapsible'
import { Link } from '@/components/ui/link'
import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
} from '@/components/ui/navigation-menu'

export interface PostLayoutProps {
  title?: string
  tagline?: string
}

export interface PostLayoutSlots {
  default?: () => any
  announcement?: () => any
}

type DrawerId = 'nav' | 'toc'
</script>

<script setup lang="ts">
defineProps<PostLayoutProps>()
defineSlots<PostLayoutSlots>()

const activeDrawerId = ref<DrawerId | null>(null)
const renderedDrawerId = ref<DrawerId | null>(null)
watch(
  () => activeDrawerId.value,
  id => {
    if (!id) return
    renderedDrawerId.value = id
    nextTick(() => {
      const drawerEl = unrefElement(layoutDrawer)
      drawerEl?.querySelector('a, button')?.focus()
    })
  }
)

const layoutDrawer = useTemplateRef('drawer')
const drawerTriggerNav = useTemplateRef('drawer-trigger__nav')
const drawerTriggerToc = useTemplateRef('drawer-trigger__toc')

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
  <div data-slot="layout-root" class="post-layout__root">
    <div
      v-if="$slots.announcement"
      class="post-layout__announcement [grid-area:announcement] sticky top-0 z-40"
    >
      <slot name="announcement" />
    </div>

    <header
      class="post-layout__header [grid-area:header] layout:[--container-max-width:var(--container-5xl)]! layout:[--layout-header-height:3.5rem]! self-start sticky top-(--layout-row-1) z-40"
    >
      <div class="absolute bottom-0 inset-x-0 h-px bg-border" />
      <div
        class="w-full h-(--layout-header-height) max-w-(--container-max-width) flex items-center gap-4 px-4 mx-auto"
      >
        <Link href="/" class="text-base gap-2" unstyled>
          <HatGlassesIcon aria-hidden="true" class="size-4.5" />
          <span>bytriska</span>
        </Link>

        <NavigationMenuRoot aria-label="Main" data-show="sm md lg xl">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink :as="Link" href="/example-home"> Home </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink :as="Link" href="/example-post"> Posts </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink :as="Link" href="#"> Projects </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink :as="Link" href="#"> Sponsor </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenuRoot>

        <div class="flex items-center gap-4 ms-auto">
          <ModeSwitcher data-show="sm md lg xl" unstyled />
          <Link href="https://github.com/bytriska" data-show="sm md lg xl" unstyled>
            <GithubIcon aria-hidden="true" />
            <span class="sr-only">Github (open in new tab)</span>
          </Link>
          <Button
            ref="drawer-trigger__nav"
            unstyled
            data-drawer-region
            data-show="base"
            aria-controls="drawer-content__nav"
            :aria-expanded="activeDrawerId === 'nav' ? 'true' : 'false'"
            class="group"
            @click="toggle('nav')"
          >
            <ChevronDownIcon
              aria-hidden="true"
              class="size-4.5 motion-safe:transition-transform group-aria-expanded:rotate-180"
            />
            <span class="sr-only">Menu</span>
          </Button>
        </div>
      </div>
    </header>

    <div
      data-show="base sm md"
      class="post-layout__toc-bar [grid-area:toc-bar] max-lg:layout:[--layout-toc-bar-height:2.5rem]! self-start sticky top-(--layout-row-2) z-40"
    >
      <div class="absolute bottom-0 inset-x-0 h-px bg-border" />
      <div class="w-full h-(--layout-toc-bar-height) flex items-center gap-2 px-4 mx-auto">
        <Button
          ref="drawer-trigger__toc"
          unstyled
          data-drawer-region
          data-icon="inline-start"
          aria-controls="drawer-content__toc"
          :aria-expanded="activeDrawerId === 'toc' ? 'true' : 'false'"
          class="flex-1 min-w-0 justify-start gap-2"
          @click="toggle('toc')"
        >
          <TextAlignStartIcon aria-hidden="true" />
          <span class="truncate">Example placeholder table of content</span>
        </Button>
        <Button unstyled data-icon="inline-end" class="flex-none gap-2" @click="scrollToTop">
          <span>Back to top</span>
          <CircleArrowUpIcon aria-hidden="true" />
        </Button>
      </div>
    </div>

    <CollapsibleRoot
      ref="drawer"
      data-drawer-region
      data-show="base sm md"
      :open="activeDrawerId !== null"
      class="post-layout__drawer [grid-area:drawer] max-lg:layout:[--layout-drawer-height:calc(70dvh-var(--layout-row-4))]! sticky top-(--layout-row-3) z-40"
    >
      <CollapsibleContent
        class="overflow-hidden data-[state=open]:motion-safe:animate-collapsible-down data-[state=closed]:motion-safe:animate-collapsible-up p-4 pt-2"
      >
        <div class="absolute bottom-0 inset-x-0 h-px bg-border" />
        <div v-if="renderedDrawerId === 'nav'" id="drawer-content__nav">
          <AccordionRoot class="**:data-[slot='accordion-item']:border-none [&_a]:font-normal">
            <AccordionItem>
              <Link
                block
                size="lg"
                href="/example-home"
                data-icon="inline-start"
                class="px-0 gap-2 justify-start no-underline"
              >
                <LayoutGridCirclesIcon aria-hidden="true" />
                <span>Home</span>
              </Link>
            </AccordionItem>
            <AccordionItem>
              <Link
                block
                size="lg"
                href="/example-post"
                data-icon="inline-start"
                class="px-0 gap-2 justify-start no-underline"
              >
                <NewspaperIcon aria-hidden="true" />
                <span>Posts</span>
              </Link>
            </AccordionItem>
            <AccordionItem>
              <Link
                block
                size="lg"
                href="#"
                data-icon="inline-start"
                class="px-0 gap-2 justify-start no-underline"
              >
                <FolderGit2Icon aria-hidden="true" />
                <span>Projects</span>
              </Link>
            </AccordionItem>
            <AccordionItem>
              <Link
                block
                size="lg"
                href="#"
                data-icon="inline-start"
                class="px-0 gap-2 justify-start no-underline"
              >
                <HeartIcon aria-hidden="true" />
                <span>Sponsor</span>
              </Link>
            </AccordionItem>
          </AccordionRoot>

          <div class="flex items-center gap-4 mt-4 *:nth-2:ms-auto">
            <Link href="https://github.com/bytriska" unstyled>
              <GithubIcon aria-hidden="true" />
              <span class="sr-only">Github (open in new tab)</span>
            </Link>
            <ModeSwitcher unstyled />
          </div>
        </div>
        <div v-if="renderedDrawerId === 'toc'" id="drawer-content__toc">
          <nav aria-label="On this page">
            <ul class="flex flex-col list-none">
              <li>
                <Link href="#" block> Heading 1 </Link>
              </li>
              <li>
                <Link href="#" block> Heading 2 </Link>
                <ul class="flex flex-col list-none ms-4">
                  <li>
                    <Link href="#" block> Heading 2.1 </Link>
                  </li>
                  <li>
                    <Link href="#" block> Heading 2.2 </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="#" block> Heading 3 </Link>
              </li>
              <li>
                <Link href="#" block> Heading 4 </Link>
              </li>
            </ul>
          </nav>
        </div>
      </CollapsibleContent>
    </CollapsibleRoot>

    <main
      class="post-layout__main [grid-area:main] layout:[--layout-container-width:var(--container-5xl)]! layout:[--layout-content-width:var(--container-2xl)]! size-full min-w-0 py-12 sm:py-16 overflow-x-clip"
    >
      <article class="max-w-(--layout-content-width) px-4 mx-auto">
        <header class="mb-6">
          <div class="flex items-baseline justify-between gap-4 mb-4">
            <h1 class="text-3xl sm:text-4xl font-semibold">
              {{ $props.title }}
            </h1>
          </div>
          <p v-if="$props.tagline" class="text-muted-foreground">
            {{ $props.tagline }}
          </p>
        </header>

        <slot />
      </article>
    </main>

    <aside
      data-show="lg xl"
      class="post-layout__toc [grid-area:toc] lg:layout:[--layout-toc-width:268px]!"
    >
      <div
        class="sticky top-(--layout-row-4) w-(--layout-toc-width) h-[calc(100dvh-var(--layout-row-4))] overflow-y-auto py-16 pe-4"
      >
        <h2 id="toc__title" class="inline-flex items-center gap-2 [&_svg]:size-4">
          <TextAlignStartIcon aria-hidden="true" />
          <span>On this page</span>
        </h2>
        <nav aria-labeledby="toc__title">
          <ul class="flex flex-col list-none mt-6">
            <li>
              <Link href="#" block> Heading 1 </Link>
            </li>
            <li>
              <Link href="#" block> Heading 2 </Link>
              <ul class="flex flex-col list-none ms-4">
                <li>
                  <Link href="#" block> Heading 2.1 </Link>
                </li>
                <li>
                  <Link href="#" block> Heading 2.2 </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="#" block> Heading 3 </Link>
            </li>
            <li>
              <Link href="#" block> Heading 4 </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>

    <footer
      class="post-layout__footer [grid-area:footer] layout:[--layout-container-width:var(--container-5xl)]!"
    >
      <div class="w-full max-w-(--layout-container-width) p-4 mx-auto">
        <p>&copy; 2026 bytriska. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@reference "@/styles/app.css";

.post-layout__root {
  --layout-announcement-height: 0px;
  --layout-header-height: 0px;
  --layout-toc-bar-height: 0px;
  --layout-drawer-height: 0px;

  --layout-container-width: 0px;
  --layout-content-width: 0px;
  --layout-toc-width: 0px;

  --layout-row-1: var(--layout-announcement-height);
  --layout-row-2: calc(var(--layout-row-1) + var(--layout-header-height));
  --layout-row-3: calc(var(--layout-row-2) + var(--layout-toc-bar-height));
  --layout-row-4: calc(var(--layout-row-3) + var(--layout-drawer-height));

  display: grid;
  min-height: 100dvh;
  overflow-x: clip;

  grid-template-areas:
    'announcement'
    'header'
    'toc-bar'
    'drawer'
    'main'
    'footer';
  grid-template-rows:
    minmax(var(--layout-announcement-height), auto)
    minmax(var(--layout-header-height), auto)
    minmax(var(--layout-toc-bar-height), auto)
    minmax(var(--layout-drawer-height), auto)
    1fr
    auto;
  grid-template-columns: minmax(0, 1fr);

  @variant lg {
    grid-template-areas:
      'announcement announcement'
      'header header'
      'main toc'
      'footer footer';
    grid-template-rows:
      minmax(var(--layout-announcement-height), auto)
      minmax(var(--layout-header-height), auto)
      1fr
      auto;
    grid-template-columns: minmax(0, 1fr) minmax(0, var(--layout-toc-width));
  }
}

.post-layout__header,
.post-layout__toc-bar,
.post-layout__drawer {
  @apply text-foreground bg-background/70 backdrop-blur-sm;
}

.post-layout__header {
  & :deep(a) {
    @apply text-foreground;

    &[data-slot='navigation-menu-link'] {
      @apply font-normal;
    }
  }
}

.post-layout__toc-bar {
  & :deep(button) {
    @apply text-muted-foreground font-normal;

    &[aria-controls][aria-expanded='true'] {
      @apply text-foreground;
    }
  }
}

.post-layout__drawer {
  & :deep(a) {
    @apply text-foreground;
  }

  & #drawer-content__toc nav :deep(a) {
    @apply px-0 font-normal justify-start;
  }
}

.post-layout__toc {
  & h2 {
    @apply text-sm text-muted-foreground;
  }

  & nav :deep(a) {
    @apply text-foreground font-normal px-0 justify-start;
  }
}

.post-layout__footer {
  @apply border-t border-border;

  & p {
    @apply text-sm text-muted-foreground text-center;
  }
}
</style>
