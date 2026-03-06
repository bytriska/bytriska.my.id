<script setup>
import PreviewBox    from '../ui/PreviewBox.vue'
import SectionHeader from '../ui/SectionHeader.vue'

const spacingScale = [
  { cls: 'p-1',  px: '4px' },
  { cls: 'p-2',  px: '8px' },
  { cls: 'p-3',  px: '12px' },
  { cls: 'p-4',  px: '16px' },
  { cls: 'p-5',  px: '20px' },
  { cls: 'p-6',  px: '24px' },
  { cls: 'p-8',  px: '32px' },
  { cls: 'p-10', px: '40px' },
  { cls: 'p-12', px: '48px' },
  { cls: 'p-16', px: '64px' },
  { cls: 'p-24', px: '96px' },
]

const shadows = [
  { cls: 'shadow-xs', size: 'w-20 h-16', use: 'Input fields\nList items' },
  { cls: 'shadow-sm', size: 'w-20 h-18', use: 'UI elements\nButtons' },
  { cls: 'shadow-md', size: 'w-20 h-20', use: 'Cards\nDropdowns' },
  { cls: 'shadow-lg', size: 'w-20 h-24', use: 'Floating\nactions' },
  { cls: 'shadow-xl', size: 'w-20 h-28', use: 'Modals\nSheets' },
  { cls: 'shadow-2xl',size: 'w-20 h-32', use: 'Full-screen\noverlays' },
]
</script>

<template>
  <section>

    <!-- Spacing -->
    <SectionHeader title="Spacing — 4px Grid" section-id="foundation">
      All padding, margin, gap, and inset values must be multiples of 4px.
      This eliminates "magic numbers" and ensures consistent vertical rhythm.
      Tailwind's default spacing scale maps directly:
      <code class="font-code text-xs bg-primary-subtle text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded">p-4 = 16px</code>,
      <code class="font-code text-xs bg-primary-subtle text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded">gap-2 = 8px</code>, etc.
    </SectionHeader>

    <PreviewBox label="Spatial Scale" class="mb-10">
      <div class="flex flex-col gap-3 p-4">
        <div class="grid grid-cols-[80px_60px_1fr] gap-3 items-center">
          <span class="text-[11px] font-semibold text-content-tertiary uppercase tracking-widest">Class</span>
          <span class="text-[11px] font-semibold text-content-tertiary uppercase tracking-widest">Value</span>
          <span class="text-[11px] font-semibold text-content-tertiary uppercase tracking-widest">Visual</span>
        </div>
        <div v-for="s in spacingScale" :key="s.cls"
             class="grid grid-cols-[80px_60px_1fr] gap-3 items-center">
          <code class="font-code text-xs text-green-700 dark:text-green-400 bg-primary-subtle px-1.5 py-0.5 rounded w-fit">
            {{ s.cls }}
          </code>
          <span class="text-xs text-content-tertiary">{{ s.px }}</span>
          <div class="h-2 bg-green-600 rounded-sm" :style="{ width: s.px }"></div>
        </div>
      </div>
    </PreviewBox>

    <!-- Elevation -->
    <SectionHeader title="Elevation — Shadow Tokens" section-id="elevation">
      Use shadow tokens to imply depth, never raw
      <code class="font-code text-xs bg-primary-subtle text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded">box-shadow</code>
      values. Higher elevation = more prominent visual layer. Pair with surface hierarchy for
      consistent depth perception. Tailwind's built-in scale is used directly.
    </SectionHeader>

    <PreviewBox label="Shadow Scale">
      <div class="flex flex-wrap items-end gap-5 p-6">
        <div v-for="sh in shadows" :key="sh.cls" class="text-center">
          <div class="bg-surface-raised rounded-lg mb-3" :class="[sh.cls, sh.size]"></div>
          <code class="font-code text-[11px] text-green-700 dark:text-green-400
                       bg-primary-subtle px-1.5 py-0.5 rounded">
            {{ sh.cls }}
          </code>
          <p class="text-[11px] text-content-tertiary mt-1.5 leading-tight">{{ sh.use }}</p>
        </div>
      </div>
    </PreviewBox>

  </section>
</template>
