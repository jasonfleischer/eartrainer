// audio files generated here:
// https://ttsmp3.com/ with Joey then modified with Audacity





function isDurationExpired(){

	if(!isDurationInfinte()) {
		var running_time = new Date() - audio_controller.start_time;
		var durationInMS = getDurationInMS()
		if(running_time > durationInMS){
			log("Duration expired")
			return true;
		}
	}
	return false

	function isDurationInfinte(){
		return model.duration == DURATION.INFINITE;
	}

	function getDurationInMS(){
		if (isDurationInfinte()){
			logE("Infinte duration has no MS")
			return DURATION.SIXTY_MINUTES;
		} else {
			return model.duration * 60000;
		}
	}
}


function reloadActivePlayer(){
	if(audio_controller.playing){
		audio_controller.model_changed = true;
	}
}

var new_beat_division = 0;
function reloadDivisions(value){
	if(audio_controller.playing){
		
		audio_controller.divisions_changed = true;
		new_beat_division = value;

	} else {
		model.beat_division = value;
	}
}

function reloadBPM(value){
	if(audio_controller.playing){
		audio_controller.bpm_changed = true;
	} 
}

function forcePlay(){ // todo remove
	audio_controller.pause();
	update_UI_stopped();
	audio_controller.play();
	update_UI_playing();
}

function forceStop(){
	var was_playing = false;
	if(audio_controller.playing) {
		audio_controller.playPause()
		update_UI_stopped();
		was_playing = true;
	}	
	return was_playing;
}


function playPause(){ // todo rename play

	var loading = midi_controller.load();

	var j;
	for(j=0; j<4; j++){
		audio_controller.preloaded_audio[j] = document.createElement("AUDIO");
	}

	
	

	if(loading) {
		setTimeout(function() {
			log("delayed execution for midi loading")
			continuePlay();
		}, 500);
	} else {
		continuePlay()
	}
	function continuePlay() {
		var audio_is_playing = audio_controller.playPause();
		if(audio_is_playing) 
			update_UI_playing();
		else 
			update_UI_stopped();
	}
}

var audio_controller = {
	index: 0,

	start_time: 0,

	note: {},
	interval: {},
	chord: {},

	preloaded_audio: [],

	//old
	playing: false,
	timer_id: {},
	audio_queue: [],
	text_queue: [],


	model_changed: false, /// rename time_signature_change

	divisions_changed: false,
	bpm_changed: false,

	gain_node: {},
	context: {}
}

audio_controller.init_sounds =function(){

}

audio_controller.playPause = function(){
	if(this.playing)
		this.pause();
	else 
		this.play(model);
	return this.playing;
}

audio_controller.pause = function(){
	if (this.playing) clearInterval(audio_controller.timer_id);
	this.playing = false;
}

audio_controller.reloadSounds= function(){

}

audio_controller.play = function(){

	audio_controller.start_time = new Date();

	audio_controller.index = 1;

	this.playing = true;
	this.reloadSounds();

	var audio_queue_index = 0;

	function BPMtoMilliSeconds(BPM) { return 1000 / (BPM / 60); }
	var time_division_milli_seconds = BPMtoMilliSeconds(model.BPM) / model.beat_division;
	//if(!window.mobileCheck()){
		audio_controller.executeAudioTimer(audio_queue_index, this.accent_audio, this.audio_queue, this.text_queue);
	//}
	var interval = time_division_milli_seconds;
	var expected = Date.now() + interval;


	audio_controller.timer_id = setTimeout(step, interval);
	
	function step() {

		if(isDurationExpired()) {
			logE("force close")
			clearInterval(audio_controller.timer_id);
			return;
		}

	    var drift = Date.now() - expected; 
	    if (drift > interval) {
	    	logE("something really bad happened. Maybe the browser (tab) was inactive? possibly special handling to avoid futile 'catch up' run");
	        audio_controller.pause();
	    }
		audio_queue_index = (audio_queue_index + 1) % audio_controller.audio_queue.length;

		if(audio_controller.model_changed){
			audio_controller.model_changed = false;
			forcePlay();
		} else {

			var time_division_milli_seconds = BPMtoMilliSeconds(model.BPM) / model.beat_division;
			audio_controller.executeAudioTimer(audio_queue_index, audio_controller.accent_audio, audio_controller.audio_queue, audio_controller.text_queue, time_division_milli_seconds);


			if(audio_controller.bpm_changed){
				audio_controller.bpm_changed = false;

				var time_division_milli_seconds = BPMtoMilliSeconds(model.BPM) / model.beat_division;
				interval = time_division_milli_seconds;
				expected = Date.now() + interval;
				audio_controller.timer_id = setTimeout(step, interval);
				
				//time_view.reloadBPM(audio_queue_index);

			} else if(audio_queue_index%model.beat_division == 0 && audio_controller.divisions_changed){

				audio_controller.divisions_changed = false;
				var old_length = audio_controller.audio_queue.length;
				model.beat_division = new_beat_division;
				audio_controller.reloadSounds();

				var time_division_milli_seconds = BPMtoMilliSeconds(model.BPM) / new_beat_division;
				interval = time_division_milli_seconds;
				expected = Date.now() + interval;
				audio_queue_index = (audio_queue_index / old_length) * audio_controller.audio_queue.length;
				audio_controller.timer_id = setTimeout(step, interval);

			} else {
		    	expected += interval;
		    	audio_controller.timer_id = setTimeout(step, Math.max(0, interval - drift));
			}
			
		}		
	}
}

