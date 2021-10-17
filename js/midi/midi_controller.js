// https://surikov.github.io/webaudiofont/

var midi_controller = {

	duration_in_sec: 3.5,
	tone: {},
	audioContext: {},
	player: {},
	tone: getJCLive()
}


midi_controller.init = function() {
	midi_controller.player = new WebAudioFontPlayer();
}

var midi_initialized = false;
var AudioContextFunc = window.AudioContext || window.webkitAudioContext;
midi_controller.load = function(){
	if(!midi_initialized){
		midi_controller.audioContext = new AudioContextFunc();
		midi_controller.player.adjustPreset(midi_controller.audioContext, midi_controller.tone);
		midi_initialized = true;
		return true;
	}
	return false;
}

midi_controller.playNote = function(note, duration_in_sec = 3.5) {
	this.player.queueWaveTable(this.audioContext, this.audioContext.destination, this.tone, this.audioContext.currentTime, note.midi_value, this.duration_in_sec, model.volume);
}

midi_controller.playInterval = function(interval, duration_in_sec = 3.5) {

	var lower_note = interval.lower_note;
	var higher_note = interval.getHigherNote(musicKit.all_notes);
	var play_type = interval.play_type;	

	var delay_between_notes = this.audioContext.currentTime + (interval.delay_in_ms / 1000);

	if(play_type == musicKit.Interval.PLAY_TYPE.HARMONIC) {
		this.player.queueWaveTable(this.audioContext, this.audioContext.destination, this.tone, 0, lower_note.midi_value, this.duration_in_sec, model.volume);
		this.player.queueWaveTable(this.audioContext, this.audioContext.destination, this.tone, 0, higher_note.midi_value, this.duration_in_sec, model.volume);
	} else if (play_type == musicKit.Interval.PLAY_TYPE.DESCENDING){ 
		this.player.queueWaveTable(this.audioContext, this.audioContext.destination, this.tone, 0, higher_note.midi_value, this.duration_in_sec, model.volume);
		this.player.queueWaveTable(this.audioContext, this.audioContext.destination, this.tone, delay_between_notes, lower_note.midi_value, this.duration_in_sec, model.volume);
	} else {
		this.player.queueWaveTable(this.audioContext, this.audioContext.destination, this.tone, 0, lower_note.midi_value, duration_in_sec, model.volume);
		this.player.queueWaveTable(this.audioContext, this.audioContext.destination, this.tone, delay_between_notes, higher_note.midi_value, this.duration_in_sec, model.volume);
	}
}

midi_controller.playChord = function(chord, duration_in_sec = 3.5) {

	var delay = this.audioContext.currentTime;
	let note_array = chord.getNoteArray(musicKit.all_notes, model.range);
	var i;
	for(i = 0 ; i <note_array.length; i++){
		var note = note_array[i];
		this.player.queueWaveTable(this.audioContext, this.audioContext.destination, this.tone, delay, note.midi_value, this.duration_in_sec, model.volume);
		if(chord.play_type == musicKit.Chord.PLAY_TYPE.ARPEGGIATE) {
			delay = delay + (chord.delay_in_ms / 1000);
		}
	}	
}
