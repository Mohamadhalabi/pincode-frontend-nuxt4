
<template>
  <span class="pill bg-gray-100">
    <span class="w-2 h-2 rounded-full" :class="dot"></span>
    <span>{{ label }}: <b>{{ tokens }}</b></span>
  </span>
</template>
<script setup lang="ts">
const props = defineProps<{ label: string; tokens: number }>()
const dot = computed(()=> props.tokens>0 ? 'bg-emerald-500' : 'bg-gray-400')
</script>
