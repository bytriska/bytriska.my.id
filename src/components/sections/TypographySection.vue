<script setup>
import PreviewBox    from '../ui/PreviewBox.vue'
import SectionHeader from '../ui/SectionHeader.vue'

const typeScale = [
  { cls: 'text-5xl', font: 'font-display', px: '48px',  use: 'Display / hero',    sample: 'The quick brown fox' },
  { cls: 'text-4xl', font: 'font-display', px: '36px',  use: 'Page title',        sample: 'Designing with intent' },
  { cls: 'text-3xl', font: 'font-display', px: '30px',  use: 'Section heading',   sample: 'Component Library' },
  { cls: 'text-2xl', font: 'font-display', px: '24px',  use: 'Sub-section',       sample: 'Form Inputs & Controls' },
  { cls: 'text-xl',  font: 'font-display', px: '20px',  use: 'Card title',        sample: 'Subscription Plan Details' },
  { cls: 'text-lg',  font: 'font-body',    px: '18px',  use: 'Lead paragraph',    sample: 'A flexible system that scales from small components to full layouts without friction.' },
  { cls: 'text-base',font: 'font-body',    px: '16px',  use: 'Default body',      sample: 'Use semantic tokens to describe intent, not appearance. This keeps your markup clean and meaningful across every context.' },
  { cls: 'text-sm',  font: 'font-body',    px: '14px',  use: 'Secondary UI copy', sample: 'Your changes were saved automatically. Last sync: 2 minutes ago.' },
]
</script>

<template>
  <section>
    <SectionHeader title="Typography" section-id="typography">
      <strong>Instrument Serif</strong> (<code class="font-code text-xs bg-primary-subtle text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded">font-display</code>)
      for headings and editorial moments.
      <strong>DM Sans</strong> (<code class="font-code text-xs bg-primary-subtle text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded">font-body</code>)
      for UI labels and body copy.
      <strong>JetBrains Mono</strong> (<code class="font-code text-xs bg-primary-subtle text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded">font-code</code>)
      for code and token strings.
    </SectionHeader>

    <PreviewBox label="Type Scale">
      <div class="flex flex-col gap-5 p-6">

        <div v-for="size in typeScale" :key="size.cls">
          <p class="text-[11px] font-semibold tracking-widest uppercase text-content-tertiary mb-1">
            {{ size.cls }} · {{ size.px }} · {{ size.use }}
          </p>
          <div class="text-content-primary" :class="[size.cls, size.font]">
            {{ size.sample }}
          </div>
        </div>

        <hr class="border-t border-edge-subtle" />

        <!-- Utility styles row -->
        <div class="flex flex-wrap items-baseline gap-x-8 gap-y-4">
          <div>
            <p class="text-[11px] font-semibold tracking-widest uppercase text-content-tertiary mb-1">overline</p>
            <p class="text-xs font-semibold tracking-widest uppercase text-content-tertiary">Feature flags</p>
          </div>
          <div>
            <p class="text-[11px] font-semibold tracking-widest uppercase text-content-tertiary mb-1">caption</p>
            <p class="text-xs text-content-tertiary">Last edited · Jan 12</p>
          </div>
          <div>
            <p class="text-[11px] font-semibold tracking-widest uppercase text-content-tertiary mb-1">label</p>
            <p class="text-sm font-medium text-content-primary">Email address</p>
          </div>
          <div>
            <p class="text-[11px] font-semibold tracking-widest uppercase text-content-tertiary mb-1">code</p>
            <code class="font-code text-sm text-green-700 dark:text-green-400
                         bg-primary-subtle border border-status-success-edge
                         px-1.5 py-0.5 rounded">--action-primary</code>
          </div>
          <div>
            <p class="text-[11px] font-semibold tracking-widest uppercase text-content-tertiary mb-1">link</p>
            <a href="#" class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 no-underline hover:underline">
              View documentation →
            </a>
          </div>
        </div>
      </div>
    </PreviewBox>
  </section>
</template>
