
const SCALE_TYPE = Object.freeze({
	Ionian: "Ionian",
	Dorian: "Dorian",
	Phrygian: "Phrygian",
  Lydian: "Lydian",
  Mixolydian: "Mixolydian",
  Aeolian: "Aeolian",
  Locrian: "Locrian"
});
const ALL_SCALE_TYPES = [SCALE_TYPE.Ionian, SCALE_TYPE.Dorian, SCALE_TYPE.Phrygian, SCALE_TYPE.Lydian, SCALE_TYPE.Mixolydian, SCALE_TYPE.Aeolian, SCALE_TYPE.Locrian];


class Scale {


  constructor(root_note, scale_type) {
    this.name = root_note.name + " " + scale_type;
    /*this.octave_display = "(" + root_note.display_string() + ")";

    switch(chord_type){
    	case SCALE_TYPE.Major:
    		this.note_array = [root_note, all_notes[root_note.note_value + 4], all_notes[root_note.note_value + 7]];
        this.structure = "Root, Major 3rd, Fifth";
    		break;
    	case SCALE_TYPE.Minor:
    		this.note_array = [root_note, all_notes[root_note.note_value + 3], all_notes[root_note.note_value + 7]];
        this.structure = "Root, minor 3rd, Fifth";
    		break;
    	case CHORD_TYPE.Major7:
    		this.note_array = [root_note, all_notes[root_note.note_value + 4], all_notes[root_note.note_value + 7], all_notes[root_note.note_value + 11]];
    		this.structure = "Root, Major 3rd, Fifth, Major 7th";
        break;
      case CHORD_TYPE.Minor7:
        this.note_array = [root_note, all_notes[root_note.note_value + 3], all_notes[root_note.note_value + 7], all_notes[root_note.note_value + 10]];
        this.structure = "Root, minor 3rd, Fifth, minor 7th";
        break;
    }*/
  }

  to_string() {
    return  "SCALE: " + this.name +", "+ this.structure + ", ", this.note_array;
  }
}

/*function generate_random_chord(min, max){

  var random_note = midi_controller.generate_random_note_with(min, max);
  var random_chord_type = ALL_CHORD_TYPES[ randomIntFromInterval(0, ALL_CHORD_TYPES.length-1) ];

  var random_chord = new Chord(random_note, random_chord_type);

  return random_chord;

}*/
