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

      <Button>Click me</Button>

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
  </div>
</template>
