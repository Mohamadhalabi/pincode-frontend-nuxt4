// /composables/useAddedToast.ts
export function useAddedToast(){
  const s = useState('added-toast', () => ({ open:false, img:null as string|null, title:'', sku:null as string|null }))
  function show({ img, title, sku }:{img?:string|null; title:string; sku?:string|null}){
    s.value = { open: true, img: img||null, title, sku: sku||null }
    setTimeout(() => { s.value.open = false }, 2500)
  }
  return { show }
}
