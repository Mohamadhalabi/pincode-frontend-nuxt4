export default defineEventHandler((event) => {
  const { lang = 'en' } = getQuery(event)
  const map: Record<string, any> = {
    en: { headline: 'Why choose our PIN Code platform?', image: '/hero-fallback.jpg' },
    ar: { headline: 'لماذا تختار منصّة PIN Code؟', image: '/hero-fallback.jpg' }
  }
  return map[lang as string] || map.en
})
