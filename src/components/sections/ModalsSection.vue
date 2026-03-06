<script setup>
import { ref } from 'vue'
import PreviewBox    from '../ui/PreviewBox.vue'
import SectionHeader from '../ui/SectionHeader.vue'

const open = ref(false)
</script>

<template>
  <section>
    <SectionHeader title="Modals &amp; Dialogs" section-id="modals">
      Use for actions that require a user decision before continuing (confirm delete, fill a form,
      view details). Always trap focus, support <kbd class="font-code text-xs bg-surface-sunken border border-edge px-1.5 py-0.5 rounded">Esc</kbd>
      to close, and overlay with <code class="font-code text-xs bg-primary-subtle text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded">z-[300]</code>
      backdrop and <code class="font-code text-xs bg-primary-subtle text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded">z-[500]</code> panel.
    </SectionHeader>

    <!-- Static inline preview -->
    <PreviewBox label="Confirm Dialog" sublabel="static inline preview">
      <div class="flex items-center justify-center p-10 bg-surface-sunken rounded-b-lg">
        <!-- Blurred backdrop hint -->
        <div class="relative w-full max-w-md">
          <!-- Mock backdrop overlay -->
          <div class="absolute -inset-10 bg-stone-900/20 dark:bg-stone-950/50 rounded-xl backdrop-blur-sm -z-10" />

          <!-- Modal panel -->
          <div class="bg-surface-raised border border-edge-subtle rounded-2xl shadow-2xl overflow-hidden">
            <!-- Header -->
            <div class="flex items-start justify-between gap-4 px-6 pt-6 pb-4">
              <div>
                <p class="text-[11px] font-semibold tracking-widest uppercase text-content-tertiary mb-1">
                  Confirm action
                </p>
                <h3 class="font-display text-2xl text-content-primary">Delete project?</h3>
              </div>
              <button class="flex items-center justify-center w-8 h-8 rounded-md
                             text-content-tertiary transition-colors duration-150
                             hover:bg-surface-overlay hover:text-content-primary shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <!-- Body -->
            <div class="px-6 pb-4 text-sm text-content-secondary leading-relaxed">
              This will permanently delete
              <strong class="text-content-primary">Design System v2026</strong>
              and all its contents. This action cannot be undone.
            </div>

            <!-- Footer -->
            <div class="flex justify-end gap-3 px-6 pb-6">
              <button class="h-10 px-4 text-sm font-medium rounded-md border border-edge
                             bg-transparent text-content-primary
                             transition-colors duration-150 hover:bg-surface-overlay
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/30">
                Cancel
              </button>
              <button class="h-10 px-4 text-sm font-medium rounded-md border border-red-600
                             bg-red-600 text-white
                             transition-colors duration-150 hover:bg-red-700 hover:border-red-700
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/30">
                Delete project
              </button>
            </div>
          </div>
        </div>
      </div>
    </PreviewBox>

    <!-- Live modal demo -->
    <div class="mt-4">
      <button class="h-10 px-4 text-sm font-medium rounded-md border border-green-600
                     bg-green-600 text-white transition-colors duration-150 hover:bg-green-700
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/30"
              @click="open = true">
        Open live modal
      </button>
    </div>

    <!-- Live modal overlay -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-150"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="open"
             class="fixed inset-0 bg-stone-900/50 dark:bg-stone-950/70 backdrop-blur-sm z-[300]"
             @click="open = false" />
      </Transition>

      <Transition
        enter-active-class="transition duration-200"
        enter-from-class="opacity-0 scale-95 translate-y-2"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition duration-150"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-2"
      >
        <div v-if="open"
             class="fixed inset-0 flex items-center justify-center p-4 z-[500] pointer-events-none">
          <div class="bg-surface-raised border border-edge-subtle rounded-2xl shadow-2xl
                      w-full max-w-[480px] overflow-hidden pointer-events-auto">
            <div class="flex items-start justify-between gap-4 px-6 pt-6 pb-4">
              <div>
                <p class="text-[11px] font-semibold tracking-widest uppercase text-content-tertiary mb-1">Confirm action</p>
                <h3 class="font-display text-2xl text-content-primary">Delete project?</h3>
              </div>
              <button class="flex items-center justify-center w-8 h-8 rounded-md
                             text-content-tertiary hover:bg-surface-overlay hover:text-content-primary"
                      @click="open = false">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div class="px-6 pb-4 text-sm text-content-secondary leading-relaxed">
              This will permanently delete <strong class="text-content-primary">Design System v2026</strong>
              and all its contents. This action cannot be undone.
            </div>
            <div class="flex justify-end gap-3 px-6 pb-6">
              <button class="h-10 px-4 text-sm font-medium rounded-md border border-edge
                             bg-transparent text-content-primary hover:bg-surface-overlay"
                      @click="open = false">Cancel</button>
              <button class="h-10 px-4 text-sm font-medium rounded-md border border-red-600
                             bg-red-600 text-white hover:bg-red-700"
                      @click="open = false">Delete project</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>
