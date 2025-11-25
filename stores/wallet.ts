
import { defineStore } from 'pinia'
export const useWalletStore = defineStore('wallet', {
  state: () => ({
    categoryBalances: [] as Array<{service_category_id:number; category_name:string; balance_tokens:number}>
  }),
  actions: {
    setBalances(list:any[]){ this.categoryBalances = list }
  }
})
