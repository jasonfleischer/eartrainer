
const CHORD_TYPE = Object.freeze({
	Major: "Major",
	minor: "minor",
 // Aug: "augmented",
 // Dim: "diminished",
	Major7: "Major 7",
  minor7: "minor 7"//,
 // Dom7: "Dominant 7"
});

const CHORD_INVERSION_TYPE = Object.freeze({
  Root: "Root",
  First: "first inversion",
  Second: "second inversion",
  Third: "third inversion"
});

const CHORD_PLAY_TYPE = Object.freeze({
    HARMONIC: "Harmonic",
    ARPEGGIATE: "Arpeggiate"
});
const ALL_CHORD_TYPES = [CHORD_TYPE.Major, CHORD_TYPE.Minor, CHORD_TYPE.Major7, CHORD_TYPE.Minor7];


class Chord {


  constructor(root_note, chord_type, play_type, inversion) {
    this.delay_in_ms = 500;
    this.name = root_note.note_name.name + " " + chord_type;
    this.inversion = inversion
    this.type = chord_type

    switch(chord_type){
    	case CHORD_TYPE.Major:
    		this.note_array = [root_note, all_notes[root_note.note_value + 4], all_notes[root_note.note_value + 7]];
        this.structure = "Root, Major 3rd, Fifth";
        this.file_name = [ root_note.note_name.file_name, "audio/chords/major.mp3" ];
    		break;
    	case CHORD_TYPE.minor:
    		this.note_array = [root_note, all_notes[root_note.note_value + 3], all_notes[root_note.note_value + 7]];
        this.structure = "Root, minor 3rd, Fifth";
        this.file_name = [ root_note.note_name.file_name, "audio/chords/minor.mp3" ];
    		break;
    	case CHORD_TYPE.Major7:
    		this.note_array = [root_note, all_notes[root_note.note_value + 4], all_notes[root_note.note_value + 7], all_notes[root_note.note_value + 11]];
    		this.structure = "Root, Major 3rd, Fifth, Major 7th";
        this.file_name = [ root_note.note_name.file_name, "audio/chords/major_seventh.mp3" ];
        break;
      case CHORD_TYPE.minor7:
        this.note_array = [root_note, all_notes[root_note.note_value + 3], all_notes[root_note.note_value + 7], all_notes[root_note.note_value + 10]];
        this.structure = "Root, minor 3rd, Fifth, minor 7th";
        this.file_name = [ root_note.note_name.file_name, "audio/chords/minor_seventh.mp3" ];
        break;

    }
  }

  to_string() {
    return  "CHORD: " + this.name +", "+ this.structure + ", ", this.note_array;
  }
}

function type_is_three_notes(chord_type) {
  return chord_type == CHORD_TYPE.Major || chord_type == CHORD_TYPE.minor || chord_type == CHORD_TYPE.Aug || chord_type == CHORD_TYPE.Dim 
}

function generate_random_chord(min, max){

  var random_note = generate_random_note(min, max);
  var random_chord_type = ALL_CHORD_TYPES[ randomIntFromInterval(0, ALL_CHORD_TYPES.length-1) ];

  var rand = randomIntFromInterval(0,model.chords.types.length-1);
  var type = model.chords.types[rand];

  rand = randomIntFromInterval(0,model.chords.play_types.length-1);
  var play_type = model.chords.play_types[rand];


  var play_type = CHORD_PLAY_TYPE.HARMONIC;
  var inversion = CHORD_INVERSION_TYPE.Root;
  var random_chord = new Chord(random_note, random_chord_type, play_type, inversion);

  return random_chord;

}


function generate_chord_with_note(note_name){

  var random_chord_type = ALL_CHORD_TYPES[ randomIntFromInterval(0, ALL_CHORD_TYPES.length-1) ];
  var octave = 1 + randomIntFromInterval(2, 4);// limit to lower register
  var note = all_notes[note_name.associated_note_values[octave]];

  var play_type = CHORD_PLAY_TYPE.HARMONIC;
  var inversion = CHORD_INVERSION_TYPE.Root;
  var random_chord = new Chord(note, random_chord_type, play_type, inversion);

  return random_chord;

}