function play_audio_string_sequence(audio_string_array){
	var audio_array = audio_controller.preloaded_audio;
	var j;
	for(j=0; j<audio_string_array.length; j++){
		//var audio = document.createElement("AUDIO");
		audio_array[j].setAttribute("src",audio_string_array[j]);
		audio_array[j].volume = model.speak_volume;
	}
	play_audio_sequence(audio_array);
	function play_audio_sequence(audio_array){
		
		var i = 0;
		var repeat_function = function(){
			
			audio_array[i].removeEventListener("ended", repeat_function);
			i = i + 1;
			
			if(i < audio_array.length){
				audio_array[i].addEventListener("ended", repeat_function);
				audio_array[i].play()
			} 
		}
		audio_array[i].addEventListener("ended", repeat_function);
		audio_array[i].play();
	}
}

function playFile(file){
	var audio = audio_controller.preloaded_audio[0];
	audio.setAttribute("src", file);
	audio.volume = model.speak_volume;
	var promise = audio.play();

	//is this needed for mobile?
	if (promise !== undefined) {
	    promise.catch(error => {
	        // Auto-play was prevented
	        logE("Play Error:  " + error);
	    }).then(() => {
	        // Auto-play started
	    });
	}
}

function playNoteName(note) {
	var note_name = note.note_name;
	if(note_name.is_sharp_or_flat){
		play_audio_string_sequence(note_name.file_name);
	} else {
		playFile(note_name.file_name);
	}
}

function playInterval(interval) {
	playFile(interval.audio_file_name);
}

function playChord(chord) {
	//playFile(interval.audio_file_name);
}

var type = TYPE.SINGLE_NOTE;
function getAudioType(){

	var audio_types = [];

	if(model.single_notes.enabled)
		audio_types.push(TYPE.SINGLE_NOTE);
	if(model.interval.enabled)
		audio_types.push(TYPE.INTERVAL);
	if(model.chords.enabled)
		audio_types.push(TYPE.CHORD);

	if(audio_types.count == 0)
		return TYPE.SINGLE_NOTE;

	var rand = randomIntFromInterval(0,audio_types.length-1);
    return audio_types[rand];
}

audio_controller.executeAudioTimer = function(index, accent_audio, audio_queue, text_queue, time_division_milli_seconds) {


	if(audio_controller.index % 2 != 0){

		if(isDurationExpired()) {
			forceStop();
			clearInterval(audio_controller.timer_id);
			hideAnswer();
			return;
		}

		type = getAudioType();
	} 

	if(type == TYPE.SINGLE_NOTE){
		executeSingleNote();
	} else if(type == TYPE.INTERVAL){
		executeInterval();
	} else if(type == TYPE.CHORD){
		executeChord();
	} else {
		logE("unknown type");
		executeSingleNote();
	}
	audio_controller.index = audio_controller.index + 1;




	function executeSingleNote() {
		if(audio_controller.index % 2 == 0){
			var note = audio_controller.note;
			showNoteAnswer(note);
			if(model.speak){
				playNoteName(note);
			}
			fretboard_view.drawNote(note);

		} else {
			hideAnswer();
			audio_controller.note = generate_random_note(40, 84);
		}

		midi_controller.playNote(audio_controller.note, time_division_milli_seconds/1000);
	}

	function executeInterval() {
		if(audio_controller.index % 2 == 0){
			var interval = audio_controller.interval;
			showIntervalAnswer(interval);
			if(model.speak){
				playInterval(interval);
			}
			fretboard_view.drawInterval(interval);
		} else  {
			hideAnswer();
			audio_controller.interval = createRandomInterval(40, 84);
		}

		midi_controller.playInterval(audio_controller.interval);
	}

	function executeChord() {

		
		if(audio_controller.index % 2 == 0){
			var chord = audio_controller.chord;
			showChordAnswer(chord);
			if(model.speak){
				playChord(chord);
			}
			fretboard_view.drawChord(chord);
		} else  {
			hideAnswer();
			audio_controller.chord = generate_random_chord(40, 84);
		}
		midi_controller.playChord(audio_controller.chord);
	}
}

