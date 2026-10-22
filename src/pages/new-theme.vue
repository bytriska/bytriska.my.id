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
    :title="greeting"
    tagline="im triska mahfud khoiri, a software engineer and open source enthusiast"
  >
    <div class="[grid-area:main] h-[100rem] size-full">
      <h1>{{ greeting }}</h1>
      <Button size="xs"> button </Button>
      <Button size="sm"> button </Button>
      <Button>button</Button>
      <Button size="lg"> button </Button>
      <Button unstyled> button </Button>

      <div>
        <Button size="sm"> button </Button>

        <Button size="sm" data-icon="inline-start">
          <CircleIcon />
          button
        </Button>

        <Button size="sm"> button </Button>

        <Button size="sm" data-icon="inline-end">
          button
          <CircleIcon class="size-4" />
        </Button>
      </div>
    </div>
  </HomeLayout>
</template>
