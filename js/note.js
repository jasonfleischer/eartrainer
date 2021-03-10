
class Note {
  constructor(note_name, note_value, octave) {
    this.note_name = note_name;
    this.note_value  = note_value;
    this.octave = octave;
  }

  to_string() {
    return  "NOTE: " + this.note_name.name + " " + this.note_value + " " + this.octave;
  }
}


const NOTE_TYPE = Object.freeze({
	C: "C",
	C_sharp: "C# or Db",
	D: "D",
	D_sharp: "D# or Eb",
	E: "E",
	F: "F",
	F_sharp: "F# or Gb",
  	G: "G",
  	G_sharp: "G# or Ab",
  	A: "A",
  	A_sharp: "A# or Bb",
  	B: "B"
});
class NoteName {
	constructor(type) {


		function get_associated_note_values(row){
			var base_array = [0, 12, 24, 36, 48, 60, 72, 84, 96, 108, 120];
			var result = [];

			var i;
			for(i=0; i<base_array.length; i++){
				var value = base_array[i]+row;
				if (value > 127 ) break;
				result.push(value);
			}
			return result;
		}

    	this.name = type;
    	switch(type){
    		case NOTE_TYPE.C:
	    		this.is_sharp_or_flat = false;
	    		this.sharp_name = this.name;
	    		this.flat_name = this.name;
	    		this.file_name = "audio/notes/C.mp3";
	    		this.color = "#ff0000";
	    		this.zodiac = "aries";
	    		this.associated_note_values = get_associated_note_values(0);
    			break;
    		case NOTE_TYPE.C_sharp:
    			this.is_sharp_or_flat = true;
	    		this.sharp_name = "C#";
	    		this.flat_name = "Db";
	    		this.file_name = ["audio/notes/C_sharp.mp3", "audio/notes/or.mp3","audio/notes/D_flat.mp3"];
	    		this.color = "#ff8000";
	    		this.zodiac = "taurus";
	    		this.associated_note_values = get_associated_note_values(1);
    			break;
    		case NOTE_TYPE.D:
    			this.is_sharp_or_flat = false;
	    		this.sharp_name = this.name;
	    		this.flat_name = this.name;
	    		this.file_name = "audio/notes/D.mp3";
	    		this.color = "#ffff00";
	    		this.zodiac = "gemini";
	    		this.associated_note_values = get_associated_note_values(2);
    			break;
    		case NOTE_TYPE.D_sharp:
    			this.is_sharp_or_flat = true;
	    		this.sharp_name = "D#";
	    		this.flat_name = "Eb";
	    		this.file_name = ["audio/notes/D_sharp.mp3", "audio/notes/or.mp3","audio/notes/E_flat.mp3"];
	    		this.color = "#7fff00";
	    		this.zodiac = "cancer";
	    		this.associated_note_values = get_associated_note_values(3);
    			break;
    		case NOTE_TYPE.E:
    			this.is_sharp_or_flat = false;
	    		this.sharp_name = this.name;
	    		this.flat_name = this.name;
	    		this.file_name = "audio/notes/E.mp3";
	    		this.color = "#00ff00";
	    		this.zodiac = "leo";
	    		this.associated_note_values = get_associated_note_values(4);
    			break;
    		case NOTE_TYPE.F:
    			this.is_sharp_or_flat = false;
	    		this.sharp_name = this.name;
	    		this.flat_name = this.name;
	    		this.file_name = "audio/notes/F.mp3";
	    		this.color = "#00ff80";
	    		this.zodiac = "virgo";
	    		this.associated_note_values = get_associated_note_values(5);
    			break;
    		case NOTE_TYPE.F_sharp:
    			this.is_sharp_or_flat = true;
	    		this.sharp_name = "F#";
	    		this.flat_name = "Gb";
	    		this.file_name = ["audio/notes/F_sharp.mp3", "audio/notes/or.mp3","audio/notes/G_flat.mp3"];
	    		this.color = "#00ffff";
	    		this.zodiac = "libra";
	    		this.associated_note_values = get_associated_note_values(6);
    			break;
    		case NOTE_TYPE.G:
    			this.is_sharp_or_flat = false;
	    		this.sharp_name = this.name;
	    		this.flat_name = this.name;
	    		this.file_name = "audio/notes/G.mp3";
	    		this.color = "#007fff";
	    		this.zodiac = "scorpio";
	    		this.associated_note_values = get_associated_note_values(7);
    			break;
    		case NOTE_TYPE.G_sharp:
    			this.is_sharp_or_flat = true;
	    		this.sharp_name = "G#";
	    		this.flat_name = "Ab";
	    		this.file_name = ["audio/notes/G_sharp.mp3", "audio/notes/or.mp3","audio/notes/A_flat.mp3"];
	    		this.color = "#0000ff";
	    		this.zodiac = "sagittarius";
	    		this.associated_note_values = get_associated_note_values(8);
    			break;
    		case NOTE_TYPE.A:
    			this.is_sharp_or_flat = false;
	    		this.sharp_name = this.name;
	    		this.flat_name = this.name;
	    		this.file_name = "audio/notes/A.mp3";
	    		this.color = "#8000ff";
	    		this.zodiac = "capricorn";
	    		this.associated_note_values = get_associated_note_values(9);
    			break;
    		case NOTE_TYPE.A_sharp:
    		this.is_sharp_or_flat = true;
	    		this.sharp_name = "A#";
	    		this.flat_name = "Bb";
	    		this.file_name = ["audio/notes/A_sharp.mp3", "audio/notes/or.mp3","audio/notes/B_flat.mp3"];
	    		this.color = "#ff00ff";
	    		this.zodiac = "aquarius";
	    		this.associated_note_values = get_associated_note_values(10);
    			break;
    		case NOTE_TYPE.B:
    			this.is_sharp_or_flat = false;
	    		this.sharp_name = this.name;
	    		this.flat_name = this.name;
	    		this.file_name = "audio/notes/B.mp3";
	    		this.color = "#ff007f";
	    		this.zodiac = "pisces";
	    		this.associated_note_values = get_associated_note_values(11);
    			break;
    	}
  	}
}
const ALL_NOTE_TYPES = [new NoteName(NOTE_TYPE.C), new NoteName(NOTE_TYPE.C_sharp), new NoteName(NOTE_TYPE.D), 
						new NoteName(NOTE_TYPE.D_sharp), new NoteName(NOTE_TYPE.E), new NoteName(NOTE_TYPE.F),
						new NoteName(NOTE_TYPE.F_sharp), new NoteName(NOTE_TYPE.G), new NoteName(NOTE_TYPE.G_sharp),
						new NoteName(NOTE_TYPE.A), new NoteName(NOTE_TYPE.A_sharp), new NoteName(NOTE_TYPE.B)];


var all_notes = [];
function build_all_notes(){
	var note_value = 0; // 0 -127
	
	const octaves = 9;
	var octave = 0;
	for(octave = -1 ; octave <= octaves; octave++){
		var j;
		for(j = 0 ; j < ALL_NOTE_TYPES.length; j++){
			var note_name = ALL_NOTE_TYPES[j].sharp_name;
			var note = new Note(ALL_NOTE_TYPES[j], note_value, octave);
			//log(note_value + " - "+ note.to_string())

			all_notes.push(note);

			note_value++;

			if(note_value == 128) break;
		}
	}
}

function generate_random_note(min, max) {
	return all_notes[randomIntFromInterval(min, max)];
}

