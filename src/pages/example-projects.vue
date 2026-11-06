<script lang="ts">
import { HomeLayout } from '@/components/layouts/home'
import { CollectionTemplate } from '@/components/templates/collection-template'
</script>

<script setup lang="ts">
const greeting = 'hello world'
</script>

<template>
  <HomeLayout class="font-sans">
    <CollectionTemplate
      :title="greeting"
      tagline="My name is Triska, a tofu maker who interested in software engineering and open source."
    >
      <div class="[grid-area:main] h-[100rem] size-full">
        <h1>{{ greeting }}</h1>
      </div>
    </CollectionTemplate>
  </HomeLayout>
</template>
