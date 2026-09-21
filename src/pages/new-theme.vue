<script setup lang="ts">
import { ref } from 'vue'

const isLoading = ref(false)
function submit(e: MouseEvent) {
  e.preventDefault()

  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 5000)
}
</script>

<template>
  <div class="new-theme size-full min-h-dvh flex flex-col">
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

        <Link to="/posts" :loading="isLoading" @click="submit"> Go to posts </Link>
      </div>
    </div>
  </div>
</template>
