<script setup>
import PreviewBox    from '../ui/PreviewBox.vue'
import SectionHeader from '../ui/SectionHeader.vue'

// Shared base classes for consistent button reset
const btnBase = [
  'inline-flex items-center justify-center gap-2',
  'h-10 px-4',
  'text-sm font-medium rounded-md border',
  'transition-colors duration-150 cursor-pointer select-none',
  'active:scale-[0.975]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/30',
].join(' ')

const btnSm = [
  'inline-flex items-center justify-center gap-1.5',
  'h-8 px-3',
  'text-xs font-medium rounded border',
  'transition-colors duration-150 cursor-pointer select-none',
  'active:scale-[0.975]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/30',
].join(' ')

const btnMd = btnBase

const btnLg = [
  'inline-flex items-center justify-center gap-2',
  'h-12 px-6',
  'text-base font-medium rounded-lg border',
  'transition-colors duration-150 cursor-pointer select-none',
  'active:scale-[0.975]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/30',
].join(' ')
</script>

<template>
  <section>
    <SectionHeader title="Buttons" section-id="buttons">
      <strong>Primary</strong> for the single most important action on a page.
      <strong>Secondary</strong> for complementary actions.
      <strong>Outline</strong> for secondary actions when primary is used.
      <strong>Ghost</strong> for tertiary/in-context actions.
      <strong>Danger</strong> for irreversible destructive operations only.
    </SectionHeader>

    <!-- Variants -->
    <PreviewBox label="Variants" class="mb-4">
      <div class="flex flex-wrap items-center gap-3 p-4">
        <button :class="btnBase" class="bg-green-600 border-green-600 text-white hover:bg-green-700 hover:border-green-700">
          Primary
        </button>
        <button :class="btnBase" class="bg-blue-600 border-blue-600 text-white hover:bg-blue-700 hover:border-blue-700">
          Secondary
        </button>
        <button :class="btnBase" class="bg-transparent border-edge text-content-primary hover:bg-surface-overlay hover:border-edge-strong">
          Outline
        </button>
        <button :class="btnBase" class="bg-transparent border-transparent text-content-secondary hover:bg-surface-overlay hover:text-content-primary">
          Ghost
        </button>
        <button :class="btnBase" class="bg-red-600 border-red-600 text-white hover:bg-red-700 hover:border-red-700">
          Danger
        </button>
      </div>
    </PreviewBox>

    <!-- Sizes -->
    <PreviewBox label="Sizes" class="mb-4">
      <div class="flex flex-wrap items-center gap-3 p-4">
        <button :class="btnSm" class="bg-green-600 border-green-600 text-white hover:bg-green-700">Small</button>
        <button :class="btnMd" class="bg-green-600 border-green-600 text-white hover:bg-green-700">Medium</button>
        <button :class="btnLg" class="bg-green-600 border-green-600 text-white hover:bg-green-700">Large</button>
      </div>
    </PreviewBox>

    <!-- States -->
    <PreviewBox label="States" class="mb-4">
      <div class="flex flex-wrap items-center gap-3 p-4">
        <button :class="btnMd" class="bg-green-600 border-green-600 text-white hover:bg-green-700">
          Default
        </button>
        <button :class="btnMd" disabled
          class="bg-edge border-edge text-content-disabled cursor-not-allowed opacity-60">
          Disabled
        </button>
        <button :class="btnMd" class="bg-green-600 border-green-600 text-white pointer-events-none opacity-75">
          <span class="w-[14px] h-[14px] border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Loading
        </button>
        <button :class="btnMd" disabled
          class="bg-transparent border-edge text-content-disabled cursor-not-allowed opacity-60">
          Disabled Outline
        </button>
      </div>
    </PreviewBox>

    <!-- With Icons -->
    <PreviewBox label="With Icons">
      <div class="flex flex-wrap items-center gap-3 p-4">

        <!-- Icon + label -->
        <button :class="btnMd" class="bg-green-600 border-green-600 text-white hover:bg-green-700">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
          Download
        </button>

        <button :class="btnMd" class="bg-transparent border-edge text-content-primary hover:bg-surface-overlay hover:border-edge-strong">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          Search
        </button>

        <!-- Icon-only -->
        <button class="inline-flex items-center justify-center w-10 h-10 rounded-md border
                       border-transparent bg-transparent text-content-secondary
                       transition-colors duration-150 hover:bg-surface-overlay hover:text-content-primary
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/30"
                title="Settings">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>

        <button class="inline-flex items-center justify-center w-10 h-10 rounded-md border
                       border-green-600 bg-green-600 text-white
                       transition-colors duration-150 hover:bg-green-700
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/30"
                title="Add">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M12 5v14M5 12h14"/>
          </svg>
        </button>
      </div>
    </PreviewBox>
  </section>
</template>
