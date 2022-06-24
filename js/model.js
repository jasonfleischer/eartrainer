// Model

const TYPE = Object.freeze({
	SINGLE_NOTE: 0,
	INTERVAL: 1,
	CHORD: 2
});

const INSTRUMENT = Object.freeze({
	ALL: 0,
	PIANO: 1,
	GUITAR: 2
});

const DURATION = Object.freeze({
    FIVE_MINUTE: 1,
    TEN_MINUTES: 10,
    FIFTEEN_MINUTES: 15,
    TWENTY_MINUTES: 20,
    THIRTY_MINUTES: 30,
    FORTY_FIVE_MINUTES: 45,
    SIXTY_MINUTES: 60,
    INFINITE: -1
});

const DISPLAY_DIAGRAM = Object.freeze({
    PIANO: 1,
	GUITAR: 2
});

const MAX_BPM = 15;
const MIN_BPM = 3;

var all_notes = [];

var is_left_column_showing = true;

var model = {
	
	duration: DURATION.THIRTY_MINUTES,
	BPM: 15,
	volume: 1,
	instrument: INSTRUMENT.ALL,
	speak: true,
	speak_volume: 1,
	display_diagrams: [],

	range: {
		min: 40,
		max: 84
	},

	single_notes: {
		enabled: true
	},
	interval: {
		enabled: false,
		types: [],
		play_types: [] 
	},
	chords: {
		enabled: false,
		three_note_types: [],
		three_note_inversion_types: [],
		four_note_types: [],
		four_note_inversion_types: [],
		play_types: [] 
	},


beat_division: 1,
time_signature: 2

}