var storage = {};

storage.load = function(){
	model.duration = storage.get_duration(DURATION.TEN_MINUTES);
	model.instrument = storage.get_instrument(INSTRUMENT.PIANO);

	model.BPM = storage.get_BPM(8);
	model.volume = storage.get_volume(0.1);
	model.speak = storage.get_speak(true);
	model.speak_volume = storage.get_speak_volume(0.25);
	model.range.min = storage.get_range_minimum(musicKit.piano_range.min);
	model.range.max = storage.get_range_maximum(musicKit.piano_range.min);

	model.single_notes.enabled = storage.get_single_notes(true);

	loadInstrumentDisplayDiagramData();
	function loadInstrumentDisplayDiagramData(){
		if(storage.get_instrument_display_piano(true))
			model.display_diagrams.push(DISPLAY_DIAGRAM.PIANO)
		if(storage.get_instrument_display_guitar(true))
			model.display_diagrams.push(DISPLAY_DIAGRAM.GUITAR)
	}

	loadIntervalData();
	function loadIntervalData(){
		model.interval.enabled = storage.get_intervals(true);

		let INTERVAL_TYPE = musicKit.Interval.TYPE;
		if(storage.get_minor_second(true))
			model.interval.types.push(INTERVAL_TYPE.MINOR_SECOND)
		if(storage.get_major_second(true))
			model.interval.types.push(INTERVAL_TYPE.MAJOR_SECOND)
		if(storage.get_minor_third(true))
			model.interval.types.push(INTERVAL_TYPE.MINOR_THIRD)
		if(storage.get_major_third(true))
			model.interval.types.push(INTERVAL_TYPE.MAJOR_THIRD)
		if(storage.get_perfect_fourth(true))
			model.interval.types.push(INTERVAL_TYPE.PERFECT_FOURTH)
		if(storage.get_tritone(true))
			model.interval.types.push(INTERVAL_TYPE.TRITONE)
		if(storage.get_perfect_fifth(true))
			model.interval.types.push(INTERVAL_TYPE.PERFECT_FIFTH)
		if(storage.get_minor_sixth(true))
			model.interval.types.push(INTERVAL_TYPE.MINOR_SIXTH)
		if(storage.get_major_sixth(true))
			model.interval.types.push(INTERVAL_TYPE.MAJOR_SIXTH)
		if(storage.get_minor_seventh(true))
			model.interval.types.push(INTERVAL_TYPE.MINOR_SEVENTH)
		if(storage.get_major_seventh(true))
			model.interval.types.push(INTERVAL_TYPE.MAJOR_SEVENTH)
		if(storage.get_octave(true))
			model.interval.types.push(INTERVAL_TYPE.OCTAVE)

		let INTERVAL_PLAY_TYPE = musicKit.Interval.PLAY_TYPE;
		if(storage.get_ascending(true))
			model.interval.play_types.push(INTERVAL_PLAY_TYPE.ASCENDING)
		if(storage.get_descending(true))
			model.interval.play_types.push(INTERVAL_PLAY_TYPE.DESCENDING)
		if(storage.get_harmonic(false))
			model.interval.play_types.push(INTERVAL_PLAY_TYPE.HARMONIC)
	}

	loadChordData();
	function loadChordData(){
		model.chords.enabled = storage.get_chords(true);

		let CHORD_TYPE = musicKit.Chord.TYPE;
		if(storage.get_chords_major(true))
			model.chords.three_note_types.push(CHORD_TYPE.Major);
		if(storage.get_chords_minor(true))
			model.chords.three_note_types.push(CHORD_TYPE.minor);
		if(storage.get_chords_augmented(false))
			model.chords.three_note_types.push(CHORD_TYPE.Aug);
		if(storage.get_chords_diminished(false))
			model.chords.three_note_types.push(CHORD_TYPE.Dim);
		if(storage.get_chords_major7(false))
			model.chords.four_note_types.push(CHORD_TYPE.Major7);
		if(storage.get_chords_minor7(false))
			model.chords.four_note_types.push(CHORD_TYPE.minor7);
		if(storage.get_chords_dominant7(false))
			model.chords.four_note_types.push(CHORD_TYPE.Dom7);

		let CHORD_INVERSION_TYPE = musicKit.Chord.INVERSION_TYPE;
		if(storage.get_chords_three_note_inversion_root(true))
			model.chords.three_note_inversion_types.push(CHORD_INVERSION_TYPE.Root);
		if(storage.get_chords_three_note_inversion_first(false))
			model.chords.three_note_inversion_types.push(CHORD_INVERSION_TYPE.First);
		if(storage.get_chords_three_note_inversion_second(false))
			model.chords.three_note_inversion_types.push(CHORD_INVERSION_TYPE.Second);

		if(storage.get_chords_major_seven(false))
			model.chords.four_note_types.push(CHORD_TYPE.Major7);
		if(storage.get_chords_minor_seven(false))
			model.chords.four_note_types.push(CHORD_TYPE.minor7);
		if(storage.get_chords_dominant_seven(false))
			model.chords.four_note_types.push(CHORD_TYPE.Dom7);

		if(storage.get_chords_four_note_inversion_root(true))
			model.chords.four_note_inversion_types.push(CHORD_INVERSION_TYPE.Root);
		if(storage.get_chords_four_note_inversion_first(false))
			model.chords.four_note_inversion_types.push(CHORD_INVERSION_TYPE.First);
		if(storage.get_chords_four_note_inversion_second(false))
			model.chords.four_note_inversion_types.push(CHORD_INVERSION_TYPE.Second);
		if(storage.get_chords_four_note_inversion_second(false))
			model.chords.four_note_inversion_types.push(CHORD_INVERSION_TYPE.Third);

		let CHORD_PLAY_TYPE = musicKit.Chord.PLAY_TYPE;
		if(storage.get_chords_harmonic(true))
			model.chords.play_types.push(CHORD_PLAY_TYPE.HARMONIC)
		if(storage.get_chords_arpeggiate(false))
			model.chords.play_types.push(CHORD_PLAY_TYPE.ARPEGGIATE)
	}
}

