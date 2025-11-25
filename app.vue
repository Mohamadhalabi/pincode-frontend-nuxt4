<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale, locales } = useI18n()
const current = computed(() => (locales.value as any[]).find(l => l.code === locale.value))
const dir = computed(() => current.value?.dir || 'ltr')

useHead({
  htmlAttrs: {
    lang: () => locale.value,
    dir: () => dir.value
  }
})
</script>

<template>
  <div class="min-h-screen bg-white text-gray-900">
      <NuxtLoadingIndicator :height="8" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
