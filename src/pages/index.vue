<script setup lang="ts"></script>

<template>
  <DefaultLayout>
    <div
      class="grow w-full max-w-7xl flex flex-col items-center justify-center gap-4 mx-auto px-4 sm:px-6 lg:px-8"
    >
      <h1>Greetings from index</h1>

      <div class="flex flex-wrap items-center justify-center gap-2">
        <Button color="stone" size="md" variant="outline" square>
          <i-lucide-search />
        </Button>
        <Link to="/posts"> Posts </Link>
      </div>
    </div>
  </DefaultLayout>
</template>
