var piano_view = {

	WIDTH: 1000,
	HEIGHT: 93,
	BORDER_WIDTH: 1,

	min_note_value: 21,
	max_note_value: 108,

	note_value_to_piano_key_map: {},

	canvas: {},
	canvas_background: {}
}

class PianoKey {
	constructor(x, y, x2, y2, note, color){
		this.x = x;
		this.y = y;
		this.x2 = x2; // width
		this.y2 = y2; //height
		this.note = note;
		this.color = color;
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.lineWidth = 0;
		ctx.fillStyle = this.color;
		ctx.rect(this.x, this.y, this.x2, this.y2);
		ctx.fill();
		ctx.stroke();


		ctx.fillStyle = 'black';
    	ctx.font = 10 + 'px san-serif';
    	ctx.textAlign = 'center';
    	
    	if (this.note.note_name.name == 'C') {
    		//ctx.fillText(this.note.note_name.name + this.note.octave, this.x + (this.x2 - this.x)/2, this.y2 - 10);
    	}/* else {
    		if (!this.note.note_name.is_sharp_or_flat) {
    			ctx.fillText(this.note.note_name.name, this.x + (this.x2 - this.x)/2, this.y2 - 10);
    		}
    	}*/
	}

	drawWithColor(ctx, color) {
		ctx.beginPath();
		ctx.lineWidth = 0;
		ctx.fillStyle = color;
		ctx.rect(this.x, this.y, this.x2, this.y2);
		ctx.fill();
		ctx.stroke();
	}
}

piano_view.init = function(){

	//piano_view.WIDTH = 1000;
	//piano_view.HEIGHT = 160;

	piano_view.canvas = document.getElementById("piano_canvas");
	piano_view.canvas.width=piano_view.WIDTH;
	piano_view.canvas.height=piano_view.HEIGHT;

	piano_view.canvas_background = document.getElementById("piano_background_canvas");
	piano_view.canvas_background.width=piano_view.WIDTH;
	piano_view.canvas_background.height=piano_view.HEIGHT;

	this.draw_background();
}

piano_view.resize = function(newWidth) {
	var newWidth = Math.min(newWidth, piano_view.WIDTH);

	var newHeight = newWidth * (piano_view.HEIGHT/piano_view.WIDTH);
	$("piano").style.height = newHeight + "px";
	piano_view.canvas_background.style.height = newHeight + "px";
	piano_view.canvas.style.height = newHeight + "px";

	$("piano").style.width = newWidth + "px";
	piano_view.canvas_background.style.width = newWidth + "px";
	piano_view.canvas.style.width = newWidth + "px";

	//this.draw_background();
}

piano_view.draw_background = function(){


	var ctx = piano_view.canvas_background.getContext("2d");

	

	

	/*ctx.beginPath();
	ctx.lineWidth = piano_view.BORDER_WIDTH;
	ctx.strokeStyle = "#000";
	ctx.fillStyle = "orange";
	ctx.rect(0, 0, piano_view.WIDTH, piano_view.HEIGHT);
	ctx.fill();
	ctx.stroke();*/

	let number_of_white_keys = 0;
	let number_of_black_keys = 0;

	for(i = piano_view.min_note_value; i <= piano_view.max_note_value; i++){
		var note = all_notes[i];
		if(!note.note_name.is_sharp_or_flat){
			number_of_white_keys++;
		} else {
			number_of_black_keys++;
		}
	}
	


	let white_key_width = Math.floor((piano_view.WIDTH - ((number_of_white_keys+1)*piano_view.BORDER_WIDTH) )/ number_of_white_keys);
	let white_key_height =  Math.floor(white_key_width * 5);

	var white_keys = [];
	
	var i;
	var x = piano_view.BORDER_WIDTH;
	for(i = piano_view.min_note_value; i <= piano_view.max_note_value; i++){
		var note = all_notes[i];
		if(!note.note_name.is_sharp_or_flat){

			let key = new PianoKey(x, piano_view.BORDER_WIDTH, 
				white_key_width, piano_view.BORDER_WIDTH+white_key_height, note, "#fff")
			white_keys.push(key)

			piano_view.note_value_to_piano_key_map[note.note_value] = key
			x = x + white_key_width + piano_view.BORDER_WIDTH;
		}
	}

	var j;
	for(j = 0; j < white_keys.length; j++){	
		var white_key = white_keys[j];
		white_key.draw(ctx);
	}

	var black_keys = [];
	var black_key_width = Math.floor(white_key_width * 0.6);
	var black_key_height = Math.floor(white_key_height * 0.67);
	var k;
	for(k = piano_view.min_note_value; k <= piano_view.max_note_value; k++){
		var note = all_notes[k];
		if(note.note_name.is_sharp_or_flat){

			var flat_key = piano_view.note_value_to_piano_key_map[note.note_value-1];
			var sharp_key = piano_view.note_value_to_piano_key_map[note.note_value+1];
			if( flat_key != undefined && sharp_key != undefined) {

				var x = flat_key.x + piano_view.BORDER_WIDTH + white_key_width - black_key_width/2;
				let key = new PianoKey(x, piano_view.BORDER_WIDTH, black_key_width, black_key_height, note, "#333")
				black_keys.push(key)
				piano_view.note_value_to_piano_key_map[note.note_value] = key
			}
		}
	}

	logE(number_of_black_keys + '==' + black_keys.length)

	var l;
	for(l = 0; l < black_keys.length; l++){	
		var black_key = black_keys[l];
		black_key.draw(ctx);
	}
}


