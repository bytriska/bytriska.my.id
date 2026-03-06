<script setup>
defineProps({
  label:    String,
  sublabel: String,
})
</script>

<template>
  <div class="bg-surface-raised border border-edge-subtle rounded-lg overflow-hidden" :class="$attrs.class">
    <p v-if="label"
       class="text-[11px] font-semibold tracking-widest uppercase text-content-tertiary
              px-4 py-2.5 border-b border-edge-subtle bg-surface-sunken">
      {{ label }}
      <span v-if="sublabel" class="normal-case tracking-normal font-normal text-content-tertiary ml-1">
        — {{ sublabel }}
      </span>
    </p>
    <slot />
  </div>
</template>

