<script setup>
import PreviewBox    from '../ui/PreviewBox.vue'
import SectionHeader from '../ui/SectionHeader.vue'

const surfaces = [
  { token: '--surface-base',    swatchBg: 'bg-stone-50',  rowBg: 'bg-stone-50 dark:bg-stone-950',  desc: 'stone-50 · Page background, outermost layer',  level: 'L 0', textColor: 'text-stone-600',  badgeCls: 'text-stone-500 border-stone-300 bg-stone-100' },
  { token: '--surface-raised',  swatchBg: 'bg-white',     rowBg: 'bg-white dark:bg-stone-900',     desc: 'white · Primary card / panel surface',          level: 'L 1', textColor: 'text-stone-600',  badgeCls: 'text-stone-500 border-stone-300 bg-stone-100' },
  { token: '--surface-overlay', swatchBg: 'bg-stone-100', rowBg: 'bg-stone-100 dark:bg-stone-800', desc: 'stone-100 · Nested card, badge bg, popovers',   level: 'L 2', textColor: 'text-stone-600',  badgeCls: 'text-stone-500 border-stone-300 bg-stone-100' },
  { token: '--surface-sunken',  swatchBg: 'bg-stone-200', rowBg: 'bg-stone-200 dark:bg-stone-900', desc: 'stone-200 · Input fields, table headers',        level: 'L−1', textColor: 'text-stone-600',  badgeCls: 'text-stone-500 border-stone-300 bg-stone-100' },
  { token: '--surface-inverse', swatchBg: 'bg-stone-900', rowBg: 'bg-stone-900',                   desc: 'stone-900 · Tooltips, toast, dark panels',       level: 'INV', textColor: 'text-stone-300',  badgeCls: 'text-stone-400 border-stone-700 bg-stone-800' },
]

