const log = require("@jasonfleischer/log");
const pianoKit = require("@jasonfleischer/piano")
const fretboardKit = require("@jasonfleischer/fretboard");
const musicKit = require("@jasonfleischer/music-model-kit");
musicKit.init();

let pianoView = pianoKit({
	id: 'piano'
});

const fretboardView = fretboardKit({
	id: 'fretboard',
	showLabels: false
});

function init() {

	storage.load();

	var isSafariMobile = window.mobileAndTabletCheck() && isSafari
	if (isSafariMobile && !isFromHomeScreen()){
		install.showAlert()
	}
	
	midi_controller.init();
	setup_controls();
	setup_keyboard_listeners();
	alert.init()
	

	if(window.mobileAndTabletCheck()){
		setup_mobile();
		function setup_mobile(){
			$("hide_show_left_column").style.display = "none";
		}
	}

	show_hidden_views();
	window_resized_end();

	function show_hidden_views(){
		$("header").style.display = "block";
		if(!is_compact_window()) {
			$("nav-side-menu").style.display = "block";
			if(window.mobileCheck())
				$("hide_show_left_column").style.display = "block";
			
		}
		$("init_view").style.visibility = "visible";
		$("hide_show_left_column").style.visibility = "visible";
	}
}

function kofi(){
	window.open("https://ko-fi.com/jasonfleischer", "_blank");
}

function info(){
	information.showAlert()
}
function dismissInfo(){
	information.dismissAlert()
}

