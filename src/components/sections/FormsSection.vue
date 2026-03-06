<script setup>
import { ref } from 'vue'
import PreviewBox    from '../ui/PreviewBox.vue'
import SectionHeader from '../ui/SectionHeader.vue'

const checks  = ref([true, false])
const billing = ref('monthly')
const toggles = ref([
  { label: 'Enable dark mode',    value: true },
  { label: 'Sync across devices', value: false },
])

// Shared input class string
const inputBase = [
  'block w-full h-10 px-3 text-sm rounded-md border',
  'bg-surface-raised text-content-primary',
  'border-edge placeholder:text-content-tertiary',
  'outline-none transition-all duration-150',
  'hover:border-edge-strong',
  'focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-green-500/20',
].join(' ')
</script>

<template>
  <section>
    <SectionHeader title="Form Inputs" section-id="forms">
      <strong>Text inputs</strong> for data entry.
      <strong>Checkboxes</strong> for multi-select.
      <strong>Radios</strong> for mutually exclusive choices.
      <strong>Toggles</strong> for binary settings (on/off, notifications, feature flags).
      All inputs expose a green focus ring via
      <code class="font-code text-xs bg-primary-subtle text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded">focus-visible:ring</code>
      and a red error state border.
    </SectionHeader>

    <PreviewBox label="Input States">

      <!-- Text inputs grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5">

        <!-- Default -->
        <div>
          <label class="block text-sm font-medium text-content-primary mb-1">Default</label>
          <input type="text" :class="inputBase" placeholder="Enter your email…" />
        </div>

        <!-- With hint -->
        <div>
          <label class="block text-sm font-medium text-content-primary mb-1">With hint</label>
          <input type="text" :class="inputBase" placeholder="team@company.com" />
          <p class="mt-1 text-xs text-content-tertiary">We'll send a verification link.</p>
        </div>

        <!-- Error -->
        <div>
          <label class="block text-sm font-medium text-content-primary mb-1">
            Error state
            <span class="text-red-500 ml-0.5">*</span>
          </label>
          <input type="text" value="bad-email"
            class="block w-full h-10 px-3 text-sm rounded-md border bg-surface-raised text-content-primary
                   outline-none transition-all duration-150
                   border-red-500 ring-1 ring-red-500/20
                   focus-visible:ring-2 focus-visible:ring-red-500/25 focus-visible:border-red-500" />
          <p class="mt-1 text-xs text-red-600 dark:text-red-400">Please enter a valid email address.</p>
        </div>

        <!-- Disabled -->
        <div>
          <label class="block text-sm font-medium text-content-primary mb-1">Disabled</label>
          <input type="text" value="readonly@example.com" disabled
            class="block w-full h-10 px-3 text-sm rounded-md border bg-surface-sunken
                   text-content-disabled border-edge cursor-not-allowed outline-none" />
        </div>

        <!-- Select -->
        <div>
          <label class="block text-sm font-medium text-content-primary mb-1">Select</label>
          <select class="ds-select" :class="[inputBase]">
            <option value="">Choose a plan…</option>
            <option>Starter — $9/mo</option>
            <option>Pro — $29/mo</option>
            <option>Enterprise</option>
          </select>
        </div>

        <!-- Textarea -->
        <div>
          <label class="block text-sm font-medium text-content-primary mb-1">Textarea</label>
          <textarea class="h-auto min-h-[88px] py-2 resize-y" :class="[inputBase]"
                    placeholder="Describe your issue…"></textarea>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-edge-subtle mx-5"></div>

      <!-- Checkboxes, Radios, Toggles -->
      <div class="flex flex-col gap-4 p-5">

        <!-- Checkboxes -->
        <p class="text-[11px] font-semibold tracking-widest uppercase text-content-tertiary">Checkboxes</p>
        <label class="flex items-center gap-2.5 cursor-pointer">
          <input type="checkbox" class="ds-checkbox" :checked="checks[0]" @change="checks[0] = !checks[0]" />
          <span class="text-sm font-medium text-content-primary">Email notifications</span>
        </label>
        <label class="flex items-center gap-2.5 cursor-pointer">
          <input type="checkbox" class="ds-checkbox" :checked="checks[1]" @change="checks[1] = !checks[1]" />
          <span class="text-sm font-medium text-content-primary">Push notifications</span>
        </label>

        <!-- Radios -->
        <p class="text-[11px] font-semibold tracking-widest uppercase text-content-tertiary mt-2">Radios</p>
        <label class="flex items-center gap-2.5 cursor-pointer">
          <input type="radio" class="ds-radio" name="billing" :checked="billing === 'monthly'" @change="billing = 'monthly'" />
          <span class="text-sm font-medium text-content-primary">Monthly billing</span>
        </label>
        <label class="flex items-center gap-2.5 cursor-pointer">
          <input type="radio" class="ds-radio" name="billing" :checked="billing === 'annual'" @change="billing = 'annual'" />
          <span class="text-sm font-medium text-content-primary">
            Annual billing
            <span class="inline-flex items-center h-[22px] px-2 ml-2 rounded-full text-xs font-semibold
                         bg-status-success-surface text-green-700 dark:text-green-400 border border-status-success-edge">
              −20%
            </span>
          </span>
        </label>

        <!-- Toggles (using Tailwind peer) -->
        <p class="text-[11px] font-semibold tracking-widest uppercase text-content-tertiary mt-2">Toggles</p>

        <label v-for="toggle in toggles" :key="toggle.label" class="flex items-center gap-3 cursor-pointer select-none">
          <div class="relative w-11 h-6 shrink-0">
            <input type="checkbox" class="sr-only peer" v-model="toggle.value" />
            <span class="absolute inset-0 rounded-full bg-edge transition-colors duration-150
                         peer-checked:bg-green-600
                         peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-green-500/30">
            </span>
            <span class="absolute top-[3px] left-[3px] w-[18px] h-[18px] bg-white rounded-full shadow-xs
                         transition-transform duration-150 peer-checked:translate-x-5">
            </span>
          </div>
          <span class="text-sm font-medium text-content-primary">{{ toggle.label }}</span>
        </label>

      </div>
    </PreviewBox>
  </section>
</template>
