<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    tagline?: string
  }>(),
  { title: 'triska mahfud khoiri' }
)

defineSlots<{
  default?: () => any
}>()
</script>

<template>
  <main class="[grid-area:main] size-full min-w-0 py-12 sm:py-16 overflow-x-clip">
    <article class="max-w-(--container-width) px-4 mx-auto">
      <header class="mb-12">
        <div class="flex items-baseline justify-between gap-4 mb-4">
          <h1 class="font-mono text-3xl sm:text-4xl font-medium">
            {{ $props.title }}
          </h1>
        </div>
        <p v-if="$props.tagline" class="text-muted-foreground text-lg">
          {{ $props.tagline }}
        </p>
      </header>

      <slot />
    </article>
  </main>
</template>
