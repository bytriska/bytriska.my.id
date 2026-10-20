<script lang="ts">
import { CircleIcon } from '@lucide/vue'
import { HomeLayout } from '@/components/layouts/home'
import { Button } from '@/components/ui/button'
</script>

<script setup lang="ts">
const greeting = 'hello world'
</script>

<template>
  <HomeLayout>
    <div class="[grid-area:main] h-[100rem] size-full border border-teal-400">
      <h1>{{ greeting }}</h1>
      <Button size="xs"> button </Button>
      <Button size="sm"> button </Button>
      <Button>button</Button>
      <Button size="lg"> button </Button>
      <Button size="bare" variant="plain" class="border border-violet-500"> button </Button>

      <div class="border border-yellow-500">
        <Button size="sm"> button </Button>

        <Button size="sm" class="border border-red-500 my-0">
          <template #icon>
            <CircleIcon />
          </template>
          button
        </Button>

        <Button size="sm" class="border border-red-500 my-0" trailing> button </Button>

        <Button size="sm" data-icon="inline-end" trailing>
          <template #icon>
            <CircleIcon class="size-4" />
          </template>
          button
        </Button>
      </div>
    </div>
  </HomeLayout>
</template>
