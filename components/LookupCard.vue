
<template>
  <div class="card p-4 space-y-2">
    <div class="flex items-center justify-between">
      <div class="font-medium">{{ item.category_name }}</div>
      <span class="pill" :class="statusClass">{{ item.status }}</span>
    </div>
    <div class="text-xs text-gray-500">#{{ item.id }} · {{ new Date(item.created_at).toLocaleString() }}</div>
    <pre class="text-xs bg-gray-50 rounded-xl p-2 overflow-auto" v-if="item.result_payload">{{ JSON.stringify(item.result_payload, null, 2) }}</pre>
    <div class="text-xs" v-if="item.error_message"><span class="text-red-600">Error:</span> {{ item.error_message }}</div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{ item: any }>();
const statusClass = computed(() => ({
  'bg-gray-100': props.item.status==='pending',
  'bg-green-100 text-green-700': props.item.status==='done',
  'bg-red-100 text-red-700': props.item.status==='failed',
}))
</script>
