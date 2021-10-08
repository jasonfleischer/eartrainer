let CACHE_NAME = 'v07';
const CACHE = [
        '/eartrainer/index.html',
        '/eartrainer/fonts/SF_Pro_Display_Thin.woff2',
        '/eartrainer/css/bundle.css',
        '/eartrainer/js/midi/webAudioFontPlayer.js',
        '/eartrainer/js/midi/midi_0000_JCLive_sf2_file.js',
        '/eartrainer/js/bundle.js'
      ];
	
self.addEventListener('install', function(event) {
    console.log('eartrainer: install');
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(CACHE);
        })
    );
});

self.addEventListener('fetch', function(event) {
    console.log('eartrainer: fetch');
    event.respondWith(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.match(event.request).then(function(response) {
                return response || fetch(event.request).then(function(response) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});

self.addEventListener('activate', function activator(event) {
    console.log('eartrainer: activate');
    event.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(keys
                .filter(function(key) {
                    return key.indexOf(CACHE_NAME) !== 0;
                })
                .map(function(key) {
                    return caches.delete(key);
                })
            );
        })
    );
});
