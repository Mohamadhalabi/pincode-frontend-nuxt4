// stores/cart.ts
import { defineStore } from 'pinia'
export const useCartStore = defineStore('cart', {
  state: () => ({ items: [] as Array<{ id:number; title:string; price:number; qty:number; image?:string }> }),
  persist: true,              // ← this line
  getters: {
    count: (s) => s.items.reduce((a, i) => a + i.qty, 0),
    subtotal: (s) => s.items.reduce((a, i) => a + i.price * i.qty, 0),
  },
  actions: { /* ... */ }
})
