<template>
  <div class="max-w-5xl mx-auto px-4 py-10">
    <div class="mb-8">
      <h1 class="text-3xl font-bold tracking-tight">
        {{ $t('pages.contact.title') }}
      </h1>
      <p class="text-gray-600 mt-2">
        {{ $t('pages.contact.subtitle') }}
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Contact Form -->
      <div class="bg-white rounded-2xl shadow-sm border p-6">
        <h2 class="text-xl font-semibold mb-4">
          {{ $t('pages.contact.form.title') }}
        </h2>

        <form class="space-y-4" @submit.prevent="submit">
          <div>
            <label class="block text-sm font-medium mb-1">
              {{ $t('pages.contact.form.name') }}
            </label>
            <input
              v-model="form.name"
              type="text"
              class="w-full rounded-xl border px-3 py-2"
              :placeholder="$t('pages.contact.form.name_ph')"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">
              {{ $t('pages.contact.form.email') }}
            </label>
            <input
              v-model="form.email"
              type="email"
              class="w-full rounded-xl border px-3 py-2"
              :placeholder="$t('pages.contact.form.email_ph')"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">
              {{ $t('pages.contact.form.subject') }}
            </label>
            <input
              v-model="form.subject"
              type="text"
              class="w-full rounded-xl border px-3 py-2"
              :placeholder="$t('pages.contact.form.subject_ph')"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">
              {{ $t('pages.contact.form.message') }}
            </label>
            <textarea
              v-model="form.message"
              rows="5"
              class="w-full rounded-xl border px-3 py-2"
              :placeholder="$t('pages.contact.form.message_ph')"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            class="w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-white rounded-xl px-6 py-2 font-semibold transition"
            :disabled="loading"
          >
            {{ loading ? $t('pages.contact.form.sending') : $t('pages.contact.form.send') }}
          </button>

          <p v-if="success" class="text-green-600 text-sm mt-2">
            {{ $t('pages.contact.form.success') }}
          </p>
        </form>
      </div>

      <!-- Contact Info -->
      <div class="bg-white rounded-2xl shadow-sm border p-6 space-y-5">
        <h2 class="text-xl font-semibold">
          {{ $t('pages.contact.info.title') }}
        </h2>

        <div class="space-y-3 text-gray-700">
          <div>
            <div class="text-sm text-gray-500">
              {{ $t('pages.contact.info.email_label') }}
            </div>
            <div class="font-medium">support@pin-code.com</div>
          </div>

          <div>
            <div class="text-sm text-gray-500">
              {{ $t('pages.contact.info.whatsapp_label') }}
            </div>
            <div class="font-medium">+971 50 442 9045</div>
          </div>

          <div>
            <div class="text-sm text-gray-500">
              {{ $t('pages.contact.info.hours_label') }}
            </div>
            <div class="font-medium">
              {{ $t('pages.contact.info.hours_value') }}
            </div>
          </div>
        </div>

        <div class="rounded-xl bg-orange-50 border border-orange-100 p-4 text-sm text-orange-900">
          {{ $t('pages.contact.info.note') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const { t, locale } = useI18n()
const config = useRuntimeConfig()

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const loading = ref(false)
const success = ref(false)

async function submit() {
  loading.value = true
  success.value = false
  await new Promise(r => setTimeout(r, 500))
  success.value = true
  Object.assign(form, { name: '', email: '', subject: '', message: '' })
  loading.value = false
}

const siteUrl = config.public.siteUrl || 'https://pin-code.com'
const pageUrl = computed(() => {
  const prefix = locale.value === 'en' ? '' : `${locale.value}/`
  return `${siteUrl}/${prefix}contact-us`
})

const contactSchema = computed(() => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": t("pages.contact.seo.title"),
  "description": t("pages.contact.seo.description"),
  "url": pageUrl.value,
  "inLanguage": locale.value,
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "support@pin-code.com",
    "telephone": "+971504429045",
    "availableLanguage": ["en", "tr", "ar"]
  }
}))

useHead({
  title: t('pages.contact.seo.title'),
  meta: [
    { name: 'description', content: t('pages.contact.seo.description') },
    { property: 'og:title', content: t('pages.contact.seo.title') },
    { property: 'og:description', content: t('pages.contact.seo.description') },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: pageUrl.value }
  ],
  link: [
    { rel: 'canonical', href: pageUrl.value }
  ],
  script: [
    {
      id: 'contact-jsonld',
      type: 'application/ld+json',
      innerHTML: JSON.stringify(contactSchema.value)
    }
  ],
  __dangerouslyDisableSanitizersByTagID: {
    'contact-jsonld': ['innerHTML']
  }
})
</script>
