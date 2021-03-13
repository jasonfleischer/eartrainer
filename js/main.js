
//todo 

 
// mobile 
//	safari - no midi sound
//	chrome - no sound for midi, landscape portait (need to reload)
// other browsers
//	safari - no issues
//  firefox - no issues
//	edge - no issue

// python -m SimpleHTTPServer 8000
// http://localhost:8000/


function init() {

	build_all_notes();

	load_cookies();
	translations.load();
	
	setup_audio()
	function setup_audio(){
		audio_controller.init_sounds();
		//click_controller.init();
		//if(!window.mobileCheck()){
			//drum_controller.init();
		//}
		midi_controller.init();

	}

	setup_controls();
	function setup_controls(){
		setup_volume_control();

		setup_speak_switch();
		setup_speak_volume_control();

		setup_language_select();

		setup_single_notes_switch();
		setup_interval_controls();

		setup_chords_switch();
		setup_chord_play_type_multiple_select();


		setup_bpm_controls();
	}

	setup_keyboard_listeners();
	setup_info_alert();
	setup_settings_menu_on_click();

	if(window.mobileCheck()){
		setup_mobile();
	}

	
	/*time_view.init();*/
	fretboard_view.init();
	setup_darkmode_switch();
	setup_bpm_controls();
	show_hidden_views();

}

function setup_mobile(){
	//model.tone = TONE.NORMAL;
	//$("tone").style.display = "none";
}

function show_hidden_views(){
	$("header").style.display = "block";
	if(!is_compact_window())
		$("nav-side-menu").style.display = "block";
	$("content_view").style.display = "block";
}

// window resize

var window_resize_start_event_occured = false;
var resized_timer;
window.onresize = function(){
	clearTimeout(resized_timer);
	resized_timer = setTimeout(window_resized_end, 200);
	if(!window_resize_start_event_occured) {
		window_resized_start();
		window_resize_start_event_occured = true;
	}
};

function window_resized_start(){
	//$("bpm_text").style.display = "none"; // hide
	//$("time_view_container").style.display = "none"; // hide
	//$("status_msg").style.display = "none"; // hide
	//$("nav-side-menu").style.display = "none"; // hide
	dismissInfo();	
}

function window_resized_end(){

	window_resize_start_event_occured = false;

	if(is_compact_window()) {
		hide_settings();
	} else {
		$("nav-side-menu").style.display = "block";
		$("kofi_button").style.display = "block";
		$("info_button").style.display = "block";
	}

	if(audio_controller.playing){
		//$("time_view_container").style.display = "block"; // show
	} else {
		$("status_msg").style.display = "block"; // show
	}
	//time_view.resize();
	//time_view.draw_background();
	
	//$("bpm_text").style.display = "block"; // show
	//range_control.resize_bpm_text();
}

var flash_timer;
function flash_screen_animation(){
	/*var element = $("flash_screen");
	element.style.display = 'block';
	clearInterval(flash_timer);

	var op = 1;  // initial opacity
    flash_timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(flash_timer);
            element.style.display = 'none';
            element.style.opacity = 0;
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.15;
    }, 50);*/
}

// on click

function kofi(){
	window.open("https://ko-fi.com/jasonfleischer", "_blank");
}

function setup_info_alert(){
	$("info_alert_container").addEventListener("click", function(event){
		dismissInfo();
	});
	$("info_alert").addEventListener("click", function(event){
		event.stopPropagation();
		return false;
	});
}
function info(){
	$("info_alert_container").style.display = "block"; // show
}
function dismissInfo(){
	$("info_alert_container").style.display = "none"; // hide
}

function toggle_settings(){
	if($("nav-side-menu").style.display !== "block")
		show_settings();
	else
		hide_settings();
}

