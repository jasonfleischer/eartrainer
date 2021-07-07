function load_cookies(){
	model.duration = cookies.get_duration(DURATION.THIRTY_MINUTES);

	
	model.BPM = cookies.get_BPM(8);
	model.volume = cookies.get_volume(0.1);//todo 1.0);
	model.speak = cookies.get_speak(true);
	model.speak_volume = cookies.get_speak_volume(0.25);//todo 1.0);
	//model.time_signature = cookies.get_time_signature(TIME_SIGNATURE.TS_4_4);
	//model.beat_division = cookies.get_subdivision(1);
	//model.accent_first_beat = cookies.get_accent_first_beat(true);
	//model.flash_screen = cookies.get_flash_screen(false);
	//model.tone = cookies.get_tone(TONE.NORMAL);

	model.single_notes.enabled = cookies.get_single_notes(false);

	model.interval.enabled = cookies.get_intervals(false);

	if(cookies.get_minor_second(true))
		model.interval.types.push(INTERVAL_TYPE.MINOR_SECOND)
	if(cookies.get_major_second(true))
		model.interval.types.push(INTERVAL_TYPE.MAJOR_SECOND)
	if(cookies.get_minor_third(true))
		model.interval.types.push(INTERVAL_TYPE.MINOR_THIRD)
	if(cookies.get_major_third(true))
		model.interval.types.push(INTERVAL_TYPE.MAJOR_THIRD)
	if(cookies.get_perfect_fourth(true))
		model.interval.types.push(INTERVAL_TYPE.PERFECT_FOURTH)
	if(cookies.get_tritone(true))
		model.interval.types.push(INTERVAL_TYPE.TRITONE)
	if(cookies.get_perfect_fifth(true))
		model.interval.types.push(INTERVAL_TYPE.PERFECT_FIFTH)
	if(cookies.get_minor_sixth(true))
		model.interval.types.push(INTERVAL_TYPE.MINOR_SIXTH)
	if(cookies.get_major_sixth(true))
		model.interval.types.push(INTERVAL_TYPE.MAJOR_SIXTH)
	if(cookies.get_minor_seventh(true))
		model.interval.types.push(INTERVAL_TYPE.MINOR_SEVENTH)
	if(cookies.get_major_seventh(true))
		model.interval.types.push(INTERVAL_TYPE.MAJOR_SEVENTH)
	if(cookies.get_octave(true))
		model.interval.types.push(INTERVAL_TYPE.OCTAVE)

	if(cookies.get_ascending(true))
		model.interval.play_types.push(INTERVAL_PLAY_TYPE.ASCENDING)
	if(cookies.get_descending(true))
		model.interval.play_types.push(INTERVAL_PLAY_TYPE.DESCENDING)
	if(cookies.get_harmonic(false))
		model.interval.play_types.push(INTERVAL_PLAY_TYPE.HARMONIC)

	model.chords.enabled = cookies.get_chords(true);

	if(cookies.get_chords_major(true))
		model.chords.three_note_types.push(CHORD_TYPE.Major);
	if(cookies.get_chords_minor(true))
		model.chords.three_note_types.push(CHORD_TYPE.minor);
	if(cookies.get_chords_augmented(false))
		model.chords.three_note_types.push(CHORD_TYPE.Aug);
	if(cookies.get_chords_diminished(false))
		model.chords.three_note_types.push(CHORD_TYPE.Dim);
	if(cookies.get_chords_major7(false))
		model.chords.four_note_types.push(CHORD_TYPE.Major7);
	if(cookies.get_chords_minor7(false))
		model.chords.four_note_types.push(CHORD_TYPE.minor7);
	if(cookies.get_chords_dominant7(false))
		model.chords.four_note_types.push(CHORD_TYPE.Dom7);

	if(cookies.get_chords_three_note_inversion_root(true))
		model.chords.three_note_inversion_types.push(CHORD_INVERSION_TYPE.Root);
	if(cookies.get_chords_three_note_inversion_first(false))
		model.chords.three_note_inversion_types.push(CHORD_INVERSION_TYPE.First);
	if(cookies.get_chords_three_note_inversion_second(false))
		model.chords.three_note_inversion_types.push(CHORD_INVERSION_TYPE.Second);

	if(cookies.get_chords_major_seven(false))
		model.chords.four_note_types.push(CHORD_TYPE.Major7);
	if(cookies.get_chords_minor_seven(false))
		model.chords.four_note_types.push(CHORD_TYPE.minor7);
	if(cookies.get_chords_dominant_seven(false))
		model.chords.four_note_types.push(CHORD_TYPE.Dom7);

	if(cookies.get_chords_four_note_inversion_root(true))
		model.chords.four_note_inversion_types.push(CHORD_INVERSION_TYPE.Root);
	if(cookies.get_chords_four_note_inversion_first(false))
		model.chords.four_note_inversion_types.push(CHORD_INVERSION_TYPE.First);
	if(cookies.get_chords_four_note_inversion_second(false))
		model.chords.four_note_inversion_types.push(CHORD_INVERSION_TYPE.Second);
	if(cookies.get_chords_four_note_inversion_second(false))
		model.chords.four_note_inversion_types.push(CHORD_INVERSION_TYPE.Third);

	if(cookies.get_chords_harmonic(true))
		model.chords.play_types.push(CHORD_PLAY_TYPE.HARMONIC)
	if(cookies.get_chords_arpeggiate(false))
		model.chords.play_types.push(CHORD_PLAY_TYPE.ARPEGGIATE)

	model.darkmode = cookies.get_darkmode(true);
}

