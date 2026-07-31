const CACHE = 'my-day-v1';
const ASSETS = [
  './', './index.html', './styles.css', './knowledge.js', './app.js',
  './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-180.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // בקשות ל-API של Anthropic תמיד עוברות לרשת, לא נשמרות במטמון
  if (url.hostname.endsWith('anthropic.com')) return;
  if (e.request.method !== 'GET') return;

  // network-first לקבצי האפליקציה, כדי שעדכון ייתפס מיד, עם נפילה למטמון באופליין
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
