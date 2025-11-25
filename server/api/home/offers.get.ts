export default defineEventHandler((event) => {
  const { lang = 'en' } = getQuery(event)
  const en = [
    { id: 1, title: 'BCM to PIN Calculator', badge: '-68% Discount', price: 48, compareAt: 150,
      bullets: ['Fully Unlocked', 'No HWID/dongle', 'Free Unlimited 24/7'], href: '/offers/bcm' },
    { id: 2, title: 'FDOK/DAS Calculator', badge: '-70% Discount', price: 175, compareAt: 580,
      bullets: ['Fully Unlocked', 'No HWID/dongle', 'Free Unlimited 24/7'], href: '/offers/fdok' },
    { id: 3, title: 'Carrier Repair Tool', badge: '-72% Discount', price: 85, compareAt: 300,
      bullets: ['Fully Unlocked', 'No HWID/dongle', 'Free Unlimited 24/7'], href: '/offers/carrier' }
  ]
  const ar = [
    { id: 1, title: 'حاسبة BCM إلى PIN', badge: 'خصم %68-', price: 48, compareAt: 150,
      bullets: ['مفتوحة بالكامل', 'بدون HWID/دانجل', 'غير محدود 24/7'], href: '/ar/offers/bcm' },
    { id: 2, title: 'حاسبة FDOK/DAS', badge: 'خصم %70-', price: 175, compareAt: 580,
      bullets: ['مفتوحة بالكامل', 'بدون HWID/دانجل', 'غير محدود 24/7'], href: '/ar/offers/fdok' },
    { id: 3, title: 'أداة إصلاح Carrier', badge: 'خصم %72-', price: 85, compareAt: 300,
      bullets: ['مفتوحة بالكامل', 'بدون HWID/دانجل', 'غير محدود 24/7'], href: '/ar/offers/carrier' }
  ]
  return { items: (lang === 'ar') ? ar : en }
})
