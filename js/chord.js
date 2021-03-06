
const CHORD_TYPE = Object.freeze({
	Major: "Major",
	minor: "minor",
  Aug: "augmented",
  Dim: "diminished",

	Major7: "Major 7",
  minor7: "minor 7",
  Dom7: "Dominant 7"
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
const ALL_CHORD_TYPES = [CHORD_TYPE.Major, CHORD_TYPE.minor, CHORD_TYPE.Major7, CHORD_TYPE.minor7];


class Chord {


  constructor(root_note, chord_type, play_type, inversion) {
    this.delay_in_ms = 500;
    this.name = root_note.note_name.name + " " + chord_type;
    this.inversion = inversion
    this.type = chord_type
    this.play_type = play_type

    switch(chord_type){
    	case CHORD_TYPE.Major:
        if(this.inversion == CHORD_INVERSION_TYPE.Root) {
    		  this.note_array = [root_note, all_notes[root_note.note_value + 4], all_notes[root_note.note_value + 7]];
          this.note_labels = ["R", "M3", "5"];
          this.structure = "Root, Major 3rd, Fifth";
        } else if (this.inversion == CHORD_INVERSION_TYPE.First){
          this.note_array = [all_notes[root_note.note_value + 4], all_notes[root_note.note_value + 7], all_notes[root_note.note_value + 12]];
          this.note_labels = ["M3", "5", "R"];
          this.structure = "Major 3rd, Fifth, Root";
        } else {
          this.note_array = [all_notes[root_note.note_value + 7], all_notes[root_note.note_value + 12], all_notes[root_note.note_value + 16]];
          this.note_labels = ["5", "R", "M3"];
          this.structure = "Fifth, Root, Major 3rd"; 
        }
        this.file_name = root_note.note_name.file_name.concat(["audio/chords/major.mp3"]);
    		break;
    	case CHORD_TYPE.minor:
        if(this.inversion == CHORD_INVERSION_TYPE.Root) {
          this.note_array = [root_note, all_notes[root_note.note_value + 3], all_notes[root_note.note_value + 7]];
          this.note_labels = ["R", "m3", "5"];
          this.structure = "Root, minor 3rd, Fifth";
        } else if (this.inversion == CHORD_INVERSION_TYPE.First){
          this.note_array = [all_notes[root_note.note_value + 3], all_notes[root_note.note_value + 7], all_notes[root_note.note_value + 12]];
          this.note_labels = ["m3", "5", "R"];
          this.structure = "minor 3rd, Fifth, Root";
        } else {
          this.note_array = [all_notes[root_note.note_value + 7], all_notes[root_note.note_value + 12], all_notes[root_note.note_value + 15]];
          this.note_labels = ["5", "R", "m3"];
          this.structure = "Fifth, Root, minor 3rd"; 
        }
    		
        this.file_name = root_note.note_name.file_name.concat(["audio/chords/minor.mp3"]);
    		break;

      case CHORD_TYPE.Aug:
        this.inversion = CHORD_INVERSION_TYPE.Root;
        this.note_array = [root_note, all_notes[root_note.note_value + 4], all_notes[root_note.note_value + 8]];
        this.note_labels = ["R", "M3", "#5"];
        this.structure = "Root, Major 3rd, Sharp Fifth";
        this.file_name = root_note.note_name.file_name.concat(["audio/chords/augmented.mp3"]);
        break;
      case CHORD_TYPE.Dim:
        this.inversion = CHORD_INVERSION_TYPE.Root;
        this.note_array = [root_note, all_notes[root_note.note_value + 3], all_notes[root_note.note_value + 6]];
        this.note_labels = ["R", "m3", "b5"];
        this.structure = "Root, minor 3rd, Flat Fifth";
        this.file_name = root_note.note_name.file_name.concat(["audio/chords/diminished.mp3"]);
        break;

    	case CHORD_TYPE.Major7:

        if(this.inversion == CHORD_INVERSION_TYPE.Root) {
          this.note_array = [root_note, all_notes[root_note.note_value + 4], all_notes[root_note.note_value + 7], all_notes[root_note.note_value + 11]];
          this.note_labels = ["R", "M3", "5", "M7"];
          this.structure = "Root, Major 3rd, Fifth, Major 7th";
        } else if (this.inversion == CHORD_INVERSION_TYPE.First){
          this.note_array = [all_notes[root_note.note_value + 4], all_notes[root_note.note_value + 7], all_notes[root_note.note_value + 11], all_notes[root_note.note_value + 12]];
          this.note_labels = ["M3", "5", "M7", "R"];
          this.structure = "Major 3rd, Fifth, Major 7th, Root";
        } else if (this.inversion == CHORD_INVERSION_TYPE.Second){
          this.note_array = [all_notes[root_note.note_value + 7], all_notes[root_note.note_value + 11], all_notes[root_note.note_value + 12], all_notes[root_note.note_value + 16]];
          this.note_labels = ["5", "M7", "R", "M3"];
          this.structure = "Fifth, Major 7th, Root, Major 3rd";
        } else {
          this.note_array = [all_notes[root_note.note_value + 11], all_notes[root_note.note_value + 12], all_notes[root_note.note_value + 16], all_notes[root_note.note_value + 19]];
          this.note_labels = ["M7", "R", "M3", "5"];
          this.structure = "Major 7th, Root, Major 3rd, Fifth";
        }
        this.file_name = root_note.note_name.file_name.concat(["audio/chords/major_seventh.mp3"]);
        break;
      case CHORD_TYPE.minor7:


        if(this.inversion == CHORD_INVERSION_TYPE.Root) {
          this.note_array = [root_note, all_notes[root_note.note_value + 3], all_notes[root_note.note_value + 7], all_notes[root_note.note_value + 10]];
          this.note_labels = ["R", "m3", "5", "m7"];
          this.structure = "Root, minor 3rd, Fifth, minor 7th";
        } else if (this.inversion == CHORD_INVERSION_TYPE.First){
          this.note_array = [all_notes[root_note.note_value + 3], all_notes[root_note.note_value + 7], all_notes[root_note.note_value + 10], all_notes[root_note.note_value + 12]];
          this.note_labels = ["m3", "5", "m7", "R"];
          this.structure = "minor 3rd, Fifth, minor 7th, Root";
        } else if (this.inversion == CHORD_INVERSION_TYPE.Second){
          this.note_array = [all_notes[root_note.note_value + 7], all_notes[root_note.note_value + 10], all_notes[root_note.note_value + 12], all_notes[root_note.note_value + 15]];
          this.note_labels = ["5", "m7", "R", "m3"];
          this.structure = "Fifth, minor 7th, Root, minor 3rd";
        } else {
          this.note_array = [all_notes[root_note.note_value + 10], all_notes[root_note.note_value + 12], all_notes[root_note.note_value + 15], all_notes[root_note.note_value + 19]];
          this.note_labels = ["m7", "R", "m3", "5"];
          this.structure = "minor 7th, Root, minor 3rd, Fifth";
        }
        this.file_name = root_note.note_name.file_name.concat(["audio/chords/minor_seventh.mp3"]);
        break;

      case CHORD_TYPE.Dom7:
        
        if(this.inversion == CHORD_INVERSION_TYPE.Root) {
          this.note_array = [root_note, all_notes[root_note.note_value + 4], all_notes[root_note.note_value + 7], all_notes[root_note.note_value + 10]];
          this.note_labels = ["R", "M3", "5", "7"];
          this.structure = "Root, Major 3rd, Fifth, 7th";
        } else if (this.inversion == CHORD_INVERSION_TYPE.First){
          this.note_array = [all_notes[root_note.note_value + 4], all_notes[root_note.note_value + 7], all_notes[root_note.note_value + 10], all_notes[root_note.note_value + 12]];
          this.note_labels = ["M3", "5", "7", "R"];
          this.structure = "Major 3rd, Fifth, 7th, Root";
        } else if (this.inversion == CHORD_INVERSION_TYPE.Second){
          this.note_array = [all_notes[root_note.note_value + 7], all_notes[root_note.note_value + 10], all_notes[root_note.note_value + 12], all_notes[root_note.note_value + 16]];
          this.note_labels = ["5", "7", "R", "M3"];
          this.structure = "Fifth, 7th, Root, Major 3rd";
        } else {
          this.note_array = [all_notes[root_note.note_value + 10], all_notes[root_note.note_value + 12], all_notes[root_note.note_value + 16], all_notes[root_note.note_value + 19]];
          this.note_labels = ["7", "R", "M3", "5"];
          this.structure = "7th, Root, Major 3rd, Fifth";
        }
        this.file_name = root_note.note_name.file_name.concat(["audio/chords/dominant_seventh.mp3"]);
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

  var chord_array = []
  if(model.chords.three_note_types.length == 0 && model.chords.four_note_types.length == 0){
    logE("fatal error: generate_random_chord")
  } else if (model.chords.three_note_types.length > 0 && model.chords.four_note_types.length == 0){
    chord_array = model.chords.three_note_types
  }else if (model.chords.three_note_types.length == 0 && model.chords.four_note_types.length > 0){
    chord_array = model.chords.four_note_types
  }else {
    chord_array = model.chords.three_note_types.concat(model.chords.four_note_types);
  }

  var random_note = generate_random_note(min, max-18);// hack so it doesn't go out of bounds
  var random_chord_type = chord_array[ randomIntFromInterval(0, chord_array.length-1) ];

  var play_type = model.chords.play_types[ randomIntFromInterval(0, model.chords.play_types.length-1) ];
  var inversion = CHORD_INVERSION_TYPE.Root;
  if (type_is_three_notes(random_chord_type)){
    inversion = model.chords.three_note_inversion_types[ randomIntFromInterval(0, model.chords.three_note_inversion_types.length-1) ];
  } else{
    inversion = model.chords.four_note_inversion_types[ randomIntFromInterval(0, model.chords.four_note_inversion_types.length-1) ];
  }
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