const brandColors = [
  { token: '--action-primary',        swatch: 'bg-green-600', desc: 'green-600 · CTA buttons, active states, links',          badge: 'Primary',   badgeCls: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800' },
  { token: '--action-primary-subtle', swatch: 'bg-green-50',  desc: 'green-50 · Tinted backgrounds for primary elements',     badge: 'Primary',   badgeCls: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800' },
  { token: '--action-secondary',      swatch: 'bg-blue-600',  desc: 'blue-600 · Secondary actions, info highlights',          badge: 'Secondary', badgeCls: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800' },
  { token: '--action-secondary-subtle',swatch:'bg-blue-50',   desc: 'blue-50 · Tinted backgrounds for secondary elements',    badge: 'Secondary', badgeCls: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800' },
]

const feedbackColors = [
  { token: '--color-success', swatch: 'bg-green-600', desc: 'green-600 · Confirmation, completion, healthy status', badge: 'success', badgeCls: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800' },
  { token: '--color-warning', swatch: 'bg-amber-500', desc: 'amber-500 · Caution, review needed, approaching limit', badge: 'warning', badgeCls: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800' },
  { token: '--color-error',   swatch: 'bg-red-600',   desc: 'red-600 · Destructive actions, validation errors',     badge: 'error',   badgeCls: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800' },
  { token: '--color-info',    swatch: 'bg-blue-600',  desc: 'blue-600 · Neutral tips, onboarding, info hints',      badge: 'info',    badgeCls: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800' },
]

const zScale = [
  { name: 'negative', value: '-1',   use: 'Behind page' },
  { name: 'raised',   value: '10',   use: 'Elevated items' },
  { name: 'dropdown', value: '100',  use: 'Menus' },
  { name: 'sticky',   value: '200',  use: 'Navbar' },
  { name: 'overlay',  value: '300',  use: 'Backdrop' },
  { name: 'modal',    value: '500',  use: 'Dialogs' },
  { name: 'toast',    value: '700',  use: 'Toasts' },
  { name: 'tooltip',  value: '1000', use: 'Tooltips' },
]
</script>

<template>
  <section>
    <SectionHeader title="Design Tokens" section-id="tokens">
      Two-layer token architecture. <strong>Primitive tokens</strong> hold raw values (internal).
      <strong>Semantic tokens</strong> alias primitives with intent — swap an entire theme by
      remapping only the semantic layer via <code class="font-code text-green-700 dark:text-green-400 bg-primary-subtle px-1.5 py-0.5 rounded text-xs">@theme inline</code>.
    </SectionHeader>

    <!-- Surface Hierarchy -->
    <PreviewBox label="Surface Hierarchy" sublabel="use to communicate stacking depth" class="mb-4">
      <div v-for="s in surfaces" :key="s.token"
           class="grid grid-cols-[24px_1fr_1fr_auto] items-center gap-3 px-4 py-2.5 border-b border-edge-subtle last:border-b-0" :class="[s.rowBg]">
        <span class="w-5 h-5 rounded border border-edge-subtle shrink-0" :class="[s.swatchBg]" />
        <code class="font-code text-xs text-green-700 dark:text-green-400 bg-primary-subtle px-1.5 py-0.5 rounded w-fit">
          {{ s.token }}
        </code>
        <span class="text-xs" :class="[s.textColor]">{{ s.desc }}</span>
        <span class="text-[11px] font-semibold px-1.5 py-0.5 rounded border" :class="[s.badgeCls]">
          {{ s.level }}
        </span>
      </div>
    </PreviewBox>

    <!-- Brand Colors -->
    <PreviewBox label="Brand Colors" class="mb-4">
      <div v-for="b in brandColors" :key="b.token"
           class="grid grid-cols-[24px_1fr_1fr_auto] items-center gap-3 px-4 py-2.5
                  border-b border-edge-subtle last:border-b-0">
        <span class="w-5 h-5 rounded border border-edge-subtle shrink-0" :class="[b.swatch]" />
        <code class="font-code text-xs text-green-700 dark:text-green-400 bg-primary-subtle px-1.5 py-0.5 rounded w-fit">
          {{ b.token }}
        </code>
        <span class="text-xs text-content-secondary">{{ b.desc }}</span>
        <span class="inline-flex items-center h-[22px] px-2 rounded-full text-xs font-semibold border" :class="[b.badgeCls]">
          {{ b.badge }}
        </span>
      </div>
    </PreviewBox>

    <!-- Semantic Feedback -->
    <PreviewBox label="Semantic Feedback Colors" sublabel="map to Tailwind primitives via @theme inline" class="mb-4">
      <div v-for="f in feedbackColors" :key="f.token"
           class="grid grid-cols-[24px_1fr_1fr_auto] items-center gap-3 px-4 py-2.5
                  border-b border-edge-subtle last:border-b-0">
        <span class="w-5 h-5 rounded border border-edge-subtle shrink-0" :class="[f.swatch]" />
        <code class="font-code text-xs text-green-700 dark:text-green-400 bg-primary-subtle px-1.5 py-0.5 rounded w-fit">
          {{ f.token }}
        </code>
        <span class="text-xs text-content-secondary">{{ f.desc }}</span>
        <span class="inline-flex items-center h-[22px] px-2 rounded-full text-xs font-semibold border" :class="[f.badgeCls]">
          {{ f.badge }}
        </span>
      </div>
    </PreviewBox>

    <!-- Z-Index Scale -->
    <PreviewBox label="Z-Index Scale">
      <div class="flex flex-wrap gap-3 p-4">
        <div v-for="z in zScale" :key="z.name"
             class="bg-surface-sunken rounded-md p-3 text-xs min-w-[100px]">
          <p class="font-semibold text-content-primary mb-1">{{ z.name }}</p>
          <code class="font-code text-[11px] text-green-700 dark:text-green-400 bg-primary-subtle px-1.5 py-0.5 rounded">
            --z-{{ z.name }}
          </code>
          <p class="text-content-tertiary mt-1.5">{{ z.value }} · {{ z.use }}</p>
        </div>
      </div>
    </PreviewBox>
  </section>
</template>
