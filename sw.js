const CACHE='stronger57-v10';
const ASSETS=['./manifest.webmanifest','./icon.svg','./photo.css','./app-overrides.js'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.mode==='navigate'){
    e.respondWith(fetch(e.request,{cache:'no-store'}).then(async r=>{
      let html=await r.text();
      if(!html.includes('photo.css')) html=html.replace('</head>','<link rel="stylesheet" href="./photo.css?v=10"></head>');
      if(!html.includes('app-overrides.js')) html=html.replace('</body>','<script src="./app-overrides.js?v=10"></script></body>');
      return new Response(html,{status:r.status,statusText:r.statusText,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}})
    }).catch(()=>caches.match('./index.html')));return;
  }
  if(e.request.destination==='video'){
    e.respondWith(fetch(e.request,{cache:'no-store'}));return;
  }
  e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request)));
});