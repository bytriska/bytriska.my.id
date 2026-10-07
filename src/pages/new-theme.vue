<script lang="ts">
import { ref } from 'vue'
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

interface MenuLink {
  title: string
  description: string
  icon: string
}

interface MenuSection {
  value: string
  label: string
  /** Wider panels need the viewport to grow — it measures the active content. */
  columns: 1 | 2
  links: MenuLink[]
}
</script>

<script setup lang="ts">
const isLoading = ref(false)
function submit(e: MouseEvent) {
  e.preventDefault()

  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 5000)
}

const sections: MenuSection[] = [
  {
    value: 'product',
    label: 'Product',
    columns: 2,
    links: [
      {
        title: 'Primitives',
        description: 'Unstyled, accessible building blocks.',
        icon: 'lucide:blocks',
      },
      {
        title: 'Themes',
        description: 'Drop-in styling for every primitive.',
        icon: 'lucide:palette',
      },
      { title: 'Icons', description: 'A crisp, consistent icon set.', icon: 'lucide:shapes' },
      {
        title: 'Colors',
        description: 'Palettes with automatic dark mode.',
        icon: 'lucide:droplet',
      },
    ],
  },
  {
    value: 'developers',
    label: 'Developers',
    columns: 1,
    links: [
      {
        title: 'Documentation',
        description: 'Guides, API reference and recipes.',
        icon: 'lucide:book-open',
      },
      {
        title: 'Examples',
        description: 'Compositions you can copy today.',
        icon: 'lucide:square-dashed-mouse-pointer',
      },
      { title: 'Changelog', description: 'Every release, in order.', icon: 'lucide:history' },
    ],
  },
]
</script>

<template>
  <div class="new-theme size-full min-h-dvh flex flex-col">
    <div class="h-16 w-full flex items-center">
      <NavigationMenuRoot class="border border-yellow-400">
        <NavigationMenuList>
          <NavigationMenuItem
            v-for="section in sections"
            :key="section.value"
            :value="section.value"
          >
            <NavigationMenuTrigger>{{ section.label }}</NavigationMenuTrigger>

            <NavigationMenuContent>
              <ul
                class="m-0 w-full grid sm:w-120 max-sm:[.cn-navigation-menu-viewport-wrapper:has(&)]:w-full"
                :class="section.columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-1'"
              >
                <li v-for="link in section.links" :key="link.title" class="w-max">
                  <NavigationMenuLink as-child>
                    <Link href="#" variant="ghost" class="w-full h-auto! justify-start py-2">
                      <span>
                        <span class="block text-sm font-medium text-foreground">{{
                          link.title
                        }}</span>
                        <span class="block text-xs leading-snug text-muted-foreground">{{
                          link.description
                        }}</span>
                      </span>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink> Github </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink> Facebook </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenuRoot>
    </div>
    <div class="grow size-full max-w-7xl mx-auto px-6 pt-8 pb-16 md:px-8 md:pt-12 md:pb-24 lg:pb-0">
      <h1 class="text-3xl">hello</h1>

      <div class="flex flex-wrap gap-2">
        <Button>Click me</Button>
        <Button variant="outline"> Click me </Button>
        <Button variant="secondary"> Click me </Button>
        <Button variant="ghost"> Click me </Button>
        <Button variant="destructive"> Click me </Button>
        <Button variant="link"> Click me </Button>

        <Button>
          <template #icon>
            <i-lucide-plus class="size-4" />
          </template>
          Add item
        </Button>

        <Button trailing>
          Next
          <template #icon>
            <i-lucide-arrow-right class="size-4" />
          </template>
        </Button>

        <Button :loading="isLoading" @click="submit">
          <template #icon>
            <i-lucide-save class="size-4" />
          </template>
          Save
        </Button>

        <Button trailing :loading="isLoading" @click="submit">
          Continue
          <template #icon>
            <i-lucide-arrow-right class="size-4" />
          </template>
        </Button>

        <Button size="icon" :loading="isLoading" @click="submit">
          <template #icon>
            <i-lucide-trash class="size-4" />
          </template>
        </Button>

        <Button :loading="isLoading" @click="submit"> Save </Button>
      </div>
      <div class="flex flex-wrap gap-2">
        <Link to="/"> Home </Link>
        <Link to="/posts" :loading="isLoading" @click="submit"> Go to posts </Link>
        <Link to="/posts" variant="outline"> Posts </Link>
        <Link href="/posts" variant="secondary"> Posts (via href) </Link>
        <Link href="https://example.com" variant="ghost"> External site </Link>
        <Link href="mailto:hello@example.com" variant="link"> Email us </Link>

        <Link to="/posts">
          <template #icon>
            <i-lucide-plus class="size-4" />
          </template>
          New post
        </Link>

        <Link href="https://example.com" trailing>
          View source
          <template #icon>
            <i-lucide-arrow-up-right class="size-4" />
          </template>
        </Link>

        <Link href="#pricing" variant="link"> Jump to pricing </Link>
        <Link to="/posts" disabled> Posts (no access) </Link>

        <Link href="https://example.com/report.pdf" target="_self" rel="noreferrer">
          Open report
        </Link>

        <Link href="https://example.com" size="icon" variant="ghost">
          <template #icon>
            <i-lucide-external-link class="size-4" />
          </template>
        </Link>
      </div>
    </div>
  </div>
</template>
