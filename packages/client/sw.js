const CACHE_NAME = 'sandworm-v1';

self.addEventListener('install', (event) => {
    console.log('Установлен');
});

self.addEventListener('activate', (event) => {
    console.log('Активирован');
});

self.addEventListener('message', (event) => {
    if (event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then( (cache) => {
                    return cache.addAll(event.data.payload);
                })
        );
    }
});

this.addEventListener('fetch', event => { 
    event.respondWith( 
        caches.match(event.request) 
            .then(response => { 
                // Если ответ найден, выдаём его 
                if (response) { 
                    console.log(`Got from cache: ${event.request.url}`);
                    return response; 
                } 

        const fetchRequest = event.request.clone(); 
        // В противном случае делаем запрос на сервер 
        return fetch(fetchRequest) 
        .then(response => { 
            if(!response || response.status !== 200 || response.type !== 'basic') { 
              return response; 
            } 

            const responseToCache = response.clone(); 
            // Получаем доступ к кешу по CACHE_NAME 
            caches.open(CACHE_NAME) 
            .then(cache => { 
                cache.put(event.request, responseToCache); 
            }); 
            console.log(`Got from NETWORK: ${event.request.url}`);
            return response; 
         }
        ); 
    }) 
  ); 
}); 
