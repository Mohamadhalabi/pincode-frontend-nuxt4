<script setup lang="ts">
defineProps<{ calc: { id: number; title: string; description?: string; href?: string } }>()
</script>

<template>
  <NuxtLinkLocale
    :to="calc.href || '/calculators/' + calc.id"
    class="block bg-white rounded-card shadow-card p-4 hover:shadow-lg transition"
  >
    <div class="text-lg font-semibold">{{ calc.title }}</div>
    <p v-if="calc.description" class="text-gray-600 mt-1 line-clamp-2">{{ calc.description }}</p>
    
    <div class="mt-3 text-sm font-medium text-brand">{{ $t('product.details') }}</div>
  </NuxtLinkLocale>
</template>