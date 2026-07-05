const CACHE_NAME = 'almoassiss-app-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './logo.jpg'
];

// تثبيت السيرفس وركر وحفظ الملفات الأساسية في الذاكرة المؤقتة
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// تفعيل السيرفس وركر وتنظيف أي كاش قديم
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// التعامل مع طلبات المتصفح وتشغيل التطبيق بسلاسة والمساعدة في سرعة الفتح
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});