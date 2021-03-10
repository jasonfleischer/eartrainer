// https://surikov.github.io/webaudiofont/

var midi_controller = {}

var selectedPreset=_tone_0000_JCLive_sf2_file; //change instrument here eg. _tone_0000_Aspirin_sf2_file

var audioContext;
var player;


midi_controller.init = function() {

	var AudioContextFunc = window.AudioContext || window.webkitAudioContext;
	audioContext = new AudioContextFunc(); // creates warning
	player = new WebAudioFontPlayer();
	player.loader.decodeAfterLoading(audioContext, '_tone_0000_JCLive_sf2_file');
}

midi_controller.generate_random_note = function() {
	return midi_controller.generate_random_note_with(0, 127);
}


midi_controller.playNote = function(note, duration_in_sec = 3.5) {


	//TODO: remove
	var duration_in_sec = 3.5;
	player.queueWaveTable(audioContext, audioContext.destination, selectedPreset, 0, note.note_value, duration_in_sec, model.volume);
}


midi_controller.playInterval = function(interval, duration_in_sec = 3.5) {

	var lower_note = interval.lower_note;
	var higher_note = interval.higher_note;
	var play_type = interval.play_type;	

	var delay_between_notes = audioContext.currentTime + (interval.delay_in_ms / 1000);

	if(play_type == INTERVAL_PLAY_TYPE.HARMONIC) {
		player.queueWaveTable(audioContext, audioContext.destination, selectedPreset, 0, lower_note.note_value, duration_in_sec, model.volume);
		player.queueWaveTable(audioContext, audioContext.destination, selectedPreset, 0, higher_note.note_value, duration_in_sec, model.volume);
	} else if (play_type == INTERVAL_PLAY_TYPE.DESCENDING){ 
		player.queueWaveTable(audioContext, audioContext.destination, selectedPreset, 0, higher_note.note_value, duration_in_sec, model.volume);
		player.queueWaveTable(audioContext, audioContext.destination, selectedPreset, delay_between_notes, lower_note.note_value, duration_in_sec, model.volume);
	} else {
		player.queueWaveTable(audioContext, audioContext.destination, selectedPreset, 0, lower_note.note_value, duration_in_sec, model.volume);
		player.queueWaveTable(audioContext, audioContext.destination, selectedPreset, delay_between_notes, higher_note.note_value, duration_in_sec, model.volume);
	}
}


midi_controller.playChord = function(chord, duration_in_sec = 3.5) {

	$("chord_name").innerHTML = chord.name; //  todo move
	$("chord_structure").innerHTML = chord.structure;
	$("chord_octave").innerHTML = chord.octave_display;
	var i;
	for(i = 0 ; i <chord.note_array.length; i++){
		var note = chord.note_array[i];
		player.queueWaveTable(audioContext, audioContext.destination, selectedPreset, 0, note.note_value, duration_in_sec, model.volume);
	}
}