<script setup>
import SectionHeader from '../ui/SectionHeader.vue'

const columns = ['User', 'Role', 'Status', 'Last active', 'Actions']

const tableRows = [
  {
    name: 'Alex Kim',
    email: 'alex@co.io',
    role: 'Admin',
    lastActive: 'Just now',
    avatar: { initials: 'AK', colors: 'bg-primary-subtle text-green-700 dark:text-green-400' },
    status: { label: 'Active', dot: 'bg-green-500', cls: 'bg-status-success-surface text-green-700 dark:text-green-400 border-status-success-edge' },
  },
  {
    name: 'Jordan Davis',
    email: 'jordan@co.io',
    role: 'Member',
    lastActive: '3h ago',
    avatar: { initials: 'JD', colors: 'bg-secondary-subtle text-blue-700 dark:text-blue-400' },
    status: { label: 'Active', dot: 'bg-green-500', cls: 'bg-status-success-surface text-green-700 dark:text-green-400 border-status-success-edge' },
  },
  {
    name: 'Morgan Reed',
    email: 'morgan@co.io',
    role: 'Viewer',
    lastActive: '2 days ago',
    avatar: { initials: 'MR', colors: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400' },
    status: { label: 'Away', dot: 'bg-amber-500', cls: 'bg-status-warning-surface text-amber-700 dark:text-amber-400 border-status-warning-edge' },
  },
  {
    name: 'Taylor Soto',
    email: 'taylor@co.io',
    role: 'Member',
    lastActive: '14 days ago',
    avatar: { initials: 'TS', colors: 'bg-surface-overlay text-content-tertiary' },
    status: { label: 'Inactive', dot: 'bg-red-500', cls: 'bg-status-error-surface text-red-700 dark:text-red-400 border-status-error-edge' },
  },
]
</script>

<template>
  <section>
    <SectionHeader title="Tables" section-id="tables">
      Use for structured, comparable data with multiple attributes per row
      (user lists, transaction history, API keys, inventory).
      Avoid for single-column lists — use a list component instead.
      Combine with badges, avatars, and action buttons directly in cells.
    </SectionHeader>

    <div class="overflow-x-auto border border-edge-subtle rounded-xl shadow-xs">
      <table class="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col"
                class="bg-surface-sunken px-4 py-3 text-left text-[11px] font-semibold
                       tracking-widest uppercase text-content-tertiary
                       border-b border-edge">
              {{ col }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in tableRows" :key="row.name"
              class="border-b border-edge-subtle last:border-b-0 transition-colors duration-100 hover:bg-surface-sunken" >

            <!-- User -->
            <td class="px-4 py-3">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ring-2 ring-surface-raised" :class="[row.avatar.colors]">
                  {{ row.avatar.initials }}
                </div>
                <div>
                  <p class="font-medium text-content-primary">{{ row.name }}</p>
                  <p class="text-xs text-content-tertiary">{{ row.email }}</p>
                </div>
              </div>
            </td>

            <!-- Role -->
            <td class="px-4 py-3">
              <span class="inline-flex items-center h-[22px] px-2.5 rounded-full text-xs font-semibold border
                           bg-surface-overlay text-content-secondary border-edge">
                {{ row.role }}
              </span>
            </td>

            <!-- Status -->
            <td class="px-4 py-3">
              <span class="inline-flex items-center gap-1.5 h-[22px] px-2.5 rounded-full text-xs font-semibold border" :class="[row.status.cls]">
                <span class="w-1.5 h-1.5 rounded-full shrink-0" :class="[row.status.dot]"></span>
                {{ row.status.label }}
              </span>
            </td>

            <!-- Last active -->
            <td class="px-4 py-3 text-xs text-content-secondary">{{ row.lastActive }}</td>

            <!-- Actions -->
            <td class="px-4 py-3">
              <div class="flex gap-1">
                <button class="h-7 px-2.5 text-xs font-medium rounded border border-transparent
                               text-content-secondary transition-colors duration-150
                               hover:bg-surface-overlay hover:text-content-primary">
                  Edit
                </button>
                <button class="h-7 px-2.5 text-xs font-medium rounded border border-transparent
                               text-red-500 transition-colors duration-150
                               hover:bg-status-error-surface hover:text-red-600">
                  Remove
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Table footer -->
    <div class="flex items-center justify-between pt-3 pb-12">
      <p class="text-xs text-content-tertiary">Showing {{ tableRows.length }} of {{ tableRows.length }} users</p>
      <div class="flex gap-1">
        <button class="h-8 px-3 text-xs font-medium rounded border border-edge
                       bg-transparent text-content-secondary transition-colors duration-150
                       hover:bg-surface-overlay hover:text-content-primary disabled:opacity-40"
                disabled>
          ← Previous
        </button>
        <button class="h-8 px-3 text-xs font-medium rounded border border-edge
                       bg-transparent text-content-secondary transition-colors duration-150
                       hover:bg-surface-overlay hover:text-content-primary">
          Next →
        </button>
      </div>
    </div>
  </section>
</template>
