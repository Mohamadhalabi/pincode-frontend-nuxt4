<script setup lang="ts">
defineProps<{ title: string; subtitle?: string }>()
</script>

<template>
  <div class="mb-4">
    <h2 class="text-2xl font-bold">{{ title }}</h2>
    <p v-if="subtitle" class="text-gray-600">{{ subtitle }}</p>
  </div>
</template>