var settings_animation_id;
function show_settings() {
	$("nav-side-menu").style.display = "block";
	$("kofi_button").style.display = "none";
	$("info_button").style.display = "none";
	$("setting_button_svg").src = (model.darkmode) ? "img/close_white.svg" : "img/close_black.svg";

	settings_slide_down_animation();
	function settings_slide_down_animation(){
		var elem = $("nav-side-menu");
		var height = $("nav-menu-ul").offsetHeight;
		var pos = -1*height;
		settings_animation_id = setInterval(frame, 10);
		elem.style.top = pos + 'px';
		function frame() {
			if (pos == 0) {
				clearInterval(settings_animation_id);
			} else {
				pos = Math.min(pos + 15, 0);
				elem.style.top = pos + 'px';
			}
		}
	}
}
function hide_settings(){
	clearInterval(settings_animation_id);
	$("nav-side-menu").style.display = "none";
	$("kofi_button").style.display = "block";
	$("info_button").style.display = "block";
	$("setting_button_svg").src = (model.darkmode) ? "img/gear_white.svg" : "img/gear_black.svg";
}
function setup_settings_menu_on_click(){
	$("ul_wrapper").addEventListener("click", function(event){
		if(is_compact_window())
			hide_settings();
	});
	$("nav-menu-ul").addEventListener("click", function(event){
		event.stopPropagation();
		return false;
	});
}

function openURL(url){
	window.open(url, '_blank');
}

function openMailToDeveloper(){
	var subject = TR("Metronome Website Feedback");
	subject = subject.replaceAll(" ", "%20");
	openURL("mailto:jason_fleischer@hotmail.ca?Subject=" + subject);
}

// setup controls

function setup_bpm_controls() {

	var min = MIN_BPM;
	var max = MAX_BPM;
	var step = 1;
	//setup_bpm_dial(min, max, step);
	setup_bpm_range(min, max, step);
	//setup_bpm_prompt();
	//$("bpm_row_text").innerHTML = "BPM: " + model.BPM;

	/*function setup_bpm_dial(min, max, step){
		var on_range_control_changed = function(BPM_value){
			log("on BPM dial change: " + BPM_value);
			model.BPM = BPM_value;
			cookies.set_BPM(model.BPM);
			update_UI_BPM(model.BPM);
			reloadBPM();
		};
		range_control.load(on_range_control_changed, "", min , max, step, model.BPM, false, 0);
	}*/

	function setup_bpm_range(min, max, step){
		var bpm_range = $("bpm_range");
		bpm_range.min = min;
		bpm_range.max = max;
		bpm_range.value = model.BPM;
		bpm_range.step = step;
		bpm_range.addEventListener("change", function(e){
			model.BPM = parseFloat(this.value);
			log("on BPM range change: " + model.BPM);
			//range_control.load(range_control.on_range_control_changed, "", min , max, step, model.BPM, false, 0);
			cookies.set_BPM(model.BPM);
			update_UI_BPM(model.BPM);
			reloadBPM();
		});

		bpm_range.addEventListener('input', function(){
			model.BPM = parseFloat(this.value);
			log("on BPM range change: " + model.BPM);
			cookies.set_BPM(model.BPM);
			update_UI_BPM(model.BPM);
			reloadBPM();
		}, true);
	}

	/*function setup_bpm_prompt(){
		$("bpm_text").addEventListener("click", function(e){
			bpm_prompt();
		});

		function bpm_prompt(){
			var was_playing = forceStop();
			var BPM = parseInt(prompt("Enter a BPM value:", model.BPM));
			if(BPM >= MIN_BPM && BPM <= MAX_BPM){
				log("on BPM prompt change: " + BPM);
				model.BPM = BPM;
				range_control.load(range_control.on_range_control_changed, "", MIN_BPM , MAX_BPM, 1, model.BPM, false, 0);
				cookies.set_BPM(model.BPM);
				update_UI_BPM(model.BPM);
				reloadBPM();
				if(was_playing) playPause(); 
			}else {
				log("Invalid BPM value" + BPM);
			}
		}
	}*/
}