storage.BPM_KEY = "EAR_TRAINER_BPM_KEY";
storage.get_BPM = function(default_value){
	return parseInt(storage.get(storage.BPM_KEY, default_value));
};
storage.set_BPM = function(value){
	localStorage.setItem(storage.BPM_KEY, value);
};

storage.DURATION_KEY = "EAR_TRAINER_DURATION_KEY";
storage.get_duration = function(default_value){
	return parseFloat(storage.get(storage.DURATION_KEY, default_value));
};
storage.set_duration = function(value){
	localStorage.setItem(storage.DURATION_KEY, value);
};

storage.INSTRUMENT_KEY = "EAR_TRAINER_INSTRUMENT_KEY";
storage.get_instrument = function(default_value){
	return parseFloat(storage.get(storage.INSTRUMENT_KEY, default_value));
};
storage.set_instrument = function(value){
	localStorage.setItem(storage.INSTRUMENT_KEY, value);
};

storage.VOLUME_KEY = "EAR_TRAINER_VOLUME_KEY";
storage.get_volume = function(default_value){
	return parseFloat(storage.get(storage.VOLUME_KEY, default_value));
};
storage.set_volume = function(value){
	localStorage.setItem(storage.VOLUME_KEY, value);
};

storage.SPEAK = "EAR_TRAINER_SPEAK";
storage.get_speak = function(default_value){
	var value = storage.get(storage.SPEAK, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_speak = function(value){
	localStorage.setItem(storage.SPEAK, value);
};

storage.SPEAK_VOLUME_KEY = "EAR_TRAINER_SPEAK_VOLUME_KEY";
storage.get_speak_volume = function(default_value){
	return parseFloat(storage.get(storage.SPEAK_VOLUME_KEY, default_value));
};
storage.set_speak_volume = function(value){
	localStorage.setItem(storage.SPEAK_VOLUME_KEY, value);
};

storage.RANGE_MIN = "EAR_TRAINER_RANGE_MIN";
storage.get_range_minimum = function(default_value){
	return parseFloat(storage.get(storage.RANGE_MIN, default_value));
};
storage.set_range_minimum = function(value){
	localStorage.setItem(storage.RANGE_MIN, value);
};
storage.RANGE_MAX = "EAR_TRAINER_RANGE_MAX";
storage.get_range_maximum = function(default_value){
	return parseFloat(storage.get(storage.RANGE_MAX, default_value));
};
storage.set_range_maximum = function(value){
	localStorage.setItem(storage.RANGE_MAX, value);
};


storage.set_display_diagrams = function(display_type, value){
	switch(display_type) {
		case DISPLAY_DIAGRAM.PIANO:
			storage.set_instrument_display_piano(value);
			break;
		case DISPLAY_DIAGRAM.GUITAR:
			storage.set_instrument_display_guitar(value);
			break;
	}
};
storage.INSTRUMENT_DISPLAY_PIANO = "EAR_TRAINER_INSTRUMENT_DISPLAY_PIANO";
storage.get_instrument_display_piano = function(default_value){
	var value = storage.get(storage.INSTRUMENT_DISPLAY_PIANO, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_instrument_display_piano = function(value){
	localStorage.setItem(storage.INSTRUMENT_DISPLAY_PIANO, value);
};
storage.INSTRUMENT_DISPLAY_GUITAR = "EAR_TRAINER_INSTRUMENT_DISPLAY_GUITAR";
storage.get_instrument_display_guitar = function(default_value){
	var value = storage.get(storage.INSTRUMENT_DISPLAY_GUITAR, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_instrument_display_guitar = function(value){
	localStorage.setItem(storage.INSTRUMENT_DISPLAY_GUITAR, value);
};

storage.SINGLE_NOTES = "EAR_TRAINER_SINGLE_NOTES";
storage.get_single_notes = function(default_value){
	var value = storage.get(storage.SINGLE_NOTES, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_single_notes = function(value){
	localStorage.setItem(storage.SINGLE_NOTES, value);
};

storage.INTERVALS = "EAR_TRAINER_INTERVALS";
storage.get_intervals = function(default_value){
	var value = storage.get(storage.INTERVALS, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_intervals = function(value){
	localStorage.setItem(storage.INTERVALS, value);
};

storage.set_interval_type = function(interval_type, value){
	let INTERVAL_TYPE = musicKit.Interval.TYPE;
	switch(interval_type) {
		case INTERVAL_TYPE.MINOR_SECOND:
			storage.set_minor_second(value);
			break;
		case INTERVAL_TYPE.MAJOR_SECOND:
			storage.set_major_second(value);
			break;
		case INTERVAL_TYPE.MINOR_THIRD:
			storage.set_minor_third(value);
			break;
		case INTERVAL_TYPE.MAJOR_THIRD:
			storage.set_major_third(value);
			break;
		case INTERVAL_TYPE.PERFECT_FOURTH:
			storage.set_perfect_fourth(value);
			break;
		case INTERVAL_TYPE.TRITONE:
			storage.set_tritone(value);
			break;
		case INTERVAL_TYPE.PERFECT_FIFTH:
			storage.set_perfect_fifth(value);
			break;
		case INTERVAL_TYPE.MINOR_SIXTH:
			storage.set_minor_sixth(value);
			break;
		case INTERVAL_TYPE.MAJOR_SIXTH:
			storage.set_major_sixth(value);
			break;
		case INTERVAL_TYPE.MINOR_SEVENTH:
			storage.set_minor_seventh(value);
			break;
		case INTERVAL_TYPE.MAJOR_SEVENTH:
			storage.set_major_seventh(value);
			break;
		case INTERVAL_TYPE.OCTAVE:
			storage.set_octave(value);
			break;
	}
};

storage.MINOR_SECOND = "EAR_TRAINER_MINOR_SECOND";
storage.get_minor_second = function(default_value){
	var value = storage.get(storage.MINOR_SECOND, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_minor_second = function(value){
	localStorage.setItem(storage.MINOR_SECOND, value);
};

storage.MAJOR_SECOND = "EAR_TRAINER_MAJOR_SECOND";
storage.get_major_second = function(default_value){
	var value = storage.get(storage.MAJOR_SECOND, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_major_second = function(value){
	localStorage.setItem(storage.MAJOR_SECOND, value);
};

storage.MINOR_THIRD = "EAR_TRAINER_MINOR_THIRD";
storage.get_minor_third = function(default_value){
	var value = storage.get(storage.MINOR_THIRD, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_minor_third = function(value){
	localStorage.setItem(storage.MINOR_THIRD, value);
};

storage.MAJOR_THIRD = "EAR_TRAINER_MAJOR_THIRD";
storage.get_major_third = function(default_value){
	var value = storage.get(storage.MAJOR_THIRD, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_major_third = function(value){
	localStorage.setItem(storage.MAJOR_THIRD, value);
};

storage.PERFECT_FOURTH = "EAR_TRAINER_PERFECT_FOURTH";
storage.get_perfect_fourth = function(default_value){
	var value = storage.get(storage.PERFECT_FOURTH, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_perfect_fourth = function(value){
	localStorage.setItem(storage.PERFECT_FOURTH, value);
};

storage.TRITONE = "EAR_TRAINER_TRITONE";
storage.get_tritone = function(default_value){
	var value = storage.get(storage.TRITONE, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_tritone = function(value){
	localStorage.setItem(storage.TRITONE, value);
};

storage.PERFECT_FIFTH = "EAR_TRAINER_PERFECT_FIFTH";
storage.get_perfect_fifth = function(default_value){
	var value = storage.get(storage.PERFECT_FIFTH, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_perfect_fifth = function(value){
	localStorage.setItem(storage.PERFECT_FIFTH, value);
};

storage.MINOR_SIXTH = "EAR_TRAINER_MINOR_SIXTH";
storage.get_minor_sixth = function(default_value){
	var value = storage.get(storage.MINOR_SIXTH, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_minor_sixth = function(value){
	localStorage.setItem(storage.MINOR_SIXTH, value);
};

storage.MAJOR_SIXTH = "EAR_TRAINER_MAJOR_SIXTH";
storage.get_major_sixth = function(default_value){
	var value = storage.get(storage.MAJOR_SIXTH, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_major_sixth = function(value){
	localStorage.setItem(storage.MAJOR_SIXTH, value);
};

storage.MINOR_SEVENTH = "EAR_TRAINER_MINOR_SEVENTH";
storage.get_minor_seventh = function(default_value){
	var value = storage.get(storage.MINOR_SEVENTH, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_minor_seventh = function(value){
	localStorage.setItem(storage.MINOR_SEVENTH, value);
};

storage.MAJOR_SEVENTH = "EAR_TRAINER_MAJOR_SEVENTH";
storage.get_major_seventh = function(default_value){
	var value = storage.get(storage.MAJOR_SEVENTH, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_major_seventh = function(value){
	localStorage.setItem(storage.MAJOR_SEVENTH, value);
};

storage.OCTAVE = "EAR_TRAINER_OCTAVE";
storage.get_octave = function(default_value){
	var value = storage.get(storage.OCTAVE, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_octave = function(value){
	localStorage.setItem(storage.OCTAVE, value);
};

storage.set_interval_play_type = function(interval_play_type, value){
	let INTERVAL_PLAY_TYPE = musicKit.Interval.PLAY_TYPE;
	switch(interval_play_type) {
		case INTERVAL_PLAY_TYPE.ASCENDING:
			storage.set_ascending(value);
			break;
		case INTERVAL_PLAY_TYPE.DESCENDING:
			storage.set_descending(value);
			break;
		case INTERVAL_PLAY_TYPE.HARMONIC:
			storage.set_harmonic(value);
			break;
	}
}

storage.ASCENDING = "EAR_TRAINER_ASCENDING";
storage.get_ascending = function(default_value){
	var value = storage.get(storage.ASCENDING, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_ascending = function(value){
	localStorage.setItem(storage.ASCENDING, value);
};

storage.DESCENDING = "EAR_TRAINER_DESCENDING";
storage.get_descending = function(default_value){
	var value = storage.get(storage.DESCENDING, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_descending = function(value){
	localStorage.setItem(storage.DESCENDING, value);
};

storage.HARMONIC = "EAR_TRAINER_HARMONIC";
storage.get_harmonic = function(default_value){
	var value = storage.get(storage.HARMONIC, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_harmonic = function(value){
	localStorage.setItem(storage.HARMONIC, value);
};


storage.CHORDS = "EAR_TRAINER_CHORDS";
storage.get_chords = function(default_value){
	var value = storage.get(storage.CHORDS, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_chords = function(value){
	localStorage.setItem(storage.CHORDS, value);
};

storage.set_chord_three_note_type = function(type, value){
	let CHORD_TYPE = musicKit.Chord.TYPE;
	switch(type) {
		case CHORD_TYPE.Major:
			storage.set_chords_major(value);
			break;
		case CHORD_TYPE.minor:
			storage.set_chords_minor(value);
			break;
		case CHORD_TYPE.Aug:
			storage.set_chords_augmented(value);
			break;
		case CHORD_TYPE.Dim:
			storage.set_chords_diminished(value);
			break;
		case CHORD_TYPE.Major7:
			storage.set_chords_major7(value);
			break;
		case CHORD_TYPE.minor7:
			storage.set_chords_minor7(value);
			break;
		case CHORD_TYPE.Dom7:
			storage.set_chords_dominant7(value);
			break;
	}
}
storage.CHORD_MAJOR = "EAR_TRAINER_CHORD_MAJOR";
storage.get_chords_major = function(default_value){
	var value = storage.get(storage.CHORD_MAJOR, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_chords_major = function(value){
	localStorage.setItem(storage.CHORD_MAJOR, value);
};
storage.CHORD_MINOR = "EAR_TRAINER_CHORD_MINOR";
storage.get_chords_minor = function(default_value){
	var value = storage.get(storage.CHORD_MINOR, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_chords_minor = function(value){
	localStorage.setItem(storage.CHORD_MINOR, value);
};
storage.CHORD_AUG = "EAR_TRAINER_CHORD_AUG";
storage.get_chords_augmented = function(default_value){
	var value = storage.get(storage.CHORD_AUG, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_chords_augmented = function(value){
	localStorage.setItem(storage.CHORD_AUG, value);
};
storage.CHORD_DIM = "EAR_TRAINER_CHORD_DIM";
storage.get_chords_diminished = function(default_value){
	var value = storage.get(storage.CHORD_DIM, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_chords_diminished = function(value){
	localStorage.setItem(storage.CHORD_DIM, value);
};
storage.CHORD_MAJ7 = "EAR_TRAINER_CHORD_MAJ7";
storage.get_chords_major7 = function(default_value){
	var value = storage.get(storage.CHORD_MAJ7, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_chords_major7 = function(value){
	localStorage.setItem(storage.CHORD_MAJ7, value);
};
storage.CHORD_MIN7 = "EAR_TRAINER_CHORD_MIN7";
storage.get_chords_minor7 = function(default_value){
	var value = storage.get(storage.CHORD_MIN7, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_chords_minor7 = function(value){
	localStorage.setItem(storage.CHORD_MIN7, value);
};
storage.CHORD_DOM7 = "EAR_TRAINER_CHORD_DOM7";
storage.get_chords_dominant7 = function(default_value){
	var value = storage.get(storage.CHORD_DOM7, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_chords_dominant7 = function(value){
	localStorage.setItem(storage.CHORD_DOM7, value);
};

storage.set_chord_three_note_inversion_type = function(type, value){
	let CHORD_INVERSION_TYPE = musicKit.Chord.INVERSION_TYPE;
	switch(type) {
		case CHORD_INVERSION_TYPE.Root:
			storage.set_chords_three_note_inversion_root(value);
			break;
		case CHORD_INVERSION_TYPE.First:
			storage.set_chords_three_note_inversion_first(value);
			break;
		case CHORD_INVERSION_TYPE.Second:
			storage.set_chords_three_note_inversion_second(value);
			break;
	}
}
storage.CHORD_THREE_NOTE_ROOT = "EAR_TRAINER_CHORD_THREE_NOTE_ROOT";
storage.get_chords_three_note_inversion_root = function(default_value){
	var value = storage.get(storage.CHORD_THREE_NOTE_ROOT, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_chords_three_note_inversion_root = function(value){
	localStorage.setItem(storage.CHORD_THREE_NOTE_ROOT, value);
};
storage.CHORD_THREE_NOTE_FIRST = "EAR_TRAINER_CHORD_THREE_NOTE_FIRST";
storage.get_chords_three_note_inversion_first = function(default_value){
	var value = storage.get(storage.CHORD_THREE_NOTE_FIRST, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_chords_three_note_inversion_first = function(value){
	localStorage.setItem(storage.CHORD_THREE_NOTE_FIRST, value);
};
storage.CHORD_THREE_NOTE_SECOND = "EAR_TRAINER_CHORD_THREE_NOTE_SECOND";
storage.get_chords_three_note_inversion_second = function(default_value){
	var value = storage.get(storage.CHORD_THREE_NOTE_SECOND, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_chords_three_note_inversion_second = function(value){
	localStorage.setItem(storage.CHORD_THREE_NOTE_SECOND, value);
};

///

storage.set_chord_four_note_type = function(type, value){
	let CHORD_TYPE = musicKit.Chord.TYPE;
	switch(type) {
		case CHORD_TYPE.Major7:
			storage.set_chords_major_seven(value);
			break;
		case CHORD_TYPE.minor7:
			storage.set_chords_minor_seven(value);
			break;
		case CHORD_TYPE.Dom7:
			storage.set_chords_dominant_seven(value);
			break;
	}
}
storage.CHORD_MAJOR_SEVEN = "EAR_TRAINER_CHORD_MAJOR_SEVEN";
storage.get_chords_major_seven = function(default_value){
	var value = storage.get(storage.CHORD_MAJOR_SEVEN, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_chords_major_seven = function(value){
	localStorage.setItem(storage.CHORD_MAJOR_SEVEN, value);
};
storage.CHORD_MINOR_SEVEN = "EAR_TRAINER_CHORD_MINOR_SEVEN";
storage.get_chords_minor_seven = function(default_value){
	var value = storage.get(storage.CHORD_MINOR_SEVEN, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_chords_minor_seven = function(value){
	localStorage.setItem(storage.CHORD_MINOR_SEVEN, value);
};
storage.CHORD_DOM_SEVEN = "EAR_TRAINER_CHORD_DOM_SEVEN";
storage.get_chords_dominant_seven = function(default_value){
	var value = storage.get(storage.CHORD_DOM_SEVEN, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_chords_dominant_seven = function(value){
	localStorage.setItem(storage.CHORD_DOM_SEVEN, value);
};

storage.set_chord_four_note_inversion_type = function(type, value){
	let CHORD_INVERSION_TYPE = musicKit.Chord.INVERSION_TYPE;
	switch(type) {
		case CHORD_INVERSION_TYPE.Root:
			storage.set_chords_four_note_inversion_root(value);
			break;
		case CHORD_INVERSION_TYPE.First:
			storage.set_chords_four_note_inversion_first(value);
			break;
		case CHORD_INVERSION_TYPE.Second:
			storage.set_chords_four_note_inversion_second(value);
			break;
		case CHORD_INVERSION_TYPE.Third:
			storage.set_chords_four_note_inversion_second(value);
			break;
	}
}
storage.CHORD_FOUR_NOTE_ROOT = "EAR_TRAINER_CHORD_FOUR_NOTE_ROOT";
storage.get_chords_four_note_inversion_root = function(default_value){
	var value = storage.get(storage.CHORD_FOUR_NOTE_ROOT, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_chords_four_note_inversion_root = function(value){
	localStorage.setItem(storage.CHORD_FOUR_NOTE_ROOT, value);
};
storage.CHORD_FOUR_NOTE_FIRST = "EAR_TRAINER_CHORD_FOUR_NOTE_FIRST";
storage.get_chords_four_note_inversion_first = function(default_value){
	var value = storage.get(storage.CHORD_FOUR_NOTE_FIRST, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_chords_four_note_inversion_first = function(value){
	localStorage.setItem(storage.CHORD_FOUR_NOTE_FIRST, value);
};
storage.CHORD_FOUR_NOTE_SECOND = "EAR_TRAINER_CHORD_FOUR_NOTE_SECOND";
storage.get_chords_four_note_inversion_second = function(default_value){
	var value = storage.get(storage.CHORD_FOUR_NOTE_SECOND, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_chords_four_note_inversion_second = function(value){
	localStorage.setItem(storage.CHORD_FOUR_NOTE_SECOND, value);
};
storage.CHORD_FOUR_NOTE_THIRD = "EAR_TRAINER_CHORD_FOUR_NOTE_THIRD";
storage.get_chords_four_note_inversion_second = function(default_value){
	var value = storage.get(storage.CHORD_FOUR_NOTE_THIRD, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_chords_four_note_inversion_second = function(value){
	localStorage.setItem(storage.CHORD_FOUR_NOTE_THIRD, value);
};

///

storage.set_chord_play_type = function(play_type, value){
	let CHORD_PLAY_TYPE = musicKit.Chord.PLAY_TYPE;
	switch(play_type) {
		case CHORD_PLAY_TYPE.ARPEGGIATE:
			storage.set_chords_arpeggiate(value);
			break;
		case CHORD_PLAY_TYPE.HARMONIC:
			storage.set_chords_harmonic(value);
			break;
	}
}
storage.ARPEGGIATE = "EAR_TRAINER_ARPEGGIATE";
storage.get_chords_arpeggiate = function(default_value){
	var value = storage.get(storage.ARPEGGIATE, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_chords_arpeggiate = function(value){
	localStorage.setItem(storage.ARPEGGIATE, value);
};
storage.CHORDS_HARMONIC = "EAR_TRAINER_CHORDS_HARMONIC";
storage.get_chords_harmonic = function(default_value){
	var value = storage.get(storage.CHORDS_HARMONIC, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_chords_harmonic = function(value){
	localStorage.setItem(storage.CHORDS_HARMONIC, value);
};

storage.get = function(key, default_value) {
	let result = localStorage.getItem(key);
	return (result == undefined) ? default_value : result;
};

