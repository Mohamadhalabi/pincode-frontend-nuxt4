export default defineEventHandler((event) => {
  const { lang = 'en' } = getQuery(event)
  const en = [
    { id: 101, title: 'VIN → PIN (Hyundai/Kia)', description: 'Fast VIN to PIN for supported models', href: '/calculators/vin-to-pin-hk' },
    { id: 102, title: 'VIN → PIN (Nissan/Infiniti)', description: 'Coverage for many Nissan platforms', href: '/calculators/vin-to-pin-nissan' },
    { id: 103, title: 'Dump to PIN', description: 'Calculate PIN from EEPROM dump', href: '/calculators/dump-to-pin' }
  ]
  const ar = [
    { id: 101, title: 'VIN → PIN (هيونداي/كيا)', description: 'تحويل VIN إلى PIN بسرعة للطرازات المدعومة', href: '/ar/calculators/vin-to-pin-hk' },
    { id: 102, title: 'VIN → PIN (نيسان/إنفينيتي)', description: 'تغطية لعدة منصات من نيسان', href: '/ar/calculators/vin-to-pin-nissan' },
    { id: 103, title: 'Dump إلى PIN', description: 'حساب PIN من تفريغ EEPROM', href: '/ar/calculators/dump-to-pin' }
  ]
  return { items: (lang === 'ar') ? ar : en }
})