function setup_volume_control() {

	var min = 0.05;
	var max = 0.5;
	var step = 0.05;
	setup_volume_range(min, max, step);

	function setup_volume_range(min, max, step){
		var range = $("volume_range");
		range.min = min;
		range.max = max;
		range.value = model.volume;
		range.step = step;
		range.addEventListener("change", function(e){
			model.volume = parseFloat(this.value);
			log("on Volume range change: " + model.volume);
			cookies.set_volume(model.volume);
			update_UI_volume(model.volume);
		});

		range.addEventListener('input', function(){
			model.volume = parseFloat(this.value);
			log("on Volume range change: " + model.volume);
			cookies.set_volume(model.volume);
			update_UI_volume(model.volume);
		}, true);
	}
}

function setup_single_notes_switch() {
	$("single_notes").addEventListener("click", function(e){
		$("single_notes_checkbox").click();
	});
	$("single_notes_checkbox_switch").addEventListener('keyup', function(e) {
		if (event.code === 'Space' || event.code === 'Enter') $("ssingle_notes_checkbox").click();
	});
	$("single_notes_checkbox").addEventListener("change", function(e){
		var value = this.checked;
		log("on single notes change: " + value);
		model.single_notes.enabled = value;
		cookies.set_single_notes(value);
	});
	$("speak_checkbox").checked = model.single_notes.enabled;
}


function setup_speak_switch() {
	$("speak").addEventListener("click", function(e){
		$("speak_checkbox").click();
	});
	$("speak_checkbox_switch").addEventListener('keyup', function(e) {
		if (event.code === 'Space' || event.code === 'Enter') $("speak_checkbox").click();
	});
	$("speak_checkbox").addEventListener("change", function(e){
		var value = this.checked;
		log("on speak change: " + value);
		model.speak = value;
		cookies.set_speak(value);
		update_UI_speak();
	});
	$("speak_checkbox").checked = model.speak;
}

function setup_speak_volume_control() {

	var min = 0.1;
	var max = 1.0;
	var step = 0.05;
	setup_volume_range(min, max, step);

	function setup_volume_range(min, max, step){
		var range = $("speak_volume_range");
		range.min = min;
		range.max = max;
		range.value = model.speak_volume;
		range.step = step;
		range.addEventListener("change", function(e){
			model.speak_volume = parseFloat(this.value);
			log("on Speak Volume range change: " + model.speak_volume);
			cookies.set_speak_volume(model.speak_volume);
			update_UI_speak_volume(model.speak_volume);
		});

		range.addEventListener('input', function(){
			model.speak_volume = parseFloat(this.value);
			log("on Speak Volume range change: " + model.speak_volume);
			cookies.set_speak_volume(model.speak_volume);
			update_UI_speak_volume(model.speak_volume);
		}, true);
	}
}

function setup_interval_controls (){
	setup_interval_switch();
	setup_interval_type_multiple_select();
	setup_interval_play_type_multiple_select();
	update_UI_intervals();
}

function setup_interval_switch() {
	$("intervals").addEventListener("click", function(e){
		$("intervals_checkbox").click();
	});
	$("intervals_checkbox_switch").addEventListener('keyup', function(e) {
		if (event.code === 'Space' || event.code === 'Enter') $("speak_checkbox").click();
	});
	$("intervals_checkbox").addEventListener("change", function(e){
		var value = this.checked;
		log("on intervals change: " + value);
		model.interval.enabled = value;
		cookies.set_intervals(value);
		update_UI_intervals();
	});
	$("intervals_checkbox").checked = model.interval.enabled;
}

