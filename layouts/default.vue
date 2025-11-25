<script setup lang="ts">
// import AppHeader from '../layout/AppHeader.vue'
import AppHeader from './AppHeader.vue';
import AddedToast from '@/components/AddedToast.vue'

const toast = useState('added-toast', () => ({
  open: false, img: null as string | null, title: '', sku: null as string | null,
}))
</script>

<template>
  <div class="min-h-dvh flex flex-col bg-white">
    <!-- Site Header -->
    <AppHeader />

    <!-- Page content -->
    <main class="mx-auto w-full max-w-6xl px-4 py-6 flex-1">
      <AddedToast v-model:open="toast.open" :img="toast.img" :title="toast.title" :sku="toast.sku" />
      <slot />
    </main>
      <Footer />
  </div>
</template>
