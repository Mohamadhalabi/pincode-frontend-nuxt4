// nuxt.config.ts
import { fileURLToPath } from 'url'

const vueI18nConfigPath = fileURLToPath(new URL('./i18n.config.ts', import.meta.url))

export default defineNuxtConfig({
  compatibilityDate: '2025-11-05',
  devServer: { host: '127.0.0.1', port: 3000 },
  ssr: true,
    sourcemap: {      // <--- Add this block
        server: false,
        client: false
      },
    
      vite: {           // <--- Add this block
        build: {
          sourcemap: false,
          cssCodeSplit: false // Optional: helps reduce memory usage further
        }
      },
  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    '@vite-pwa/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],

  // ✅ 1. GLOBAL SITE CONFIG
  // We hardcode the production URL here to ensure Canonical/Hreflang 
  // are generated correctly even when you are testing on Localhost.
  site: {
    url: 'https://www.4pincode.com',
    name: '4PinCode',
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  image: {
    domains: ['pincode-backend.tlkeys.com'],
  },

  // ✅ 2. I18N CONFIG (Fixes Hreflangs)
i18n: {
    baseUrl: 'https://www.4pincode.com', 
    vueI18n: vueI18nConfigPath,
    locales: [
      // CHANGE 'iso' to match the simple code if you want hreflang="en"
      { code: 'en', iso: 'en', name: 'English', dir: 'ltr' },
      { code: 'ar', iso: 'ar', name: 'العربية', dir: 'rtl' } 
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    },
    // This tells the module: "You handle the SEO tags, I won't do it manually"
    bundle: { optimizeTranslationDirective: false }
  },

  // ✅ 3. ROBOTS CONFIG (Fixes Indexing)
  robots: {
    // This forces the module to generate "index, follow" rules
    // Note: Localhost might still show 'noindex' in headers as a safety feature,
    // but this config ensures Production is correct.
    indexable: true,
    disallow: [] 
  },

  // ✅ 4. SITEMAP
  sitemap: {
    xsl: false, 
  },

  nitro: {
    routeRules: {
      // This tells the server to fetch these routes from the local app itself if needed
      '/api/**': { proxy: 'http://localhost:3001/api/**' } 
    }
  },

  // ✅ 5. HEAD & FAVICONS
  app: {
    head: {
      titleTemplate: '%s - 4PinCode',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        // REMOVED: { name: 'robots', ... } -> The @nuxtjs/robots module handles this now.
        // Keeping it here caused the conflict/duplicates.
        
        // Android / PWA theme color
        { name: 'theme-color', content: '#ffffff' }
      ],
      link: [
        // Standard Favicon
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        
        // Apple Touch Icon
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        
        // Manifest
        { rel: 'manifest', href: '/site.webmanifest' }
      ],
      script: [
        {
          id: 'org-jsonld',
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "4PinCode",
            "url": "https://4pincode.com",
            "logo": "https://4pincode.com/android-chrome-512x512.png", // Updated to use your larger icon
            "email": "support@4pincode.com",
            "telephone": "+447414902439",
            "sameAs": [
              "https://facebook.com/yourpage",
              "https://instagram.com/yourpage",
              "https://wa.me/447414902439"
            ],
            "contactPoint": [{
              "@type": "ContactPoint",
              "contactType": "customer support",
              "email": "support@4pincode.com",
              "telephone": "+447414902439",
              "availableLanguage": ["en", "ar"]
            }]
          })
        },
        {
          id: 'website-jsonld',
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "4PinCode",
            "url": "https://4pincode.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://4pincode.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }
      ],
      __dangerouslyDisableSanitizersByTagID: {
        'org-jsonld': ['innerHTML'],
        'website-jsonld': ['innerHTML']
      }
    }
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE,
      usdtWallet: process.env.USDT_WALLET || '',
      whatsappNumber: process.env.WHATSAPP_NUMBER || '',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://4pincode.com',
      siteName: process.env.NUXT_PUBLIC_SITE_NAME
    }
  }
})