// https://surikov.github.io/webaudiofont/

var midi_controller = {

	duration_in_sec: 3.5,
	tone: {},
	audioContext: {},
	player: {},
	tone: getJCLive()
}


midi_controller.init = function() {
	//console.log("midi_controller.init");
	midi_controller.player = new WebAudioFontPlayer();
	//player.loader.decodeAfterLoading(.audioContext, '_tone_0000_JCLive_sf2_file');
}

var midi_initialized = false;
var AudioContextFunc = window.AudioContext || window.webkitAudioContext;
midi_controller.load = function(){
	if(!midi_initialized){
		//console.log("midi_controller.load");
		midi_controller.audioContext = new AudioContextFunc();
		midi_controller.player.adjustPreset(midi_controller.audioContext, midi_controller.tone);
		midi_initialized = true;
		return true;
	}

	return false;
}

midi_controller.generate_random_note = function() {
	return midi_controller.generate_random_note_with(0, 127);
}


midi_controller.playNote = function(note, duration_in_sec = 3.5) {
	this.player.queueWaveTable(this.audioContext, this.audioContext.destination, this.tone, this.audioContext.currentTime, note.note_value, this.duration_in_sec, model.volume);
}

midi_controller.playInterval = function(interval, duration_in_sec = 3.5) {

	var lower_note = interval.lower_note;
	var higher_note = interval.higher_note;
	var play_type = interval.play_type;	

	var delay_between_notes = this.audioContext.currentTime + (interval.delay_in_ms / 1000);

	if(play_type == INTERVAL_PLAY_TYPE.HARMONIC) {
		this.player.queueWaveTable(this.audioContext, this.audioContext.destination, this.tone, 0, lower_note.note_value, this.duration_in_sec, model.volume);
		this.player.queueWaveTable(this.audioContext, this.audioContext.destination, selectedPreset, 0, higher_note.note_value, this.duration_in_sec, model.volume);
	} else if (play_type == INTERVAL_PLAY_TYPE.DESCENDING){ 
		this.player.queueWaveTable(this.audioContext, this.audioContext.destination, this.tone, 0, higher_note.note_value, this.duration_in_sec, model.volume);
		this.player.queueWaveTable(this.audioContext, this.audioContext.destination, this.tone, delay_between_notes, lower_note.note_value, this.duration_in_sec, model.volume);
	} else {
		this.player.queueWaveTable(this.audioContext, this.audioContext.destination, this.tone, 0, lower_note.note_value, duration_in_sec, model.volume);
		this.player.queueWaveTable(this.audioContext, this.audioContext.destination, this.tone, delay_between_notes, higher_note.note_value, this.duration_in_sec, model.volume);
	}
}

midi_controller.playChord = function(chord, duration_in_sec = 3.5) {

	$("chord_name").innerHTML = chord.name; //  todo move
	$("chord_structure").innerHTML = chord.structure;
	$("chord_octave").innerHTML = chord.octave_display;
	var i;
	for(i = 0 ; i <chord.note_array.length; i++){
		var note = chord.note_array[i];
		 this.player.queueWaveTable(this.audioContext, this.audioContext.destination, this.tone, this.audioContext.currentTime, note.note_value, this.duration_in_sec, model.volume);
	}
}