function setup_interval_type_multiple_select() {
	var element_id_type_pairs = [	["grid-item-m2", INTERVAL_TYPE.MINOR_SECOND], 
									["grid-item-M2", INTERVAL_TYPE.MAJOR_SECOND],
									["grid-item-m3", INTERVAL_TYPE.MINOR_THIRD],
									["grid-item-M3", INTERVAL_TYPE.MAJOR_THIRD],
									["grid-item-p4", INTERVAL_TYPE.PERFECT_FOURTH],
									["grid-item-tt", INTERVAL_TYPE.TRITONE],
									["grid-item-p5", INTERVAL_TYPE.PERFECT_FIFTH],
									["grid-item-m6", INTERVAL_TYPE.MINOR_SIXTH],
									["grid-item-M6", INTERVAL_TYPE.MAJOR_SIXTH],
									["grid-item-m7", INTERVAL_TYPE.MINOR_SEVENTH],
									["grid-item-M7", INTERVAL_TYPE.MAJOR_SEVENTH],
									["grid-item-p8", INTERVAL_TYPE.OCTAVE]];

	for (i = 0; i < element_id_type_pairs.length; i++) {
		var pair = element_id_type_pairs[i];
		update_UI_interval_type(pair);
		setupIntervalTypeClickListener(pair);
	}

	function setupIntervalTypeClickListener(pair){
		var id = pair[0];
		var type = pair[1];
		$(id).addEventListener("click", function(e) {

			

			var type_enabled = model.interval.types.includes(type)

			if(model.interval.types.length == 1 && type_enabled) {
				log("prevent no selection")
				return;
			}

			if(type_enabled)
				model.interval.types.remove(type);
			else
				model.interval.types.push(type);

			log("on interval type change: " + model.interval.types);
			cookies.set_interval_type(type, !type_enabled);
			update_UI_interval_type(pair);
		});
	}
}
	
function setup_interval_play_type_multiple_select() {
	var element_id_play_type_pairs = [	["grid-item-ascending", INTERVAL_PLAY_TYPE.ASCENDING], 
										["grid-item-descending", INTERVAL_PLAY_TYPE.DESCENDING],
										["grid-item-harmonic", INTERVAL_PLAY_TYPE.HARMONIC]];

	for (i = 0; i < element_id_play_type_pairs.length; i++) {
		var pair = element_id_play_type_pairs[i];
		update_UI_interval_play_type(pair);
		setupIntervalPlayTypeClickListener(pair);
	}
	function setupIntervalPlayTypeClickListener(pair){
		var id = pair[0];
		var type = pair[1];
		$(id).addEventListener("click", function(e) {

			var type_enabled = model.interval.play_types.includes(type)

			if(model.interval.play_types.length == 1 && type_enabled) {
				log("prevent no selection")
				return;
			}

			if(type_enabled)
				model.interval.play_types.remove(type);
			else
				model.interval.play_types.push(type);

			log("on interval type change: " + model.interval.play_types);
			cookies.set_interval_play_type(type, !type_enabled);
			update_UI_interval_play_type(pair);
		});
	}
}

function setup_chord_play_type_multiple_select() {
	var element_id_play_type_pairs = [	["grid-item-chord-harmonic", CHORD_PLAY_TYPE.HARMONIC], 
										["grid-item-chord-arpeggiate", CHORD_PLAY_TYPE.ARPEGGIATE]];

	for (i = 0; i < element_id_play_type_pairs.length; i++) {
		var pair = element_id_play_type_pairs[i];
		update_UI_chord_play_type(pair);
		setupChordPlayTypeClickListener(pair);
	}
	function setupChordPlayTypeClickListener(pair){
		var id = pair[0];
		var type = pair[1];
		$(id).addEventListener("click", function(e) {

			var type_enabled = model.chords.play_types.includes(type)

			if(model.chords.play_types.length == 1 && type_enabled) {
				log("prevent no selection")
				return;
			}

			if(type_enabled)
				model.chords.play_types.remove(type);
			else
				model.chords.play_types.push(type);

			log("on chords type change: " + model.chords.play_types);
			cookies.set_chord_play_type(type, !type_enabled);
			update_UI_chord_play_type(pair);
		});
	}
}

