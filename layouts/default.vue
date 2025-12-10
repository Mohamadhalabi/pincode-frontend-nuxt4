<script setup lang="ts">
// If AppHeader is in the layouts folder, this relative import is correct:
import AppHeader from './AppHeader.vue';

// Make sure AddedToast and Footer are available.
// If Footer is not auto-imported, uncomment the line below and adjust path:
// import Footer from '~/components/Footer.vue'
import AddedToast from '@/components/AddedToast.vue'

// Toast State
const toast = useState('added-toast', () => ({
  open: false,
  img: null as string | null,
  title: '',
  sku: null as string | null,
}))
</script>

<template>
  <div class="min-h-dvh flex flex-col bg-white">
    <AppHeader />

    <main class="mx-auto w-full max-w-6xl px-4 py-6 flex-1 relative">
      <slot />
    </main>

    <Footer />

    <AddedToast 
      v-model:open="toast.open" 
      :img="toast.img" 
      :title="toast.title" 
      :sku="toast.sku" 
    />
  </div>
</template>