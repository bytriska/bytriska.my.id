<script setup>
import PreviewBox    from '../ui/PreviewBox.vue'
import SectionHeader from '../ui/SectionHeader.vue'

const solidBadges = [
  { label: 'Primary',   cls: 'bg-green-600 text-white' },
  { label: 'Secondary', cls: 'bg-blue-600 text-white' },
  { label: 'Neutral',   cls: 'bg-stone-900 text-stone-50 dark:bg-stone-50 dark:text-stone-900' },
]

const subtleBadges = [
  { label: 'Active',    cls: 'bg-primary-subtle text-green-700 dark:text-green-400 border-status-success-edge' },
  { label: 'Beta',      cls: 'bg-secondary-subtle text-blue-700 dark:text-blue-400 border-status-info-edge' },
  { label: 'Archived',  cls: 'bg-surface-overlay text-content-secondary border-edge' },
]

const semanticBadges = [
  { label: 'Completed', cls: 'bg-status-success-surface text-green-700 dark:text-green-400 border-status-success-edge' },
  { label: 'Pending',   cls: 'bg-status-warning-surface text-amber-700 dark:text-amber-400 border-status-warning-edge' },
  { label: 'Failed',    cls: 'bg-status-error-surface text-red-700 dark:text-red-400 border-status-error-edge' },
  { label: 'Review',    cls: 'bg-status-info-surface text-blue-700 dark:text-blue-400 border-status-info-edge' },
]

const dotBadges = [
  { label: 'Online',  cls: 'bg-status-success-surface text-green-700 dark:text-green-400 border-status-success-edge', dot: 'bg-green-500' },
  { label: 'Away',    cls: 'bg-status-warning-surface text-amber-700 dark:text-amber-400 border-status-warning-edge', dot: 'bg-amber-500' },
  { label: 'Offline', cls: 'bg-status-error-surface text-red-700 dark:text-red-400 border-status-error-edge',         dot: 'bg-red-500' },
  { label: 'Idle',    cls: 'bg-surface-overlay text-content-secondary border-edge',                                   dot: 'bg-stone-400' },
]
</script>

<template>
  <section>
    <SectionHeader title="Badges" section-id="badges">
      Semantic badges for status indicators.
      <strong>Solid variants</strong> for use directly on the base surface.
      <strong>Subtle variants</strong> designed specifically for use <em>inside</em> raised cards
      and panels — they use <code class="font-code text-xs bg-primary-subtle text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded">--surface-overlay</code>
      to maintain correct stacking contrast. Never stack two solid badges.
    </SectionHeader>

    <!-- Solid / Filled -->
    <PreviewBox label="Solid / Filled" sublabel="use on base surface (L0)" class="mb-4">
      <div class="flex flex-wrap items-center gap-3 p-4">
        <span v-for="b in solidBadges" :key="b.label" class="inline-flex items-center h-[22px] px-2.5 rounded-full text-xs font-semibold" :class="[b.cls]">
          {{ b.label }}
        </span>
      </div>
    </PreviewBox>

    <!-- Subtle -->
    <PreviewBox label="Subtle" sublabel="use inside cards / raised surfaces (L1+)" class="mb-4">
      <div class="flex flex-wrap items-center gap-3 p-4 bg-surface-raised rounded-b-lg">
        <span v-for="b in subtleBadges" :key="b.label" class="inline-flex items-center h-[22px] px-2.5 rounded-full text-xs font-semibold border" :class="[b.cls]">
          {{ b.label }}
        </span>
      </div>
    </PreviewBox>

    <!-- Semantic States -->
    <PreviewBox label="Semantic States" class="mb-4">
      <div class="flex flex-wrap items-center gap-3 p-4">
        <span v-for="b in semanticBadges" :key="b.label" class="inline-flex items-center h-[22px] px-2.5 rounded-full text-xs font-semibold border" :class="[b.cls]">
          {{ b.label }}
        </span>
      </div>
    </PreviewBox>

    <!-- Dot Indicator -->
    <PreviewBox label="With Dot Indicator">
      <div class="flex flex-wrap items-center gap-3 p-4">
        <span v-for="b in dotBadges" :key="b.label"
              class="inline-flex items-center gap-1.5 h-[22px] px-2.5 rounded-full text-xs font-semibold border" :class="[b.cls]">
          <span class="w-1.5 h-1.5 rounded-full shrink-0" :class="[b.dot]"></span>
          {{ b.label }}
        </span>
      </div>
    </PreviewBox>
  </section>
</template>
