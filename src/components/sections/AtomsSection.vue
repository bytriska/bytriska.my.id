<script setup>
import PreviewBox    from '../ui/PreviewBox.vue'
import SectionHeader from '../ui/SectionHeader.vue'

const avatarSizes = [
  { size: 'w-7 h-7 text-xs',  initials: 'AK', colors: 'bg-primary-subtle text-green-700 dark:text-green-400' },
  { size: 'w-10 h-10 text-sm',initials: 'JD', colors: 'bg-secondary-subtle text-blue-700 dark:text-blue-400' },
  { size: 'w-14 h-14 text-base',initials:'MR', colors: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400' },
  { size: 'w-20 h-20 text-xl',initials: 'TS', colors: 'bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-400' },
]

const stackedAvatars = [
  { initials: 'AK', colors: 'bg-primary-subtle text-green-700 dark:text-green-400' },
  { initials: 'JD', colors: 'bg-secondary-subtle text-blue-700 dark:text-blue-400' },
  { initials: 'MR', colors: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400' },
]

const spinners = [
  { size: 'w-4 h-4' },
  { size: 'w-6 h-6' },
  { size: 'w-9 h-9 border-[3px]' },
]

const progressBars = [
  { label: 'Upload progress', pct: 68, barCls: 'bg-green-600' },
  { label: 'Storage used',    pct: 91, barCls: 'bg-red-500' },
  { label: 'Completion',      pct: 45, barCls: 'bg-blue-600' },
]
</script>

<template>
  <section>

    <!-- Avatars -->
    <SectionHeader title="Avatars" section-id="atoms">
      Represent users in comments, activity feeds, table rows, and profile headers.
      Use initials as a fallback when an image fails to load.
      Stacked avatars indicate group membership (e.g. team members on a project card).
    </SectionHeader>

    <PreviewBox label="Sizes" class="mb-4">
      <div class="flex flex-wrap items-center gap-4 p-5">
        <div v-for="av in avatarSizes" :key="av.size"
             class="rounded-full flex items-center justify-center font-semibold shrink-0 ring-2 ring-surface-raised" :class="[av.size, av.colors]">
          {{ av.initials }}
        </div>
      </div>
    </PreviewBox>

    <PreviewBox label="Stacked Group" class="mb-10">
      <div class="flex items-center gap-4 p-5">
        <div class="flex">
          <div v-for="(av, i) in stackedAvatars" :key="av.initials"
               class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ring-2 ring-surface-raised" :class="[av.colors,
                        i > 0 ? '-ml-2.5' : '']"
               :style="{ zIndex: stackedAvatars.length - i }">
            {{ av.initials }}
          </div>
          <div class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                      bg-surface-overlay text-content-secondary ring-2 ring-surface-raised -ml-2.5">
            +4
          </div>
        </div>
        <span class="text-sm text-content-secondary">8 team members</span>
      </div>
    </PreviewBox>

    <!-- Loading -->
    <SectionHeader title="Loading States" section-id="loading" :use-case="true">
      <strong>Spinners</strong> for async button actions and page-level loading.
      <strong>Progress bars</strong> for upload/download with a known total.
      <strong>Skeletons</strong> for content placeholders during initial data fetch —
      use shapes matching eventual content to reduce layout shift.
    </SectionHeader>

    <PreviewBox label="Spinners" class="mb-4">
      <div class="flex items-center gap-6 p-5">
        <span v-for="sp in spinners" :key="sp.size"
              class="rounded-full border-2 border-edge border-t-green-600 animate-spin" :class="[sp.size]" />
      </div>
    </PreviewBox>

    <PreviewBox label="Progress Bars" class="mb-4">
      <div class="flex flex-col gap-4 p-5">
        <div v-for="bar in progressBars" :key="bar.label">
          <div class="flex justify-between mb-1.5">
            <span class="text-xs text-content-secondary">{{ bar.label }}</span>
            <span class="text-xs text-content-tertiary">{{ bar.pct }}%</span>
          </div>
          <div class="h-1.5 w-full bg-surface-sunken rounded-full overflow-hidden">
            <div class="h-full rounded-full transition-all duration-500" :class="[bar.barCls]"
                 :style="{ width: `${bar.pct  }%` }" />
          </div>
        </div>
      </div>
    </PreviewBox>

    <PreviewBox label="Skeleton Loader">
      <div class="flex flex-col gap-3 p-5">
        <div class="h-4 w-2/5 rounded-md bg-surface-overlay"
             style="animation: ds-shimmer 1.4s ease-in-out infinite" />
        <div class="h-3.5 w-4/5 rounded-md bg-surface-overlay"
             style="animation: ds-shimmer 1.4s ease-in-out infinite 0.1s" />
        <div class="h-3.5 w-3/5 rounded-md bg-surface-overlay"
             style="animation: ds-shimmer 1.4s ease-in-out infinite 0.2s" />
        <div class="h-3.5 w-2/3 rounded-md bg-surface-overlay"
             style="animation: ds-shimmer 1.4s ease-in-out infinite 0.3s" />
      </div>
    </PreviewBox>
  </section>
</template>
