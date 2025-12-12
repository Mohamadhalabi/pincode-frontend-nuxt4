// nuxt.config.ts
import { fileURLToPath } from 'url'

const vueI18nConfigPath = fileURLToPath(new URL('./i18n.config.ts', import.meta.url))

export default defineNuxtConfig({
  compatibilityDate: '2025-11-05',
  devServer: { host: '127.0.0.1', port: 3000 },
  ssr: true,
  
  sourcemap: {
    server: false,
    client: false
  },

  vite: {
    build: {
      sourcemap: false,
      cssCodeSplit: false
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

  // ✅ 2. I18N CONFIG
  i18n: {
    baseUrl: 'https://www.4pincode.com',
    vueI18n: vueI18nConfigPath,
    locales: [
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
    bundle: { optimizeTranslationDirective: false }
  },

  // ✅ 3. ROBOTS CONFIG
  robots: {
    indexable: true,
    disallow: []
  },

  // ✅ 4. SITEMAP
  sitemap: {
    xsl: false,
  },

  nitro: {
    routeRules: {
      '/api/**': { proxy: 'http://localhost:3001/api/**' }
    }
  },

  // ✅ 5. HEAD, ANALYTICS & SEO
  app: {
    head: {
      titleTemplate: '%s - 4PinCode',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#ffffff' },

        // --- GOOGLE SEARCH CONSOLE VERIFICATION ---
        // Paste your verification code inside content=""
        { name: 'google-site-verification', content: '9b2lCKOdEzfiqnIq7JkYXMxAIS0KG2JgfON_Nxcqvhk' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ],
      script: [
        // --- GOOGLE ANALYTICS (GA4) START ---
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-ECRYKVGBBM', // REPLACE G-XXXXXXXXXX
          async: true
        },
        {
          children: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ECRYKVGBBM'); // REPLACE G-XXXXXXXXXX
          `
        },
        // --- GOOGLE ANALYTICS END ---

        // --- STRUCTURED DATA (Safe Method using 'children') ---
        {
          id: 'org-jsonld',
          type: 'application/ld+json',
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "4PinCode",
            "url": "https://www.4pincode.com",
            "logo": "https://www.4pincode.com/android-chrome-512x512.png",
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
          children: JSON.stringify({
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
      ]
      // NOTE: __dangerouslyDisableSanitizersByTagID REMOVED to prevent crashes.
      // Using 'children' property above handles this safely now.
    }
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE,
      usdtWallet: process.env.USDT_WALLET || '',
      whatsappNumber: process.env.WHATSAPP_NUMBER || '',
      // Ensure this matches your actual domain to prevent redirect loops
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://4pincode.com',
      siteName: process.env.NUXT_PUBLIC_SITE_NAME
    }
  }
})