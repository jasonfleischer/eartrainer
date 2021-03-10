
const CHORD_TYPE = Object.freeze({
	Major: "Major",
	Minor: "minor",
	Major7: "Maj 7",
  Minor7: "minor 7"
});
const ALL_CHORD_TYPES = [CHORD_TYPE.Major, CHORD_TYPE.Minor, CHORD_TYPE.Major7, CHORD_TYPE.Minor7];


class Chord {


  constructor(root_note, chord_type) {
    this.name = root_note.note_name.name + " " + chord_type;
    this.octave_display = "(" + root_note.display_string() + ")";

    switch(chord_type){
    	case CHORD_TYPE.Major:
    		this.note_array = [root_note, all_notes[root_note.note_value + 4], all_notes[root_note.note_value + 7]];
        this.structure = "Root, Major 3rd, Fifth";
        this.file_name = [ root_note.note_name.file_name, "audio/chords/major.mp3" ];
    		break;
    	case CHORD_TYPE.Minor:
    		this.note_array = [root_note, all_notes[root_note.note_value + 3], all_notes[root_note.note_value + 7]];
        this.structure = "Root, minor 3rd, Fifth";
        this.file_name = [ root_note.note_name.file_name, "audio/chords/minor.mp3" ];
    		break;
    	case CHORD_TYPE.Major7:
    		this.note_array = [root_note, all_notes[root_note.note_value + 4], all_notes[root_note.note_value + 7], all_notes[root_note.note_value + 11]];
    		this.structure = "Root, Major 3rd, Fifth, Major 7th";
        this.file_name = [ root_note.note_name.file_name, "audio/chords/major_seventh.mp3" ];
        break;
      case CHORD_TYPE.Minor7:
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

function generate_random_chord(min, max){

  var random_note = midi_controller.generate_random_note_with(min, max);
  var random_chord_type = ALL_CHORD_TYPES[ randomIntFromInterval(0, ALL_CHORD_TYPES.length-1) ];

  var random_chord = new Chord(random_note, random_chord_type);

  return random_chord;

}


function generate_chord_with_note(note_name){

  var random_chord_type = ALL_CHORD_TYPES[ randomIntFromInterval(0, ALL_CHORD_TYPES.length-1) ];
  var octave = 1 + randomIntFromInterval(2, 4);// limit to lower register
  var note = all_notes[note_name.associated_note_values[octave]];
  var random_chord = new Chord(note, random_chord_type);

  return random_chord;

}
