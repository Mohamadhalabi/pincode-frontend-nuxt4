export default defineEventHandler((event) => {
  const { lang = 'en' } = getQuery(event)
  const map = {
    en: { bestPack: { title: '100 Tokens', priceFormatted: '$49.00' } },
    ar: { bestPack: { title: '100 توكين', priceFormatted: '49.00$' } }
  }
  return map[lang as string] || map.en
})
