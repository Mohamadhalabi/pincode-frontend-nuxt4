<template>
  <footer class="bg-gray-50 pt-16 pb-8 mt-20 border-t border-gray-200">
    <div class="container mx-auto px-6 max-w-7xl">

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">

        <div class="space-y-6">
          <NuxtLinkLocale to="/" class="block">
            <NuxtImg
              src="/img/logo/3.webp"
              alt="4Pincode"
              class="h-12 w-auto object-contain"
              format="webp"
            />
          </NuxtLinkLocale>

          <div>
            <p class="text-sm text-gray-500 mb-1">
              {{ $t('footer.questions') }}
            </p>
            <a href="tel:+447414902439" class="text-xl font-bold text-[#0e5e6f] hover:text-[#3adbc4] transition-colors" dir="ltr">
              +44 7414 902439
            </a>
          </div>

          <div class="text-sm text-gray-600 space-y-1">
            <p class="font-semibold text-gray-900">{{ $t('footer.contactInfo') }}</p>
            <p>{{ $t('footer.companyName') }}</p>
            <a href="mailto:support@4pincode.com" class="text-[#0e5e6f] hover:text-[#3adbc4] transition-colors font-medium">
              support@4pincode.com
            </a>
          </div>

          <div class="flex items-center gap-4">
            <a 
              href="https://wa.me/447414902439" 
              target="_blank" 
              rel="noopener noreferrer"
              class="social-icon" 
              aria-label="WhatsApp"
            >
              <i class="ri-whatsapp-line"></i>
            </a>
          </div>
        </div>

        <div>
          <h4 class="font-bold text-[#0e5e6f] text-lg mb-5">{{ $t('footer.products') }}</h4>
          <ul class="space-y-3 text-sm font-medium text-gray-600">
            <li><NuxtLinkLocale to="/product/kia-hyundai-pincode-old" class="footer-link">{{ $t('footer.kiaOld') }}</NuxtLinkLocale></li>
            <li><NuxtLinkLocale to="/product/kia-hyundai-pincode-new" class="footer-link">{{ $t('footer.kiaNew') }}</NuxtLinkLocale></li>
            <li><NuxtLinkLocale to="/product/toyota-lexus-passcode" class="footer-link">{{ $t('footer.toyota') }}</NuxtLinkLocale></li>
            <li><NuxtLinkLocale to="/product/chinese-cars-pincode" class="footer-link">{{ $t('footer.chineseCars') }}</NuxtLinkLocale></li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-[#0e5e6f] text-lg mb-5">{{ $t('footer.calculators') }}</h4>
          <ul class="space-y-3 text-sm font-medium text-gray-600">
            <li><NuxtLinkLocale to="/services/kia-hyundai-before-2017" class="footer-link">{{ $t('footer.kiaOld') }}</NuxtLinkLocale></li>
            <li><NuxtLinkLocale to="/services/kia-hyundai-after-2017" class="footer-link">{{ $t('footer.kiaNew') }}</NuxtLinkLocale></li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-[#0e5e6f] text-lg mb-5">{{ $t('footer.support') }}</h4>
          <ul class="space-y-3 text-sm font-medium text-gray-600">
            <li><NuxtLinkLocale to="/" class="footer-link">{{ $t('footer.home') }}</NuxtLinkLocale></li>
            <li><NuxtLinkLocale to="/contact-us" class="footer-link">{{ $t('footer.contactUs') }}</NuxtLinkLocale></li>
            <li><NuxtLinkLocale to="/about-us" class="footer-link">{{ $t('footer.aboutUs') }}</NuxtLinkLocale></li>
            <li><NuxtLinkLocale to="/privacy-policy" class="footer-link">{{ $t('footer.privacy') }}</NuxtLinkLocale></li>
            <li><NuxtLinkLocale to="/terms-conditions" class="footer-link">{{ $t('footer.terms') }}</NuxtLinkLocale></li>
            <li><NuxtLinkLocale to="/faq" class="footer-link">{{ $t('footer.faq') }}</NuxtLinkLocale></li>
          </ul>
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-gray-200">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-sm text-gray-500">
            © {{ new Date().getFullYear() }} 4Pincode. {{ $t('footer.rights') }}
          </p>
          <div class="flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
              <i class="ri-coin-line text-2xl" title="USDT"></i> 
              <i class="ri-paypal-line text-2xl" title="PayPal"></i>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css");

/* Link Hover Effect */
.footer-link {
  @apply hover:text-[#0e5e6f] hover:pl-1 transition-all duration-200 block;
}

/* Social Icon Button Style */
.social-icon {
  @apply w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-500 flex items-center justify-center transition-all duration-200 text-lg;
}

.social-icon:hover {
  @apply bg-[#25D366] text-white border-[#25D366] -translate-y-1 shadow-md; /* Changed hover color to WhatsApp Green */
}
</style>