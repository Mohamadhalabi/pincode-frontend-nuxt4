
<template>
  <div class="card overflow-hidden hover:shadow-md transition">
    <img :src="imageUrl || fallback" alt="" class="h-40 w-full object-cover">
    <div class="p-4 space-y-2">
      <div class="flex items-center justify-between">
        <h3 class="font-semibold">{{ category.name }}</h3>
        <span v-if="category.cost_tokens" class="pill bg-brand/10 text-brand">{{ category.cost_tokens }} token(s)</span>
      </div>
      <p class="text-sm text-gray-600">Behavior: {{ category.behavior }}</p>
      <NuxtLinkLocale class="btn w-full" :to="`/categories/${category.id}`">Open</NuxtLinkLocale>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ category: any }>()
const fallback = 'https://dummyimage.com/600x400/e5e7eb/111827&text=Category'
const imageUrl = computed(()=> (typeof (useAttrs().category?.image_url) === 'string' ? (useAttrs().category as any).image_url : null))
</script>
