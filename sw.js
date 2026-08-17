/* Service worker — Lignée Targaryen
   Tout tient dans le shell : network-first (mise à jour auto), cache en secours hors ligne.

   Attention : GitHub Pages sert les fichiers avec Cache-Control: max-age=600. Un simple
   fetch() peut donc répondre depuis le cache HTTP du navigateur et servir une version
   vieille de dix minutes. Pour les fichiers de l'app on contourne ce cache explicitement. */
const VERSION = 'v3';
const CACHE = 'targaryen-' + VERSION;
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png',
               './carte-westeros.jpg'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(SHELL.map(u => new Request(u, {cache: 'reload'}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Requête réseau sans passer par le cache HTTP, pour tout ce qui porte le code de l'app */
function fraiche(req) {
  const u = new URL(req.url);
  const code = req.mode === 'navigate' || u.pathname.endsWith('/') ||
               /\.(html|js|webmanifest)$/.test(u.pathname);
  if (!code) return fetch(req);
  u.searchParams.set('sw', Date.now());
  return fetch(u.toString(), {cache: 'no-store'});
}

self.addEventListener('fetch', e => {
  if (new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fraiche(e.request).then(r => {
      if (r.ok) {
        const copie = r.clone();
        caches.open(CACHE).then(c => c.put(e.request, copie));   // clé = requête d'origine
      }
      return r;
    }).catch(() => caches.match(e.request).then(hit => hit || caches.match('./index.html')))
  );
});
