const C='kombat-v6',F=['./','index.html','manifest.webmanifest','icon.svg','icon-180.png','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
// Propios + tipografías de Google: red primero, caché si no hay conexión
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);
 if(e.request.method!=='GET'||!(u.origin===location.origin||/(^|\.)(fonts\.googleapis|fonts\.gstatic)\.com$/.test(u.hostname)))return;
 e.respondWith(fetch(e.request).then(r=>{if(r.ok||r.type==='opaque'){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./'))))});
