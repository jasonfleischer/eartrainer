let CACHE_NAME = 'v05';
const CACHE = [
        '/eartrainer/index.html',
        '/eartrainer/fonts/SF_Pro_Display_Thin.woff2',
        '/eartrainer/css/root.css',
        '/eartrainer/css/main.css',
        '/eartrainer/css/select.css',
        '/eartrainer/css/slider.css',
        '/eartrainer/css/switch.css',
        '/eartrainer/css/button.css',
        '/eartrainer/css/alert.css',
        '/eartrainer/css/fretboard.css',
        '/eartrainer/css/piano.css',
        '/eartrainer/js/midi/webAudioFontPlayer.js',
        '/eartrainer/js/log.js',
        '/eartrainer/js/midi/midi_controller.js',
        '/eartrainer/js/midi/midi_0000_JCLive_sf2_file.js',
        '/eartrainer/js/model.js',
        '/eartrainer/js/chord.js',
        '/eartrainer/js/interval.js',
        '/eartrainer/js/scale.js',
        '/eartrainer/js/note.js',
        '/eartrainer/js/fretboard_view.js',
        '/eartrainer/js/piano_view.js',
        '/eartrainer/js/prototypes.js',
        '/eartrainer/js/storage.js',
        '/eartrainer/js/audio_controller.js',
        '/eartrainer/js/keyboard_shortcuts.js',
        '/eartrainer/js/alert.js',
        '/eartrainer/js/information.js',
        '/eartrainer/js/main.js',
        '/eartrainer/js/install.js'
      ];
	
self.addEventListener('install', function(event) {
    console.log('eartrainer: install');
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(CACHE);
        })
    );
});

this.addEventListener('fetch', function(event) {
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

this.addEventListener('activate', function activator(event) {
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
