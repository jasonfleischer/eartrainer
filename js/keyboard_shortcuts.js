function setup_keyboard_listeners() {

	document.addEventListener('keyup', function(event){

		var code = event.code;
		if (code === 'Space') {
			var play_button = is_compact_window() ? $("mobile_play_pause_button"): $('play_pause_button');
			if(document.activeElement !== play_button) { // prevents double call with focus on play
				playPause();
				play_button.focus();
			}
		}

		function setBPM(bpm){
			model.BPM = bpm;
			log.i("on BPM change: " + model.BPM);
			range_control.load(range_control.on_range_control_changed, "", MIN_BPM , MAX_BPM, 1, model.BPM, false, 0);
			storage.set_BPM(model.BPM);
			update_UI_BPM(model.BPM);
			reloadBPM();
		}

		function decrementDivision(){
			var new_division;
			if(new_beat_division == 0){
				new_division = Math.max(model.beat_division - 1, 1);	
			}else{
				new_division = Math.max(new_beat_division - 1, 1);
			}
			$("division_select").value = new_division;
			reloadDivisions(new_division);
		}
		function incrementDivision(){
			var new_division;
			if(new_beat_division == 0){
				new_division = Math.min(model.beat_division + 1, 4);	
			}else{
				new_division = Math.min(new_beat_division + 1, 4);
			}
			$("division_select").value = new_division;
			reloadDivisions(new_division);
		}
	});
}

function show_keyboard_shortcuts(){
	dismissInfo();
	var keyboard_shorcut_window = window.open("Keyboard Shortcuts", "_blank", "width=370,height=450,titlebar=no,toolbar=no,status=no,location=no,menubar=no");
	keyboard_shorcut_window.document.title = "Keyboard Shortcuts";

	var contents = '<table style=\'width:100%; text-align: left;\'>'+
			'<tr><th>Key</th><th>Command</th></tr>'+
			'<tr><td>Space</td><td>Play or stop</td></tr>'+
		'</table>';
	contents = contents.replaceAll("< tr>", "<tr>");
	keyboard_shorcut_window.document.write(contents);
}
