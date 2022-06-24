let CACHE_NAME = 'v15';
const CACHE = [
        '/eartrainer/index.html',
        '/eartrainer/fonts/SF_Pro_Display_Thin.woff2',
        '/eartrainer/css/bundle.css',
        '/eartrainer/js/midi/webAudioFontPlayer.js',
        '/eartrainer/js/midi/midi_0000_JCLive_sf2_file.js',
        '/eartrainer/js/bundle.js'

        ,
        '/eartrainer/audio/chords/augmented.mp3',
        '/eartrainer/audio/chords/diminished.mp3',
        '/eartrainer/audio/chords/dominant_seventh.mp3',
        '/eartrainer/audio/chords/major.mp3',
        '/eartrainer/audio/chords/major_seventh.mp3',
        '/eartrainer/audio/chords/minor.mp3',
        '/eartrainer/audio/chords/minor_seventh.mp3',
        '/eartrainer/audio/intervals/ascending.mp3',
        '/eartrainer/audio/intervals/descending.mp3',
        '/eartrainer/audio/intervals/fifth.mp3',
        '/eartrainer/audio/intervals/fourth.mp3',
        '/eartrainer/audio/intervals/major_2nd.mp3',
        '/eartrainer/audio/intervals/major_3rd.mp3',
        '/eartrainer/audio/intervals/major_6th.mp3',
        '/eartrainer/audio/intervals/major_7th.mp3',
        '/eartrainer/audio/intervals/minor_2nd.mp3',
        '/eartrainer/audio/intervals/minor_3rd.mp3',
        '/eartrainer/audio/intervals/minor_6th.mp3',
        '/eartrainer/audio/intervals/minor_7th.mp3',
        '/eartrainer/audio/intervals/octave.mp3',
        '/eartrainer/audio/intervals/tritone.mp3'
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
