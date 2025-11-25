<template>
  <div class="max-w-5xl mx-auto px-4 py-10 sm:py-16">
    <div class="mb-10 text-center sm:text-left">
      <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
        {{ $t('pages.about.title') }}
      </h1>
      <div class="h-1.5 w-24 bg-gradient-to-r from-[#0e5e6f] to-[#3adbc4] mt-4 rounded-full mx-auto sm:mx-0"></div>
      <p class="text-gray-600 mt-4 text-lg max-w-2xl">
        {{ $t('pages.about.subtitle') }}
      </p>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-10 space-y-8">
      <div class="prose max-w-none text-gray-700 leading-relaxed">
        <p class="text-lg">
          {{ $t('pages.about.body.p1') }}
        </p>
        <p>
          {{ $t('pages.about.body.p2') }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <!-- Card 1 -->
        <div class="rounded-2xl border border-gray-200 p-6 hover:shadow-md hover:border-[#3adbc4]/50 transition-all duration-300 group">
          <div class="w-12 h-12 rounded-xl bg-[#f0fdfc] flex items-center justify-center mb-4 group-hover:bg-[#0e5e6f] transition-colors">
            <svg class="w-6 h-6 text-[#0e5e6f] group-hover:text-[#3adbc4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <div class="text-[#0e5e6f] font-bold text-xl mb-2">
            {{ $t('pages.about.cards.fast.title') }}
          </div>
          <div class="text-gray-600 text-sm leading-relaxed">
            {{ $t('pages.about.cards.fast.desc') }}
          </div>
        </div>

        <!-- Card 2 -->
        <div class="rounded-2xl border border-gray-200 p-6 hover:shadow-md hover:border-[#3adbc4]/50 transition-all duration-300 group">
          <div class="w-12 h-12 rounded-xl bg-[#f0fdfc] flex items-center justify-center mb-4 group-hover:bg-[#0e5e6f] transition-colors">
             <svg class="w-6 h-6 text-[#0e5e6f] group-hover:text-[#3adbc4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div class="text-[#0e5e6f] font-bold text-xl mb-2">
            {{ $t('pages.about.cards.accurate.title') }}
          </div>
          <div class="text-gray-600 text-sm leading-relaxed">
            {{ $t('pages.about.cards.accurate.desc') }}
          </div>
        </div>

        <!-- Card 3 -->
        <div class="rounded-2xl border border-gray-200 p-6 hover:shadow-md hover:border-[#3adbc4]/50 transition-all duration-300 group">
           <div class="w-12 h-12 rounded-xl bg-[#f0fdfc] flex items-center justify-center mb-4 group-hover:bg-[#0e5e6f] transition-colors">
            <svg class="w-6 h-6 text-[#0e5e6f] group-hover:text-[#3adbc4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          </div>
          <div class="text-[#0e5e6f] font-bold text-xl mb-2">
            {{ $t('pages.about.cards.support.title') }}
          </div>
          <div class="text-gray-600 text-sm leading-relaxed">
            {{ $t('pages.about.cards.support.desc') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t, locale } = useI18n()
const config = useRuntimeConfig()

const siteUrl = config.public.siteUrl || 'https://pin-code.com'
const pageUrl = computed(() => {
  const prefix = locale.value === 'en' ? '' : `${locale.value}/`
  return `${siteUrl}/${prefix}about-us`
})

const aboutSchema = computed(() => ({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": t("pages.about.seo.title"),
  "description": t("pages.about.seo.description"),
  "url": pageUrl.value,
  "inLanguage": locale.value,
  "isPartOf": {
    "@type": "WebSite",
    "name": "PIN Code Platform",
    "url": siteUrl
  }
}))

useHead({
  title: t('pages.about.seo.title'),
  meta: [
    { name: 'description', content: t('pages.about.seo.description') },
    { property: 'og:title', content: t('pages.about.seo.title') },
    { property: 'og:description', content: t('pages.about.seo.description') },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: pageUrl.value }
  ],
  link: [
    { rel: 'canonical', href: pageUrl.value }
  ],
  script: [
    {
      id: 'about-jsonld',
      type: 'application/ld+json',
      innerHTML: JSON.stringify(aboutSchema.value)
    }
  ],
  __dangerouslyDisableSanitizersByTagID: {
    'about-jsonld': ['innerHTML']
  }
})
</script>