piano_view.drawNote = function(note){

	var ctx = piano_view.canvas.getContext("2d");
	ctx.clearRect(0, 0, piano_view.WIDTH, piano_view.HEIGHT);
	piano_view.drawNoteWithColor(note);
}

piano_view.drawNoteWithColor = function(note, color=note.note_name.color){

	var ctx = piano_view.canvas.getContext("2d");

	let key = piano_view.note_value_to_piano_key_map[note.note_value];
	key.drawWithColor(ctx, color);
	if (!note.note_name.is_sharp_or_flat){

		var flat_key = piano_view.note_value_to_piano_key_map[note.note_value-1];
		var sharp_key = piano_view.note_value_to_piano_key_map[note.note_value+1];
		if (flat_key != undefined && flat_key.note.note_name.is_sharp_or_flat) {
			flat_key.draw(ctx);
		}
		if (sharp_key != undefined && sharp_key.note.note_name.is_sharp_or_flat) {
			sharp_key.draw(ctx);
		}
	}
}

piano_view.drawInterval = function(interval){

	var play_type = interval.play_type;
	var first_note = (play_type == INTERVAL_PLAY_TYPE.ASCENDING) ? interval.lower_note : interval.higher_note;

	var ctx = piano_view.canvas.getContext("2d");
	ctx.clearRect(0, 0, piano_view.WIDTH, piano_view.HEIGHT);

	//fretboard_view.drawNoteWithColor(first_note);
	piano_view.drawNoteWithColor(first_note);
	// delay

	setTimeout(() => {
		var second_note = (play_type == INTERVAL_PLAY_TYPE.ASCENDING) ? interval.higher_note : interval.lower_note;
		//fretboard_view.drawNoteWithColor(second_note);
		piano_view.drawNoteWithColor(second_note);
	}, (interval.play_type == INTERVAL_PLAY_TYPE.HARMONIC) ? 0 : interval.delay_in_ms);	
}

piano_view.drawChord = function(chord){

	var ctx = piano_view.canvas.getContext("2d");
	ctx.clearRect(0, 0, piano_view.WIDTH, piano_view.HEIGHT);

	var j;
	for(j=0; j<chord.note_array.length; j++) {
		var note = chord.note_array[j];
		var label = chord.note_labels[j]
		/*fretboard_view.drawNotePlaceholder(note, label);*/
		if (label == 'R'){
			//fretboard_view.drawNoteWithColor(note, label);
			piano_view.drawNoteWithColor(note);
		} else {
			//fretboard_view.drawNoteWithWhite(note, label);
			piano_view.drawNoteWithColor(note, "#999");
		}
		//piano_view.drawNoteWithColor(note);
	}
}

