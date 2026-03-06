<script setup>
import PreviewBox    from '../ui/PreviewBox.vue'
import SectionHeader from '../ui/SectionHeader.vue'

const alerts = [
  {
    type: 'success',
    cls: 'bg-status-success-surface border-status-success-edge text-green-800 dark:text-green-300',
    iconCls: 'text-green-600 dark:text-green-400',
    iconPath: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/>',
    title: 'Payment successful',
    body: 'Your invoice #1047 has been processed and emailed to you.',
  },
  {
    type: 'warning',
    cls: 'bg-status-warning-surface border-status-warning-edge text-amber-800 dark:text-amber-300',
    iconCls: 'text-amber-600 dark:text-amber-400',
    iconPath: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    title: 'Trial ending soon',
    body: 'Your free trial expires in 3 days. Upgrade to keep your data.',
  },
  {
    type: 'error',
    cls: 'bg-status-error-surface border-status-error-edge text-red-800 dark:text-red-300',
    iconCls: 'text-red-600 dark:text-red-400',
    iconPath: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
    title: 'Unable to save changes',
    body: 'Your session expired. Please sign in again to continue.',
  },
  {
    type: 'info',
    cls: 'bg-status-info-surface border-status-info-edge text-blue-800 dark:text-blue-300',
    iconCls: 'text-blue-600 dark:text-blue-400',
    iconPath: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
    title: 'Scheduled maintenance',
    body: 'The platform will be offline on Dec 18 from 2–4am UTC.',
  },
]
</script>

<template>
  <section>
    <SectionHeader title="Alerts &amp; Toasts" section-id="feedback">
      <strong>Alerts</strong> for persistent in-page messages (form errors, billing warnings, account notices).
      <strong>Toasts</strong> for transient, auto-dismissing notifications triggered by user actions.
      Never use both for the same event. Toast colours invert the surface for maximum contrast.
    </SectionHeader>

    <!-- Alert Banners -->
    <PreviewBox label="Alert Banners" class="mb-4">
      <div class="flex flex-col gap-3 p-5">
        <div v-for="alert in alerts" :key="alert.type"
             class="flex gap-3 p-4 rounded-lg border text-sm" :class="[alert.cls]">
          <svg class="shrink-0 mt-px" :class="alert.iconCls" width="18" height="18"
               viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
               v-html="alert.iconPath"></svg>
          <div>
            <p class="font-semibold mb-0.5">{{ alert.title }}</p>
            <p>{{ alert.body }}</p>
          </div>
        </div>
      </div>
    </PreviewBox>

    <!-- Toast Notifications (static preview) -->
    <PreviewBox label="Toast Notifications" sublabel="static preview — fixed bottom-right in production">
      <div class="flex flex-col gap-3 p-5">

        <!-- Default dark toast -->
        <div class="flex items-start gap-3 px-4 py-3 rounded-xl max-w-sm
                    bg-surface-inverse text-content-inverse shadow-xl">
          <svg class="shrink-0 mt-px text-green-400" width="18" height="18"
               viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <path d="M22 4L12 14.01l-3-3"/>
          </svg>
          <div>
            <p class="text-sm font-semibold text-content-inverse">Changes saved</p>
            <p class="text-xs mt-0.5 text-stone-400">Your draft was saved automatically.</p>
          </div>
        </div>

        <!-- Error toast -->
        <div class="flex items-start gap-3 px-4 py-3 rounded-xl max-w-sm
                    bg-red-700 dark:bg-red-900 text-white shadow-xl">
          <svg class="shrink-0 mt-px" width="18" height="18"
               viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <div>
            <p class="text-sm font-semibold">Upload failed</p>
            <p class="text-xs mt-0.5 text-red-200">File exceeds the 10MB size limit.</p>
          </div>
        </div>

        <!-- Info toast -->
        <div class="flex items-start gap-3 px-4 py-3 rounded-xl max-w-sm
                    bg-blue-700 dark:bg-blue-900 text-white shadow-xl">
          <svg class="shrink-0 mt-px" width="18" height="18"
               viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
          <div>
            <p class="text-sm font-semibold">Scheduled maintenance</p>
            <p class="text-xs mt-0.5 text-blue-200">Dec 18 · 2–4am UTC. Brief downtime expected.</p>
          </div>
        </div>

      </div>
    </PreviewBox>
  </section>
</template>