function setup_chords_switch() {
	$("chords").addEventListener("click", function(e){
		$("chords_checkbox").click();
	});
	$("chords_checkbox_switch").addEventListener('keyup', function(e) {
		if (event.code === 'Space' || event.code === 'Enter') $("chords_checkbox").click();
	});
	$("chords_checkbox").addEventListener("change", function(e){
		var value = this.checked;
		log("on chords change: " + value);
		model.chords.enabled = value;
		cookies.set_chords(value);
		//update_UI_chords
	});
	$("chords_checkbox").checked = model.chords.enabled;
}

/*function setup_tone_select() {
	$("tone_select").addEventListener("change", function(e){
		var value = parseInt(this.value);
		log("on tone_select: " + value);
		model.tone = value;
		cookies.set_tone(value);
		update_UI_tone();
		audio_controller.reloadSounds();
	});
	$("tone_select").value = model.tone;
	update_UI_tone();
}

function setup_time_signature_select() {
	$("time_signature_select").addEventListener("change", function(e){
		var value = parseInt(this.value);
		log("on time_signature_select: " + value);
		model.time_signature = value ;
		cookies.set_time_signature(value);
		reloadActivePlayer();
	});
	$("time_signature_select").value = model.time_signature;
}

function setup_beat_division_select() {
	$("division_select").addEventListener("change", function(e){
		var value = parseInt(this.value);
		log("on division_select: " + value);
		cookies.set_subdivision(value);
		reloadDivisions(value);
	});
	$("division_select").value = model.beat_division;
}

function setup_accent_first_beat_switch() {
	$("accent_first_beat").addEventListener("click", function(e){
		$("accent_first_beat_checkbox").click();
	});
	$("accent_first_beat_checkbox_switch").addEventListener('keyup', function(e) {
		if (event.code === 'Space' || event.code === 'Enter') $("accent_first_beat_checkbox").click();
	});
	$("accent_first_beat_checkbox").addEventListener("change", function(e){
		var value = this.checked;
		log("on accent beat change: " + value);
		model.accent_first_beat = value;
		cookies.set_accent_first_beat(value);
	});
	$("accent_first_beat_checkbox").checked = model.accent_first_beat;
}

function setup_flash_screen_switch() {
	$("screen_flash").addEventListener("click", function(e){
		$("screen_flash_checkbox").click();
	});
	$("screen_flash_checkbox_switch").addEventListener('keyup', function(e) {
		if (event.code === 'Space' || event.code === 'Enter') $("screen_flash_checkbox").click();
	});
	$("screen_flash_checkbox").addEventListener("change", function(e){
		var value = this.checked;
		log("on screen flash change: " + value);
		model.flash_screen = value;
		cookies.set_flash_screen(value);
	});
	$("screen_flash_checkbox").checked = model.flash_screen;
}*/

function setup_darkmode_switch() {

	setup_darkmode($("darkmode"), $("darkmode_checkbox_switch"), $("darkmode_checkbox"));
	setup_darkmode($("mobile_darkmode"), $("mobile_darkmode_checkbox_switch"), $("mobile_darkmode_checkbox"));
	function setup_darkmode(background_obj, switch_obj, checkbox_obj ){

		background_obj.addEventListener("click", function(e){
			checkbox_obj.click();
		});
		switch_obj.addEventListener('keyup', function(event){
			if (event.code === 'Space'|| event.code === 'Enter') $("darkmode_checkbox").click();
		});
		checkbox_obj.addEventListener("change", function(e){
			var value = this.checked;
			log("on darkmode change: " + value);
			model.darkmode = value;
			cookies.set_darkmode(value);
			update_UI_darkmode();
		});
		checkbox_obj.checked = model.darkmode;
	}
	update_UI_darkmode();
}

// update_UI

