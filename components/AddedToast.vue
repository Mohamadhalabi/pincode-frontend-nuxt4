<template>
  <transition name="fade">
    <div v-if="open" class="fixed right-4 bottom-4 z-50 w-[320px] rounded-xl border bg-white shadow-lg p-3 flex gap-3">
      <NuxtImg v-if="img" :src="img" class="w-14 h-14 rounded-lg object-cover bg-gray-100" alt="" />
      <div class="flex-1">
        <p class="text-sm text-gray-700">
          <span class="font-medium">{{ title }}</span>
          <span class="text-gray-500" v-if="sku"> · {{ sku }}</span>
        </p>
        <p class="text-emerald-700 text-sm mt-0.5">Added to cart</p>
      </div>
      <button class="text-gray-400 hover:text-gray-600" @click="open=false">✕</button>
    </div>
  </transition>
</template>

<script setup lang="ts">
const open = defineModel<boolean>('open', { required: true })
defineProps<{ img?: string|null; title: string; sku?: string|null }>()
</script>

<style>
.fade-enter-active,.fade-leave-active{ transition: opacity .18s ease }
.fade-enter-from,.fade-leave-to{ opacity:0 }
</style>
