<template>
  <div class="max-w-4xl mx-auto px-4 py-10 sm:py-16">
    <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-gray-900">
      {{ $t('pages.terms.title') }}
    </h1>
    <p class="text-gray-600 mb-10 text-lg border-b border-gray-100 pb-8">
      {{ $t('pages.terms.subtitle') }}
    </p>

    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-10 space-y-10 text-gray-700 leading-relaxed">
      <section>
        <h2 class="text-xl font-bold text-[#0e5e6f] mb-3">{{ $t('pages.terms.sections.s1.title') }}</h2>
        <p>{{ $t('pages.terms.sections.s1.body') }}</p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-[#0e5e6f] mb-3">{{ $t('pages.terms.sections.s2.title') }}</h2>
        <p>{{ $t('pages.terms.sections.s2.body') }}</p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-[#0e5e6f] mb-3">{{ $t('pages.terms.sections.s3.title') }}</h2>
        <p>{{ $t('pages.terms.sections.s3.body') }}</p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-[#0e5e6f] mb-3">{{ $t('pages.terms.sections.s4.title') }}</h2>
        <p>{{ $t('pages.terms.sections.s4.body') }}</p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-[#0e5e6f] mb-3">{{ $t('pages.terms.sections.s5.title') }}</h2>
        <p>{{ $t('pages.terms.sections.s5.body') }}</p>
      </section>
    </div>
  </div>
</template>

<script setup>
const { t, locale } = useI18n()
const config = useRuntimeConfig()

const siteUrl = config.public.siteUrl || 'https://pin-code.com'
const pageUrl = computed(() => {
  const prefix = locale.value === 'en' ? '' : `${locale.value}/`
  return `${siteUrl}/${prefix}terms-conditions`
})

const termsSchema = computed(() => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": t("pages.terms.seo.title"),
  "description": t("pages.terms.seo.description"),
  "url": pageUrl.value,
  "inLanguage": locale.value,
  "isPartOf": {
    "@type": "WebSite",
    "name": "PIN Code Platform",
    "url": siteUrl
  }
}))

useHead({
  title: t('pages.terms.seo.title'),
  meta: [
    { name: 'description', content: t('pages.terms.seo.description') },
    { property: 'og:title', content: t('pages.terms.seo.title') },
    { property: 'og:description', content: t('pages.terms.seo.description') },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: pageUrl.value }
  ],
  link: [
    { rel: 'canonical', href: pageUrl.value }
  ],
  script: [
    {
      id: 'terms-jsonld',
      type: 'application/ld+json',
      innerHTML: JSON.stringify(termsSchema.value)
    }
  ],
  __dangerouslyDisableSanitizersByTagID: {
    'terms-jsonld': ['innerHTML']
  }
})
</script>