function update_UI_BPM(value) {
	var range = $("bpm_range");
	range.value = value;

	//update_UI_tempo_marking(value);
	//range_control.resize_bpm_text();

	//$("bpm_row_text").innerHTML = "BPM: " + value

	function update_UI_tempo_marking(BPM){
		var tempo_marking = "";
		if(BPM >= 40 && BPM < 60){
			tempo_marking = "Largo";
		} else if(BPM >= 60 && BPM < 66){
			tempo_marking = "Larghetto";
		} else if(BPM >= 66 && BPM < 76){
			tempo_marking = "Adagio";
		} else if(BPM >= 76 && BPM < 108){
			tempo_marking = "Andante";
		} else if(BPM >= 98 && BPM <= 112){
			tempo_marking = "Moderato";
		} else if(BPM > 112 && BPM < 120){
			tempo_marking = "Allegro moderato";
		} else if(BPM >= 120 && BPM <= 156){
			tempo_marking = "Allegro";
		} else if(BPM > 156 && BPM < 168){
			tempo_marking = "Vivace";
		} else if(BPM >= 168 && BPM < 200){
			tempo_marking = "Presto";
		} else if(BPM >= 200){
			tempo_marking = "Prestissimo";
		}
		clearInterval(fadeEffect);
		var fadeTarget = $("tempo_marking");
		fadeTarget.style.opacity = 1;
		var fadeEffect = setInterval(function () {
			if (!fadeTarget.style.opacity) {
				fadeTarget.style.opacity = 1;
			}
			if (fadeTarget.style.opacity > 0) {
				fadeTarget.style.opacity -= 0.09;
			} else {
				clearInterval(fadeEffect);
			}
		}, 100);

		$("tempo_marking").innerHTML = tempo_marking;
	}
}

function update_UI_volume(value) {
	var range = $("volume_range");
	range.value = value;
}


function update_UI_speak() {
	$("speak_volume").style.display = model.speak ? "block" : "none";
}
function update_UI_speak_volume(value) {
	var range = $("speak_volume_range");
	range.value = value;
}

function update_UI_intervals(){
	if(model.interval.enabled){
		$("interval_types").style.display = "grid";
		$("interval_play_types").style.display = "grid";
	} else {
		$("interval_types").style.display = "none";
		$("interval_play_types").style.display = "none";
	}
}
function update_UI_interval_type(pair) {
	var id = pair[0];
	var type = pair[1];
	if(model.interval.types.includes(type))
		$(id).classList.add("enabled");
	else
		$(id).classList.remove("enabled");
}

function update_UI_interval_play_type(pair) {
	var id = pair[0];
	var type = pair[1];
	if(model.interval.play_types.includes(type))
		$(id).classList.add("enabled");
	else
		$(id).classList.remove("enabled");
}

function update_UI_chord_play_type(pair) {
	var id = pair[0];
	var type = pair[1];
	if(model.chords.play_types.includes(type))
		$(id).classList.add("enabled");
	else
		$(id).classList.remove("enabled");
}

function update_UI_tone(){
	$("accent_first_beat").style.display = (model.tone == TONE.NORMAL || model.tone == TONE.DRUM) ? "block" : "none";
	$("status_msg").innerHTML = model.tone == TONE.TALKING ? TR("Configure then press 'Play' to begin. Talking setting works best at lower BPMs.") : TR("Configure then press 'Play' to begin");
}

function update_UI_playing(){
	$("play_pause_button").innerHTML = TR("Stop"); 
	$("mobile_play_pause_button").innerHTML = TR("Stop");
	$("init_view").style.display = "none"; // hide
	//time_view.start(model.time_signature, model.BPM);
}

function update_UI_stopped(){
	$("play_pause_button").innerHTML = TR("Play");
	$("mobile_play_pause_button").innerHTML = TR("Play");
	//$("count_text").innerHTML = "\xa0";
	$("init_view").style.display = "block"; // show
	//time_view.stop();
	hideAnswer();
}

