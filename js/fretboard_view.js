var fretboard_view = {

	HEIGHT: 0,
	WIDTH: 0,
	note_positions: [],
	noteValueToNotePositionsDict: {}
}

const TWO_PI = 2 * Math.PI;

fretboard_view.init = function(){

	fretboard_view.WIDTH = 1000;
	fretboard_view.HEIGHT = 230;

	var canvas = document.getElementById("fretboard_canvas");
	canvas.width=fretboard_view.WIDTH;
	canvas.height=fretboard_view.HEIGHT;

	var canvas_background = document.getElementById("fretboard_background_canvas");
	canvas_background.width=fretboard_view.WIDTH;
	canvas_background.height=fretboard_view.HEIGHT;

	this.draw_background();
}

fretboard_view.resize = function(newWidth) {
	var newWidth = Math.min(newWidth, 1000);

	var newHeight = newWidth * (230/1000);
	$("fretboard").style.height = newHeight + "px";
	$("fretboard_background_canvas").style.height = newHeight + "px";
	$("fretboard_canvas").style.height = newHeight + "px";

	$("fretboard").style.width = newWidth + "px";
	$("fretboard_background_canvas").style.width = newWidth + "px";
	$("fretboard_canvas").style.width = newWidth + "px";
}

class Point{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}

	draw(ctx, diameter, color="#000") {
		if(this.isValid){
			ctx.beginPath();
			ctx.fillStyle = color;
			ctx.lineWidth = 0;
			ctx.arc(this.x, this.y, diameter, 0, TWO_PI);
			ctx.fill();
		}
	}

	isValid(){
		return this.x >= 0 && this.y >= 0;
	}
}

class Line {
	constructor(pt1, pt2){
		this.pt1 = pt1;
		this.pt2 = pt2;
	}

	draw(ctx, color = '#000') {
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.lineWidth = 10;
		ctx.moveTo(this.pt1.x, this.pt1.y);
		ctx.lineTo(this.pt2.x, this.pt2.y);
		ctx.stroke();
	}

	getIntersectionPtBetweenTwoLines(other_line){
		var l1 = this;
		var l2 = other_line;
		var a1 = l1.pt2.y - l1.pt1.y;
        var b1 = l1.pt1.x - l1.pt2.x;
        var c1 = a1 * l1.pt1.x + b1 * l1.pt1.y;
 
        var a2 = l2.pt2.y - l2.pt1.y;
        var b2 = l2.pt1.x - l2.pt2.x;
        var c2 = a2 * l2.pt1.x + b2 * l2.pt1.y;
 
        var delta = a1 * b2 - a2 * b1;
        var pt = new Point((b2 * c1 - b1 * c2) / delta, (a1 * c2 - a2 * c1) / delta);
        return pt;
	}
}

class Polygon {
	constructor(array_of_pts){
		this.points = array_of_pts;
	}

	draw(ctx, color = "#eee"){

		var i;
		ctx.beginPath();
		if(color == 'clear')
			ctx.globalCompositeOperation = 'destination-out';
		ctx.lineWidth = 0;
		ctx.fillStyle = color;
		var first_pt = this.points[0]; 
		ctx.moveTo(first_pt.x, first_pt.y);
		

		for(i=1; i<this.points.length; i++){
			var pt = this.points[i];
			ctx.lineTo(pt.x, pt.y);
		}
		ctx.closePath();
		ctx.fill();

		if(color == 'clear')
			ctx.globalCompositeOperation = 'source-over';
	}
}

