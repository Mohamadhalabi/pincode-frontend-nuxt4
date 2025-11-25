<template>
  <footer class="bg-gray-50 pt-16 pb-8 mt-20 border-t border-gray-200">
    <div class="container mx-auto px-6 max-w-7xl">

      <!-- TOP AREA -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">

        <!-- BRAND + CONTACT -->
        <div class="space-y-6">
          <!-- Logo -->
          <NuxtLink to="/" class="block">
            <NuxtImg
              src="/img/logo/3.webp"
              alt="4Pincode"
              class="h-12 w-auto object-contain"
              format="webp"
            />
          </NuxtLink>

          <div>
            <p class="text-sm text-gray-500 mb-1">
              Got questions? Call or WhatsApp us
            </p>
            <a href="tel:+971506466398" class="text-xl font-bold text-[#0e5e6f] hover:text-[#3adbc4] transition-colors">
              +971 50 6466398
            </a>
          </div>

          <div class="text-sm text-gray-600 space-y-1">
            <p class="font-semibold text-gray-900">Contact Info</p>
            <p>4Pincode Services</p>
            <p>Sharjah – United Arab Emirates</p>
            <a href="mailto:support@4pincode.com" class="text-[#0e5e6f] hover:text-[#3adbc4] transition-colors font-medium">
              support@4pincode.com
            </a>
          </div>

          <!-- SOCIAL -->
          <div class="flex items-center gap-4">
            <a href="#" class="social-icon" aria-label="Facebook"><i class="ri-facebook-fill"></i></a>
            <a href="#" class="social-icon" aria-label="Instagram"><i class="ri-instagram-line"></i></a>
            <a href="#" class="social-icon" aria-label="YouTube"><i class="ri-youtube-fill"></i></a>
            <a href="#" class="social-icon" aria-label="WhatsApp"><i class="ri-whatsapp-line"></i></a>
          </div>
        </div>

        <!-- COLUMN 1: Quick Links -->
        <div>
          <h4 class="font-bold text-[#0e5e6f] text-lg mb-5">Quick Links</h4>
          <ul class="space-y-3 text-sm font-medium text-gray-600">
            <li><NuxtLink to="/" class="footer-link">Home</NuxtLink></li>
            <li><NuxtLink to="/lookup" class="footer-link">New VIN Lookup</NuxtLink></li>
            <li><NuxtLink to="/buy" class="footer-link">Buy Tokens</NuxtLink></li>
            <li><NuxtLink to="/faq" class="footer-link">FAQ</NuxtLink></li>
          </ul>
        </div>

        <!-- COLUMN 2: Services -->
        <div>
          <h4 class="font-bold text-[#0e5e6f] text-lg mb-5">Services</h4>
          <ul class="space-y-3 text-sm font-medium text-gray-600">
            <li><NuxtLink to="/services/kia-hyundai-before-2017" class="footer-link">Kia / Hyundai (Old)</NuxtLink></li>
            <li><NuxtLink to="/services/kia-hyundai-after-2017" class="footer-link">Kia / Hyundai (New)</NuxtLink></li>
            <li><NuxtLink to="/pricing" class="footer-link">Pricing Plans</NuxtLink></li>
            <li><NuxtLink to="/api-docs" class="footer-link">API Documentation</NuxtLink></li>
          </ul>
        </div>

        <!-- COLUMN 3: Support -->
        <div>
          <h4 class="font-bold text-[#0e5e6f] text-lg mb-5">Support</h4>
          <ul class="space-y-3 text-sm font-medium text-gray-600">
            <li><NuxtLink to="/contact-us" class="footer-link">Contact Us</NuxtLink></li>
            <li><NuxtLink to="/about-us" class="footer-link">About Us</NuxtLink></li>
            <li><NuxtLink to="/privacy-policy" class="footer-link">Privacy Policy</NuxtLink></li>
            <li><NuxtLink to="/terms-conditions" class="footer-link">Terms & Conditions</NuxtLink></li>
          </ul>
        </div>
      </div>

      <!-- BOTTOM BAR -->
      <div class="mt-12 pt-8 border-t border-gray-200">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-sm text-gray-500">
            © {{ new Date().getFullYear() }} 4Pincode. All Rights Reserved.
          </p>

          <!-- PAYMENT ICONS (Placeholders styled) -->
          <div class="flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
            <!-- Example placeholders using Remix Icons if images aren't available, or keep images if you have them -->
            <i class="ri-visa-line text-2xl"></i>
            <i class="ri-mastercard-line text-2xl"></i>
            <i class="ri-paypal-line text-2xl"></i>
            <!-- <img src="/img/payment/visa.svg" class="h-6" alt="Visa"> -->
            <!-- <img src="/img/payment/mastercard.svg" class="h-6" alt="Mastercard"> -->
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
  @apply bg-[#0e5e6f] text-white border-[#0e5e6f] -translate-y-1 shadow-md;
}
</style>