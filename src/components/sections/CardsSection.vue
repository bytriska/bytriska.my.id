<script setup>
import PreviewBox    from '../ui/PreviewBox.vue'
import SectionHeader from '../ui/SectionHeader.vue'
</script>

<template>
  <section>
    <SectionHeader title="Cards" section-id="cards">
      Cards group related content into a single visual unit.
      <strong>Standard cards</strong> (<code class="font-code text-xs bg-primary-subtle text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded">bg-surface-raised</code>)
      for static display.
      <strong>Interactive cards</strong> lift on hover.
      <strong>Nested cards</strong> use
      <code class="font-code text-xs bg-primary-subtle text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded">bg-surface-overlay</code>
      to maintain depth hierarchy — never use the same surface for nested containers.
    </SectionHeader>

    <!-- Two-column card grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">

      <!-- Standard card with nested card -->
      <div class="bg-surface-raised border border-edge-subtle rounded-xl shadow-sm overflow-hidden">
        <!-- Header -->
        <div class="flex items-start justify-between px-5 pt-5 pb-4 border-b border-edge-subtle">
          <div>
            <p class="text-[11px] font-semibold tracking-widest uppercase text-content-tertiary mb-1">Plan</p>
            <h3 class="text-xl font-display text-content-primary">Pro</h3>
          </div>
          <span class="inline-flex items-center gap-1.5 h-[22px] px-2.5 rounded-full text-xs font-semibold
                       bg-status-success-surface text-green-700 dark:text-green-400 border border-status-success-edge">
            <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            Active
          </span>
        </div>
        <!-- Body -->
        <div class="px-5 py-4">
          <div class="font-display text-4xl text-content-primary mb-2 leading-none">
            $29<span class="text-base text-content-tertiary font-body">/mo</span>
          </div>
          <p class="text-sm text-content-secondary mb-4 leading-relaxed">
            Everything in Starter plus advanced analytics, team management, and priority support.
          </p>
          <!-- Nested card (L2 surface) -->
          <div class="bg-surface-overlay border border-edge-subtle rounded-lg p-3">
            <p class="text-[11px] font-semibold tracking-widest uppercase text-content-tertiary mb-2">Usage this month</p>
            <div class="h-1.5 w-full bg-surface-sunken rounded-full overflow-hidden">
              <div class="h-full w-[54%] bg-green-600 rounded-full transition-all duration-500" />
            </div>
            <div class="flex justify-between mt-1.5">
              <span class="text-xs text-content-tertiary">54,000 API calls</span>
              <span class="text-xs text-content-tertiary">100k limit</span>
            </div>
          </div>
        </div>
        <!-- Footer -->
        <div class="flex gap-2 px-5 py-4 bg-surface-sunken border-t border-edge-subtle">
          <button class="h-8 px-3 text-xs font-medium rounded border border-edge bg-transparent
                         text-content-primary transition-colors duration-150
                         hover:bg-surface-overlay hover:border-edge-strong
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/30">
            Manage
          </button>
          <button class="h-8 px-3 text-xs font-medium rounded border border-green-600
                         bg-green-600 text-white transition-colors duration-150
                         hover:bg-green-700 hover:border-green-700
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/30">
            Upgrade
          </button>
        </div>
      </div>

      <!-- Interactive image card -->
      <div class="bg-surface-raised border border-edge-subtle rounded-xl shadow-sm overflow-hidden
                  cursor-pointer transition-all duration-150
                  hover:-translate-y-0.5 hover:shadow-md hover:border-edge">
        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=180&fit=crop&auto=format"
             alt="Analytics dashboard"
             class="w-full h-40 object-cover" />
        <div class="p-5">
          <div class="flex items-start justify-between gap-3 mb-2">
            <div>
              <p class="text-[11px] font-semibold tracking-widest uppercase text-content-tertiary mb-0.5">Analytics</p>
              <h3 class="text-lg font-display text-content-primary">Q4 Revenue Report</h3>
            </div>
            <span class="inline-flex items-center h-[22px] px-2.5 rounded-full text-xs font-semibold border shrink-0
                         bg-status-warning-surface text-amber-700 dark:text-amber-400 border-status-warning-edge">
              Draft
            </span>
          </div>
          <p class="text-sm text-content-secondary leading-relaxed mb-3">
            Click to open the interactive dashboard and explore quarterly metrics.
          </p>
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0
                        bg-primary-subtle text-green-700 dark:text-green-400 ring-2 ring-surface-raised">
              JD
            </div>
            <span class="text-xs text-content-tertiary">Jordan Davis · 2h ago</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating card (xl shadow — modal level) -->
    <PreviewBox label="Floating Card" sublabel="shadow-xl · use for profile previews, command palettes">
      <div class="p-6">
        <div class="bg-surface-raised border border-edge-subtle rounded-2xl shadow-xl p-5 max-w-sm mx-auto">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-14 h-14 rounded-full flex items-center justify-center text-lg font-semibold
                        bg-primary-subtle text-green-700 dark:text-green-400 ring-2 ring-surface-raised">
              AA
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-base font-semibold text-content-primary">Alex Arbor</p>
              <p class="text-xs text-content-tertiary">Senior Product Designer · SF</p>
            </div>
            <button class="h-8 px-3 text-xs font-medium rounded-md border border-green-600
                           bg-green-600 text-white shrink-0 transition-colors duration-150
                           hover:bg-green-700">
              Follow
            </button>
          </div>
          <div class="border-t border-edge-subtle pt-4 flex gap-6">
            <div>
              <p class="text-xl font-display text-content-primary">142</p>
              <p class="text-xs text-content-tertiary">Projects</p>
            </div>
            <div>
              <p class="text-xl font-display text-content-primary">3.2k</p>
              <p class="text-xs text-content-tertiary">Followers</p>
            </div>
            <div>
              <p class="text-xl font-display text-content-primary">98%</p>
              <p class="text-xs text-content-tertiary">Response</p>
            </div>
          </div>
        </div>
      </div>
    </PreviewBox>
  </section>
</template>