function hideAnswer(){
	$("note_display").style.display = "none";
	$("fretboard").style.display = "none";
	$("answer_container").style.display = "none";
}

function showNoteAnswer(note){

	
	update_UI_note("note", note);

	$("note_display").style.display = "flex";
	$("interval_display").style.display = "none";
	$("chord_display").style.display = "none";

	$("fretboard").style.display = "block";
	$("answer_container").style.display = "block";
}

function update_UI_note(id_prefix, note) {

	
	$(id_prefix + "_name").innerHTML = note.note_name.name;
	$(id_prefix + "_octave").innerHTML = note.octave;

	$(id_prefix + "_img").src = "img/zodiac/" + note.note_name.zodiac + ".png";
	
	$(id_prefix + "_color").style.backgroundColor = note.note_name.color;
	//piano 21, 108
	var gray_scale_percent = (note.note_value - 21) / (108 - 21)

	function hexToRgb(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	}
	$(id_prefix + "_color").style.borderColor = "rgba(1,1,1,"+(1.0-gray_scale_percent)+")"; 
} 

function showIntervalAnswer(interval){

	update_UI_note("first_note", interval.play_type == INTERVAL_PLAY_TYPE.ASCENDING ? interval.lower_note : interval.higher_note);
	update_UI_note("second_note", interval.play_type == INTERVAL_PLAY_TYPE.ASCENDING ? interval.higher_note: interval.lower_note);

	$("interval_type").innerHTML = interval.type + ":";
	$("interval_play_type").innerHTML = interval.play_type;	
	
	$("note_display").style.display = "none";
	$("interval_display").style.display = "flex";
	$("chord_display").style.display = "none";

	$("fretboard").style.display = "block";
	$("answer_container").style.display = "block";
}

function showChordAnswer(chord){

	$("chord_name").innerHTML = chord.name;
	$("chord_structure").innerHTML = chord.structure;
	$("chord_octave").innerHTML = chord.octave_display;

	$("fretboard").style.display = "block";
	$("answer_container").style.display = "block";
}

function update_UI_darkmode(){
	if(model.darkmode)
		setDarkMode();
	else
		setLightMode();

	//range_control.reload_colors();
	//time_view.reload_colors();

	$("darkmode_checkbox").checked = model.darkmode;
	$("mobile_darkmode_checkbox").checked = model.darkmode;

	function setDarkMode(){
		var root = document.documentElement;
		root.style.setProperty('--highlight-color', "#444");
		root.style.setProperty('--primary-background-color', "#252525"); // 3
		root.style.setProperty('--secondary-background-color', "#000"); // 1
		root.style.setProperty('--tertiary-background-color', "#494949"); // 2
		root.style.setProperty('--primary-font-color', "#fff"); // inverse of 1

		$("info_button_svg").src = "img/info_white.svg";
		$("dismiss_close_button_svg").src = "img/close_white.svg";
		if($("nav-side-menu").style.display !== "block")
			$("setting_button_svg").src = "img/gear_white.svg";
		else 
			$("setting_button_svg").src = "img/close_white.svg";
	}

	function setLightMode(){
		var root = document.documentElement;
		root.style.setProperty('--highlight-color', "#ddd");
		root.style.setProperty('--primary-background-color', "#efefef"); // 3
		root.style.setProperty('--secondary-background-color', "#fff"); // 1
		root.style.setProperty('--tertiary-background-color', "#f5f5f5"); // 2
		root.style.setProperty('--primary-font-color', "#111"); // inverse of 1

		$("info_button_svg").src = "img/info_black.svg";
		$("dismiss_close_button_svg").src = "img/close_black.svg";
		if($("nav-side-menu").style.display !== "block")
			$("setting_button_svg").src = "img/gear_black.svg";
		else 
			$("setting_button_svg").src = "img/close_black.svg";
	}
}
