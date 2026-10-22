<script lang="ts">
import type { HTMLAttributes } from 'vue'
import {
  ChevronDownIcon,
  FolderGit2Icon,
  HatGlassesIcon,
  HeartIcon,
  NewspaperIcon,
  PaletteIcon,
} from '@lucide/vue'
import { cn } from 'tailwind-variants'
import ModeSwitcher from '@/components/ModeSwitcher.vue'
import { AccordionItem, AccordionRoot } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  CollapsibleContent,
  CollapsibleRoot,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Link } from '@/components/ui/link'
import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
} from '@/components/ui/navigation-menu'

export interface HeaderProps {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = defineProps<HeaderProps>()
</script>

<template>
  <CollapsibleRoot
    as="header"
    v-bind="$attrs"
    :class="
      cn(
        'home-layout-header [grid-area:header] self-start sticky top-(--layout-row-1,0) z-40 layout:[--layout-header-height:3.5rem]!',
        props.class
      )
    "
  >
    <div
      class="max-w-(--breakpoint-xl) w-full h-(--layout-header-height) flex items-center gap-x-4 px-4 mx-auto"
    >
      <Link to="/" class="text-base gap-2" unstyled>
        <HatGlassesIcon class="size-4.5" aria-hidden="true" focusable="false" />
        <span>bytriska</span>
      </Link>

      <NavigationMenuRoot
        aria-label="Main"
        class="max-sm:hidden **:data-[slot='navigation-menu-link']:font-normal"
      >
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink :as="Link" to="/posts"> Posts </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink :as="Link" to="#"> Projects </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink :as="Link" to="#"> Sponsor </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink :as="Link" to="/new-theme"> Theme (new) </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenuRoot>

      <div class="contents *:first:ms-auto">
        <div role="group" aria-label="Site settings" class="*:max-sm:hidden">
          <ModeSwitcher unstyled />
        </div>
        <Link href="https://github.com/bytriska" class="max-sm:hidden" unstyled>
          <svg
            role="img"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-4"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            />
          </svg>
          <span class="sr-only">Github (open in new tab)</span>
        </Link>

        <CollapsibleTrigger
          :as="Button"
          class="group/collapsible-trigger sm:hidden ms-auto"
          unstyled
        >
          <ChevronDownIcon
            class="size-4.5 motion-safe:transition-transform group-data-[state=open]/collapsible-trigger:rotate-180"
            aria-hidden="true"
            focusable="false"
          />
          <span class="sr-only">Menu</span>
        </CollapsibleTrigger>
      </div>
    </div>
    <CollapsibleContent
      class="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up p-4 pt-0"
    >
      <AccordionRoot class="**:data-[slot='accordion-item']:border-none [&_a]:font-normal">
        <AccordionItem>
          <Link
            to="/posts"
            size="lg"
            class="px-0 gap-2 justify-start no-underline"
            data-icon="inline-start"
            block
          >
            <NewspaperIcon class="size-4" aria-hidden="true" focusable="false" />
            <span>Posts</span>
          </Link>
        </AccordionItem>
        <AccordionItem>
          <Link
            to="#"
            size="lg"
            class="px-0 gap-2 justify-start no-underline"
            data-icon="inline-start"
            block
          >
            <FolderGit2Icon class="size-4" aria-hidden="true" focusable="false" />
            <span>Projects</span>
          </Link>
        </AccordionItem>
        <AccordionItem>
          <Link
            to="#"
            size="lg"
            class="px-0 gap-2 justify-start no-underline"
            data-icon="inline-start"
            block
          >
            <HeartIcon class="size-4" aria-hidden="true" focusable="false" />
            <span>Sponsor</span>
          </Link>
        </AccordionItem>
        <AccordionItem>
          <Link
            to="/new-theme"
            size="lg"
            class="px-0 gap-2 justify-start no-underline"
            data-icon="inline-start"
            block
          >
            <PaletteIcon class="size-4" aria-hidden="true" focusable="false" />
            <span>Theme (new)</span>
          </Link>
        </AccordionItem>
      </AccordionRoot>

      <div class="flex items-center gap-x-4 mt-2">
        <Link href="https://github.com/bytriska" unstyled>
          <svg
            role="img"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-4"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            />
          </svg>
          <span class="sr-only">Github (open in new tab)</span>
        </Link>

        <div role="group" aria-label="Site settings" class="ms-auto">
          <ModeSwitcher unstyled />
        </div>
      </div>
    </CollapsibleContent>
  </CollapsibleRoot>
</template>

<style scoped>
@reference "@/styles/app.css";

.home-layout-header {
  @apply text-foreground bg-background/70 backdrop-blur-sm border-b border-border data-[state=open]:rounded-b-md;

  & :deep(a) {
    @apply text-foreground;
  }
}
</style>
