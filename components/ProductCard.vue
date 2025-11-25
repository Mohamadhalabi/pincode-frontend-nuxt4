<template>
  <div class="group overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-md transition">
    <NuxtLink :to="`/product/${p.slug}`" class="block aspect-[4/3] bg-gray-50">
      <NuxtImg
        v-if="p?.image"
        :src="p.image"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        :modifiers="{ fit: 'cover' }"
        class="h-full w-full object-cover"
        alt=""
      />
    </NuxtLink>

    <div class="p-4">
      <NuxtLink :to="`/product/${p.slug}`" class="line-clamp-2 font-medium hover:underline">
        {{ p.name }}
      </NuxtLink>

      <div class="mt-2 flex items-center gap-2 text-xs">
        <span v-if="p?.tokens" class="rounded-full border px-2 py-0.5 text-gray-700">
          <span class="i-lucide:key mr-1 text-[13px]"></span>{{ p.tokens }} tokens
        </span>
        <span v-if="p?.sku" class="rounded-full bg-gray-100 px-2 py-0.5 text-gray-700">SKU: {{ p.sku }}</span>
      </div>

      <div class="mt-3 flex items-center justify-between">
        <div class="text-lg font-semibold">
          <span v-if="p?.sale_price_usd" class="mr-2 text-red-600">${{ fmt(p.sale_price_usd) }}</span>
          <span :class="p?.sale_price_usd ? 'line-through text-gray-400 text-sm' : ''">
            ${{ fmt(p.unit_price ?? p.price_usd) }}
          </span>
        </div>
        <button class="rounded-xl bg-orange-500 px-3 py-1.5 text-white text-sm hover:bg-orange-600"
                @click="$emit('add', p)">
          Add to cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ p: any }>()
const fmt = (n:any) => Number(n || 0).toFixed(2)
</script>
