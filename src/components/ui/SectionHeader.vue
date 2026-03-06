<script setup>
defineProps({
  title:     String,
  sectionId: String,
  useCase:   { type: Boolean, default: true },
})
</script>

<template>
  <div class="pt-14 pb-6 border-t border-edge-subtle" :id="sectionId">
    <h2 class="font-display text-2xl tracking-tight text-content-primary mb-1.5">
      {{ title }}
    </h2>
    <p class="text-sm text-content-secondary leading-relaxed max-w-2xl">
      <span v-if="useCase"
        class="inline-flex items-center h-5 px-2 mr-2 rounded-full text-[10px] font-semibold
               bg-secondary-subtle text-blue-700 dark:text-blue-400
               border border-status-info-edge align-middle">
        Use case
      </span>
      <slot />
    </p>
  </div>
</template>
