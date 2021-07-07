// Model

const TYPE = Object.freeze({
	SINGLE_NOTE: 0,
	INTERVAL: 1,
	CHORD: 2
});

const INSTRUMENT = Object.freeze({
	PIANO: 0,
	GUITAR: 1
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

const MAX_BPM = 15;
const MIN_BPM = 3;

var all_notes = [];

var model = {
	
	duration: DURATION.THIRTY_MINUTES,
	BPM: 15,
	volume: 1,
	instrument: INSTRUMENT.GUITAR,
	speak: true,
	speak_volume: 1,
	darkmode: false,

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