var cookies = {};

cookies.BPM_KEY = "BPM_KEY";
cookies.get_BPM = function(default_value){
	return parseInt(cookies.getCookie(cookies.BPM_KEY, default_value));
};
cookies.set_BPM = function(value){
	document.cookie = cookies.BPM_KEY + "=" + value;
};
cookies.delete_BPM = function(){
	cookies.deleteCookie(cookies.BPM_KEY);
};

cookies.DURATION_KEY = "DURATION_KEY";
cookies.get_duration = function(default_value){
	return parseFloat(cookies.getCookie(cookies.DURATION_KEY, default_value));
};
cookies.set_duration = function(value){
	document.cookie = cookies.DURATION_KEY + "=" + value;
};

cookies.VOLUME_KEY = "VOLUME_KEY";
cookies.get_volume = function(default_value){
	return parseFloat(cookies.getCookie(cookies.VOLUME_KEY, default_value));
};
cookies.set_volume = function(value){
	document.cookie = cookies.VOLUME_KEY + "=" + value;
};
cookies.delete_volume = function(){
	cookies.deleteCookie(cookies.VOLUME_KEY);
};

cookies.SPEAK = "SPEAK";
cookies.get_speak = function(default_value){
	var value = cookies.getCookie(cookies.SPEAK, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_speak = function(value){
	document.cookie = cookies.SPEAK + "=" + value;
};

cookies.SPEAK_VOLUME_KEY = "SPEAK_VOLUME_KEY";
cookies.get_speak_volume = function(default_value){
	return parseFloat(cookies.getCookie(cookies.SPEAK_VOLUME_KEY, default_value));
};
cookies.set_speak_volume = function(value){
	document.cookie = cookies.SPEAK_VOLUME_KEY + "=" + value;
};

cookies.SINGLE_NOTES = "SINGLE_NOTES";
cookies.get_single_notes = function(default_value){
	var value = cookies.getCookie(cookies.SINGLE_NOTES, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_single_notes = function(value){
	document.cookie = cookies.SINGLE_NOTES + "=" + value;
};

cookies.INTERVALS = "INTERVALS";
cookies.get_intervals = function(default_value){
	var value = cookies.getCookie(cookies.INTERVALS, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_intervals = function(value){
	document.cookie = cookies.INTERVALS + "=" + value;
};

cookies.set_interval_type = function(interval_type, value){
	switch(interval_type) {
		case INTERVAL_TYPE.MINOR_SECOND:
			cookies.set_minor_second(value);
			break;
		case INTERVAL_TYPE.MAJOR_SECOND:
			cookies.set_major_second(value);
			break;
		case INTERVAL_TYPE.MINOR_THIRD:
			cookies.set_minor_third(value);
			break;
		case INTERVAL_TYPE.MAJOR_THIRD:
			cookies.set_major_third(value);
			break;
		case INTERVAL_TYPE.PERFECT_FOURTH:
			cookies.set_perfect_fourth(value);
			break;
		case INTERVAL_TYPE.TRITONE:
			cookies.set_tritone(value);
			break;
		case INTERVAL_TYPE.PERFECT_FIFTH:
			cookies.set_perfect_fifth(value);
			break;
		case INTERVAL_TYPE.MINOR_SIXTH:
			cookies.set_minor_sixth(value);
			break;
		case INTERVAL_TYPE.MAJOR_SIXTH:
			cookies.set_major_sixth(value);
			break;
		case INTERVAL_TYPE.MINOR_SEVENTH:
			cookies.set_minor_seventh(value);
			break;
		case INTERVAL_TYPE.MAJOR_SEVENTH:
			cookies.set_major_seventh(value);
			break;
		case INTERVAL_TYPE.OCTAVE:
			cookies.set_octave(value);
			break;
	}
};

cookies.MINOR_SECOND = "MINOR_SECOND";
cookies.get_minor_second = function(default_value){
	var value = cookies.getCookie(cookies.MINOR_SECOND, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_minor_second = function(value){
	document.cookie = cookies.MINOR_SECOND + "=" + value;
};

cookies.MAJOR_SECOND = "MAJOR_SECOND";
cookies.get_major_second = function(default_value){
	var value = cookies.getCookie(cookies.MAJOR_SECOND, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_major_second = function(value){
	document.cookie = cookies.MAJOR_SECOND + "=" + value;
};

cookies.MINOR_THIRD = "MINOR_THIRD";
cookies.get_minor_third = function(default_value){
	var value = cookies.getCookie(cookies.MINOR_THIRD, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_minor_third = function(value){
	document.cookie = cookies.MINOR_THIRD + "=" + value;
};

cookies.MAJOR_THIRD = "MAJOR_THIRD";
cookies.get_major_third = function(default_value){
	var value = cookies.getCookie(cookies.MAJOR_THIRD, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_major_third = function(value){
	document.cookie = cookies.MAJOR_THIRD + "=" + value;
};

cookies.PERFECT_FOURTH = "PERFECT_FOURTH";
cookies.get_perfect_fourth = function(default_value){
	var value = cookies.getCookie(cookies.PERFECT_FOURTH, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_perfect_fourth = function(value){
	document.cookie = cookies.PERFECT_FOURTH + "=" + value;
};

cookies.TRITONE = "TRITONE";
cookies.get_tritone = function(default_value){
	var value = cookies.getCookie(cookies.TRITONE, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_tritone = function(value){
	document.cookie = cookies.TRITONE + "=" + value;
};

cookies.PERFECT_FIFTH = "PERFECT_FIFTH";
cookies.get_perfect_fifth = function(default_value){
	var value = cookies.getCookie(cookies.PERFECT_FIFTH, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_perfect_fifth = function(value){
	document.cookie = cookies.PERFECT_FIFTH + "=" + value;
};

cookies.MINOR_SIXTH = "MINOR_SIXTH";
cookies.get_minor_sixth = function(default_value){
	var value = cookies.getCookie(cookies.MINOR_SIXTH, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_minor_sixth = function(value){
	document.cookie = cookies.MINOR_SIXTH + "=" + value;
};

cookies.MAJOR_SIXTH = "MAJOR_SIXTH";
cookies.get_major_sixth = function(default_value){
	var value = cookies.getCookie(cookies.MAJOR_SIXTH, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_major_sixth = function(value){
	document.cookie = cookies.MAJOR_SIXTH + "=" + value;
};

cookies.MINOR_SEVENTH = "MINOR_SEVENTH";
cookies.get_minor_seventh = function(default_value){
	var value = cookies.getCookie(cookies.MINOR_SEVENTH, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_minor_seventh = function(value){
	document.cookie = cookies.MINOR_SEVENTH + "=" + value;
};

cookies.MAJOR_SEVENTH = "MAJOR_SEVENTH";
cookies.get_major_seventh = function(default_value){
	var value = cookies.getCookie(cookies.MAJOR_SEVENTH, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_major_seventh = function(value){
	document.cookie = cookies.MAJOR_SEVENTH + "=" + value;
};

cookies.OCTAVE = "OCTAVE";
cookies.get_octave = function(default_value){
	var value = cookies.getCookie(cookies.OCTAVE, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_octave = function(value){
	document.cookie = cookies.OCTAVE + "=" + value;
};

cookies.set_interval_play_type = function(interval_play_type, value){
	switch(interval_play_type) {
		case INTERVAL_PLAY_TYPE.ASCENDING:
			cookies.set_ascending(value);
			break;
		case INTERVAL_PLAY_TYPE.DESCENDING:
			cookies.set_descending(value);
			break;
		case INTERVAL_PLAY_TYPE.HARMONIC:
			cookies.set_harmonic(value);
			break;
	}
}

cookies.ASCENDING = "ASCENDING";
cookies.get_ascending = function(default_value){
	var value = cookies.getCookie(cookies.ASCENDING, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_ascending = function(value){
	document.cookie = cookies.ASCENDING + "=" + value;
};

cookies.DESCENDING = "DESCENDING";
cookies.get_descending = function(default_value){
	var value = cookies.getCookie(cookies.DESCENDING, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_descending = function(value){
	document.cookie = cookies.DESCENDING + "=" + value;
};

cookies.HARMONIC = "HARMONIC";
cookies.get_harmonic = function(default_value){
	var value = cookies.getCookie(cookies.HARMONIC, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_harmonic = function(value){
	document.cookie = cookies.HARMONIC + "=" + value;
};


cookies.CHORDS = "CHORDS";
cookies.get_chords = function(default_value){
	var value = cookies.getCookie(cookies.CHORDS, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_chords = function(value){
	document.cookie = cookies.CHORDS + "=" + value;
};

cookies.set_chord_three_note_type = function(type, value){
	switch(type) {
		case CHORD_TYPE.Major:
			cookies.set_chords_major(value);
			break;
		case CHORD_TYPE.minor:
			cookies.set_chords_minor(value);
			break;
		case CHORD_TYPE.Aug:
			cookies.set_chords_augmented(value);
			break;
		case CHORD_TYPE.Dim:
			cookies.set_chords_diminished(value);
			break;
		case CHORD_TYPE.Major7:
			cookies.set_chords_major7(value);
			break;
		case CHORD_TYPE.minor7:
			cookies.set_chords_minor7(value);
			break;
		case CHORD_TYPE.Dom7:
			cookies.set_chords_dominant7(value);
			break;
	}
}
cookies.CHORD_MAJOR = "CHORD_MAJOR";
cookies.get_chords_major = function(default_value){
	var value = cookies.getCookie(cookies.CHORD_MAJOR, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_chords_major = function(value){
	document.cookie = cookies.CHORD_MAJOR + "=" + value;
};
cookies.CHORD_MINOR = "CHORD_MINOR";
cookies.get_chords_minor = function(default_value){
	var value = cookies.getCookie(cookies.CHORD_MINOR, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_chords_minor = function(value){
	document.cookie = cookies.CHORD_MINOR + "=" + value;
};
cookies.CHORD_AUG = "CHORD_AUG";
cookies.get_chords_augmented = function(default_value){
	var value = cookies.getCookie(cookies.CHORD_AUG, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_chords_augmented = function(value){
	document.cookie = cookies.CHORD_AUG + "=" + value;
};
cookies.CHORD_DIM = "CHORD_DIM";
cookies.get_chords_diminished = function(default_value){
	var value = cookies.getCookie(cookies.CHORD_DIM, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_chords_diminished = function(value){
	document.cookie = cookies.CHORD_DIM + "=" + value;
};
cookies.CHORD_MAJ7 = "CHORD_MAJ7";
cookies.get_chords_major7 = function(default_value){
	var value = cookies.getCookie(cookies.CHORD_MAJ7, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_chords_major7 = function(value){
	document.cookie = cookies.CHORD_MAJ7 + "=" + value;
};
cookies.CHORD_MIN7 = "CHORD_MIN7";
cookies.get_chords_minor7 = function(default_value){
	var value = cookies.getCookie(cookies.CHORD_MIN7, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_chords_minor7 = function(value){
	document.cookie = cookies.CHORD_MIN7 + "=" + value;
};
cookies.CHORD_DOM7 = "CHORD_DOM7";
cookies.get_chords_dominant7 = function(default_value){
	var value = cookies.getCookie(cookies.CHORD_DOM7, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_chords_dominant7 = function(value){
	document.cookie = cookies.CHORD_DOM7 + "=" + value;
};

cookies.set_chord_three_note_inversion_type = function(type, value){
	switch(type) {
		case CHORD_INVERSION_TYPE.Root:
			cookies.set_chords_three_note_inversion_root(value);
			break;
		case CHORD_INVERSION_TYPE.First:
			cookies.set_chords_three_note_inversion_first(value);
			break;
		case CHORD_INVERSION_TYPE.Second:
			cookies.set_chords_three_note_inversion_second(value);
			break;
	}
}
cookies.CHORD_THREE_NOTE_ROOT = "CHORD_THREE_NOTE_ROOT";
cookies.get_chords_three_note_inversion_root = function(default_value){
	var value = cookies.getCookie(cookies.CHORD_THREE_NOTE_ROOT, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_chords_three_note_inversion_root = function(value){
	document.cookie = cookies.CHORD_THREE_NOTE_ROOT + "=" + value;
};
cookies.CHORD_THREE_NOTE_FIRST = "CHORD_THREE_NOTE_FIRST";
cookies.get_chords_three_note_inversion_first = function(default_value){
	var value = cookies.getCookie(cookies.CHORD_THREE_NOTE_FIRST, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_chords_three_note_inversion_first = function(value){
	document.cookie = cookies.CHORD_THREE_NOTE_FIRST + "=" + value;
};
cookies.CHORD_THREE_NOTE_SECOND = "CHORD_THREE_NOTE_SECOND";
cookies.get_chords_three_note_inversion_second = function(default_value){
	var value = cookies.getCookie(cookies.CHORD_THREE_NOTE_SECOND, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_chords_three_note_inversion_second = function(value){
	document.cookie = cookies.CHORD_THREE_NOTE_SECOND + "=" + value;
};


///

cookies.set_chord_four_note_type = function(type, value){
	switch(type) {
		case CHORD_TYPE.Major7:
			cookies.set_chords_major_seven(value);
			break;
		case CHORD_TYPE.minor7:
			cookies.set_chords_minor_seven(value);
			break;
		case CHORD_TYPE.Dom7:
			cookies.set_chords_dominant_seven(value);
			break;
	}
}
cookies.CHORD_MAJOR_SEVEN = "CHORD_MAJOR_SEVEN";
cookies.get_chords_major_seven = function(default_value){
	var value = cookies.getCookie(cookies.CHORD_MAJOR_SEVEN, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_chords_major_seven = function(value){
	document.cookie = cookies.CHORD_MAJOR_SEVEN + "=" + value;
};
cookies.CHORD_MINOR_SEVEN = "CHORD_MINOR_SEVEN";
cookies.get_chords_minor_seven = function(default_value){
	var value = cookies.getCookie(cookies.CHORD_MINOR_SEVEN, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_chords_minor_seven = function(value){
	document.cookie = cookies.CHORD_MINOR_SEVEN + "=" + value;
};
cookies.CHORD_DOM_SEVEN = "CHORD_DOM_SEVEN";
cookies.get_chords_dominant_seven = function(default_value){
	var value = cookies.getCookie(cookies.CHORD_DOM_SEVEN, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_chords_dominant_seven = function(value){
	document.cookie = cookies.CHORD_DOM_SEVEN + "=" + value;
};

cookies.set_chord_four_note_inversion_type = function(type, value){
	switch(type) {
		case CHORD_INVERSION_TYPE.Root:
			cookies.set_chords_four_note_inversion_root(value);
			break;
		case CHORD_INVERSION_TYPE.First:
			cookies.set_chords_four_note_inversion_first(value);
			break;
		case CHORD_INVERSION_TYPE.Second:
			cookies.set_chords_four_note_inversion_second(value);
			break;
		case CHORD_INVERSION_TYPE.Third:
			cookies.set_chords_four_note_inversion_second(value);
			break;
	}
}
cookies.CHORD_FOUR_NOTE_ROOT = "CHORD_FOUR_NOTE_ROOT";
cookies.get_chords_four_note_inversion_root = function(default_value){
	var value = cookies.getCookie(cookies.CHORD_FOUR_NOTE_ROOT, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_chords_four_note_inversion_root = function(value){
	document.cookie = cookies.CHORD_FOUR_NOTE_ROOT + "=" + value;
};
cookies.CHORD_FOUR_NOTE_FIRST = "CHORD_FOUR_NOTE_FIRST";
cookies.get_chords_four_note_inversion_first = function(default_value){
	var value = cookies.getCookie(cookies.CHORD_FOUR_NOTE_FIRST, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_chords_four_note_inversion_first = function(value){
	document.cookie = cookies.CHORD_FOUR_NOTE_FIRST + "=" + value;
};
cookies.CHORD_FOUR_NOTE_SECOND = "CHORD_FOUR_NOTE_SECOND";
cookies.get_chords_four_note_inversion_second = function(default_value){
	var value = cookies.getCookie(cookies.CHORD_FOUR_NOTE_SECOND, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_chords_four_note_inversion_second = function(value){
	document.cookie = cookies.CHORD_FOUR_NOTE_SECOND + "=" + value;
};
cookies.CHORD_FOUR_NOTE_THIRD = "CHORD_FOUR_NOTE_THIRD";
cookies.get_chords_four_note_inversion_second = function(default_value){
	var value = cookies.getCookie(cookies.CHORD_FOUR_NOTE_THIRD, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_chords_four_note_inversion_second = function(value){
	document.cookie = cookies.CHORD_FOUR_NOTE_THIRD + "=" + value;
};


///







cookies.set_chord_play_type = function(play_type, value){
	switch(play_type) {
		case CHORD_PLAY_TYPE.ARPEGGIATE:
			cookies.set_chords_arpeggiate(value);
			break;
		case CHORD_PLAY_TYPE.HARMONIC:
			cookies.set_chords_harmonic(value);
			break;
	}
}
cookies.ARPEGGIATE = "ARPEGGIATE";
cookies.get_chords_arpeggiate = function(default_value){
	var value = cookies.getCookie(cookies.ARPEGGIATE, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_chords_arpeggiate = function(value){
	document.cookie = cookies.ARPEGGIATE + "=" + value;
};
cookies.CHORDS_HARMONIC = "CHORDS_HARMONIC";
cookies.get_chords_harmonic = function(default_value){
	var value = cookies.getCookie(cookies.CHORDS_HARMONIC, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_chords_harmonic = function(value){
	document.cookie = cookies.CHORDS_HARMONIC + "=" + value;
};

/*cookies.TIME_SIGNATURE_KEY = "TIME_SIGNATURE_KEY";
cookies.get_time_signature = function(default_value){
	return parseInt(cookies.getCookie(cookies.TIME_SIGNATURE_KEY, default_value));
};
cookies.set_time_signature = function(value){
	document.cookie = cookies.TIME_SIGNATURE_KEY + "=" + value;
};

cookies.SUBDIVISION_KEY = "SUBDIVISION_KEY";
cookies.get_subdivision = function(default_value){
	return parseInt(cookies.getCookie(cookies.SUBDIVISION_KEY, default_value));
};
cookies.set_subdivision = function(value){
	document.cookie = cookies.SUBDIVISION_KEY + "=" + value;
};

cookies.ACCENT_FIRST_BEAT_KEY = "ACCENT_FIRST_BEAT_KEY";
cookies.get_accent_first_beat = function(default_value){
	var value = cookies.getCookie(cookies.ACCENT_FIRST_BEAT_KEY, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_accent_first_beat = function(value){
	document.cookie = cookies.ACCENT_FIRST_BEAT_KEY + "=" + value;
};

cookies.TONE_KEY = "TONE_KEY";
cookies.get_tone = function(default_value){
	return parseInt(cookies.getCookie(cookies.TONE_KEY, default_value));
};
cookies.set_tone = function(value){
	document.cookie = cookies.TONE_KEY + "=" + value;
};*/

cookies.DARKMODE_KEY = "DARKMODE_KEY";
cookies.get_darkmode = function(default_value){
	var value = cookies.getCookie(cookies.DARKMODE_KEY, default_value);
	return Boolean(value === "true" || value === true);
};
cookies.set_darkmode = function(value){
	document.cookie = cookies.DARKMODE_KEY + "=" + value;
};

cookies.LANGUAGE_KEY = "LANGUAGE_KEY";
cookies.get_language = function(default_value){
	var value = cookies.getCookie(cookies.LANGUAGE_KEY, default_value);
	return value;
};
cookies.set_language = function(value){
	document.cookie = cookies.LANGUAGE_KEY + "=" + value;
};

cookies.setCookie = function(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};
cookies.getCookie = function(cname, default_value) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return default_value;
};
cookies.deleteCookie = function(cname) {
    var d = new Date(); //Create an date object
    d.setTime(d.getTime() - (1000 * 60 * 60 * 24)); //Set the time to the past. 1000 milliseonds = 1 second
    var expires = "expires=" + d.toGMTString(); //Compose the expirartion date
    window.document.cookie = cname + "=" + "; " + expires;//Set the cookie with name and the expiration date
};