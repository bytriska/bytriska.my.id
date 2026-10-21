<script lang="ts">
import { CircleIcon } from '@lucide/vue'
import { HomeLayout } from '@/components/layouts/home'
import { Button } from '@/components/ui/button'
</script>

<script setup lang="ts">
const greeting = 'hello world'
</script>

<template>
  <HomeLayout
    title="triska mahfud khoiri"
    tagline="Code, notes, and the random things I'm learning as I go along."
  >
    <div class="[grid-area:main] h-[100rem] size-full">
      <h1>{{ greeting }}</h1>
      <Button size="xs"> button </Button>
      <Button size="sm"> button </Button>
      <Button>button</Button>
      <Button size="lg"> button </Button>
      <Button size="bare" variant="plain"> button </Button>

      <div>
        <Button size="sm"> button </Button>

        <Button size="sm">
          <template #icon>
            <CircleIcon />
          </template>
          button
        </Button>

        <Button size="sm" trailing> button </Button>

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