var settings_animation_id;
function toggle_settings(){

	if($("nav-side-menu").style.display !== "block")
		show_settings();
	else
		hide_settings();

	function show_settings() {
		$("nav-side-menu").style.display = "block";
		$("kofi_button").style.display = "none";
		$("info_button").style.display = "none";
		$("setting_button_svg").src = "img/close_white.svg";

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
}

function hide_settings(){
	clearInterval(settings_animation_id);
	$("nav-side-menu").style.display = "none";
	$("kofi_button").style.display = "block";
	$("info_button").style.display = "block";
	$("setting_button_svg").src = "img/gear_white.svg";
}

function openMailToDeveloper(){
	var subject = "Metronome Website Feedback";
	subject = subject.replaceAll(" ", "%20");
	openURL("mailto:jason_fleischer@hotmail.ca?Subject=" + subject);
}

// update_UI

function update_UI_BPM(value) {
	var range = $("bpm_range");
	range.value = value;

	$("speed_text").innerHTML = (BPMtoMilliSeconds(value) / 1000).toFixed(1) + "s";

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

function update_UI_duration(duration_in_MS){
	var new_text;
	if(duration_in_MS < 0)
		new_text = audio_controller.playing ? "Stop": "Play";
	else {
		var time_display =  " (" + human_readable_duration(duration_in_MS) + ")"
		if (time_display == " ()"){ time_display = ""; }
		new_text = (audio_controller.playing ? "Stop": "Play") + "<span id='play_pause_button_span'>" + time_display + "</span>" ;
	}
	$("play_pause_button").innerHTML = new_text
	$("mobile_play_pause_button").innerHTML = new_text

	function human_readable_duration(duration_in_MS){
		var duration_in_seconds = duration_in_MS / 1000;
		if(duration_in_seconds < 60) {
			return formattedSeconds(duration_in_seconds);
		} else if(duration_in_seconds < 60*60){
			var mins = parseInt(duration_in_seconds/60)
			var secs = duration_in_seconds - (mins*60)
			return mins + " min" +  (secs==0?"":" ") + formattedSeconds(secs)
		} else if (duration_in_seconds >= 60*60) {
			var hours = parseInt(duration_in_seconds/60/60)
			return hours + " hour"
		} else {
			LogE("not handled human readable duration")
			return ""
		}

		function formattedSeconds(seconds){
			seconds = parseInt(seconds)
			if(seconds == 0) return ""
			else if (seconds < 10) return "0"+seconds +" s"
			else return seconds+" s"
		}
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


function update_UI_display_diagram(pair){
	const id = pair[0];
	const value = pair[1];
	const isIncluded = model.display_diagrams.includes(value)
	if(isIncluded)
		$(id).classList.add("enabled");
	else
		$(id).classList.remove("enabled");

	if(value == DISPLAY_DIAGRAM.PIANO){
		$(pianoView.id).style.display = isIncluded ? "block": "none";
	} else if (value == DISPLAY_DIAGRAM.GUITAR){
		$(fretboardView.id).style.display = isIncluded ? "block": "none";
	}
}

function update_UI_intervals(){
	if(model.interval.enabled){
		$("grid-container-interval_types").style.display = "grid";
		$("grid-container-interval_play_types").style.display = "grid";
	} else {
		$("grid-container-interval_types").style.display = "none";
		$("grid-container-interval_play_types").style.display = "none";
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

function update_UI_chords(){
	if(model.chords.enabled){
		$("grid-container-chords_three_note").style.display = "grid";
		$("grid-container-chords_four_note").style.display = "grid";
		$("grid-container-chords_play_type").style.display = "grid";
	} else {
		$("grid-container-chords_three_note").style.display = "none";
		$("grid-container-chords_four_note").style.display = "none";
		$("grid-container-chords_play_type").style.display = "none";
	}
}

function update_UI_chord_play_type(pair) {
	var id = pair[0];
	var type = pair[1];
	if(model.chords.play_types.includes(type))
		$(id).classList.add("enabled");
	else
		$(id).classList.remove("enabled");
}

function update_UI_chord_three_note_type(pair) {
	var id = pair[0];
	var type = pair[1];
	if(model.chords.three_note_types.includes(type))
		$(id).classList.add("enabled");
	else
		$(id).classList.remove("enabled");

	var inversionIds = ["grid-item-three_note_root",
						"grid-item-three_note_first",
						"grid-item-three_note_second"];
	var i;
	for (i = 0; i < inversionIds.length; i++) {
		$(inversionIds[i]).style.display = (model.chords.three_note_types.length == 0 ? "none" : "block");
	}
}

function update_UI_chord_three_note_inversion_type(pair) {
	var id = pair[0];
	var type = pair[1];
	if(model.chords.three_note_inversion_types.includes(type))
		$(id).classList.add("enabled");
	else
		$(id).classList.remove("enabled");
}

function update_UI_chord_four_note_type(pair) {
	var id = pair[0];
	var type = pair[1];
	if(model.chords.four_note_types.includes(type))
		$(id).classList.add("enabled");
	else
		$(id).classList.remove("enabled");
	var inversionIds = ["grid-item-four_note_root",
						"grid-item-four_note_first",
						"grid-item-four_note_second",
						"grid-item-four_note_third"];
	var i;
	for (i = 0; i < inversionIds.length; i++) {
		$(inversionIds[i]).style.display = (model.chords.four_note_types.length == 0 ? "none" : "block");
	}
}

function update_UI_chord_four_note_inversion_type(pair) {
	var id = pair[0];
	var type = pair[1];
	if(model.chords.four_note_inversion_types.includes(type))
		$(id).classList.add("enabled");
	else
		$(id).classList.remove("enabled");
}

function update_UI_playing(){
	$("play_pause_button").innerHTML = "Stop"; 
	$("mobile_play_pause_button").innerHTML = "Stop";
	$("status_msg").innerHTML = "What musical sound are you hearing?";
	//time_view.start(model.time_signature, model.BPM);
	startDurationTimer();
}
var durationTimer;
var durationStartTime;
function startDurationTimer(){

	durationStartTime = new Date();
	update_UI_duration(model.duration*60000);

	durationTimer = setInterval(function () {

		var now = new Date();
		var diff = parseInt(now - durationStartTime);
		update_UI_duration(model.duration*60000 - diff);
	}, 500);
}

function update_UI_stopped(){

	update_UI_duration(model.duration*60000)
	$("status_msg").innerHTML = "Configure then press 'Play' to begin";
	$("init_view").style.visibility = "visible";
	hideAnswer();
	stopDurationTimer();
}

function stopDurationTimer(){
	clearTimeout(durationTimer);
}

function hideAnswer(){
	$("init_view").style.visibility = "visible";
	$("note_display").style.visibility = "hidden";
	$("interval_display").style.visibility = "hidden";
	$("chord_display").style.visibility = "hidden";

	$("fretboard").style.visibility = "hidden";
	$("piano").style.visibility = "hidden";
	$("answer_container").style.visibility = "hidden";
}

function showNoteAnswer(note){

	
	update_UI_note("note", note);
	$("init_view").style.visibility = "hidden";
	$("note_display").style.visibility = "visible";
	$("interval_display").style.visibility = "hidden";
	$("chord_display").style.visibility = "hidden";

	$("fretboard").style.visibility = "visible";
	$("piano").style.visibility = "visible";
	$("answer_container").style.visibility = "visible";
}

function update_UI_note(id_prefix, note) {

	$(id_prefix + "_name").innerHTML = is_compact_window() ? note.note_name.type.substring(0,2) : note.note_name.type;
	$(id_prefix + "_octave").innerHTML = note.octave;
	$(id_prefix + "_color").style.backgroundColor = note.note_name.color;
	//piano 21, 108
	var gray_scale_percent = (note.midi_value - 21) / (108 - 21)

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

	let INTERVAL_PLAY_TYPE = musicKit.Interval.PLAY_TYPE;
	update_UI_note("first_note", interval.play_type == musicKit.Interval.PLAY_TYPE.ASCENDING ? interval.lower_note : interval.getHigherNote(musicKit.all_notes));
	update_UI_note("second_note", interval.play_type == musicKit.Interval.PLAY_TYPE.ASCENDING ? interval.getHigherNote(musicKit.all_notes): interval.lower_note);

	$("interval_type").innerHTML = interval.type + ":";

	if(interval.play_type == musicKit.Interval.PLAY_TYPE.ASCENDING) {
		$("interval_play_type_img").style.display = "block";
		$("interval_play_type_img").src = "img/up_arrow_white.svg";
		$("interval_play_type").innerHTML = "";
	}
	else if (interval.play_type == musicKit.Interval.PLAY_TYPE.DESCENDING) {
		$("interval_play_type_img").style.display = "block";
		$("interval_play_type_img").src = "img/down_arrow_white.svg";
		$("interval_play_type").innerHTML = "";
	} else {
		$("interval_play_type_img").style.display = "none";
		$("interval_play_type").innerHTML = "&";	
	}
	
	$("init_view").style.visibility = "hidden";
	$("note_display").style.visibility = "hidden";
	$("interval_display").style.visibility = "visible";
	$("chord_display").style.visibility = "hidden";

	$("fretboard").style.visibility = "visible";
	$("piano").style.visibility = "visible";
	$("answer_container").style.visibility = "visible";
}

function showChordAnswer(chord){

	$("chord_name").innerHTML = chord.name;
	$("chord_structure").innerHTML = is_compact_window() ? "" : "(" + chord.structure + ")";
	$("chord_inversion").innerHTML = (chord.inversion == musicKit.Chord.INVERSION_TYPE.Root) ? "" : chord.inversion ;

	$("init_view").style.visibility = "hidden";
	$("note_display").style.visibility = "hidden";
	$("interval_display").style.visibility = "hidden";
	$("chord_display").style.visibility = "visible";

	$("fretboard").style.visibility = "visible";
	$("piano").style.visibility = "visible";
	$("answer_container").style.visibility = "visible";
}


init();