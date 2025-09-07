#!/bin/bash

# requirements:
# npm, uglifycss, browserify

# $ npm install -g uglifycss
# $ npm install -g uglify-js
# $ npm install -g browserify

CWD=`pwd`

npm update;

uglifycss css/alert.css css/button.css css/main.css css/root.css css/select.css css/slider.css css/switch.css css/dual_control.css > css/bundle.css
uglifyjs js/model.js js/prototypes.js js/storage.js js/audio_controller.js js/alert.js js/information.js js/keyboard_shortcuts.js js/midi/midi_controller.js js/window_resize.js js/setup_controls.js js/main.js js/install.js service_worker.js js/dual_range_control.js -o js/bundle.js
browserify js/bundle.js -o js/bundle.js
uglifyjs js/bundle.js -o js/bundle.js

git add *; git commit -m 'update'; git push;

echo '-- Finished build.sh for eartrainer --'