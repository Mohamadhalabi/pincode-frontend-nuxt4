
<template>
  <div v-if="loggedIn" class="relative" @mouseleave="open=false">
    <button class="pill bg-gray-100" @mouseenter="open=true">
      <span class="i-heroicons-user-circle w-5 h-5"></span>
      <span>{{ me?.name || 'Account' }}</span>
    </button>
    <div v-show="open" class="absolute right-0 mt-2 w-56 card p-2">
      <div class="px-3 py-2 text-sm text-gray-600">Signed in as <b>{{ me?.email }}</b></div>
      <div class="h-px bg-gray-200 my-2"></div>
      <NuxtLink to="/lookups/new" class="block px-3 py-2 rounded-lg hover:bg-gray-50">New VIN Lookup</NuxtLink>
      <button class="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-red-600" @click="logout">Logout</button>
    </div>
  </div>
  <NuxtLink v-else class="btn" to="/login">Login</NuxtLink>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
const store = useAuthStore()
const open = ref(false)
const loggedIn = computed(()=> store.isAuthenticated)
const me = computed(()=> store.user)
const logout = () => store.logout()
</script>
<style scoped>
.i-heroicons-user-circle{display:inline-block;background:currentColor;mask:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 1 0 5.636 5.636a9 9 0 0 0 12.728 12.728ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Zm-11.036 9.536A7.5 7.5 0 0 1 12 15.75a7.5 7.5 0 0 1 7.286 5.786"/></svg>') no-repeat center/contain;width:20px;height:20px;}
</style>
