<script setup lang="ts">
defineProps<{
  offer: {
    id: number
    title: string
    badge?: string
    price: number
    compareAt?: number
    bullets?: string[]
    href?: string
  }
}>()

const fmt = (n: number) =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(n)
</script>

<template>
  <div class="bg-white rounded-card shadow-card p-5 flex flex-col">
    <div class="flex items-center gap-2">
      <span v-if="offer.badge" class="text-xs font-semibold text-orange-600">{{ offer.badge }}</span>
      <h3 class="text-xl font-semibold">{{ offer.title }}</h3>
    </div>

    <ul class="mt-4 space-y-2 text-gray-700">
      <li v-for="(b, i) in (offer.bullets || [])" :key="i" class="flex gap-2">
        <span class="mt-1 h-2 w-2 rounded-full bg-blue-500"></span>
        <span>{{ b }}</span>
      </li>
    </ul>

    <div class="mt-5 pt-4 border-t">
      <div class="text-3xl font-extrabold text-brand">{{ fmt(offer.price) }}</div>
      <div v-if="offer.compareAt" class="text-sm text-gray-500 line-through">
        {{ fmt(offer.compareAt) }}
      </div>
      <NuxtLink :to="offer.href || '/offers'" class="btn-primary mt-4 w-full">Buy Now</NuxtLink>
    </div>
  </div>
</template>
