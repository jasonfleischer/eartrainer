function setup_controls(){

	setup_onclicks();
	setup_select_controls();
	setup_sliders_controls();
	setup_switches_controls();
	setup_multiple_select_controls();
	setup_dual_range_controls();

	function setup_onclicks() {
		$("page_name").onclick = function() { info(); };
		$("kofi_button").onclick = function() { kofi(); };
		$("info_button").onclick = function() { info(); };
		$("setting_button").onclick = function() { toggle_settings(); };
		$("play_pause_button").onclick = function() { playPause(); };
		$("mobile_play_pause_button").onclick = function() { playPause(); };

		setup_left_column_hide_close();
		setup_settings_menu_on_click();

		function setup_left_column_hide_close() {
			$("hide_show_left_column").addEventListener("click", function(event){
				if(is_left_column_showing){
					$("hide_show_left_column_img").src = "img/right_chevron_white.svg"
				} else{
					$("hide_show_left_column_img").src = "img/left_chevron_white.svg"
				}
				is_left_column_showing = !is_left_column_showing

				window_resized_end()
			});
		}

		function setup_settings_menu_on_click(){
			$("ul_wrapper").addEventListener("click", function(event){
				if(is_compact_window())
					hide_settings();
			});
			$("nav-menu-ul").addEventListener("click", function(event){
				event.stopPropagation();
				return false;
			});
		}
	}

	function setup_select_controls(){

		setup_duration_select();
		setup_instrument_select();

		function setup_duration_select() {
			const id = "duration_select";
			$(id).addEventListener("change", function(e){
				var value = parseInt(this.value);
				log.i("on "+id+": " + value);
				model.duration = value;
				storage.set_duration(value);
				durationStartTime = new Date();
				audio_controller.reloadDuration();
				update_UI_duration(model.duration * 60000);
			});
			$(id).value = model.duration;
			update_UI_duration(model.duration * 60000);
		}

		function setup_instrument_select() {
			const id = "instrument_select";
			$(id).addEventListener("change", function(e){
				var value = parseInt(this.value);
				log.i("on "+id+": " + value);
				model.instrument = value;
				storage.set_instrument(value);
				audio_controller.setInstrument(model.instrument);
			});
			$(id).value = model.instrument;
			audio_controller.setInstrument(model.instrument);
		}
	}

	function setup_sliders_controls(){
		
		setup_bpm_controls();
		setup_volume_control();
		setup_speak_volume_control();

		function setup_bpm_controls() {

			var min = MIN_BPM;
			var max = MAX_BPM;
			var step = 1;
			//setup_bpm_dial(min, max, step);
			setup_bpm_range(min, max, step);
			//setup_bpm_prompt();
			$("speed_text").innerHTML = (BPMtoMilliSeconds(model.BPM) / 1000).toFixed(1) + "s";

			function setup_bpm_range(min, max, step){
				var bpm_range = $("bpm_range");
				bpm_range.min = min;
				bpm_range.max = max;
				bpm_range.value = model.BPM;
				bpm_range.step = step;
				bpm_range.addEventListener("change", function(e){
					model.BPM = parseFloat(this.value);
					log.i("on BPM range change: " + model.BPM);
					//range_control.load(range_control.on_range_control_changed, "", min , max, step, model.BPM, false, 0);
					storage.set_BPM(model.BPM);
					update_UI_BPM(model.BPM);
					reloadBPM();
				});

				bpm_range.addEventListener('input', function(){
					model.BPM = parseFloat(this.value);
					log.i("on BPM range change: " + model.BPM);
					storage.set_BPM(model.BPM);
					update_UI_BPM(model.BPM);
					reloadBPM();
				}, true);
			}
		}

		function setup_volume_control() {

			var min = 0.05;
			var max = 0.5;
			var step = 0.05;
			setup_volume_range(min, max, step);

			function setup_volume_range(min, max, step){
				var range = $("volume_range");
				range.min = min;
				range.max = max;
				range.value = model.volume;
				range.step = step;
				range.addEventListener("change", function(e){
					model.volume = parseFloat(this.value);
					log.i("on Volume range change: " + model.volume);
					storage.set_volume(model.volume);
					update_UI_volume(model.volume);
				});

				range.addEventListener('input', function(){
					model.volume = parseFloat(this.value);
					log.i("on Volume range change: " + model.volume);
					storage.set_volume(model.volume);
					update_UI_volume(model.volume);
				}, true);
			}
		}

		function setup_speak_volume_control() {

			var min = 0.1;
			var max = 1.0;
			var step = 0.05;
			setup_volume_range(min, max, step);

			function setup_volume_range(min, max, step){
				var range = $("speak_volume_range");
				range.min = min;
				range.max = max;
				range.value = model.speak_volume;
				range.step = step;
				range.addEventListener("change", function(e){
					model.speak_volume = parseFloat(this.value);
					log.i("on Speak Volume range change: " + model.speak_volume);
					storage.set_speak_volume(model.speak_volume);
					update_UI_speak_volume(model.speak_volume);
				});

				range.addEventListener('input', function(){
					model.speak_volume = parseFloat(this.value);
					log.i("on Speak Volume range change: " + model.speak_volume);
					storage.set_speak_volume(model.speak_volume);
					update_UI_speak_volume(model.speak_volume);
				}, true);
			}
		}
	}

	function setup_switches_controls(){

		setup_speak_switch();
		setup_single_notes_switch();
		setup_interval_switch();
		setup_chords_switch();

		function setup_speak_switch() {
			$("speak").addEventListener("click", function(e){
				$("speak_checkbox").click();
			});
			$("speak_checkbox_switch").addEventListener('keyup', function(e) {
				if (event.code === 'Space' || event.code === 'Enter') $("speak_checkbox").click();
			});
			$("speak_checkbox").addEventListener("change", function(e){
				var value = this.checked;
				log.i("on speak change: " + value);
				model.speak = value;
				storage.set_speak(value);
				update_UI_speak();
			});
			$("speak_checkbox").checked = model.speak;
		}

		function setup_single_notes_switch() {
			$("single_notes").addEventListener("click", function(e){
				$("single_notes_checkbox").click();
			});
			$("single_notes_checkbox_switch").addEventListener('keyup', function(e) {
				if (event.code === 'Space' || event.code === 'Enter') $("ssingle_notes_checkbox").click();
			});
			$("single_notes_checkbox").addEventListener("change", function(e){
				var value = this.checked;
				log.i("on single notes change: " + value);
				model.single_notes.enabled = value;
				storage.set_single_notes(value);
			});
			$("single_notes_checkbox").checked = model.single_notes.enabled;
		}

		function setup_interval_switch() {
			$("intervals").addEventListener("click", function(e){
				$("intervals_checkbox").click();
			});
			$("intervals_checkbox_switch").addEventListener('keyup', function(e) {
				if (event.code === 'Space' || event.code === 'Enter') $("speak_checkbox").click();
			});
			$("intervals_checkbox").addEventListener("change", function(e){
				var value = this.checked;
				log.i("on intervals change: " + value);
				model.interval.enabled = value;
				storage.set_intervals(value);
				update_UI_intervals();
			});
			$("intervals_checkbox").checked = model.interval.enabled;
			update_UI_intervals();
		}

		function setup_chords_switch() {
			$("chords").addEventListener("click", function(e){
				$("chords_checkbox").click();
			});
			$("chords_checkbox_switch").addEventListener('keyup', function(e) {
				if (event.code === 'Space' || event.code === 'Enter') $("chords_checkbox").click();
			});
			$("chords_checkbox").addEventListener("change", function(e){
				var value = this.checked;
				log.i("on chords change: " + value);
				model.chords.enabled = value;
				storage.set_chords(value);
				update_UI_chords()
			});
			$("chords_checkbox").checked = model.chords.enabled;
			update_UI_chords();
		}
	}

	function setup_multiple_select_controls (){
		
		setup_display_diagrams_multiple_select()
		setup_interval_type_multiple_select();
		setup_interval_play_type_multiple_select();
		setup_chord_three_note_multiple_select();
		setup_chord_three_note_inversion_multiple_select();
		setup_chord_four_note_multiple_select();
		setup_chord_four_note_inversion_multiple_select();
		setup_chord_play_type_multiple_select();

		function setup_display_diagrams_multiple_select() {
			
			var element_id_to_value_pairs = [	["grid-item-display_diagrams_piano", DISPLAY_DIAGRAM.PIANO], 
												["grid-item-display_diagrams_guitar", DISPLAY_DIAGRAM.GUITAR]];

			for (i = 0; i < element_id_to_value_pairs.length; i++) {
				var pair = element_id_to_value_pairs[i];
				update_UI_display_diagram(pair);
				setupDisplayDiagramClickListener(pair);
			}
			function setupDisplayDiagramClickListener(pair){
				var id = pair[0];
				var value = pair[1];
				$(id).addEventListener("click", function(e) {

					var enabled = model.display_diagrams.includes(value)

					if(model.display_diagrams.length == 1 && enabled) {
						log.i("prevent no selection")
						return;
					}

					if(enabled)
						model.display_diagrams.remove(value);
					else
						model.display_diagrams.push(value);

					log.i("on display diagram change: " + model.display_diagrams);
					storage.set_display_diagrams(value, !enabled);
					update_UI_display_diagram(pair);
				});
			}
		}

		function setup_interval_type_multiple_select() {
			let INTERVAL_TYPE = musicKit.Interval.TYPE;
			var element_id_type_pairs = [	["grid-item-m2", INTERVAL_TYPE.MINOR_SECOND], 
											["grid-item-M2", INTERVAL_TYPE.MAJOR_SECOND],
											["grid-item-m3", INTERVAL_TYPE.MINOR_THIRD],
											["grid-item-M3", INTERVAL_TYPE.MAJOR_THIRD],
											["grid-item-p4", INTERVAL_TYPE.PERFECT_FOURTH],
											["grid-item-tt", INTERVAL_TYPE.TRITONE],
											["grid-item-p5", INTERVAL_TYPE.PERFECT_FIFTH],
											["grid-item-m6", INTERVAL_TYPE.MINOR_SIXTH],
											["grid-item-M6", INTERVAL_TYPE.MAJOR_SIXTH],
											["grid-item-m7", INTERVAL_TYPE.MINOR_SEVENTH],
											["grid-item-M7", INTERVAL_TYPE.MAJOR_SEVENTH],
											["grid-item-p8", INTERVAL_TYPE.OCTAVE]];

			for (i = 0; i < element_id_type_pairs.length; i++) {
				var pair = element_id_type_pairs[i];
				update_UI_interval_type(pair);
				setupIntervalTypeClickListener(pair);
			}

			function setupIntervalTypeClickListener(pair){
				var id = pair[0];
				var type = pair[1];
				$(id).addEventListener("click", function(e) {

					

					var type_enabled = model.interval.types.includes(type)

					if(model.interval.types.length == 1 && type_enabled) {
						log.i("prevent no selection")
						return;
					}

					if(type_enabled)
						model.interval.types.remove(type);
					else
						model.interval.types.push(type);

					log.i("on interval type change: " + model.interval.types);
					storage.set_interval_type(type, !type_enabled);
					update_UI_interval_type(pair);
				});
			}
		}


		function setup_interval_play_type_multiple_select() {
			let INTERVAL_PLAY_TYPE = musicKit.Interval.PLAY_TYPE;
			var element_id_play_type_pairs = [	["grid-item-ascending", INTERVAL_PLAY_TYPE.ASCENDING], 
												["grid-item-descending", INTERVAL_PLAY_TYPE.DESCENDING],
												["grid-item-harmonic", INTERVAL_PLAY_TYPE.HARMONIC]];

			for (i = 0; i < element_id_play_type_pairs.length; i++) {
				var pair = element_id_play_type_pairs[i];
				update_UI_interval_play_type(pair);
				setupIntervalPlayTypeClickListener(pair);
			}
			function setupIntervalPlayTypeClickListener(pair){
				var id = pair[0];
				var type = pair[1];
				$(id).addEventListener("click", function(e) {

					var type_enabled = model.interval.play_types.includes(type)

					if(model.interval.play_types.length == 1 && type_enabled) {
						log.i("prevent no selection")
						return;
					}

					if(type_enabled)
						model.interval.play_types.remove(type);
					else
						model.interval.play_types.push(type);

					log.i("on interval type change: " + model.interval.play_types);
					storage.set_interval_play_type(type, !type_enabled);
					update_UI_interval_play_type(pair);
				});
			}
		}


		function setup_chord_three_note_multiple_select() {
			var element_id_play_type_pairs = [	["grid-item-min", musicKit.Chord.TYPE.minor], 
												["grid-item-maj", musicKit.Chord.TYPE.Major], 
												["grid-item-aug", musicKit.Chord.TYPE.Aug], 
												["grid-item-dim", musicKit.Chord.TYPE.Dim]];

			for (i = 0; i < element_id_play_type_pairs.length; i++) {
				var pair = element_id_play_type_pairs[i];
				update_UI_chord_three_note_type(pair);
				setupClickListener(pair);
			}
			function setupClickListener(pair){
				var id = pair[0];
				var type = pair[1];
				$(id).addEventListener("click", function(e) {

					var type_enabled = model.chords.three_note_types.includes(type)

					if((model.chords.three_note_types.length + model.chords.four_note_types.length) == 1 && type_enabled) {
						log.i("prevent no selection")
						return;
					}

					if(type_enabled)
						model.chords.three_note_types.remove(type);
					else
						model.chords.three_note_types.push(type);

					log.i("on chords three_note_types change: " + model.chords.three_note_types);
					storage.set_chord_three_note_type(type, !type_enabled);
					update_UI_chord_three_note_type(pair);
				});
			}
		}

		function setup_chord_three_note_inversion_multiple_select() {
			var element_id_play_type_pairs = [	["grid-item-three_note_root", musicKit.Chord.INVERSION_TYPE.Root], 
												["grid-item-three_note_first", musicKit.Chord.INVERSION_TYPE.First], 
												["grid-item-three_note_second", musicKit.Chord.INVERSION_TYPE.Second]];

			for (i = 0; i < element_id_play_type_pairs.length; i++) {
				var pair = element_id_play_type_pairs[i];
				update_UI_chord_three_note_inversion_type(pair);
				setupClickListener(pair);
			}
			function setupClickListener(pair){
				var id = pair[0];
				var type = pair[1];
				$(id).addEventListener("click", function(e) {

					var type_enabled = model.chords.three_note_inversion_types.includes(type)

					if(model.chords.three_note_inversion_types.length == 1 && type_enabled) {
						log.i("prevent no selection")
						return;
					}

					if(type_enabled)
						model.chords.three_note_inversion_types.remove(type);
					else
						model.chords.three_note_inversion_types.push(type);

					log.i("on chords three_note_inversion_types change: " + model.chords.three_note_inversion_types);
					storage.set_chord_three_note_inversion_type(type, !type_enabled);
					update_UI_chord_three_note_inversion_type(pair);
				});
			}
		}

		function setup_chord_four_note_multiple_select() {
			var element_id_play_type_pairs = [	["grid-item-maj-seventh", musicKit.Chord.TYPE.Major7], 
												["grid-item-min-seventh", musicKit.Chord.TYPE.minor7], 
												["grid-item-dominant-seventh", musicKit.Chord.TYPE.Dom7]];

			for (i = 0; i < element_id_play_type_pairs.length; i++) {
				var pair = element_id_play_type_pairs[i];
				update_UI_chord_four_note_type(pair);
				setupClickListener(pair);
			}
			function setupClickListener(pair){
				var id = pair[0];
				var type = pair[1];
				$(id).addEventListener("click", function(e) {

					var type_enabled = model.chords.four_note_types.includes(type)

					if((model.chords.three_note_types.length + model.chords.four_note_types.length) == 1 && type_enabled) {
						log.i("prevent no selection")
						return;
					}

					if(type_enabled)
						model.chords.four_note_types.remove(type);
					else
						model.chords.four_note_types.push(type);

					log.i("on chords four_note_types change: " + model.chords.four_note_types);
					storage.set_chord_four_note_type(type, !type_enabled);
					update_UI_chord_four_note_type(pair);
				});
			}
		}


		function setup_chord_four_note_inversion_multiple_select() {
			var element_id_play_type_pairs = [	["grid-item-four_note_root", musicKit.Chord.INVERSION_TYPE.Root], 
												["grid-item-four_note_first", musicKit.Chord.INVERSION_TYPE.First], 
												["grid-item-four_note_second", musicKit.Chord.INVERSION_TYPE.Second],
												["grid-item-four_note_third", musicKit.Chord.INVERSION_TYPE.Third]];

			for (i = 0; i < element_id_play_type_pairs.length; i++) {
				var pair = element_id_play_type_pairs[i];
				update_UI_chord_four_note_inversion_type(pair);
				setupClickListener(pair);
			}
			function setupClickListener(pair){
				var id = pair[0];
				var type = pair[1];
				$(id).addEventListener("click", function(e) {

					var type_enabled = model.chords.four_note_inversion_types.includes(type)

					if(model.chords.four_note_inversion_types.length == 1 && type_enabled) {
						log.i("prevent no selection")
						return;
					}

					if(type_enabled)
						model.chords.four_note_inversion_types.remove(type);
					else
						model.chords.four_note_inversion_types.push(type);

					log.i("on chords four_note_inversion_types change: " + model.chords.four_note_inversion_types);
					storage.set_chord_four_note_inversion_type(type, !type_enabled);
					update_UI_chord_four_note_inversion_type(pair);
				});
			}
		}

		function setup_chord_play_type_multiple_select() {
			var element_id_play_type_pairs = [	["grid-item-chord-harmonic", musicKit.Chord.PLAY_TYPE.HARMONIC], 
												["grid-item-chord-arpeggiate", musicKit.Chord.PLAY_TYPE.ARPEGGIATE]];

			for (i = 0; i < element_id_play_type_pairs.length; i++) {
				var pair = element_id_play_type_pairs[i];
				update_UI_chord_play_type(pair);
				setupChordPlayTypeClickListener(pair);
			}
			function setupChordPlayTypeClickListener(pair){
				var id = pair[0];
				var type = pair[1];
				$(id).addEventListener("click", function(e) {

					var type_enabled = model.chords.play_types.includes(type)

					if(model.chords.play_types.length == 1 && type_enabled) {
						log.i("prevent no selection")
						return;
					}

					if(type_enabled)
						model.chords.play_types.remove(type);
					else
						model.chords.play_types.push(type);

					log.i("on chords type change: " + model.chords.play_types);
					storage.set_chord_play_type(type, !type_enabled);
					update_UI_chord_play_type(pair);
				});
			}
		}

		function setup_dual_range_controls() {
		    //dual_range.setup('volumeMin', 'volumeMax', 'volumeFill', 'volumeMinValue', 'volumeMaxValue');
		    //setupDualRange('priceMin', 'priceMax', 'priceFill', 'priceMinValue', 'priceMaxValue', '$');
		}
	}
}