fretboard_view.draw_background = function(){

	var canvas = document.getElementById("fretboard_background_canvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, fretboard_view.WIDTH, fretboard_view.HEIGHT);

	var topMargin = Math.round(fretboard_view.HEIGHT * 0.08);
	var bottomMargin = Math.round(fretboard_view.HEIGHT * 0.15)

	var leftMargin = Math.round(fretboard_view.WIDTH *0.037);
	var rightMargin = Math.round(fretboard_view.WIDTH *0.010);;

	//rect

	var color = "#000";

	ctx.beginPath();
	ctx.lineWidth = 6;
	ctx.strokeStyle = color;
	ctx.rect(leftMargin, topMargin, fretboard_view.WIDTH-(rightMargin+leftMargin), fretboard_view.HEIGHT-(bottomMargin+topMargin));
	ctx.stroke();

	//draw frets

	const number_of_frets = 20;
	ctx.lineWidth = 3;

	ctx.strokeStyle = "#999";
	var i;

	var k = 21;
	var prev_buffer = 0;
	for (i=1; i<=number_of_frets; i++){

		ctx.beginPath();

		var buffer =  Math.round(k + prev_buffer );
		

		if(i<12)
			k = k -3;

		var x = Math.round(i * ((fretboard_view.WIDTH-(rightMargin+leftMargin)) / (number_of_frets)) + buffer);
		ctx.moveTo(x+leftMargin, topMargin);
		ctx.lineTo(x+leftMargin, fretboard_view.HEIGHT-(bottomMargin));
		ctx.stroke();

		prev_buffer = buffer;
	}

	


	

	// setup
	radius = fretboard_view.HEIGHT * 0.06;

	var note_x_positions = [(radius+2), (fretboard_view.WIDTH - (leftMargin + rightMargin)) * 0.078, 
										(fretboard_view.WIDTH - (leftMargin + rightMargin)) * 0.146,
										(fretboard_view.WIDTH - (leftMargin + rightMargin)) * 0.214, // 3
										(fretboard_view.WIDTH - (leftMargin + rightMargin)) * 0.278,
										(fretboard_view.WIDTH - (leftMargin + rightMargin)) * 0.337, // 5
										(fretboard_view.WIDTH - (leftMargin + rightMargin)) * 0.396,
										(fretboard_view.WIDTH - (leftMargin + rightMargin)) * 0.451, // 7
										(fretboard_view.WIDTH - (leftMargin + rightMargin)) * 0.502,
										(fretboard_view.WIDTH - (leftMargin + rightMargin)) * 0.550, // 9
										(fretboard_view.WIDTH - (leftMargin + rightMargin)) * 0.596,
										(fretboard_view.WIDTH - (leftMargin + rightMargin)) * 0.638,
										(fretboard_view.WIDTH - (leftMargin + rightMargin)) * 0.677, // 12
										(fretboard_view.WIDTH - (leftMargin + rightMargin)) * 0.714,
										(fretboard_view.WIDTH - (leftMargin + rightMargin)) * 0.751,
										(fretboard_view.WIDTH - (leftMargin + rightMargin)) * 0.789, // 15
										(fretboard_view.WIDTH - (leftMargin + rightMargin)) * 0.826,
										(fretboard_view.WIDTH - (leftMargin + rightMargin)) * 0.864, // 17
										(fretboard_view.WIDTH - (leftMargin + rightMargin)) * 0.901,
										(fretboard_view.WIDTH - (leftMargin + rightMargin)) * 0.9385,
										(fretboard_view.WIDTH - (leftMargin + rightMargin)) * 0.976]

	var high_e_string_y_position = topMargin;
	var b_string_y_position = ((fretboard_view.HEIGHT - (topMargin + bottomMargin)) * 0.20) + topMargin;
	var g_string_y_position = ((fretboard_view.HEIGHT - (topMargin + bottomMargin)) * 0.40) + topMargin;
	var d_string_y_position = ((fretboard_view.HEIGHT - (topMargin + bottomMargin)) * 0.60) + topMargin;
	var a_string_y_position = ((fretboard_view.HEIGHT - (topMargin + bottomMargin)) * 0.80) + topMargin;
	var e_string_y_position = ((fretboard_view.HEIGHT - (topMargin + bottomMargin)) * 1.00) + topMargin;
	var note_y_positions = [high_e_string_y_position, b_string_y_position, g_string_y_position, d_string_y_position, a_string_y_position, e_string_y_position];
	

	// draw fret markers

	var diameter = fretboard_view.HEIGHT * 0.02;
	var marker_color = "#ccc";
	function draw_single_dot_fret_markers(fret){
		ctx.beginPath();
		ctx.fillStyle = marker_color;
		ctx.lineWidth = 0;
		ctx.arc(note_x_positions[fret], (g_string_y_position + d_string_y_position) / 2, diameter, 0, TWO_PI);
		ctx.fill();

		ctx.beginPath();
		ctx.fillStyle = marker_color;
		ctx.lineWidth = 0;
		ctx.arc(note_x_positions[fret], fretboard_view.HEIGHT - (bottomMargin * .25), diameter, 0, TWO_PI);
		ctx.fill();

	}
	draw_single_dot_fret_markers(3);
	draw_single_dot_fret_markers(5);
	draw_single_dot_fret_markers(7);
	draw_single_dot_fret_markers(9);
	draw_single_dot_fret_markers(15);
	draw_single_dot_fret_markers(17);

	function draw_double_dot_fret_markers(fret){
		ctx.beginPath();
		ctx.fillStyle = marker_color;
		ctx.lineWidth = 0;
		ctx.arc(note_x_positions[fret], (d_string_y_position + a_string_y_position) / 2, diameter, 0, TWO_PI);
		ctx.fill();

		ctx.beginPath();
		ctx.fillStyle = marker_color;
		ctx.lineWidth = 0;
		ctx.arc(note_x_positions[fret], (g_string_y_position + b_string_y_position) / 2, diameter, 0, TWO_PI);
		ctx.fill();

		var seperation = fretboard_view.WIDTH * 0.008;
		ctx.beginPath();
		ctx.fillStyle = marker_color;
		ctx.lineWidth = 0;
		ctx.arc(note_x_positions[fret] - seperation, fretboard_view.HEIGHT - (bottomMargin * .25), diameter, 0, TWO_PI);
		ctx.fill();

		ctx.beginPath();
		ctx.fillStyle = marker_color;
		ctx.lineWidth = 0;
		ctx.arc(note_x_positions[fret] + seperation, fretboard_view.HEIGHT - (bottomMargin * .25), diameter, 0, TWO_PI);
		ctx.fill();
	}
	
	draw_double_dot_fret_markers(12);



	// draw strings

	const number_of_string = 6;
	var j;

	ctx.strokeStyle = "#555";
	ctx.lineWidth = 1;

	for (j=0; j<number_of_string; j++){

		ctx.beginPath();
		ctx.lineWidth = j*1.2;;

		var y = j * ( (fretboard_view.HEIGHT-(bottomMargin+topMargin)) / (number_of_string-1));
		ctx.moveTo(leftMargin, y+topMargin);
		ctx.lineTo(fretboard_view.WIDTH, y+topMargin);
		ctx.stroke();
	}

	// nut

	ctx.beginPath();
	ctx.lineWidth = 6;
	ctx.strokeStyle = "#000";
	ctx.rect(leftMargin, topMargin, 3, fretboard_view.HEIGHT-(bottomMargin+topMargin));
	ctx.stroke();

	// draw notes


	var note_positions = [];
	var i;
	for(i =0 ; i< note_y_positions.length; i++){
		var j;
		for(j =0; j <note_x_positions.length; j++){

			/*ctx.beginPath();
			ctx.fillStyle = "#fff";
			ctx.strokeStyle = "#000";
			ctx.lineWidth = 1;
			ctx.arc(note_x_positions[j], note_y_positions[i], radius, 0, TWO_PI);
			ctx.fill();
			ctx.stroke();*/
			note_positions.push([note_x_positions[j], note_y_positions[i]]);
		}
	}
	fretboard_view.note_positions = note_positions


	// 40 -  E2 to  84 - C6

	fretboard_view.noteValueToNotePositionsDict = {

		40 : [ note_positions[105] ], // E2
		41 : [ note_positions[106] ], // F
		42 : [ note_positions[107] ],
		43 : [ note_positions[108] ], // G
		44 : [ note_positions[109] ], 
		45 : [ note_positions[110], note_positions[84]], // A2
		46 : [ note_positions[111], note_positions[85]], 
		47 : [ note_positions[112], note_positions[86]], // B
		48 : [ note_positions[113], note_positions[87]], // C
		49 : [ note_positions[114], note_positions[88]],
		50 : [ note_positions[115], note_positions[89], note_positions[63]], // D3
		51 : [ note_positions[116], note_positions[90], note_positions[64]],
		52 : [ note_positions[117], note_positions[91], note_positions[65]], // E
		53 : [ note_positions[118], note_positions[92], note_positions[66]], // F
		54 : [ note_positions[119], note_positions[93], note_positions[67]],
		55 : [ note_positions[120], note_positions[94], note_positions[68], note_positions[42]], // G3
		56 : [ note_positions[121], note_positions[95], note_positions[69], note_positions[43]],
		57 : [ note_positions[122], note_positions[96], note_positions[70], note_positions[44]], // A
		58 : [ note_positions[123], note_positions[97], note_positions[71], note_positions[45]],
		59 : [ note_positions[124], note_positions[98], note_positions[72], note_positions[46], note_positions[21]], // B3
		60 : [ note_positions[125], note_positions[99], note_positions[73], note_positions[47], note_positions[22]], // C
		61 : [ 						note_positions[100], note_positions[74],note_positions[48], note_positions[23]],
		62 : [ 						note_positions[101], note_positions[75],note_positions[49], note_positions[24]], // D
		63 : [ 						note_positions[102], note_positions[76],note_positions[50], note_positions[25]],
		64 : [ 						note_positions[103], note_positions[77],note_positions[51], note_positions[26], note_positions[0]], // E4
		65 : [ 						note_positions[104], note_positions[78],note_positions[52], note_positions[27], note_positions[1]], // F
		66 : [ 											 note_positions[79],note_positions[53], note_positions[28], note_positions[2]], 
		67 : [ 											 note_positions[80],note_positions[54], note_positions[29], note_positions[3]], // G
		68 : [ 											 note_positions[81],note_positions[55], note_positions[30], note_positions[4]], 
		69 : [ 											 note_positions[82],note_positions[56], note_positions[31], note_positions[5]], // A
		70 : [ 											 note_positions[83],note_positions[57], note_positions[32], note_positions[6]],
		71 : [ 											 					note_positions[58], note_positions[33], note_positions[7]], // B
		72 : [ 											 					note_positions[59], note_positions[34], note_positions[8]], // C5
		73 : [ 											 					note_positions[60], note_positions[35], note_positions[9]],
		74 : [ 											 					note_positions[61], note_positions[36], note_positions[10]], // D
		75 : [ 											 					note_positions[62], note_positions[37], note_positions[11]],
		76 : [ 											 										note_positions[38], note_positions[12]], // E
		77 : [ 											 										note_positions[39], note_positions[13]], // F
		78 : [ 											 										note_positions[40], note_positions[14]],
		79 : [ 											 										note_positions[41], note_positions[15]], // G
		80 : [ 											 															note_positions[16]],
		81 : [ 											 															note_positions[17]], // A
		82 : [ 											 															note_positions[18]],
		83 : [ 											 															note_positions[19]], // B
		84 : [ 											 															note_positions[20]] // C6
	};
}

fretboard_view.getNotePositionsFromNoteType = function(note_type) {

	var note_positions = fretboard_view.note_positions
	switch(note_type){
    	case NOTE_TYPE.C:
		return [	note_positions[113], note_positions[87],
					note_positions[125], note_positions[99], note_positions[73], note_positions[47], note_positions[22],
					note_positions[59], note_positions[34], note_positions[8],
					note_positions[20] ]
		case NOTE_TYPE.C_sharp: 
		return [	note_positions[114], note_positions[88],
					note_positions[100], note_positions[74],note_positions[48], note_positions[23],
					note_positions[60], note_positions[35], note_positions[9]]
		case NOTE_TYPE.D: 
		return [	note_positions[115], note_positions[89], note_positions[63],
					note_positions[101], note_positions[75],note_positions[49], note_positions[24],
					note_positions[61], note_positions[36], note_positions[10] ]
		case NOTE_TYPE.D_sharp: 
		return [	note_positions[116], note_positions[90], note_positions[64],
					note_positions[102], note_positions[76],note_positions[50], note_positions[25],
					note_positions[62], note_positions[37], note_positions[11]]
		case NOTE_TYPE.E: 
		return [ 	note_positions[105], 
					note_positions[117], note_positions[91], note_positions[65], 
					note_positions[103], note_positions[77], note_positions[51], note_positions[26], note_positions[0], 
					note_positions[38], note_positions[12] ]
		case NOTE_TYPE.F: 
		return [	note_positions[106],
					note_positions[118], note_positions[92], note_positions[66],
					note_positions[104], note_positions[78],note_positions[52], note_positions[27], note_positions[1],
					note_positions[39], note_positions[13] ]
		case NOTE_TYPE.F_sharp: 
		return [	note_positions[107],
					note_positions[119], note_positions[93], note_positions[67],
					note_positions[79], note_positions[53], note_positions[28], note_positions[2],
					note_positions[40], note_positions[14]]
		case NOTE_TYPE.G: 
		return [	note_positions[108],
  					note_positions[120], note_positions[94], note_positions[68], note_positions[42],
  					note_positions[80], note_positions[54], note_positions[29], note_positions[3],
  					note_positions[41], note_positions[15] ]
  		case NOTE_TYPE.G_sharp: 
  		return [	note_positions[109],
  					note_positions[121], note_positions[95], note_positions[69], note_positions[43],
  					note_positions[81],note_positions[55], note_positions[30], note_positions[4],
  					note_positions[16]]
  		case NOTE_TYPE.A: 
  		return [	note_positions[110], note_positions[84],
  					note_positions[122], note_positions[96], note_positions[70], note_positions[44],
  					note_positions[82], note_positions[56], note_positions[31], note_positions[5],
  					note_positions[17] ]
  		case NOTE_TYPE.A_sharp: 
  		return [	note_positions[111], note_positions[85],
  					note_positions[123], note_positions[97], note_positions[71], note_positions[45],
  					note_positions[83],note_positions[57], note_positions[32], note_positions[6],
  					note_positions[18]]
  		case NOTE_TYPE.B: 
  		return [	note_positions[112], note_positions[86],
  					note_positions[124], note_positions[98], note_positions[72], note_positions[46], note_positions[21],
  					note_positions[58], note_positions[33], note_positions[7],
  					note_positions[19] ]
  	}
}

fretboard_view.drawNote = function(note){

	var canvas = document.getElementById("fretboard_canvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, fretboard_view.WIDTH, fretboard_view.HEIGHT);

	fretboard_view.drawNoteWithColor(note);
}

fretboard_view.drawNoteWithColor = function(note, label) {
	var canvas = document.getElementById("fretboard_canvas");
	var ctx = canvas.getContext("2d");
	var note_positions = fretboard_view.noteValueToNotePositionsDict[note.note_value]

	var i;
	for( i=0; i<note_positions.length; i++)  {
		ctx.beginPath();
		ctx.fillStyle = note.note_name.color;
		ctx.strokeStyle = "#000";
		ctx.lineWidth = 1;
		ctx.arc(note_positions[i][0], note_positions[i][1], radius, 0, TWO_PI);

		ctx.fill();
		ctx.stroke();

		ctx.fillStyle = 'black';
    	ctx.font = radius + 'px san-serif';
    	ctx.textAlign = 'center';
    	ctx.fillText(label, note_positions[i][0], note_positions[i][1]+radius*.3, radius*2);

	}
}

fretboard_view.drawInterval = function(interval){

	var play_type = interval.play_type;
	var first_note = (play_type == INTERVAL_PLAY_TYPE.ASCENDING) ? interval.lower_note : interval.higher_note;

	var canvas = document.getElementById("fretboard_canvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, fretboard_view.WIDTH, fretboard_view.HEIGHT);

	fretboard_view.drawNoteWithColor(first_note);

	// delay

	setTimeout(() => {
		var second_note = (play_type == INTERVAL_PLAY_TYPE.ASCENDING) ? interval.higher_note : interval.lower_note;
		fretboard_view.drawNoteWithColor(second_note);
	}, (interval.play_type == INTERVAL_PLAY_TYPE.HARMONIC) ? 0 : interval.delay_in_ms);	
}

fretboard_view.drawChord = function(chord){
	var canvas = document.getElementById("fretboard_canvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, fretboard_view.WIDTH, fretboard_view.HEIGHT);

	var j;
	for(j=0; j<chord.note_array.length; j++) {
		var note = chord.note_array[j];
		var label = chord.note_labels[j]
		fretboard_view.drawNotePlaceholder(note, label);
		if (label == 'R'){
			fretboard_view.drawNoteWithColor(note, label);
		} else {
			fretboard_view.drawNoteWithWhite(note, label);
		}
	}
}

fretboard_view.drawNotePlaceholder = function(note, label) {
	var canvas = document.getElementById("fretboard_canvas");
	var ctx = canvas.getContext("2d");
	var note_positions = fretboard_view.getNotePositionsFromNoteType(note.note_name.name)

	var i;
	for( i=0; i<note_positions.length; i++)  {
		ctx.beginPath();
		ctx.fillStyle = "#555";
		ctx.strokeStyle = "#000";
		ctx.lineWidth = 1;
		ctx.arc(note_positions[i][0], note_positions[i][1], radius, 0, TWO_PI);

		ctx.fill();
		ctx.stroke();


		ctx.fillStyle = 'white';
    	ctx.font = radius + 'px san-serif';
    	ctx.textAlign = 'center';
    	ctx.fillText(label, note_positions[i][0], note_positions[i][1]+radius*.3, radius*2);
	}
}

fretboard_view.drawNoteWithWhite = function(note, label) {
	var canvas = document.getElementById("fretboard_canvas");
	var ctx = canvas.getContext("2d");
	var note_positions = fretboard_view.noteValueToNotePositionsDict[note.note_value]

	var i;
	for( i=0; i<note_positions.length; i++)  {
		ctx.beginPath();
		ctx.fillStyle = "#fff";
		ctx.strokeStyle = "#000";
		ctx.lineWidth = 1;
		ctx.arc(note_positions[i][0], note_positions[i][1], radius, 0, TWO_PI);

		ctx.fill();
		ctx.stroke();

		ctx.fillStyle = 'black';
    	ctx.font = radius + 'px san-serif';
    	ctx.textAlign = 'center';
    	ctx.fillText(label, note_positions[i][0], note_positions[i][1]+radius*.3, radius*2);
	}
}
