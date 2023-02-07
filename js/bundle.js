(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const TYPE=Object.freeze({SINGLE_NOTE:0,INTERVAL:1,CHORD:2});const INSTRUMENT=Object.freeze({ALL:0,PIANO:1,GUITAR:2});const DURATION=Object.freeze({FIVE_MINUTE:1,TEN_MINUTES:10,FIFTEEN_MINUTES:15,TWENTY_MINUTES:20,THIRTY_MINUTES:30,FORTY_FIVE_MINUTES:45,SIXTY_MINUTES:60,INFINITE:-1});const DISPLAY_DIAGRAM=Object.freeze({PIANO:1,GUITAR:2});const MAX_BPM=15;const MIN_BPM=3;var all_notes=[];var is_left_column_showing=true;var model={duration:DURATION.THIRTY_MINUTES,BPM:15,volume:1,instrument:INSTRUMENT.ALL,speak:true,speak_volume:1,display_diagrams:[],range:{min:40,max:84},single_notes:{enabled:true},interval:{enabled:false,types:[],play_types:[]},chords:{enabled:false,three_note_types:[],three_note_inversion_types:[],four_note_types:[],four_note_inversion_types:[],play_types:[]},beat_division:1,time_signature:2};Number.prototype.to_percent=function(min,max){return 100*(this-min)/(max-min)};Array.prototype.remove=function(){var what,a=arguments,L=a.length,ax;while(L&&this.length){what=a[--L];while((ax=this.indexOf(what))!==-1){this.splice(ax,1)}}return this};function $(id){return document.getElementById(id)}function randomInteger(min,max){return Math.floor(Math.random()*(max-min+1)+min)}function isFirefox(){function checkBrowser(){c=navigator.userAgent.search("Chrome");f=navigator.userAgent.search("Firefox");m8=navigator.userAgent.search("MSIE 8.0");m9=navigator.userAgent.search("MSIE 9.0");if(c>-1){browser="Chrome"}else if(f>-1){browser="Firefox"}else if(m9>-1){browser="MSIE 9.0"}else if(m8>-1){browser="MSIE 8.0"}else{browser="Other - Safari"}return browser}return checkBrowser()==="Firefox"}function is_compact_window(){return window.innerWidth<=800||window.innerHeight<=500}var isSafari=navigator.vendor&&navigator.vendor.indexOf("Apple")>-1&&navigator.userAgent&&navigator.userAgent.indexOf("CriOS")==-1&&navigator.userAgent.indexOf("FxiOS")==-1;window.mobileCheck=function(){let check=false;(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check=true})(navigator.userAgent||navigator.vendor||window.opera);return check};window.mobileAndTabletCheck=function(){let check=false;(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check=true})(navigator.userAgent||navigator.vendor||window.opera);return check};function isFromHomeScreen(){const params=new URLSearchParams(window.location.search);return params.has("from")}function openURL(url){window.open(url,"_blank")}function BPMtoMilliSeconds(BPM){return 1e3/(BPM/60)}var storage={};storage.load=function(){model.duration=storage.get_duration(DURATION.TEN_MINUTES);model.instrument=storage.get_instrument(INSTRUMENT.PIANO);model.BPM=storage.get_BPM(8);model.volume=storage.get_volume(.1);model.speak=storage.get_speak(true);model.speak_volume=storage.get_speak_volume(.25);model.single_notes.enabled=storage.get_single_notes(true);loadInstrumentDisplayDiagramData();function loadInstrumentDisplayDiagramData(){if(storage.get_instrument_display_piano(true))model.display_diagrams.push(DISPLAY_DIAGRAM.PIANO);if(storage.get_instrument_display_guitar(true))model.display_diagrams.push(DISPLAY_DIAGRAM.GUITAR)}loadIntervalData();function loadIntervalData(){model.interval.enabled=storage.get_intervals(true);let INTERVAL_TYPE=musicKit.Interval.TYPE;if(storage.get_minor_second(true))model.interval.types.push(INTERVAL_TYPE.MINOR_SECOND);if(storage.get_major_second(true))model.interval.types.push(INTERVAL_TYPE.MAJOR_SECOND);if(storage.get_minor_third(true))model.interval.types.push(INTERVAL_TYPE.MINOR_THIRD);if(storage.get_major_third(true))model.interval.types.push(INTERVAL_TYPE.MAJOR_THIRD);if(storage.get_perfect_fourth(true))model.interval.types.push(INTERVAL_TYPE.PERFECT_FOURTH);if(storage.get_tritone(true))model.interval.types.push(INTERVAL_TYPE.TRITONE);if(storage.get_perfect_fifth(true))model.interval.types.push(INTERVAL_TYPE.PERFECT_FIFTH);if(storage.get_minor_sixth(true))model.interval.types.push(INTERVAL_TYPE.MINOR_SIXTH);if(storage.get_major_sixth(true))model.interval.types.push(INTERVAL_TYPE.MAJOR_SIXTH);if(storage.get_minor_seventh(true))model.interval.types.push(INTERVAL_TYPE.MINOR_SEVENTH);if(storage.get_major_seventh(true))model.interval.types.push(INTERVAL_TYPE.MAJOR_SEVENTH);if(storage.get_octave(true))model.interval.types.push(INTERVAL_TYPE.OCTAVE);let INTERVAL_PLAY_TYPE=musicKit.Interval.PLAY_TYPE;if(storage.get_ascending(true))model.interval.play_types.push(INTERVAL_PLAY_TYPE.ASCENDING);if(storage.get_descending(true))model.interval.play_types.push(INTERVAL_PLAY_TYPE.DESCENDING);if(storage.get_harmonic(false))model.interval.play_types.push(INTERVAL_PLAY_TYPE.HARMONIC)}loadChordData();function loadChordData(){model.chords.enabled=storage.get_chords(true);let CHORD_TYPE=musicKit.Chord.TYPE;if(storage.get_chords_major(true))model.chords.three_note_types.push(CHORD_TYPE.Major);if(storage.get_chords_minor(true))model.chords.three_note_types.push(CHORD_TYPE.minor);if(storage.get_chords_augmented(false))model.chords.three_note_types.push(CHORD_TYPE.Aug);if(storage.get_chords_diminished(false))model.chords.three_note_types.push(CHORD_TYPE.Dim);if(storage.get_chords_major7(false))model.chords.four_note_types.push(CHORD_TYPE.Major7);if(storage.get_chords_minor7(false))model.chords.four_note_types.push(CHORD_TYPE.minor7);if(storage.get_chords_dominant7(false))model.chords.four_note_types.push(CHORD_TYPE.Dom7);let CHORD_INVERSION_TYPE=musicKit.Chord.INVERSION_TYPE;if(storage.get_chords_three_note_inversion_root(true))model.chords.three_note_inversion_types.push(CHORD_INVERSION_TYPE.Root);if(storage.get_chords_three_note_inversion_first(false))model.chords.three_note_inversion_types.push(CHORD_INVERSION_TYPE.First);if(storage.get_chords_three_note_inversion_second(false))model.chords.three_note_inversion_types.push(CHORD_INVERSION_TYPE.Second);if(storage.get_chords_major_seven(false))model.chords.four_note_types.push(CHORD_TYPE.Major7);if(storage.get_chords_minor_seven(false))model.chords.four_note_types.push(CHORD_TYPE.minor7);if(storage.get_chords_dominant_seven(false))model.chords.four_note_types.push(CHORD_TYPE.Dom7);if(storage.get_chords_four_note_inversion_root(true))model.chords.four_note_inversion_types.push(CHORD_INVERSION_TYPE.Root);if(storage.get_chords_four_note_inversion_first(false))model.chords.four_note_inversion_types.push(CHORD_INVERSION_TYPE.First);if(storage.get_chords_four_note_inversion_second(false))model.chords.four_note_inversion_types.push(CHORD_INVERSION_TYPE.Second);if(storage.get_chords_four_note_inversion_second(false))model.chords.four_note_inversion_types.push(CHORD_INVERSION_TYPE.Third);let CHORD_PLAY_TYPE=musicKit.Chord.PLAY_TYPE;if(storage.get_chords_harmonic(true))model.chords.play_types.push(CHORD_PLAY_TYPE.HARMONIC);if(storage.get_chords_arpeggiate(false))model.chords.play_types.push(CHORD_PLAY_TYPE.ARPEGGIATE)}};storage.BPM_KEY="EAR_TRAINER_BPM_KEY";storage.get_BPM=function(default_value){return parseInt(storage.get(storage.BPM_KEY,default_value))};storage.set_BPM=function(value){localStorage.setItem(storage.BPM_KEY,value)};storage.DURATION_KEY="EAR_TRAINER_DURATION_KEY";storage.get_duration=function(default_value){return parseFloat(storage.get(storage.DURATION_KEY,default_value))};storage.set_duration=function(value){localStorage.setItem(storage.DURATION_KEY,value)};storage.INSTRUMENT_KEY="EAR_TRAINER_INSTRUMENT_KEY";storage.get_instrument=function(default_value){return parseFloat(storage.get(storage.INSTRUMENT_KEY,default_value))};storage.set_instrument=function(value){localStorage.setItem(storage.INSTRUMENT_KEY,value)};storage.VOLUME_KEY="EAR_TRAINER_VOLUME_KEY";storage.get_volume=function(default_value){return parseFloat(storage.get(storage.VOLUME_KEY,default_value))};storage.set_volume=function(value){localStorage.setItem(storage.VOLUME_KEY,value)};storage.SPEAK="EAR_TRAINER_SPEAK";storage.get_speak=function(default_value){var value=storage.get(storage.SPEAK,default_value);return Boolean(value==="true"||value===true)};storage.set_speak=function(value){localStorage.setItem(storage.SPEAK,value)};storage.SPEAK_VOLUME_KEY="EAR_TRAINER_SPEAK_VOLUME_KEY";storage.get_speak_volume=function(default_value){return parseFloat(storage.get(storage.SPEAK_VOLUME_KEY,default_value))};storage.set_speak_volume=function(value){localStorage.setItem(storage.SPEAK_VOLUME_KEY,value)};storage.set_display_diagrams=function(display_type,value){switch(display_type){case DISPLAY_DIAGRAM.PIANO:storage.set_instrument_display_piano(value);break;case DISPLAY_DIAGRAM.GUITAR:storage.set_instrument_display_guitar(value);break}};storage.INSTRUMENT_DISPLAY_PIANO="EAR_TRAINER_INSTRUMENT_DISPLAY_PIANO";storage.get_instrument_display_piano=function(default_value){var value=storage.get(storage.INSTRUMENT_DISPLAY_PIANO,default_value);return Boolean(value==="true"||value===true)};storage.set_instrument_display_piano=function(value){localStorage.setItem(storage.INSTRUMENT_DISPLAY_PIANO,value)};storage.INSTRUMENT_DISPLAY_GUITAR="EAR_TRAINER_INSTRUMENT_DISPLAY_GUITAR";storage.get_instrument_display_guitar=function(default_value){var value=storage.get(storage.INSTRUMENT_DISPLAY_GUITAR,default_value);return Boolean(value==="true"||value===true)};storage.set_instrument_display_guitar=function(value){localStorage.setItem(storage.INSTRUMENT_DISPLAY_GUITAR,value)};storage.SINGLE_NOTES="EAR_TRAINER_SINGLE_NOTES";storage.get_single_notes=function(default_value){var value=storage.get(storage.SINGLE_NOTES,default_value);return Boolean(value==="true"||value===true)};storage.set_single_notes=function(value){localStorage.setItem(storage.SINGLE_NOTES,value)};storage.INTERVALS="EAR_TRAINER_INTERVALS";storage.get_intervals=function(default_value){var value=storage.get(storage.INTERVALS,default_value);return Boolean(value==="true"||value===true)};storage.set_intervals=function(value){localStorage.setItem(storage.INTERVALS,value)};storage.set_interval_type=function(interval_type,value){let INTERVAL_TYPE=musicKit.Interval.TYPE;switch(interval_type){case INTERVAL_TYPE.MINOR_SECOND:storage.set_minor_second(value);break;case INTERVAL_TYPE.MAJOR_SECOND:storage.set_major_second(value);break;case INTERVAL_TYPE.MINOR_THIRD:storage.set_minor_third(value);break;case INTERVAL_TYPE.MAJOR_THIRD:storage.set_major_third(value);break;case INTERVAL_TYPE.PERFECT_FOURTH:storage.set_perfect_fourth(value);break;case INTERVAL_TYPE.TRITONE:storage.set_tritone(value);break;case INTERVAL_TYPE.PERFECT_FIFTH:storage.set_perfect_fifth(value);break;case INTERVAL_TYPE.MINOR_SIXTH:storage.set_minor_sixth(value);break;case INTERVAL_TYPE.MAJOR_SIXTH:storage.set_major_sixth(value);break;case INTERVAL_TYPE.MINOR_SEVENTH:storage.set_minor_seventh(value);break;case INTERVAL_TYPE.MAJOR_SEVENTH:storage.set_major_seventh(value);break;case INTERVAL_TYPE.OCTAVE:storage.set_octave(value);break}};storage.MINOR_SECOND="EAR_TRAINER_MINOR_SECOND";storage.get_minor_second=function(default_value){var value=storage.get(storage.MINOR_SECOND,default_value);return Boolean(value==="true"||value===true)};storage.set_minor_second=function(value){localStorage.setItem(storage.MINOR_SECOND,value)};storage.MAJOR_SECOND="EAR_TRAINER_MAJOR_SECOND";storage.get_major_second=function(default_value){var value=storage.get(storage.MAJOR_SECOND,default_value);return Boolean(value==="true"||value===true)};storage.set_major_second=function(value){localStorage.setItem(storage.MAJOR_SECOND,value)};storage.MINOR_THIRD="EAR_TRAINER_MINOR_THIRD";storage.get_minor_third=function(default_value){var value=storage.get(storage.MINOR_THIRD,default_value);return Boolean(value==="true"||value===true)};storage.set_minor_third=function(value){localStorage.setItem(storage.MINOR_THIRD,value)};storage.MAJOR_THIRD="EAR_TRAINER_MAJOR_THIRD";storage.get_major_third=function(default_value){var value=storage.get(storage.MAJOR_THIRD,default_value);return Boolean(value==="true"||value===true)};storage.set_major_third=function(value){localStorage.setItem(storage.MAJOR_THIRD,value)};storage.PERFECT_FOURTH="EAR_TRAINER_PERFECT_FOURTH";storage.get_perfect_fourth=function(default_value){var value=storage.get(storage.PERFECT_FOURTH,default_value);return Boolean(value==="true"||value===true)};storage.set_perfect_fourth=function(value){localStorage.setItem(storage.PERFECT_FOURTH,value)};storage.TRITONE="EAR_TRAINER_TRITONE";storage.get_tritone=function(default_value){var value=storage.get(storage.TRITONE,default_value);return Boolean(value==="true"||value===true)};storage.set_tritone=function(value){localStorage.setItem(storage.TRITONE,value)};storage.PERFECT_FIFTH="EAR_TRAINER_PERFECT_FIFTH";storage.get_perfect_fifth=function(default_value){var value=storage.get(storage.PERFECT_FIFTH,default_value);return Boolean(value==="true"||value===true)};storage.set_perfect_fifth=function(value){localStorage.setItem(storage.PERFECT_FIFTH,value)};storage.MINOR_SIXTH="EAR_TRAINER_MINOR_SIXTH";storage.get_minor_sixth=function(default_value){var value=storage.get(storage.MINOR_SIXTH,default_value);return Boolean(value==="true"||value===true)};storage.set_minor_sixth=function(value){localStorage.setItem(storage.MINOR_SIXTH,value)};storage.MAJOR_SIXTH="EAR_TRAINER_MAJOR_SIXTH";storage.get_major_sixth=function(default_value){var value=storage.get(storage.MAJOR_SIXTH,default_value);return Boolean(value==="true"||value===true)};storage.set_major_sixth=function(value){localStorage.setItem(storage.MAJOR_SIXTH,value)};storage.MINOR_SEVENTH="EAR_TRAINER_MINOR_SEVENTH";storage.get_minor_seventh=function(default_value){var value=storage.get(storage.MINOR_SEVENTH,default_value);return Boolean(value==="true"||value===true)};storage.set_minor_seventh=function(value){localStorage.setItem(storage.MINOR_SEVENTH,value)};storage.MAJOR_SEVENTH="EAR_TRAINER_MAJOR_SEVENTH";storage.get_major_seventh=function(default_value){var value=storage.get(storage.MAJOR_SEVENTH,default_value);return Boolean(value==="true"||value===true)};storage.set_major_seventh=function(value){localStorage.setItem(storage.MAJOR_SEVENTH,value)};storage.OCTAVE="EAR_TRAINER_OCTAVE";storage.get_octave=function(default_value){var value=storage.get(storage.OCTAVE,default_value);return Boolean(value==="true"||value===true)};storage.set_octave=function(value){localStorage.setItem(storage.OCTAVE,value)};storage.set_interval_play_type=function(interval_play_type,value){let INTERVAL_PLAY_TYPE=musicKit.Interval.PLAY_TYPE;switch(interval_play_type){case INTERVAL_PLAY_TYPE.ASCENDING:storage.set_ascending(value);break;case INTERVAL_PLAY_TYPE.DESCENDING:storage.set_descending(value);break;case INTERVAL_PLAY_TYPE.HARMONIC:storage.set_harmonic(value);break}};storage.ASCENDING="EAR_TRAINER_ASCENDING";storage.get_ascending=function(default_value){var value=storage.get(storage.ASCENDING,default_value);return Boolean(value==="true"||value===true)};storage.set_ascending=function(value){localStorage.setItem(storage.ASCENDING,value)};storage.DESCENDING="EAR_TRAINER_DESCENDING";storage.get_descending=function(default_value){var value=storage.get(storage.DESCENDING,default_value);return Boolean(value==="true"||value===true)};storage.set_descending=function(value){localStorage.setItem(storage.DESCENDING,value)};storage.HARMONIC="EAR_TRAINER_HARMONIC";storage.get_harmonic=function(default_value){var value=storage.get(storage.HARMONIC,default_value);return Boolean(value==="true"||value===true)};storage.set_harmonic=function(value){localStorage.setItem(storage.HARMONIC,value)};storage.CHORDS="EAR_TRAINER_CHORDS";storage.get_chords=function(default_value){var value=storage.get(storage.CHORDS,default_value);return Boolean(value==="true"||value===true)};storage.set_chords=function(value){localStorage.setItem(storage.CHORDS,value)};storage.set_chord_three_note_type=function(type,value){let CHORD_TYPE=musicKit.Chord.TYPE;switch(type){case CHORD_TYPE.Major:storage.set_chords_major(value);break;case CHORD_TYPE.minor:storage.set_chords_minor(value);break;case CHORD_TYPE.Aug:storage.set_chords_augmented(value);break;case CHORD_TYPE.Dim:storage.set_chords_diminished(value);break;case CHORD_TYPE.Major7:storage.set_chords_major7(value);break;case CHORD_TYPE.minor7:storage.set_chords_minor7(value);break;case CHORD_TYPE.Dom7:storage.set_chords_dominant7(value);break}};storage.CHORD_MAJOR="EAR_TRAINER_CHORD_MAJOR";storage.get_chords_major=function(default_value){var value=storage.get(storage.CHORD_MAJOR,default_value);return Boolean(value==="true"||value===true)};storage.set_chords_major=function(value){localStorage.setItem(storage.CHORD_MAJOR,value)};storage.CHORD_MINOR="EAR_TRAINER_CHORD_MINOR";storage.get_chords_minor=function(default_value){var value=storage.get(storage.CHORD_MINOR,default_value);return Boolean(value==="true"||value===true)};storage.set_chords_minor=function(value){localStorage.setItem(storage.CHORD_MINOR,value)};storage.CHORD_AUG="EAR_TRAINER_CHORD_AUG";storage.get_chords_augmented=function(default_value){var value=storage.get(storage.CHORD_AUG,default_value);return Boolean(value==="true"||value===true)};storage.set_chords_augmented=function(value){localStorage.setItem(storage.CHORD_AUG,value)};storage.CHORD_DIM="EAR_TRAINER_CHORD_DIM";storage.get_chords_diminished=function(default_value){var value=storage.get(storage.CHORD_DIM,default_value);return Boolean(value==="true"||value===true)};storage.set_chords_diminished=function(value){localStorage.setItem(storage.CHORD_DIM,value)};storage.CHORD_MAJ7="EAR_TRAINER_CHORD_MAJ7";storage.get_chords_major7=function(default_value){var value=storage.get(storage.CHORD_MAJ7,default_value);return Boolean(value==="true"||value===true)};storage.set_chords_major7=function(value){localStorage.setItem(storage.CHORD_MAJ7,value)};storage.CHORD_MIN7="EAR_TRAINER_CHORD_MIN7";storage.get_chords_minor7=function(default_value){var value=storage.get(storage.CHORD_MIN7,default_value);return Boolean(value==="true"||value===true)};storage.set_chords_minor7=function(value){localStorage.setItem(storage.CHORD_MIN7,value)};storage.CHORD_DOM7="EAR_TRAINER_CHORD_DOM7";storage.get_chords_dominant7=function(default_value){var value=storage.get(storage.CHORD_DOM7,default_value);return Boolean(value==="true"||value===true)};storage.set_chords_dominant7=function(value){localStorage.setItem(storage.CHORD_DOM7,value)};storage.set_chord_three_note_inversion_type=function(type,value){let CHORD_INVERSION_TYPE=musicKit.Chord.INVERSION_TYPE;switch(type){case CHORD_INVERSION_TYPE.Root:storage.set_chords_three_note_inversion_root(value);break;case CHORD_INVERSION_TYPE.First:storage.set_chords_three_note_inversion_first(value);break;case CHORD_INVERSION_TYPE.Second:storage.set_chords_three_note_inversion_second(value);break}};storage.CHORD_THREE_NOTE_ROOT="EAR_TRAINER_CHORD_THREE_NOTE_ROOT";storage.get_chords_three_note_inversion_root=function(default_value){var value=storage.get(storage.CHORD_THREE_NOTE_ROOT,default_value);return Boolean(value==="true"||value===true)};storage.set_chords_three_note_inversion_root=function(value){localStorage.setItem(storage.CHORD_THREE_NOTE_ROOT,value)};storage.CHORD_THREE_NOTE_FIRST="EAR_TRAINER_CHORD_THREE_NOTE_FIRST";storage.get_chords_three_note_inversion_first=function(default_value){var value=storage.get(storage.CHORD_THREE_NOTE_FIRST,default_value);return Boolean(value==="true"||value===true)};storage.set_chords_three_note_inversion_first=function(value){localStorage.setItem(storage.CHORD_THREE_NOTE_FIRST,value)};storage.CHORD_THREE_NOTE_SECOND="EAR_TRAINER_CHORD_THREE_NOTE_SECOND";storage.get_chords_three_note_inversion_second=function(default_value){var value=storage.get(storage.CHORD_THREE_NOTE_SECOND,default_value);return Boolean(value==="true"||value===true)};storage.set_chords_three_note_inversion_second=function(value){localStorage.setItem(storage.CHORD_THREE_NOTE_SECOND,value)};storage.set_chord_four_note_type=function(type,value){let CHORD_TYPE=musicKit.Chord.TYPE;switch(type){case CHORD_TYPE.Major7:storage.set_chords_major_seven(value);break;case CHORD_TYPE.minor7:storage.set_chords_minor_seven(value);break;case CHORD_TYPE.Dom7:storage.set_chords_dominant_seven(value);break}};storage.CHORD_MAJOR_SEVEN="EAR_TRAINER_CHORD_MAJOR_SEVEN";storage.get_chords_major_seven=function(default_value){var value=storage.get(storage.CHORD_MAJOR_SEVEN,default_value);return Boolean(value==="true"||value===true)};storage.set_chords_major_seven=function(value){localStorage.setItem(storage.CHORD_MAJOR_SEVEN,value)};storage.CHORD_MINOR_SEVEN="EAR_TRAINER_CHORD_MINOR_SEVEN";storage.get_chords_minor_seven=function(default_value){var value=storage.get(storage.CHORD_MINOR_SEVEN,default_value);return Boolean(value==="true"||value===true)};storage.set_chords_minor_seven=function(value){localStorage.setItem(storage.CHORD_MINOR_SEVEN,value)};storage.CHORD_DOM_SEVEN="EAR_TRAINER_CHORD_DOM_SEVEN";storage.get_chords_dominant_seven=function(default_value){var value=storage.get(storage.CHORD_DOM_SEVEN,default_value);return Boolean(value==="true"||value===true)};storage.set_chords_dominant_seven=function(value){localStorage.setItem(storage.CHORD_DOM_SEVEN,value)};storage.set_chord_four_note_inversion_type=function(type,value){let CHORD_INVERSION_TYPE=musicKit.Chord.INVERSION_TYPE;switch(type){case CHORD_INVERSION_TYPE.Root:storage.set_chords_four_note_inversion_root(value);break;case CHORD_INVERSION_TYPE.First:storage.set_chords_four_note_inversion_first(value);break;case CHORD_INVERSION_TYPE.Second:storage.set_chords_four_note_inversion_second(value);break;case CHORD_INVERSION_TYPE.Third:storage.set_chords_four_note_inversion_second(value);break}};storage.CHORD_FOUR_NOTE_ROOT="EAR_TRAINER_CHORD_FOUR_NOTE_ROOT";storage.get_chords_four_note_inversion_root=function(default_value){var value=storage.get(storage.CHORD_FOUR_NOTE_ROOT,default_value);return Boolean(value==="true"||value===true)};storage.set_chords_four_note_inversion_root=function(value){localStorage.setItem(storage.CHORD_FOUR_NOTE_ROOT,value)};storage.CHORD_FOUR_NOTE_FIRST="EAR_TRAINER_CHORD_FOUR_NOTE_FIRST";storage.get_chords_four_note_inversion_first=function(default_value){var value=storage.get(storage.CHORD_FOUR_NOTE_FIRST,default_value);return Boolean(value==="true"||value===true)};storage.set_chords_four_note_inversion_first=function(value){localStorage.setItem(storage.CHORD_FOUR_NOTE_FIRST,value)};storage.CHORD_FOUR_NOTE_SECOND="EAR_TRAINER_CHORD_FOUR_NOTE_SECOND";storage.get_chords_four_note_inversion_second=function(default_value){var value=storage.get(storage.CHORD_FOUR_NOTE_SECOND,default_value);return Boolean(value==="true"||value===true)};storage.set_chords_four_note_inversion_second=function(value){localStorage.setItem(storage.CHORD_FOUR_NOTE_SECOND,value)};storage.CHORD_FOUR_NOTE_THIRD="EAR_TRAINER_CHORD_FOUR_NOTE_THIRD";storage.get_chords_four_note_inversion_second=function(default_value){var value=storage.get(storage.CHORD_FOUR_NOTE_THIRD,default_value);return Boolean(value==="true"||value===true)};storage.set_chords_four_note_inversion_second=function(value){localStorage.setItem(storage.CHORD_FOUR_NOTE_THIRD,value)};storage.set_chord_play_type=function(play_type,value){let CHORD_PLAY_TYPE=musicKit.Chord.PLAY_TYPE;switch(play_type){case CHORD_PLAY_TYPE.ARPEGGIATE:storage.set_chords_arpeggiate(value);break;case CHORD_PLAY_TYPE.HARMONIC:storage.set_chords_harmonic(value);break}};storage.ARPEGGIATE="EAR_TRAINER_ARPEGGIATE";storage.get_chords_arpeggiate=function(default_value){var value=storage.get(storage.ARPEGGIATE,default_value);return Boolean(value==="true"||value===true)};storage.set_chords_arpeggiate=function(value){localStorage.setItem(storage.ARPEGGIATE,value)};storage.CHORDS_HARMONIC="EAR_TRAINER_CHORDS_HARMONIC";storage.get_chords_harmonic=function(default_value){var value=storage.get(storage.CHORDS_HARMONIC,default_value);return Boolean(value==="true"||value===true)};storage.set_chords_harmonic=function(value){localStorage.setItem(storage.CHORDS_HARMONIC,value)};storage.get=function(key,default_value){let result=localStorage.getItem(key);return result==undefined?default_value:result};function isDurationExpired(){if(!isDurationInfinte()){var running_time=new Date-audio_controller.start_time;var durationInMS=getDurationInMS();if(running_time>durationInMS){log.i("Duration expired");return true}}return false;function isDurationInfinte(){return model.duration==DURATION.INFINITE}function getDurationInMS(){return model.duration*6e4}}function reloadActivePlayer(){if(audio_controller.playing){audio_controller.model_changed=true}}var new_beat_division=0;function reloadDivisions(value){if(audio_controller.playing){audio_controller.divisions_changed=true;new_beat_division=value}else{model.beat_division=value}}function reloadBPM(value){if(audio_controller.playing){audio_controller.bpm_changed=true}}function forcePlay(){audio_controller.pause();update_UI_stopped();audio_controller.play();update_UI_playing()}function forceStop(){var was_playing=false;if(audio_controller.playing){audio_controller.playPause();update_UI_stopped();was_playing=true}return was_playing}function playPause(){var loading=midi_controller.load();var j;for(j=0;j<5;j++){audio_controller.preloaded_audio[j]=document.createElement("AUDIO")}if(loading){setTimeout(function(){log.i("delayed execution for midi loading");continuePlay()},500)}else{continuePlay()}function continuePlay(){var audio_is_playing=audio_controller.playPause();if(audio_is_playing)update_UI_playing();else update_UI_stopped()}}var audio_controller={index:0,start_time:0,note:{},interval:{},chord:{},preloaded_audio:[],playing:false,timer_id:{},audio_queue:[],text_queue:[],model_changed:false,divisions_changed:false,bpm_changed:false,gain_node:{},context:{}};audio_controller.reloadDuration=function(){audio_controller.start_time=new Date};audio_controller.setInstrument=function(instrument){};audio_controller.playPause=function(){if(this.playing)this.pause();else this.play(model);return this.playing};audio_controller.pause=function(){if(this.playing)clearInterval(audio_controller.timer_id);this.playing=false};audio_controller.play=function(){audio_controller.start_time=new Date;audio_controller.index=1;this.playing=true;var audio_queue_index=0;function BPMtoMilliSeconds(BPM){return 1e3/(BPM/60)}var time_division_milli_seconds=BPMtoMilliSeconds(model.BPM)/model.beat_division;audio_controller.executeAudioTimer(audio_queue_index,this.accent_audio,this.audio_queue,this.text_queue);var interval=time_division_milli_seconds;var expected=Date.now()+interval;audio_controller.timer_id=setTimeout(step,interval);function step(){if(isDurationExpired()&&audio_controller.index%2!=0){log.i("force close");clearInterval(audio_controller.timer_id);forceStop();update_UI_stopped();hideAnswer();if(model.speak)playFile("audio/exercise_completed.mp3");return}var drift=Date.now()-expected;if(drift>interval){log.e("something really bad happened. Maybe the browser (tab) was inactive? possibly special handling to avoid futile 'catch up' run");audio_controller.pause()}audio_queue_index=(audio_queue_index+1)%audio_controller.audio_queue.length;if(audio_controller.model_changed){audio_controller.model_changed=false;forcePlay()}else{var time_division_milli_seconds=BPMtoMilliSeconds(model.BPM)/model.beat_division;audio_controller.executeAudioTimer(audio_queue_index,audio_controller.accent_audio,audio_controller.audio_queue,audio_controller.text_queue,time_division_milli_seconds);if(audio_controller.bpm_changed){audio_controller.bpm_changed=false;var time_division_milli_seconds=BPMtoMilliSeconds(model.BPM)/model.beat_division;interval=time_division_milli_seconds;expected=Date.now()+interval;audio_controller.timer_id=setTimeout(step,interval)}else if(audio_queue_index%model.beat_division==0&&audio_controller.divisions_changed){audio_controller.divisions_changed=false;var old_length=audio_controller.audio_queue.length;model.beat_division=new_beat_division;var time_division_milli_seconds=BPMtoMilliSeconds(model.BPM)/new_beat_division;interval=time_division_milli_seconds;expected=Date.now()+interval;audio_queue_index=audio_queue_index/old_length*audio_controller.audio_queue.length;audio_controller.timer_id=setTimeout(step,interval)}else{expected+=interval;audio_controller.timer_id=setTimeout(step,Math.max(0,interval-drift))}}}};function play_audio_string_sequence(audio_string_array){var j;for(j=0;j<audio_string_array.length;j++){audio_controller.preloaded_audio[j].setAttribute("src",audio_string_array[j]);audio_controller.preloaded_audio[j].volume=model.speak_volume}var i=j;for(i=0;i<audio_controller.preloaded_audio.length;i++){audio_controller.preloaded_audio[j].removeAttribute("src")}play_audio_sequence(audio_controller.preloaded_audio);function play_audio_sequence(){var i=0;var repeat_function=function(){audio_controller.preloaded_audio[i].removeEventListener("ended",repeat_function);i=i+1;if(i<audio_string_array.length){audio_controller.preloaded_audio[i].addEventListener("ended",repeat_function);audio_controller.preloaded_audio[i].play()}};var j=0;for(j=0;j<audio_controller.preloaded_audio.length;j++){audio_controller.preloaded_audio[j].removeEventListener("ended",repeat_function)}audio_controller.preloaded_audio[i].addEventListener("ended",repeat_function);audio_controller.preloaded_audio[i].play()}}function playFile(file){var audio=audio_controller.preloaded_audio[0];audio.setAttribute("src",file);audio.volume=model.speak_volume;audio.play()}function playNoteName(note){var note_name=note.note_name;if(note_name.is_sharp_or_flat){play_audio_string_sequence(note_name.file_name)}else{playFile(note_name.file_name)}}function playInterval(interval){var audio_file_names=[interval.audio_file_name];if(interval.play_type==musicKit.Interval.PLAY_TYPE.ASCENDING){audio_file_names.push("audio/intervals/ascending.mp3")}else if(interval.play_type==musicKit.Interval.PLAY_TYPE.DESCENDING){audio_file_names.push("audio/intervals/descending.mp3")}play_audio_string_sequence(audio_file_names)}function playChord(chord){play_audio_string_sequence(chord.file_name)}var type=TYPE.SINGLE_NOTE;function getAudioType(){var audio_types=[];if(model.single_notes.enabled)audio_types.push(TYPE.SINGLE_NOTE);if(model.interval.enabled)audio_types.push(TYPE.INTERVAL);if(model.chords.enabled)audio_types.push(TYPE.CHORD);if(audio_types.count==0)return TYPE.SINGLE_NOTE;var rand=randomInteger(0,audio_types.length-1);return audio_types[rand]}audio_controller.executeAudioTimer=function(index,accent_audio,audio_queue,text_queue,time_division_milli_seconds){if(audio_controller.index%2!=0){if(isDurationExpired()){forceStop();update_UI_stopped();clearInterval(audio_controller.timer_id);hideAnswer();return}type=getAudioType()}if(type==TYPE.SINGLE_NOTE){executeSingleNote()}else if(type==TYPE.INTERVAL){executeInterval()}else if(type==TYPE.CHORD){executeChord()}else{log.e("unknown type");executeSingleNote()}audio_controller.index=audio_controller.index+1;function executeSingleNote(){if(audio_controller.index%2==0){var note=audio_controller.note;showNoteAnswer(note);if(model.speak){playNoteName(note)}fretboardView.clear();fretboardView.drawNote(note);pianoView.clear();pianoView.drawNote(note)}else{hideAnswer();audio_controller.note=musicKit.Note.getRandom(musicKit.all_notes,musicKit.guitar_range)}midi_controller.playNote(audio_controller.note,time_division_milli_seconds/1e3)}function executeInterval(){if(audio_controller.index%2==0){var interval=audio_controller.interval;showIntervalAnswer(interval);if(model.speak){playInterval(interval)}fretboardView.clear();fretboardView.drawInterval(interval);pianoView.clear();pianoView.drawInterval(interval)}else{hideAnswer();audio_controller.interval=musicKit.Interval.generateRandom(musicKit.all_notes,musicKit.guitar_range,model.interval.types,model.interval.play_types)}midi_controller.playInterval(audio_controller.interval)}function executeChord(){if(audio_controller.index%2==0){var chord=audio_controller.chord;showChordAnswer(chord);if(model.speak){playChord(chord)}fretboardView.drawChord(chord);pianoView.clear();pianoView.drawChord(chord)}else{hideAnswer();let chord_types=model.chords.three_note_types.concat(model.chords.four_note_types);audio_controller.chord=musicKit.Chord.generateRandom(musicKit.all_notes,musicKit.guitar_range,chord_types,model.chords.play_types,model.chords.three_note_inversion_types,model.chords.four_note_inversion_types)}midi_controller.playChord(audio_controller.chord)}};var alert={};alert.init=function(){$("alert_container").addEventListener("click",function(event){alert.dismiss()});$("dismiss_alert_button").addEventListener("click",function(event){alert.dismiss()});$("alert").addEventListener("click",function(event){event.stopPropagation();return false})};alert.show=function(title,contents){$("alert_title").innerHTML=title;$("alert_contents").innerHTML=contents;$("alert_container").style.display="block"};alert.dismiss=function(){$("alert_container").style.display="none"};var information={};information.showAlert=function(){let contents='<br class="desktop-only" />'+'<p id="openMailToDeveloper">Thank you for using this website. If you wish to submit feedback, comment or report an error click <strong>here</strong></p>'+"<br/>"+'<p id="surikov">Special thanks to Surikov for their <strong>WebAudioFont</strong> library.</p>'+"<br/>"+'<p id="personalWebsite">Information about the developer can be found <strong>here</strong>.</p>'+"<br/>"+'<p id="musicAppWebsite">Other music apps created by this developer can be found <strong>here</strong>.</p>'+'<br class="desktop-only"/>'+'<button class="desktop-only" id="keyboard_shortcuts">Keyboard Shortcuts</button>';alert.show("Information",contents);information.setupOnClicks()};information.setupOnClicks=function(){$("openMailToDeveloper").onclick=function(){openMailToDeveloper()};$("surikov").onclick=function(){openURL("https://surikov.github.io/webaudiofont/")};$("personalWebsite").onclick=function(){openURL("https://jasonfleischer.github.io/website/")};$("musicAppWebsite").onclick=function(){openURL("https://jasonfleischer.github.io/music-apps/")};$("keyboard_shortcuts").onclick=function(){show_keyboard_shortcuts()}};information.dismissAlert=function(){alert.dismiss()};function setup_keyboard_listeners(){document.addEventListener("keyup",function(event){var code=event.code;if(code==="Space"){var play_button=is_compact_window()?$("mobile_play_pause_button"):$("play_pause_button");if(document.activeElement!==play_button){playPause();play_button.focus()}}function setBPM(bpm){model.BPM=bpm;log.i("on BPM change: "+model.BPM);range_control.load(range_control.on_range_control_changed,"",MIN_BPM,MAX_BPM,1,model.BPM,false,0);storage.set_BPM(model.BPM);update_UI_BPM(model.BPM);reloadBPM()}function decrementDivision(){var new_division;if(new_beat_division==0){new_division=Math.max(model.beat_division-1,1)}else{new_division=Math.max(new_beat_division-1,1)}$("division_select").value=new_division;reloadDivisions(new_division)}function incrementDivision(){var new_division;if(new_beat_division==0){new_division=Math.min(model.beat_division+1,4)}else{new_division=Math.min(new_beat_division+1,4)}$("division_select").value=new_division;reloadDivisions(new_division)}})}function show_keyboard_shortcuts(){dismissInfo();var keyboard_shorcut_window=window.open("Keyboard Shortcuts","_blank","width=370,height=450,titlebar=no,toolbar=no,status=no,location=no,menubar=no");keyboard_shorcut_window.document.title="Keyboard Shortcuts";var contents="<table style='width:100%; text-align: left;'>"+"<tr><th>Key</th><th>Command</th></tr>"+"<tr><td>Space</td><td>Play or stop</td></tr>"+"</table>";contents=contents.replaceAll("< tr>","<tr>");keyboard_shorcut_window.document.write(contents)}var midi_controller={duration_in_sec:3.5,tone:{},audioContext:{},player:{},tone:getJCLive()};midi_controller.init=function(){midi_controller.player=new WebAudioFontPlayer};var midi_initialized=false;var AudioContextFunc=window.AudioContext||window.webkitAudioContext;midi_controller.load=function(){if(!midi_initialized){midi_controller.audioContext=new AudioContextFunc;midi_controller.player.adjustPreset(midi_controller.audioContext,midi_controller.tone);midi_initialized=true;return true}return false};midi_controller.playNote=function(note,duration_in_sec=3.5){this.player.queueWaveTable(this.audioContext,this.audioContext.destination,this.tone,this.audioContext.currentTime,note.midi_value,this.duration_in_sec,model.volume)};midi_controller.playInterval=function(interval,duration_in_sec=3.5){var lower_note=interval.lower_note;var higher_note=interval.getHigherNote(musicKit.all_notes);var play_type=interval.play_type;var delay_between_notes=this.audioContext.currentTime+interval.delay_in_ms/1e3;if(play_type==musicKit.Interval.PLAY_TYPE.HARMONIC){this.player.queueWaveTable(this.audioContext,this.audioContext.destination,this.tone,0,lower_note.midi_value,this.duration_in_sec,model.volume);this.player.queueWaveTable(this.audioContext,this.audioContext.destination,this.tone,0,higher_note.midi_value,this.duration_in_sec,model.volume)}else if(play_type==musicKit.Interval.PLAY_TYPE.DESCENDING){this.player.queueWaveTable(this.audioContext,this.audioContext.destination,this.tone,0,higher_note.midi_value,this.duration_in_sec,model.volume);this.player.queueWaveTable(this.audioContext,this.audioContext.destination,this.tone,delay_between_notes,lower_note.midi_value,this.duration_in_sec,model.volume)}else{this.player.queueWaveTable(this.audioContext,this.audioContext.destination,this.tone,0,lower_note.midi_value,duration_in_sec,model.volume);this.player.queueWaveTable(this.audioContext,this.audioContext.destination,this.tone,delay_between_notes,higher_note.midi_value,this.duration_in_sec,model.volume)}};midi_controller.playChord=function(chord,duration_in_sec=3.5){var delay=this.audioContext.currentTime;let note_array=chord.getNoteArray(musicKit.all_notes,model.range);var i;for(i=0;i<note_array.length;i++){var note=note_array[i];this.player.queueWaveTable(this.audioContext,this.audioContext.destination,this.tone,delay,note.midi_value,this.duration_in_sec,model.volume);if(chord.play_type==musicKit.Chord.PLAY_TYPE.ARPEGGIATE){delay=delay+chord.delay_in_ms/1e3}}};var window_resize_start_event_occured=false;var resized_timer;window.onresize=function(){clearTimeout(resized_timer);resized_timer=setTimeout(window_resized_end,200);if(!window_resize_start_event_occured){window_resized_start();window_resize_start_event_occured=true}};function window_resized_start(){dismissInfo()}function window_resized_end(){window_resize_start_event_occured=false;$("content_view").style.visibility="visible";if(is_compact_window()){hide_settings();$("hide_show_left_column").style.visibility="hidden";$("content_view").style.marginLeft="0px"}else{$("hide_show_left_column").style.visibility="visible";if(is_left_column_showing){$("nav-side-menu").style.display="block";var column_width=getComputedStyle(document.documentElement).getPropertyValue("--left-column-width");$("content_view").style.marginLeft=column_width}else{$("nav-side-menu").style.display="none";$("content_view").style.marginLeft="0px"}}var column_width=parseInt($("content_view").style.marginLeft.replace("px",""));let contentWidth=document.body.clientWidth-column_width;$("init_view").style.width=contentWidth+"px";$("answer_container").style.width=contentWidth+"px";if(!audio_controller.playing){$("status_msg").style.display="block"}let fretboardPaddingLeftRight=34;fretboardView.resize(Math.min(contentWidth-fretboardPaddingLeftRight,1e3));let pianoPaddingLeftRight=30;pianoView.resize(Math.min(contentWidth-pianoPaddingLeftRight,1e3))}function setup_controls(){setup_onclicks();setup_select_controls();setup_sliders_controls();setup_switches_controls();setup_multiple_select_controls();function setup_onclicks(){$("page_name").onclick=function(){info()};$("kofi_button").onclick=function(){kofi()};$("info_button").onclick=function(){info()};$("setting_button").onclick=function(){toggle_settings()};$("play_pause_button").onclick=function(){playPause()};$("mobile_play_pause_button").onclick=function(){playPause()};setup_left_column_hide_close();setup_settings_menu_on_click();function setup_left_column_hide_close(){$("hide_show_left_column").addEventListener("click",function(event){if(is_left_column_showing){$("hide_show_left_column_img").src="img/right_chevron_white.svg"}else{$("hide_show_left_column_img").src="img/left_chevron_white.svg"}is_left_column_showing=!is_left_column_showing;window_resized_end()})}function setup_settings_menu_on_click(){$("ul_wrapper").addEventListener("click",function(event){if(is_compact_window())hide_settings()});$("nav-menu-ul").addEventListener("click",function(event){event.stopPropagation();return false})}}function setup_select_controls(){setup_duration_select();setup_instrument_select();function setup_duration_select(){const id="duration_select";$(id).addEventListener("change",function(e){var value=parseInt(this.value);log.i("on "+id+": "+value);model.duration=value;storage.set_duration(value);durationStartTime=new Date;audio_controller.reloadDuration();update_UI_duration(model.duration*6e4)});$(id).value=model.duration;update_UI_duration(model.duration*6e4)}function setup_instrument_select(){const id="instrument_select";$(id).addEventListener("change",function(e){var value=parseInt(this.value);log.i("on "+id+": "+value);model.instrument=value;storage.set_instrument(value);audio_controller.setInstrument(model.instrument)});$(id).value=model.instrument;audio_controller.setInstrument(model.instrument)}}function setup_sliders_controls(){setup_bpm_controls();setup_volume_control();setup_speak_volume_control();function setup_bpm_controls(){var min=MIN_BPM;var max=MAX_BPM;var step=1;setup_bpm_range(min,max,step);$("speed_text").innerHTML=(BPMtoMilliSeconds(model.BPM)/1e3).toFixed(1)+"s";function setup_bpm_range(min,max,step){var bpm_range=$("bpm_range");bpm_range.min=min;bpm_range.max=max;bpm_range.value=model.BPM;bpm_range.step=step;bpm_range.addEventListener("change",function(e){model.BPM=parseFloat(this.value);log.i("on BPM range change: "+model.BPM);storage.set_BPM(model.BPM);update_UI_BPM(model.BPM);reloadBPM()});bpm_range.addEventListener("input",function(){model.BPM=parseFloat(this.value);log.i("on BPM range change: "+model.BPM);storage.set_BPM(model.BPM);update_UI_BPM(model.BPM);reloadBPM()},true)}}function setup_volume_control(){var min=.05;var max=.5;var step=.05;setup_volume_range(min,max,step);function setup_volume_range(min,max,step){var range=$("volume_range");range.min=min;range.max=max;range.value=model.volume;range.step=step;range.addEventListener("change",function(e){model.volume=parseFloat(this.value);log.i("on Volume range change: "+model.volume);storage.set_volume(model.volume);update_UI_volume(model.volume)});range.addEventListener("input",function(){model.volume=parseFloat(this.value);log.i("on Volume range change: "+model.volume);storage.set_volume(model.volume);update_UI_volume(model.volume)},true)}}function setup_speak_volume_control(){var min=.1;var max=1;var step=.05;setup_volume_range(min,max,step);function setup_volume_range(min,max,step){var range=$("speak_volume_range");range.min=min;range.max=max;range.value=model.speak_volume;range.step=step;range.addEventListener("change",function(e){model.speak_volume=parseFloat(this.value);log.i("on Speak Volume range change: "+model.speak_volume);storage.set_speak_volume(model.speak_volume);update_UI_speak_volume(model.speak_volume)});range.addEventListener("input",function(){model.speak_volume=parseFloat(this.value);log.i("on Speak Volume range change: "+model.speak_volume);storage.set_speak_volume(model.speak_volume);update_UI_speak_volume(model.speak_volume)},true)}}}function setup_switches_controls(){setup_speak_switch();setup_single_notes_switch();setup_interval_switch();setup_chords_switch();function setup_speak_switch(){$("speak").addEventListener("click",function(e){$("speak_checkbox").click()});$("speak_checkbox_switch").addEventListener("keyup",function(e){if(event.code==="Space"||event.code==="Enter")$("speak_checkbox").click()});$("speak_checkbox").addEventListener("change",function(e){var value=this.checked;log.i("on speak change: "+value);model.speak=value;storage.set_speak(value);update_UI_speak()});$("speak_checkbox").checked=model.speak}function setup_single_notes_switch(){$("single_notes").addEventListener("click",function(e){$("single_notes_checkbox").click()});$("single_notes_checkbox_switch").addEventListener("keyup",function(e){if(event.code==="Space"||event.code==="Enter")$("ssingle_notes_checkbox").click()});$("single_notes_checkbox").addEventListener("change",function(e){var value=this.checked;log.i("on single notes change: "+value);model.single_notes.enabled=value;storage.set_single_notes(value)});$("single_notes_checkbox").checked=model.single_notes.enabled}function setup_interval_switch(){$("intervals").addEventListener("click",function(e){$("intervals_checkbox").click()});$("intervals_checkbox_switch").addEventListener("keyup",function(e){if(event.code==="Space"||event.code==="Enter")$("speak_checkbox").click()});$("intervals_checkbox").addEventListener("change",function(e){var value=this.checked;log.i("on intervals change: "+value);model.interval.enabled=value;storage.set_intervals(value);update_UI_intervals()});$("intervals_checkbox").checked=model.interval.enabled;update_UI_intervals()}function setup_chords_switch(){$("chords").addEventListener("click",function(e){$("chords_checkbox").click()});$("chords_checkbox_switch").addEventListener("keyup",function(e){if(event.code==="Space"||event.code==="Enter")$("chords_checkbox").click()});$("chords_checkbox").addEventListener("change",function(e){var value=this.checked;log.i("on chords change: "+value);model.chords.enabled=value;storage.set_chords(value);update_UI_chords()});$("chords_checkbox").checked=model.chords.enabled;update_UI_chords()}}function setup_multiple_select_controls(){setup_display_diagrams_multiple_select();setup_interval_type_multiple_select();setup_interval_play_type_multiple_select();setup_chord_three_note_multiple_select();setup_chord_three_note_inversion_multiple_select();setup_chord_four_note_multiple_select();setup_chord_four_note_inversion_multiple_select();setup_chord_play_type_multiple_select();function setup_display_diagrams_multiple_select(){var element_id_to_value_pairs=[["grid-item-display_diagrams_piano",DISPLAY_DIAGRAM.PIANO],["grid-item-display_diagrams_guitar",DISPLAY_DIAGRAM.GUITAR]];for(i=0;i<element_id_to_value_pairs.length;i++){var pair=element_id_to_value_pairs[i];update_UI_display_diagram(pair);setupDisplayDiagramClickListener(pair)}function setupDisplayDiagramClickListener(pair){var id=pair[0];var value=pair[1];$(id).addEventListener("click",function(e){var enabled=model.display_diagrams.includes(value);if(model.display_diagrams.length==1&&enabled){log.i("prevent no selection");return}if(enabled)model.display_diagrams.remove(value);else model.display_diagrams.push(value);log.i("on display diagram change: "+model.display_diagrams);storage.set_display_diagrams(value,!enabled);update_UI_display_diagram(pair)})}}function setup_interval_type_multiple_select(){let INTERVAL_TYPE=musicKit.Interval.TYPE;var element_id_type_pairs=[["grid-item-m2",INTERVAL_TYPE.MINOR_SECOND],["grid-item-M2",INTERVAL_TYPE.MAJOR_SECOND],["grid-item-m3",INTERVAL_TYPE.MINOR_THIRD],["grid-item-M3",INTERVAL_TYPE.MAJOR_THIRD],["grid-item-p4",INTERVAL_TYPE.PERFECT_FOURTH],["grid-item-tt",INTERVAL_TYPE.TRITONE],["grid-item-p5",INTERVAL_TYPE.PERFECT_FIFTH],["grid-item-m6",INTERVAL_TYPE.MINOR_SIXTH],["grid-item-M6",INTERVAL_TYPE.MAJOR_SIXTH],["grid-item-m7",INTERVAL_TYPE.MINOR_SEVENTH],["grid-item-M7",INTERVAL_TYPE.MAJOR_SEVENTH],["grid-item-p8",INTERVAL_TYPE.OCTAVE]];for(i=0;i<element_id_type_pairs.length;i++){var pair=element_id_type_pairs[i];update_UI_interval_type(pair);setupIntervalTypeClickListener(pair)}function setupIntervalTypeClickListener(pair){var id=pair[0];var type=pair[1];$(id).addEventListener("click",function(e){var type_enabled=model.interval.types.includes(type);if(model.interval.types.length==1&&type_enabled){log.i("prevent no selection");return}if(type_enabled)model.interval.types.remove(type);else model.interval.types.push(type);log.i("on interval type change: "+model.interval.types);storage.set_interval_type(type,!type_enabled);update_UI_interval_type(pair)})}}function setup_interval_play_type_multiple_select(){let INTERVAL_PLAY_TYPE=musicKit.Interval.PLAY_TYPE;var element_id_play_type_pairs=[["grid-item-ascending",INTERVAL_PLAY_TYPE.ASCENDING],["grid-item-descending",INTERVAL_PLAY_TYPE.DESCENDING],["grid-item-harmonic",INTERVAL_PLAY_TYPE.HARMONIC]];for(i=0;i<element_id_play_type_pairs.length;i++){var pair=element_id_play_type_pairs[i];update_UI_interval_play_type(pair);setupIntervalPlayTypeClickListener(pair)}function setupIntervalPlayTypeClickListener(pair){var id=pair[0];var type=pair[1];$(id).addEventListener("click",function(e){var type_enabled=model.interval.play_types.includes(type);if(model.interval.play_types.length==1&&type_enabled){log.i("prevent no selection");return}if(type_enabled)model.interval.play_types.remove(type);else model.interval.play_types.push(type);log.i("on interval type change: "+model.interval.play_types);storage.set_interval_play_type(type,!type_enabled);update_UI_interval_play_type(pair)})}}function setup_chord_three_note_multiple_select(){var element_id_play_type_pairs=[["grid-item-min",musicKit.Chord.TYPE.minor],["grid-item-maj",musicKit.Chord.TYPE.Major],["grid-item-aug",musicKit.Chord.TYPE.Aug],["grid-item-dim",musicKit.Chord.TYPE.Dim]];for(i=0;i<element_id_play_type_pairs.length;i++){var pair=element_id_play_type_pairs[i];update_UI_chord_three_note_type(pair);setupClickListener(pair)}function setupClickListener(pair){var id=pair[0];var type=pair[1];$(id).addEventListener("click",function(e){var type_enabled=model.chords.three_note_types.includes(type);if(model.chords.three_note_types.length+model.chords.four_note_types.length==1&&type_enabled){log.i("prevent no selection");return}if(type_enabled)model.chords.three_note_types.remove(type);else model.chords.three_note_types.push(type);log.i("on chords three_note_types change: "+model.chords.three_note_types);storage.set_chord_three_note_type(type,!type_enabled);update_UI_chord_three_note_type(pair)})}}function setup_chord_three_note_inversion_multiple_select(){var element_id_play_type_pairs=[["grid-item-three_note_root",musicKit.Chord.INVERSION_TYPE.Root],["grid-item-three_note_first",musicKit.Chord.INVERSION_TYPE.First],["grid-item-three_note_second",musicKit.Chord.INVERSION_TYPE.Second]];for(i=0;i<element_id_play_type_pairs.length;i++){var pair=element_id_play_type_pairs[i];update_UI_chord_three_note_inversion_type(pair);setupClickListener(pair)}function setupClickListener(pair){var id=pair[0];var type=pair[1];$(id).addEventListener("click",function(e){var type_enabled=model.chords.three_note_inversion_types.includes(type);if(model.chords.three_note_inversion_types.length==1&&type_enabled){log.i("prevent no selection");return}if(type_enabled)model.chords.three_note_inversion_types.remove(type);else model.chords.three_note_inversion_types.push(type);log.i("on chords three_note_inversion_types change: "+model.chords.three_note_inversion_types);storage.set_chord_three_note_inversion_type(type,!type_enabled);update_UI_chord_three_note_inversion_type(pair)})}}function setup_chord_four_note_multiple_select(){var element_id_play_type_pairs=[["grid-item-maj-seventh",musicKit.Chord.TYPE.Major7],["grid-item-min-seventh",musicKit.Chord.TYPE.minor7],["grid-item-dominant-seventh",musicKit.Chord.TYPE.Dom7]];for(i=0;i<element_id_play_type_pairs.length;i++){var pair=element_id_play_type_pairs[i];update_UI_chord_four_note_type(pair);setupClickListener(pair)}function setupClickListener(pair){var id=pair[0];var type=pair[1];$(id).addEventListener("click",function(e){var type_enabled=model.chords.four_note_types.includes(type);if(model.chords.three_note_types.length+model.chords.four_note_types.length==1&&type_enabled){log.i("prevent no selection");return}if(type_enabled)model.chords.four_note_types.remove(type);else model.chords.four_note_types.push(type);log.i("on chords four_note_types change: "+model.chords.four_note_types);storage.set_chord_four_note_type(type,!type_enabled);update_UI_chord_four_note_type(pair)})}}function setup_chord_four_note_inversion_multiple_select(){var element_id_play_type_pairs=[["grid-item-four_note_root",musicKit.Chord.INVERSION_TYPE.Root],["grid-item-four_note_first",musicKit.Chord.INVERSION_TYPE.First],["grid-item-four_note_second",musicKit.Chord.INVERSION_TYPE.Second],["grid-item-four_note_third",musicKit.Chord.INVERSION_TYPE.Third]];for(i=0;i<element_id_play_type_pairs.length;i++){var pair=element_id_play_type_pairs[i];update_UI_chord_four_note_inversion_type(pair);setupClickListener(pair)}function setupClickListener(pair){var id=pair[0];var type=pair[1];$(id).addEventListener("click",function(e){var type_enabled=model.chords.four_note_inversion_types.includes(type);if(model.chords.four_note_inversion_types.length==1&&type_enabled){log.i("prevent no selection");return}if(type_enabled)model.chords.four_note_inversion_types.remove(type);else model.chords.four_note_inversion_types.push(type);log.i("on chords four_note_inversion_types change: "+model.chords.four_note_inversion_types);storage.set_chord_four_note_inversion_type(type,!type_enabled);update_UI_chord_four_note_inversion_type(pair)})}}function setup_chord_play_type_multiple_select(){var element_id_play_type_pairs=[["grid-item-chord-harmonic",musicKit.Chord.PLAY_TYPE.HARMONIC],["grid-item-chord-arpeggiate",musicKit.Chord.PLAY_TYPE.ARPEGGIATE]];for(i=0;i<element_id_play_type_pairs.length;i++){var pair=element_id_play_type_pairs[i];update_UI_chord_play_type(pair);setupChordPlayTypeClickListener(pair)}function setupChordPlayTypeClickListener(pair){var id=pair[0];var type=pair[1];$(id).addEventListener("click",function(e){var type_enabled=model.chords.play_types.includes(type);if(model.chords.play_types.length==1&&type_enabled){log.i("prevent no selection");return}if(type_enabled)model.chords.play_types.remove(type);else model.chords.play_types.push(type);log.i("on chords type change: "+model.chords.play_types);storage.set_chord_play_type(type,!type_enabled);update_UI_chord_play_type(pair)})}}}}const log=require("@jasonfleischer/log");const pianoKit=require("@jasonfleischer/piano");const fretboardKit=require("@jasonfleischer/fretboard");const musicKit=require("@jasonfleischer/music-model-kit");musicKit.init();let pianoView=pianoKit({id:"piano"});const fretboardView=fretboardKit({id:"fretboard",showLabels:false});function init(){storage.load();var isSafariMobile=window.mobileAndTabletCheck()&&isSafari;if(isSafariMobile&&!isFromHomeScreen()){install.showAlert()}midi_controller.init();setup_controls();setup_keyboard_listeners();alert.init();if(window.mobileAndTabletCheck()){setup_mobile();function setup_mobile(){$("hide_show_left_column").style.display="none"}}show_hidden_views();window_resized_end();function show_hidden_views(){$("header").style.display="block";if(!is_compact_window()){$("nav-side-menu").style.display="block";if(window.mobileCheck())$("hide_show_left_column").style.display="block"}$("init_view").style.visibility="visible";$("hide_show_left_column").style.visibility="visible"}}function kofi(){window.open("https://ko-fi.com/jasonfleischer","_blank")}function info(){information.showAlert()}function dismissInfo(){information.dismissAlert()}var settings_animation_id;function toggle_settings(){if($("nav-side-menu").style.display!=="block")show_settings();else hide_settings();function show_settings(){$("nav-side-menu").style.display="block";$("kofi_button").style.display="none";$("info_button").style.display="none";$("setting_button_svg").src="img/close_white.svg";settings_slide_down_animation();function settings_slide_down_animation(){var elem=$("nav-side-menu");var height=$("nav-menu-ul").offsetHeight;var pos=-1*height;settings_animation_id=setInterval(frame,10);elem.style.top=pos+"px";function frame(){if(pos==0){clearInterval(settings_animation_id)}else{pos=Math.min(pos+15,0);elem.style.top=pos+"px"}}}}}function hide_settings(){clearInterval(settings_animation_id);$("nav-side-menu").style.display="none";$("kofi_button").style.display="block";$("info_button").style.display="block";$("setting_button_svg").src="img/gear_white.svg"}function openMailToDeveloper(){var subject="Metronome Website Feedback";subject=subject.replaceAll(" ","%20");openURL("mailto:jason_fleischer@hotmail.ca?Subject="+subject)}function update_UI_BPM(value){var range=$("bpm_range");range.value=value;$("speed_text").innerHTML=(BPMtoMilliSeconds(value)/1e3).toFixed(1)+"s";function update_UI_tempo_marking(BPM){var tempo_marking="";if(BPM>=40&&BPM<60){tempo_marking="Largo"}else if(BPM>=60&&BPM<66){tempo_marking="Larghetto"}else if(BPM>=66&&BPM<76){tempo_marking="Adagio"}else if(BPM>=76&&BPM<108){tempo_marking="Andante"}else if(BPM>=98&&BPM<=112){tempo_marking="Moderato"}else if(BPM>112&&BPM<120){tempo_marking="Allegro moderato"}else if(BPM>=120&&BPM<=156){tempo_marking="Allegro"}else if(BPM>156&&BPM<168){tempo_marking="Vivace"}else if(BPM>=168&&BPM<200){tempo_marking="Presto"}else if(BPM>=200){tempo_marking="Prestissimo"}clearInterval(fadeEffect);var fadeTarget=$("tempo_marking");fadeTarget.style.opacity=1;var fadeEffect=setInterval(function(){if(!fadeTarget.style.opacity){fadeTarget.style.opacity=1}if(fadeTarget.style.opacity>0){fadeTarget.style.opacity-=.09}else{clearInterval(fadeEffect)}},100);$("tempo_marking").innerHTML=tempo_marking}}function update_UI_duration(duration_in_MS){var new_text;if(duration_in_MS<0)new_text=audio_controller.playing?"Stop":"Play";else{var time_display=" ("+human_readable_duration(duration_in_MS)+")";if(time_display==" ()"){time_display=""}new_text=(audio_controller.playing?"Stop":"Play")+"<span id='play_pause_button_span'>"+time_display+"</span>"}$("play_pause_button").innerHTML=new_text;$("mobile_play_pause_button").innerHTML=new_text;function human_readable_duration(duration_in_MS){var duration_in_seconds=duration_in_MS/1e3;if(duration_in_seconds<60){return formattedSeconds(duration_in_seconds)}else if(duration_in_seconds<60*60){var mins=parseInt(duration_in_seconds/60);var secs=duration_in_seconds-mins*60;return mins+" min"+(secs==0?"":" ")+formattedSeconds(secs)}else if(duration_in_seconds>=60*60){var hours=parseInt(duration_in_seconds/60/60);return hours+" hour"}else{LogE("not handled human readable duration");return""}function formattedSeconds(seconds){seconds=parseInt(seconds);if(seconds==0)return"";else if(seconds<10)return"0"+seconds+" s";else return seconds+" s"}}}function update_UI_volume(value){var range=$("volume_range");range.value=value}function update_UI_speak(){$("speak_volume").style.display=model.speak?"block":"none"}function update_UI_speak_volume(value){var range=$("speak_volume_range");range.value=value}function update_UI_display_diagram(pair){const id=pair[0];const value=pair[1];const isIncluded=model.display_diagrams.includes(value);if(isIncluded)$(id).classList.add("enabled");else $(id).classList.remove("enabled");if(value==DISPLAY_DIAGRAM.PIANO){$(pianoView.id).style.display=isIncluded?"block":"none"}else if(value==DISPLAY_DIAGRAM.GUITAR){$(fretboardView.id).style.display=isIncluded?"block":"none"}}function update_UI_intervals(){if(model.interval.enabled){$("grid-container-interval_types").style.display="grid";$("grid-container-interval_play_types").style.display="grid"}else{$("grid-container-interval_types").style.display="none";$("grid-container-interval_play_types").style.display="none"}}function update_UI_interval_type(pair){var id=pair[0];var type=pair[1];if(model.interval.types.includes(type))$(id).classList.add("enabled");else $(id).classList.remove("enabled")}function update_UI_interval_play_type(pair){var id=pair[0];var type=pair[1];if(model.interval.play_types.includes(type))$(id).classList.add("enabled");else $(id).classList.remove("enabled")}function update_UI_chords(){if(model.chords.enabled){$("grid-container-chords_three_note").style.display="grid";$("grid-container-chords_four_note").style.display="grid";$("grid-container-chords_play_type").style.display="grid"}else{$("grid-container-chords_three_note").style.display="none";$("grid-container-chords_four_note").style.display="none";$("grid-container-chords_play_type").style.display="none"}}function update_UI_chord_play_type(pair){var id=pair[0];var type=pair[1];if(model.chords.play_types.includes(type))$(id).classList.add("enabled");else $(id).classList.remove("enabled")}function update_UI_chord_three_note_type(pair){var id=pair[0];var type=pair[1];if(model.chords.three_note_types.includes(type))$(id).classList.add("enabled");else $(id).classList.remove("enabled");var inversionIds=["grid-item-three_note_root","grid-item-three_note_first","grid-item-three_note_second"];var i;for(i=0;i<inversionIds.length;i++){$(inversionIds[i]).style.display=model.chords.three_note_types.length==0?"none":"block"}}function update_UI_chord_three_note_inversion_type(pair){var id=pair[0];var type=pair[1];if(model.chords.three_note_inversion_types.includes(type))$(id).classList.add("enabled");else $(id).classList.remove("enabled")}function update_UI_chord_four_note_type(pair){var id=pair[0];var type=pair[1];if(model.chords.four_note_types.includes(type))$(id).classList.add("enabled");else $(id).classList.remove("enabled");var inversionIds=["grid-item-four_note_root","grid-item-four_note_first","grid-item-four_note_second","grid-item-four_note_third"];var i;for(i=0;i<inversionIds.length;i++){$(inversionIds[i]).style.display=model.chords.four_note_types.length==0?"none":"block"}}function update_UI_chord_four_note_inversion_type(pair){var id=pair[0];var type=pair[1];if(model.chords.four_note_inversion_types.includes(type))$(id).classList.add("enabled");else $(id).classList.remove("enabled")}function update_UI_playing(){$("play_pause_button").innerHTML="Stop";$("mobile_play_pause_button").innerHTML="Stop";$("status_msg").innerHTML="What musical sound are you hearing?";startDurationTimer()}var durationTimer;var durationStartTime;function startDurationTimer(){durationStartTime=new Date;update_UI_duration(model.duration*6e4);durationTimer=setInterval(function(){var now=new Date;var diff=parseInt(now-durationStartTime);update_UI_duration(model.duration*6e4-diff)},500)}function update_UI_stopped(){update_UI_duration(model.duration*6e4);$("status_msg").innerHTML="Configure then press 'Play' to begin";$("init_view").style.visibility="visible";hideAnswer();stopDurationTimer()}function stopDurationTimer(){clearTimeout(durationTimer)}function hideAnswer(){$("init_view").style.visibility="visible";$("note_display").style.visibility="hidden";$("interval_display").style.visibility="hidden";$("chord_display").style.visibility="hidden";$("fretboard").style.visibility="hidden";$("piano").style.visibility="hidden";$("answer_container").style.visibility="hidden"}function showNoteAnswer(note){update_UI_note("note",note);$("init_view").style.visibility="hidden";$("note_display").style.visibility="visible";$("interval_display").style.visibility="hidden";$("chord_display").style.visibility="hidden";$("fretboard").style.visibility="visible";$("piano").style.visibility="visible";$("answer_container").style.visibility="visible"}function update_UI_note(id_prefix,note){$(id_prefix+"_name").innerHTML=is_compact_window()?note.note_name.type.substring(0,2):note.note_name.type;$(id_prefix+"_octave").innerHTML=note.octave;$(id_prefix+"_color").style.backgroundColor=note.note_name.color;var gray_scale_percent=(note.midi_value-21)/(108-21);function hexToRgb(hex){var result=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);return result?{r:parseInt(result[1],16),g:parseInt(result[2],16),b:parseInt(result[3],16)}:null}$(id_prefix+"_color").style.borderColor="rgba(1,1,1,"+(1-gray_scale_percent)+")"}function showIntervalAnswer(interval){let INTERVAL_PLAY_TYPE=musicKit.Interval.PLAY_TYPE;update_UI_note("first_note",interval.play_type==musicKit.Interval.PLAY_TYPE.ASCENDING?interval.lower_note:interval.getHigherNote(musicKit.all_notes));update_UI_note("second_note",interval.play_type==musicKit.Interval.PLAY_TYPE.ASCENDING?interval.getHigherNote(musicKit.all_notes):interval.lower_note);$("interval_type").innerHTML=interval.type+":";if(interval.play_type==musicKit.Interval.PLAY_TYPE.ASCENDING){$("interval_play_type_img").style.display="block";$("interval_play_type_img").src="img/up_arrow_white.svg";$("interval_play_type").innerHTML=""}else if(interval.play_type==musicKit.Interval.PLAY_TYPE.DESCENDING){$("interval_play_type_img").style.display="block";$("interval_play_type_img").src="img/down_arrow_white.svg";$("interval_play_type").innerHTML=""}else{$("interval_play_type_img").style.display="none";$("interval_play_type").innerHTML="&"}$("init_view").style.visibility="hidden";$("note_display").style.visibility="hidden";$("interval_display").style.visibility="visible";$("chord_display").style.visibility="hidden";$("fretboard").style.visibility="visible";$("piano").style.visibility="visible";$("answer_container").style.visibility="visible"}function showChordAnswer(chord){$("chord_name").innerHTML=chord.name;$("chord_structure").innerHTML=is_compact_window()?"":"("+chord.structure+")";$("chord_inversion").innerHTML=chord.inversion==musicKit.Chord.INVERSION_TYPE.Root?"":chord.inversion;$("init_view").style.visibility="hidden";$("note_display").style.visibility="hidden";$("interval_display").style.visibility="hidden";$("chord_display").style.visibility="visible";$("fretboard").style.visibility="visible";$("piano").style.visibility="visible";$("answer_container").style.visibility="visible"}var install={prompt:{}};if("serviceWorker"in navigator){navigator.serviceWorker.register("/eartrainer/service_worker.js",{scope:"/eartrainer/"}).then(function(reg){if(reg.installing){console.log("eartrainer: Service worker installing")}else if(reg.waiting){console.log("eartrainer: Service worker installed")}else if(reg.active){console.log("eartrainer: Service worker active")}}).catch(function(error){console.log("Registration failed with "+error)})}else{console.log("Service worker not available")}window.onload=function(){init()};window.addEventListener("beforeinstallprompt",function(e){e.preventDefault();install.prompt=e;if(window.mobileAndTabletCheck()){install.showAlert(function(){install.prompt.prompt()})}});window.addEventListener("appinstalled",async function(e){alert.dismiss()});install.showAlert=function(install_action){let contents="<p>Install this app on your device to easily access it anytime. Installing this app will result in better performance, improved fullscreen experience, and usage without an internet connection.</p>"+"<br/>";var isSafariMobile=window.mobileAndTabletCheck()&&isSafari;if(isSafariMobile){contents+='<div id="ios_install_instructions">'+'<p>1. Tap on <img src="img/export.png" alt="export"/></p>'+"<p>2. Select 'Add to Home Screen'</p>"+"</div>"}else{contents+='<button id="install">Install</button>'}alert.show("Install App",contents);if(!isSafariMobile){let installButton=document.getElementById("install");installButton.addEventListener("click",install_action)}};let CACHE_NAME="v18";const CACHE=["/eartrainer/index.html","/eartrainer/fonts/SF_Pro_Display_Thin.woff2","/eartrainer/css/bundle.css","/eartrainer/js/midi/webAudioFontPlayer.js","/eartrainer/js/midi/midi_0000_JCLive_sf2_file.js","/eartrainer/js/bundle.js","/eartrainer/audio/chords/augmented.mp3","/eartrainer/audio/chords/diminished.mp3","/eartrainer/audio/chords/dominant_seventh.mp3","/eartrainer/audio/chords/major.mp3","/eartrainer/audio/chords/major_seventh.mp3","/eartrainer/audio/chords/minor.mp3","/eartrainer/audio/chords/minor_seventh.mp3","/eartrainer/audio/intervals/ascending.mp3","/eartrainer/audio/intervals/descending.mp3","/eartrainer/audio/intervals/fifth.mp3","/eartrainer/audio/intervals/fourth.mp3","/eartrainer/audio/intervals/major_2nd.mp3","/eartrainer/audio/intervals/major_3rd.mp3","/eartrainer/audio/intervals/major_6th.mp3","/eartrainer/audio/intervals/major_7th.mp3","/eartrainer/audio/intervals/minor_2nd.mp3","/eartrainer/audio/intervals/minor_3rd.mp3","/eartrainer/audio/intervals/minor_6th.mp3","/eartrainer/audio/intervals/minor_7th.mp3","/eartrainer/audio/intervals/octave.mp3","/eartrainer/audio/intervals/tritone.mp3"];self.addEventListener("install",function(event){console.log("eartrainer: install");event.waitUntil(caches.open(CACHE_NAME).then(function(cache){return cache.addAll(CACHE)}))});self.addEventListener("fetch",function(event){console.log("eartrainer: fetch");event.respondWith(caches.open(CACHE_NAME).then(function(cache){return cache.match(event.request).then(function(response){return response||fetch(event.request).then(function(response){cache.put(event.request,response.clone());return response})})}))});self.addEventListener("activate",function activator(event){console.log("eartrainer: activate");event.waitUntil(caches.keys().then(function(keys){return Promise.all(keys.filter(function(key){return key.indexOf(CACHE_NAME)!==0}).map(function(key){return caches.delete(key)}))}))});
},{"@jasonfleischer/fretboard":2,"@jasonfleischer/log":7,"@jasonfleischer/music-model-kit":8,"@jasonfleischer/piano":15}],2:[function(require,module,exports){
const FretboardView = require("./lib/fretboard_view.js");
const log = require("@jasonfleischer/log");

function fretboardBuilder(options) {

	var id = options.id;
	if (id === undefined){
		log.e('id not provided for fretboard')
		return
	}

	if (document.getElementById(id) === undefined){
		log.e('no fretboard DIV exists with id: ' + id)
		return
	}

	var width = 1000;
	if (options.width !== undefined){
		width = options.width;
	}
	var hover = false;
	if (options.hover !== undefined){
		hover = options.hover;
	}

	var showLabels = true;
	if (options.showLabels !== undefined){
		showLabels = options.showLabels;
	}

	var darkMode = false;
	if (options.darkMode !== undefined){
		darkMode = options.darkMode;
	}

	return new FretboardView(id, width, options.onClick, hover, showLabels, darkMode);
}

module.exports = fretboardBuilder;
},{"./lib/fretboard_view.js":3,"@jasonfleischer/log":7}],3:[function(require,module,exports){
const musicKit = require("@jasonfleischer/music-model-kit");
const Line = require("./line.js");
const Point = require("./point.js");
const Polygon = require("./polygon.js");
const log = require("@jasonfleischer/log");

class FretboardView {

	constructor(id = "fretboard_view_id", width = 1000, onClick, hover = false, showLabels = true, darkMode = false) {
		
		this.id = id;
		this.hover = hover;
		this.WIDTH = 1000;
		this.HEIGHT = 230;
		this.note_positions = [];
		this.noteValueToNotePositionsDict = {};
		this.radius = this.HEIGHT * 0.06;
		this.on_notes = new Set();
		this.show_labels = showLabels;
		this.darkMode = darkMode;
		this.onClick = onClick;

		this.root_view = document.getElementById(this.id);
		this.root_view.style.position = "relative"
		this.root_view.style.width = this.WIDTH  + "px";
		this.root_view.style.height = this.HEIGHT  + "px";
		this.root_view.width = this.WIDTH;
		this.root_view.height = this.HEIGHT;

		this.buildCanvases();
		this.draw_background();
		this.resize(width);		
	}

	buildCanvases() {
		this.canvas_background = this.buildCanvas("fretboard_background_canvas_"+this.id, this.WIDTH, this.HEIGHT);
		this.canvas = this.buildCanvas("fretboard_canvas_"+this.id, this.WIDTH, this.HEIGHT);
		if(this.hover){
			this.canvas_hover = this.buildCanvas("fretboard_canvas_hover_"+this.id, this.WIDTH, this.HEIGHT);
		}
	}

	buildCanvas(id, width, height) {

		var canvas = document.createElement('canvas'); 
	    canvas.id = id;
	    canvas.style.position = "absolute"
	    canvas.style.left = "0px"
	    canvas.style.right = "0px"
	    canvas.style.width = width + "px";
		canvas.style.height = height + "px";
		canvas.width = width;
		canvas.height = height;
	    this.root_view.appendChild(canvas);
	    return canvas;
	}

	resize(newWidth){
		this.width = newWidth;
		var newWidth = Math.min(newWidth, 1000);
		var newHeight = newWidth * (230/1000);
		this.root_view .style.height = newHeight + "px";
		this.canvas_background.style.height = newHeight + "px";
		this.canvas.style.height = newHeight + "px";

		this.root_view .style.width = newWidth + "px";
		this.canvas_background.style.width = newWidth + "px";
		this.canvas.style.width = newWidth + "px";

		if(this.hover){
			this.canvas_hover.style.height = newHeight + "px";
			this.canvas_hover.style.width = newWidth + "px";
			this.addHoverEventListeners();
		}
		if(this.onClick !== undefined) {
			this.addClickEventListeners(this.onClick);
		}
	}

	draw_background(){

		let canvas = this.canvas_background;
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);

		var topMargin = Math.round(this.HEIGHT * 0.08);
		var bottomMargin = Math.round(this.HEIGHT * 0.15)

		var leftMargin = Math.round(this.WIDTH *0.037);
		var rightMargin = Math.round(this.WIDTH *0.010);

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


			var x = Math.round(i * ((this.WIDTH-(rightMargin+leftMargin)) / (number_of_frets)) + buffer);
			ctx.moveTo(x+leftMargin, topMargin);
			ctx.lineTo(x+leftMargin, this.HEIGHT-(bottomMargin));
			ctx.stroke();

			prev_buffer = buffer;
		}

		

		var note_x_positions = [(this.radius+2), (this.WIDTH - (leftMargin + rightMargin)) * 0.078, 
											(this.WIDTH - (leftMargin + rightMargin)) * 0.146,
											(this.WIDTH - (leftMargin + rightMargin)) * 0.214, // 3
											(this.WIDTH - (leftMargin + rightMargin)) * 0.278,
											(this.WIDTH - (leftMargin + rightMargin)) * 0.337, // 5
											(this.WIDTH - (leftMargin + rightMargin)) * 0.396,
											(this.WIDTH - (leftMargin + rightMargin)) * 0.451, // 7
											(this.WIDTH - (leftMargin + rightMargin)) * 0.502,
											(this.WIDTH - (leftMargin + rightMargin)) * 0.550, // 9
											(this.WIDTH - (leftMargin + rightMargin)) * 0.596,
											(this.WIDTH - (leftMargin + rightMargin)) * 0.638,
											(this.WIDTH - (leftMargin + rightMargin)) * 0.677, // 12
											(this.WIDTH - (leftMargin + rightMargin)) * 0.714,
											(this.WIDTH - (leftMargin + rightMargin)) * 0.751,
											(this.WIDTH - (leftMargin + rightMargin)) * 0.789, // 15
											(this.WIDTH - (leftMargin + rightMargin)) * 0.826,
											(this.WIDTH - (leftMargin + rightMargin)) * 0.864, // 17
											(this.WIDTH - (leftMargin + rightMargin)) * 0.901,
											(this.WIDTH - (leftMargin + rightMargin)) * 0.9385,
											(this.WIDTH - (leftMargin + rightMargin)) * 0.976]

		var high_e_string_y_position = topMargin;
		var b_string_y_position = ((this.HEIGHT - (topMargin + bottomMargin)) * 0.20) + topMargin;
		var g_string_y_position = ((this.HEIGHT - (topMargin + bottomMargin)) * 0.40) + topMargin;
		var d_string_y_position = ((this.HEIGHT - (topMargin + bottomMargin)) * 0.60) + topMargin;
		var a_string_y_position = ((this.HEIGHT - (topMargin + bottomMargin)) * 0.80) + topMargin;
		var e_string_y_position = ((this.HEIGHT - (topMargin + bottomMargin)) * 1.00) + topMargin;
		var note_y_positions = [high_e_string_y_position, b_string_y_position, g_string_y_position, d_string_y_position, a_string_y_position, e_string_y_position];
		

		// draw fret markers

		var diameter = this.HEIGHT * 0.02;
		var HEIGHT = this.HEIGHT;
		var WIDTH = this.WIDTH;
		var marker_color = "#ccc";

		function draw_single_dot_fret_markers(ctx, fret){
			const TWO_PI = 2 * Math.PI;

			ctx.beginPath();
			ctx.fillStyle = marker_color;
			ctx.lineWidth = 0;
			ctx.arc(note_x_positions[fret], (g_string_y_position + d_string_y_position) / 2, diameter, 0, TWO_PI);
			ctx.fill();

			ctx.beginPath();
			ctx.fillStyle = marker_color;
			ctx.lineWidth = 0;
			ctx.arc(note_x_positions[fret], HEIGHT - (bottomMargin * .25), diameter, 0, TWO_PI);
			ctx.fill();

		}
		
		draw_single_dot_fret_markers(ctx, 3);
		draw_single_dot_fret_markers(ctx, 5);
		draw_single_dot_fret_markers(ctx, 7);
		draw_single_dot_fret_markers(ctx, 9);
		draw_single_dot_fret_markers(ctx, 15);
		draw_single_dot_fret_markers(ctx, 17);

		function draw_double_dot_fret_markers(fret){
			
			const TWO_PI = 2 * Math.PI;

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

			var seperation = WIDTH * 0.008;
			ctx.beginPath();
			ctx.fillStyle = marker_color;
			ctx.lineWidth = 0;
			ctx.arc(note_x_positions[fret] - seperation, HEIGHT - (bottomMargin * .25), diameter, 0, TWO_PI);
			ctx.fill();

			ctx.beginPath();
			ctx.fillStyle = marker_color;
			ctx.lineWidth = 0;
			ctx.arc(note_x_positions[fret] + seperation, HEIGHT - (bottomMargin * .25), diameter, 0, TWO_PI);
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

			var y = j * ( (this.HEIGHT-(bottomMargin+topMargin)) / (number_of_string-1));
			ctx.moveTo(leftMargin, y+topMargin);
			ctx.lineTo(this.WIDTH, y+topMargin);
			ctx.stroke();
		}

		// nut

		ctx.beginPath();
		ctx.lineWidth = 6;
		ctx.strokeStyle = this.darkMode ? "#666" :"#000";
		ctx.rect(leftMargin, topMargin, 3, this.HEIGHT-(bottomMargin+topMargin));
		ctx.stroke();

		// draw notes


		var note_positions = [];
		var i;
		for(i =0 ; i< note_y_positions.length; i++){
			var j;
			for(j =0; j <note_x_positions.length; j++){
				note_positions.push([note_x_positions[j], note_y_positions[i]]);
			}
		}
		this.note_positions = note_positions


		// 40 -  E2 to  84 - C6

		this.noteValueToNotePositionsDict = {

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

	getNotePositionsFromNoteType(note_type) {
		let NOTE_TYPE = musicKit.Note.Name.TYPE;
		var note_positions = this.note_positions
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

	clear() {
		let canvas = this.canvas;
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
		this.on_notes.clear();
	}

	clearHover() {
		let canvas = this.canvas_hover;
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
	}

	clearNote(note){

		this.on_notes.delete(note.midi_value);
		let canvas = this.canvas;
		let ctx = canvas.getContext("2d");
		let note_positions = this.noteValueToNotePositionsDict[note.midi_value];
		var i;
		for( i=0; i<note_positions.length; i++)  {
			ctx.clearRect(note_positions[i][0]-this.radius-1, note_positions[i][1]-this.radius-1, this.radius*2+2, this.radius*2+2);
		}
	}

	clearHoverNote(note){
		let canvas = this.canvas_hover;
		let ctx = canvas.getContext("2d");
		let note_positions = this.noteValueToNotePositionsDict[note.midi_value];
		var i;
		for( i=0; i<note_positions.length; i++)  {
			ctx.clearRect(note_positions[i][0]-this.radius-1, note_positions[i][1]-this.radius-1, this.radius*2+2, this.radius*2+2);
		}
	}

	drawNote(note){
		this.on_notes.add(note.midi_value);
		let canvas = this.canvas;
		var ctx = canvas.getContext("2d");
		var label = this.show_labels ? note.note_name.type.substring(0, 2) : undefined;
		this.drawNoteWithColor(note, label, note.note_name.color, canvas);
	}

	drawHoverNote(note) {
		let canvas = this.canvas_hover;
		let ctx = canvas.getContext("2d");
		let label = this.show_labels ? note.note_name.type.substring(0, 2) : undefined;
		let color = this.darkMode ? "#777A" : "#eee"
		this.drawNoteWithColor(note, label, color, canvas);
	}

	drawNotePlaceholder(note, label) {
		this.drawNoteWithColor(note, label, this.darkMode ? "#aaa" : "#ddd", this.canvas);
	}

	drawNoteWithWhite(note, label) {
		this.drawNoteWithColor(note, label, "#fff", this.canvas);
	}

	drawNoteWithColor(note, label, color, canvas) {

		if(color === undefined) {
			color = note.note_name.color;
		}
		if(canvas === undefined){
			canvas = this.canvas;
		}
		if(!this.show_labels){
			label = undefined;
		}
		
		var ctx = canvas.getContext("2d");
		var note_positions = this.noteValueToNotePositionsDict[note.midi_value]

		var i;
		for( i=0; i<note_positions.length; i++)  {
			ctx.beginPath();
			ctx.fillStyle = color;
			ctx.strokeStyle = "#050505";
			ctx.lineWidth = 1;
			ctx.arc(note_positions[i][0], note_positions[i][1], this.radius, 0, 2 * Math.PI);

			ctx.fill();
			if(!this.darkMode) ctx.stroke();
			if(label != undefined){
				ctx.fillStyle = '#050505';
	    		ctx.font = this.radius + 'px san-serif';
	    		ctx.textAlign = 'center';
	    		ctx.fillText(label, note_positions[i][0], note_positions[i][1]+this.radius*.3, this.radius*2);
	    	}
		}
	}

	drawInterval(interval){

		var play_type = interval.play_type;
		let higher_note = interval.getHigherNote(musicKit.all_notes);
		var first_note = (play_type == musicKit.Interval.PLAY_TYPE.ASCENDING) ? interval.lower_note : higher_note;

		let canvas = this.canvas;
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);

		this.drawNoteWithColor(first_note);

		// delay

		setTimeout(() => {
			var second_note = (play_type == musicKit.Interval.PLAY_TYPE.ASCENDING) ? higher_note : interval.lower_note;
			this.drawNoteWithColor(second_note);
		}, (interval.play_type == musicKit.Interval.PLAY_TYPE.HARMONIC) ? 0 : interval.delay_in_ms);	
	}

	drawChord(chord){
		let withLabels = this.show_labels;
		let canvas = this.canvas;
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);

		let note_array = chord.getNoteArray(musicKit.all_notes, musicKit.guitar_range);

		var placeholderNotes = [];
		let range = musicKit.guitar_range;
		var i;
		for(i=range.min; i<=range.max; i++){
			var note2 = musicKit.all_notes[i];
			var j;
			for(j=0; j<note_array.length; j++) {
				var note1 = note_array[j];
				
				if(note2.midi_value == note1.midi_value) {
					var label = chord.note_labels[j];
					if (label == 'R'){
						this.drawNoteWithColor(note2, label, note2.note_name.color);
					} else {
						this.drawNoteWithWhite(note2, label);
					}
				} else {
					if(note1.note_name.type == note2.note_name.type) {
						var label = chord.note_labels[j];
						this.drawNotePlaceholder(note2, label);	
					}
				}
			}
		}

	}

	drawScale(scale) {
		let canvas = this.canvas;
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);

		let note_array = scale.getNoteArray(musicKit.all_notes, musicKit.guitar_range);
		var j;
		for(j=0; j<note_array.length; j++) {
			var note = note_array[j];
			var label = scale.getLabel(note);
			if (label == 'R'){
				this.drawNoteWithColor(note, label);
			} else {
				this.drawNoteWithWhite(note, label);
			}
		}
	}

	setDarkMode(){
		this.darkMode = true;
		this.draw_background();
	}

	setLightMode(){
		this.darkMode = false;
		this.draw_background();
	}

	addClickEventListeners(onClick) {

		let view = this.root_view;
		view.style.cursor="pointer";
		let self = this;
		let width = this.width;
		let WIDTH = this.WIDTH;
		let radius = this.radius * (WIDTH/width);
		let dict = this.noteValueToNotePositionsDict;
		var on_notes = this.on_notes;


		if(this.onClickFunction !== undefined)
			view.removeEventListener("click", this.onClickFunction);
		this.onClickFunction = function(event){
			let position =	self.getPosition(view);
		    let x = (event.clientX - position.x) * (WIDTH/width);
		    let y = (event.clientY- position.y) * (WIDTH/width);
		    let clickPoint = new Point(x, y);
		    var foundMidiValue = -1;

		    for (const [key, value] of Object.entries(dict)) {
		    	let midi_value = key;
		    	for (let i = 0; i < value.length; i++) {
 					let note_positions = value[i];
 					let point = new Point(note_positions[0], note_positions[1]); 
 					if (point.distanceBetweenPoints(clickPoint) < radius) {
 						foundMidiValue = parseInt(midi_value);
 					}
				}
			}

			if(foundMidiValue != -1){
				let is_on = !on_notes.has(foundMidiValue);
				onClick(musicKit.all_notes[foundMidiValue], is_on);
			} else {
				log.i("no note found");
			}
		}
		view.addEventListener("click", this.onClickFunction);
	}

	addHoverEventListeners() {
		let view = this.root_view;
		view.style.cursor="pointer";
		
		let width = this.width;
		let WIDTH = this.WIDTH;
		let dict = this.noteValueToNotePositionsDict;
		let radius = this.radius * (WIDTH/width);
		let self = this;
		var previousMidiValue;

		if(this.mouseOverFunction !== undefined)
			view.removeEventListener("mouseover", this.mouseOverFunction);
		this.mouseOverFunction = function(event) {
		    self.previousMidiValue = undefined;
		}
		view.addEventListener("mouseover", this.mouseOverFunction);
		
		if(this.mouseMoveFunction !== undefined)
			view.removeEventListener("mousemove", this.mouseMoveFunction);
		this.mouseMoveFunction = function(event){
		    let position =	self.getPosition(view);
		    let x = (event.clientX - position.x) * (WIDTH/width);
		    let y = (event.clientY- position.y) * (WIDTH/width);
		    let clickPoint = new Point(x, y);
		    var foundMidiValue = -1;

		    for (const [key, value] of Object.entries(self.noteValueToNotePositionsDict)) {
		    	let midi_value = key;
		    	for (let i = 0; i < value.length; i++) {
 					let note_positions = value[i];
 					let point = new Point(note_positions[0], note_positions[1]); 
 					if (point.distanceBetweenPoints(clickPoint) < radius) {
 						foundMidiValue = parseInt(midi_value);
 					}
				}
			}

			if(foundMidiValue != -1){

				if(previousMidiValue === undefined) {
		    		previousMidiValue = foundMidiValue;	
		   			self.drawHoverNote(musicKit.all_notes[foundMidiValue]);
		    	}
		    	if(previousMidiValue !== foundMidiValue) {
		    		self.clearHoverNote(musicKit.all_notes[previousMidiValue]);
		    		previousMidiValue = foundMidiValue;	 		   		
	    			self.drawHoverNote(musicKit.all_notes[foundMidiValue]);
		    	}
			} else {
				if(previousMidiValue !== undefined){
  					self.clearHoverNote(musicKit.all_notes[previousMidiValue]);
  					previousMidiValue = undefined;
				}
			}

		}
		view.addEventListener("mousemove", this.mouseMoveFunction);

		if(this.mouseOutFunction !== undefined)
			view.removeEventListener("mouseout", this.mouseOutFunction);
		this.mouseOutFunction = function(event) {
		    if(previousMidiValue !== undefined)
  				self.clearHoverNote(musicKit.all_notes[previousMidiValue]);
		}
		view.addEventListener("mouseout", this.mouseOutFunction);
	}

	getPosition(element) {
		const rect = element.getBoundingClientRect();
		return { x: rect.left, y: rect.top };
	}
}

module.exports = FretboardView;
},{"./line.js":4,"./point.js":5,"./polygon.js":6,"@jasonfleischer/log":7,"@jasonfleischer/music-model-kit":8}],4:[function(require,module,exports){
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

module.exports = Line;
},{}],5:[function(require,module,exports){
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
			ctx.arc(this.x, this.y, diameter, 0, 2 * Math.PI);
			ctx.fill();
		}
	}

	isValid(){
		return this.x >= 0 && this.y >= 0;
	}

	distanceBetweenPoints(point) {
        return Math.sqrt((Math.pow(point.x-this.x,2))+(Math.pow(point.y-this.y,2)));
    }
}

module.exports = Point;
},{}],6:[function(require,module,exports){
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

module.exports = Polygon;
},{}],7:[function(require,module,exports){
var LOG_NON_ERROR_MESSAGES = true;
const log = {};

log.i = function(msg) {
	if (LOG_NON_ERROR_MESSAGES)
		console.log(msg);
};

log.e = function(msg) {
	console.log("%c ERROR: " + msg, "background: red; color: white; display: block;");
};

log.turnOffNonErrorLogs = function() {
	LOG_NON_ERROR_MESSAGES = false;
};

module.exports = log;

},{}],8:[function(require,module,exports){
const Note = require("./lib/note.js");
const Chord = require("./lib/chord.js");
const Scale = require("./lib/scale.js");
const KeySignature = require("./lib/key_signature.js");
const Interval = require("./lib/interval.js");
const MidiListener = require("./lib/midi_listener.js");

const midi_range = { min: 0, max: 127 };
const piano_range = { min: 21, max: 108 };
const guitar_range = { min: 40, max: 84 };

var all_notes = [];
var all_key_signatures = [];

function init(){
	function build_all_notes(){
		let ALL_NOTE_NAME_TYPES = Note.ALL_NOTE_NAME_TYPES;
		var midi_value = 0; // 0 - 127
		const octaves = 9;
		var octave = 0;
		for(octave = -1 ; octave <= octaves; octave++){
			var j;
			for(j = 0 ; j < ALL_NOTE_NAME_TYPES.length; j++){
				var note_name = ALL_NOTE_NAME_TYPES[j].sharp_name;
				var note = new Note(ALL_NOTE_NAME_TYPES[j], midi_value, octave);

				all_notes.push(note);

				midi_value++;

				if(midi_value > midi_range.max) break;
			}
		}
	}
	build_all_notes();

	function build_all_key_signatures(){
		let keySignatureTypes = KeySignature.TYPE;
		for(const key in keySignatureTypes){
			let value = keySignatureTypes[key];
			all_key_signatures.push(new KeySignature(value));
		}
	}
	build_all_key_signatures();
}

function changeNoteColors(color="#00f"){
    var i;
    for(i = 0; i <= 127; i++){
        all_notes[i].note_name.color = color;
    }
}

module.exports = {init, Note, Chord, Scale, KeySignature, Interval, MidiListener, all_notes, all_key_signatures, piano_range, guitar_range, changeNoteColors};


},{"./lib/chord.js":9,"./lib/interval.js":10,"./lib/key_signature.js":11,"./lib/midi_listener.js":12,"./lib/note.js":13,"./lib/scale.js":14}],9:[function(require,module,exports){
const log = require("@jasonfleischer/log");
class Chord {

	TYPE = Object.freeze({
		Major: "Major",
		minor: "minor",
		Aug: "augmented",
		Dim: "diminished",

		Major7: "Major 7",
		minor7: "minor 7",
		Dom7: "Dominant 7"
	});

	static INVERSION_TYPE = Object.freeze({
		Root: "Root",
		First: "first inversion",
		Second: "second inversion",
		Third: "third inversion"
	});

	static PLAY_TYPE = Object.freeze({
		HARMONIC: "Harmonic",
		ARPEGGIATE: "Arpeggiate"
	});

	constructor(root_note, chord_type = Chord.TYPE.Major, play_type = Chord.PLAY_TYPE.HARMONIC, inversion = Chord.INVERSION_TYPE.Root) {

		this.root_note = root_note;
		this.delay_in_ms = 500;
		this.name = root_note.note_name.type + " " + chord_type;
		this.inversion = inversion
		this.type = chord_type
		this.play_type = play_type

		function replaceAll(str, find, replace) {
			return str.replace(new RegExp(find, 'g'), replace);
		}
		this.file_name = root_note.note_name.file_name.concat(["audio/chords/"+ replaceAll(replaceAll(this.type.toLowerCase(),' ','_'), '7', 'seventh') +".mp3"]);

		switch(chord_type){
		case Chord.TYPE.Major:
			if(this.inversion == Chord.INVERSION_TYPE.Root) {
				this.note_sequence = [0, 4, 7];
			} else if (this.inversion == Chord.INVERSION_TYPE.First){
				this.note_sequence = [-8, -5, 0];
			} else {
				this.note_sequence = [-5, 0, 4]; 
			}
			break;
		case Chord.TYPE.minor:
			if(this.inversion == Chord.INVERSION_TYPE.Root) {
				this.note_sequence = [0, 3, 7];
			} else if (this.inversion == Chord.INVERSION_TYPE.First){
				this.note_sequence = [-9, -5, 0];
			} else {
				this.note_sequence = [-5, 0, 3];
			}
			break;

		case Chord.TYPE.Aug:
			if(this.inversion == Chord.INVERSION_TYPE.Root) {
				this.note_sequence = [0, 4, 8];
			} else if (this.inversion == Chord.INVERSION_TYPE.First){
				this.note_sequence = [-8, -4, 0];
			} else {
				this.note_sequence = [-4, 0, 4];
			}
			break;
		 case Chord.TYPE.Dim:
		 	if(this.inversion == Chord.INVERSION_TYPE.Root) {
				this.note_sequence = [0, 3, 6];
			} else if (this.inversion == Chord.INVERSION_TYPE.First){
				this.note_sequence = [-9, -6, 0];
			} else {
				this.note_sequence = [-6, 0, 3];
			}
			break;

		case Chord.TYPE.Major7:

			if(this.inversion == Chord.INVERSION_TYPE.Root) {
				this.note_sequence = [0, 4, 7, 11];
			} else if (this.inversion == Chord.INVERSION_TYPE.First){
				this.note_sequence = [-8, -5, -1, 0];
			} else if (this.inversion == Chord.INVERSION_TYPE.Second){
				this.note_sequence = [-5, -1, 0, 4];
			} else {
				this.note_sequence = [-1, 0, 4, 7];
			}
			this.file_name = root_note.note_name.file_name.concat(["audio/chords/major_seventh.mp3"]);
			break;
		case Chord.TYPE.minor7:
			if(this.inversion == Chord.INVERSION_TYPE.Root) {
				this.note_sequence = [0, 3, 7, 10];
			} else if (this.inversion == Chord.INVERSION_TYPE.First){
				this.note_sequence = [-9, -5, -2, 0];
			} else if (this.inversion == Chord.INVERSION_TYPE.Second){
				this.note_sequence = [-5, -2, 0, 3];
			} else {
				this.note_sequence = [-2, 0, 3, 7];
			}
			this.file_name = root_note.note_name.file_name.concat(["audio/chords/minor_seventh.mp3"]);
			break;

		case Chord.TYPE.Dom7:
			if(this.inversion == Chord.INVERSION_TYPE.Root) {
				this.note_sequence = [0, 4, 7, 10];
			} else if (this.inversion == Chord.INVERSION_TYPE.First){
				this.note_sequence = [-8, -5, -2, 0];
			} else if (this.inversion == Chord.INVERSION_TYPE.Second){
				this.note_sequence = [-5, -2, 0, 4];
			} else {
				this.note_sequence = [-2, 0, 4, 7];
			}
			break;
		}
		this.note_labels = this.getLabels();
		this.structure = this.getStructure();
	}

	getLabels() {
		let result = [];
		let all_labels = ["R", "m2", "M2", "m3", "M3", "P4", "TT", "P5", "m6", "M6", "m7", "M7"];
		var i;
		for(i=0; i<this.note_sequence.length; i++){
			var sequence = this.note_sequence[i]
			if(sequence < 0) {
				sequence = 12 + sequence;
			}
			result.push(all_labels[sequence]);
		}
		return result;
	}

	getStructure() {
		let result = [];
		let all_labels = ["Root", "minor 2nd", "Mahor 2nd", "minor 3rd", "Major 3rd", "Fourth",
						  "Tritone", "Fifth", "minor 6th", "Major 6th", "minor 7th", "Major 7th"];
		var i;
		for(i=0; i<this.note_sequence.length; i++){
			var sequence = this.note_sequence[i]
			if(sequence < 0) {
				sequence = 12 + sequence;
			}
			result.push(all_labels[sequence]);
		}
		return result;
	}

	toString() {
		return "CHORD: " + this.name +", "+ this.structure + ", ", this.note_sequence;
	}

	isWithinRange(range) {
		return (this.root_note.midi_value + this.note_sequence[0]) >= range.min  && 
			(this.root_note.midi_value + this.note_sequence[this.note_sequence.length-1]) <= range.max;
	}

	getNoteArray(all_notes, range) {
		function isNoteWithinRange(midi_number, range){
			return midi_number >= range.min && midi_number <= range.max ;
		}

		var note_array = [];
		var i;
		for(i=0; i<this.note_sequence.length; i++){
			let midi_number = this.root_note.midi_value + this.note_sequence[i];
			if(isNoteWithinRange(midi_number, range)){
				note_array.push(all_notes[midi_number]);
			}
		}
		if (note_array.length == 0) {
			log.i("no notes found for chord");  
		}
		return note_array;
	}

	
	static ALL_TYPES = [Chord.TYPE.Major, Chord.TYPE.minor, Chord.TYPE.Aug, Chord.TYPE.Dim,
						Chord.TYPE.Major7, Chord.TYPE.minor7, Chord.TYPE.Dom7];

	static ALL_PLAY_TYPES = [Chord.PLAY_TYPE.HARMONIC, Chord.PLAY_TYPE.ARPEGGIATE];

	static generateRandom(all_notes, range, types = ALL_TYPES, play_types = ALL_PLAY_TYPES,
							three_note_inversion_types = [Chord.INVERSION_TYPE.Root, Chord.INVERSION_TYPE.First, Chord.INVERSION_TYPE.Second], 
							four_note_inversion_types =  [Chord.INVERSION_TYPE.Root, Chord.INVERSION_TYPE.First, Chord.INVERSION_TYPE.Second, Chord.INVERSION_TYPE.Third]) {

		let min = range.min;
		let max = range.max;
		function randomInteger(min, max) { // min and max included 
			return Math.floor(Math.random() * (max - min + 1) + min);
		}
		function is_type_three_notes(type) {
			return type == Chord.TYPE.Major || type == Chord.TYPE.minor || type == Chord.TYPE.Aug || type == Chord.TYPE.Dim; 
		}

		var random_note = all_notes[randomInteger(min, max)];
		var play_type = play_types[ randomInteger(0, play_types.length-1) ];
		var random_chord_type = types[ randomInteger(0, types.length-1) ];

		
		var inversion = Chord.INVERSION_TYPE.Root;
		if (is_type_three_notes(random_chord_type)){
			inversion = three_note_inversion_types[ randomInteger(0, three_note_inversion_types.length-1) ];
		} else{
			inversion = four_note_inversion_types[ randomInteger(0, four_note_inversion_types.length-1) ];
		}
		var chord = new Chord(random_note, random_chord_type, play_type, inversion);
		var note_array = chord.getNoteArray(all_notes, range)
		let nunmber_of_notes = is_type_three_notes(random_chord_type) ? 3: 4;
		while(note_array.length != nunmber_of_notes){

			random_note = all_notes[randomInteger(min, max)];
			chord = new Chord(random_note, random_chord_type, play_type, inversion);
			note_array = chord.getNoteArray(all_notes, range);
		}

		return chord;
	}
}

module.exports = Chord;


},{"@jasonfleischer/log":7}],10:[function(require,module,exports){
class Interval {

	static TYPE = Object.freeze({
		MINOR_SECOND: "minor 2nd",
		MAJOR_SECOND: "Major 2nd",
		MINOR_THIRD: "minor 3rd",
		MAJOR_THIRD: "Major 3rd",
		PERFECT_FOURTH: "Fourth",
		TRITONE: "Tritone",
		PERFECT_FIFTH: "Fifth",
		MINOR_SIXTH: "minor 6th",
		MAJOR_SIXTH: "Major 6th",
		MINOR_SEVENTH: "minor 7th",
		MAJOR_SEVENTH: "Major 7th",
		OCTAVE: "Octave"
	});

	static PLAY_TYPE = Object.freeze({
		ASCENDING: "Ascending",
		DESCENDING: "Descending",
		HARMONIC: "Harmonic"
	});

	constructor(type, note, play_type) {
		this.type = type;
		this.lower_note = note;
		this.delay_in_ms = 500;
		this.play_type = play_type;
		function replaceAll(str, find, replace) {
			return str.replace(new RegExp(find, 'g'), replace);
		}
		this.audio_file_name = "audio/intervals/"+ replaceAll(this.type, ' ', '_').toLowerCase() +".mp3";

		this.higher_note_midi_value = note.midi_value + this.getIntervalStep();
		if(this.higher_note_midi_value > 128) {
			log.e("todo: out of bounds error")
		}
	}

	toString() {
		return  "INTERVAL: " + this.type + ": " + this.getIntervalStep();
	}

	isWithinRange(min, max){
		return this.lower_note.midi_value >= min && this.lower_note.midi_value <= max && this.higher_note_midi_value >= min && this.higher_note_midi_value <= max
	}

	getHigherNote(all_notes){
		return all_notes[this.higher_note_midi_value];
	}

	getIntervalStep = function(){

		switch(this.type){
			case Interval.TYPE.MINOR_SECOND:
				return 1;
			case Interval.TYPE.MAJOR_SECOND:
				return 2;
			case Interval.TYPE.MINOR_THIRD:
				return 3;
			case Interval.TYPE.MAJOR_THIRD:
				return 4;
			case Interval.TYPE.PERFECT_FOURTH:
				return 5;
			case Interval.TYPE.TRITONE:
				return 6;
			case Interval.TYPE.PERFECT_FIFTH:
				return 7;
			case Interval.TYPE.MINOR_SIXTH:
				return 8;
			case Interval.TYPE.MAJOR_SIXTH:
				return 9
			case Interval.TYPE.MINOR_SEVENTH:
				return 10
			case Interval.TYPE.MAJOR_SEVENTH:
				return 11
			case Interval.TYPE.OCTAVE:
				return 12;
		}
	}

	static ALL_TYPES = [Interval.TYPE.MINOR_SECOND, Interval.TYPE.MAJOR_SECOND, 
						Interval.TYPE.MINOR_THIRD, Interval.TYPE.MAJOR_THIRD,
						Interval.TYPE.PERFECT_FOURTH, Interval.TYPE.TRITONE,
						Interval.TYPE.PERFECT_FIFTH, Interval.TYPE.MINOR_SIXTH,
						Interval.TYPE.MAJOR_SIXTH, Interval.TYPE.MINOR_SEVENTH,
						Interval.TYPE.MAJOR_SEVENTH, Interval.TYPE.OCTAVE];
	static ALL_PLAY_TYPES = [Interval.PLAY_TYPE.ASCENDING, Interval.PLAY_TYPE.DESCENDING, 
							Interval.PLAY_TYPE.HARMONIC];

	static generateRandom(all_notes, range, types = ALL_TYPES, play_types = ALL_PLAY_TYPES) {
		let min = range.min;
		let max = range.max;

		function randomInteger(min, max) { // min and max included 
			return Math.floor(Math.random() * (max - min + 1) + min);
		}

		var rand = randomInteger(0, types.length-1);
		var type = types[rand];
		
		var note = all_notes[randomInteger(min, max)];

		var rand = randomInteger(0, play_types.length-1);
		var play_type = play_types[rand];

		var interval = new Interval(type, note, play_type);

		while(!interval.isWithinRange(min, max)){
			note = all_notes[randomInteger(min, max)];
			interval = new Interval(type, note, play_type);
		}
		return interval;
	}
}

module.exports = Interval;
},{}],11:[function(require,module,exports){
const log = require("@jasonfleischer/log");

class KeySignature {

	static TYPE = Object.freeze({
		C: "C",
		G: "G",
		D: "D",
		A: "A",
		E: "E",

		B: "B",
		Cb: "Cb",

		F_sharp: "F#",
		G_flat: "Gb",

		F: "F",
		B_flat: "Bb",
		E_flat: "Eb",
		A_flat: "Ab",

		D_flat: "Db",
		C_sharp: "C#"
	});

	constructor(type){
		this.type = type;
		this.note_sequence = this.getNoteSequence(type);
		let pair = this.getNumberOfFlatsAndSharps();
		this.number_of_flats = pair[0];
		this.number_of_sharps = pair[1];
	}

	getNoteSequence(type){
		switch(type){
			case KeySignature.TYPE.C:
				return ["C", "D", "E", "F", "G", "A", "B"];
			case KeySignature.TYPE.G:
				return ["G", "A", "B", "C", "D", "E", "F#"];
			case KeySignature.TYPE.D:
				return ["D", "E", "F#", "G", "A", "B", "C#"];
			case KeySignature.TYPE.A:
				return ["A", "B", "C#", "D", "E", "F#", "G#"];
			case KeySignature.TYPE.E:
				return ["E", "F#", "G#", "A", "B", "C#", "D#"];
			case KeySignature.TYPE.B:
				return ["B", "C#", "D#", "E", "F#", "G#", "A#"];
			case KeySignature.TYPE.F_sharp:
				return ["F#", "G#", "A#", "B", "C#", "D#", "E#"];
			case KeySignature.TYPE.C_sharp:
				return ["C#", "D#", "E#", "F#", "G#", "A#", "B#"];

			case KeySignature.TYPE.F:
				return ["F", "G", "A", "Bb", "C", "D", "E"];
			case KeySignature.TYPE.B_flat:
				return ["Bb", "C", "D", "Eb", "F", "G", "A"];
			case KeySignature.TYPE.E_flat:
				return ["Eb", "F", "G", "Ab", "Bb", "C", "D"];
			case KeySignature.TYPE.A_flat:
				return ["Ab", "Bb", "C", "Db", "Eb", "F", "G"];
			case KeySignature.TYPE.D_flat:
				return ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"];
			case KeySignature.TYPE.G_flat:
				return ["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "F"];
			case KeySignature.TYPE.Cb:
				return ["Cb", "Db", "Eb", "Fb", "Gb", "Ab", "Bb"];
 
			log.e("invalid getNoteSequence in KeySignature");
		}
	}

	getNumberOfFlatsAndSharps() {
		var flatResult = 0;
		var sharpResult = 0;
		var i;
		for(i=0; i<this.note_sequence.length; i++){
			var note = this.note_sequence[i];
			if (note.includes("b")){
				flatResult++;
			} else if (note.includes("#")){
				sharpResult++;
			}
		}
		return [flatResult, sharpResult];
	}
}

module.exports = KeySignature;
},{"@jasonfleischer/log":7}],12:[function(require,module,exports){
const log = require("@jasonfleischer/log");

//TODO: only connects to first found device
class MidiListener {
	
	constructor(noteOn, noteOff){

		this.noteOn = noteOn;
		this.noteOff = noteOff;

		let self = this;

		if (!navigator.requestMIDIAccess) {
			log.e("this browser does not support midi");
			return;
		}

		navigator.permissions.query({name: 'midi', sysex: true}).then(function(result) {
			if(result.state == 'granted') {
				log.i("Midi permissions granted");
			} else if (result.state == 'prompt'){
				log.i("Midi permissions prompt");
			} else {
				log.i("Midi permissions denied");
			}
		});

		navigator.requestMIDIAccess({sysex: true}).then(function(access) {
			if (access.inputs.size > 0) {
				self.connectToFirstDevice(Array.from(access.inputs.values()));
			} else {
				log.i("no midi devices found");
			}

			access.onstatechange = function(e) {
				log.i("Midi state changed, number of devices: " + access.inputs.size);
				if (access.inputs.size > 0) {
					self.connectToFirstDevice(Array.from(access.inputs.values()));
				}
			}
		}, function() {
			log.e("Midi request access failure");
		});
	}

	connectToFirstDevice(devices) {
		if (devices.length > 0) {
			this.connectToDevice(devices[0]);
		} else {
			log.e("connectToFirstDevice: no midi inputs");	
		}
	}

	connectToDevice(device) {

		if(this.connectedDevice !== undefined && device.id == this.connectedDevice.id) {
			log.i('Device already connected');
			return;
		}

		log.i('Connecting to device: ' + this.deviceToString(device));
		this.connectedDevice = device;
		let noteOn = this.noteOn;
		let noteOff = this.noteOff;
		let NOTE_ON = 0x9;
		let NOTE_OFF = 0x8;
		device.onmidimessage = function(m) {
			const [command, message, velocity] = m.data;
			let midi_value = message;
			let channel = command & 0x0F;
			let opCode = (command & 0xF0) >> 4;
			if (opCode === NOTE_ON) {
				noteOn(midi_value, channel, velocity);
			} else if(opCode === NOTE_OFF) {
				noteOff(midi_value, channel, velocity);
			}
		}
	}

	deviceToString(device) {
		return device.name + ' ' + device.manufacturer;
	}
}

module.exports = MidiListener;
},{"@jasonfleischer/log":7}],13:[function(require,module,exports){
const log = require("@jasonfleischer/log");

class Note {
	constructor(note_name, midi_value, octave) {
		this.note_name = note_name;
		this.midi_value  = midi_value;
		this.octave = octave;
		this.frequency = this.getEqualTemperedFrequency();

		if(!this.isWithinRange({ min: 0, max: 127})) {
			log.e('can only create notes with midi values between 0 and 127');
		}
	}

	toString() {
		return  "NOTE: " + this.note_name.type + " "  + this.octave + " " + this.midi_value + " " + this.frequency;
	}

	getEqualTemperedFrequency() {
		return 440 * Math.pow(2, ((this.midi_value-69)/12));
	}

	isWithinRange(range) {
		return this.midi_value >= range.min && this.midi_value <= range.max;
	}

	static getRandom(all_notes, range) {
		function randomInteger(min, max) { // min and max included 
			return Math.floor(Math.random() * (max - min + 1) + min);
		}
		return all_notes[randomInteger(range.min, range.max)];
	}
}

Note.Name = class  {

	static TYPE = Object.freeze({
		C: "C",
		C_sharp: "C# / Db",
		D: "D",
		D_sharp: "D# / Eb",
		E: "E",
		F: "F",
		F_sharp: "F# / Gb",
		G: "G",
		G_sharp: "G# / Ab",
		A: "A",
		A_sharp: "A# / Bb",
		B: "B"
	});

	constructor(type) {

		function get_associated_midi_values(row){
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

		this.type = type;
		switch(type){
			case Note.Name.TYPE.C:
				this.is_sharp_or_flat = false;
				this.sharp_name = this.type;
				this.flat_name = this.type;
				this.file_name = ["audio/notes/C.mp3"];
				this.color = "#ff0000";
				this.associated_midi_values = get_associated_midi_values(0);
				break;
			case Note.Name.TYPE.C_sharp:
				this.is_sharp_or_flat = true;
				this.sharp_name = "C#";
				this.flat_name = "Db";
				this.file_name = ["audio/notes/C_sharp.mp3", , "audio/notes/or.mp3", "audio/notes/D_flat.mp3"];
				this.color = "#ff8000";
				this.associated_midi_values = get_associated_midi_values(1);
				break;
			case Note.Name.TYPE.D:
				this.is_sharp_or_flat = false;
				this.sharp_name = this.type;
				this.flat_name = this.type;
				this.file_name = ["audio/notes/D.mp3"];
				this.color = "#ffff00";
				this.associated_midi_values = get_associated_midi_values(2);
				break;
			case Note.Name.TYPE.D_sharp:
				this.is_sharp_or_flat = true;
				this.sharp_name = "D#";
				this.flat_name = "Eb";
				this.file_name = ["audio/notes/D_sharp.mp3", "audio/notes/or.mp3", "audio/notes/E_flat.mp3"];
				this.color = "#7fff00";
				this.associated_midi_values = get_associated_midi_values(3);
				break;
			case Note.Name.TYPE.E:
				this.is_sharp_or_flat = false;
				this.sharp_name = this.type;
				this.flat_name = this.type;
				this.file_name = ["audio/notes/E.mp3"];
				this.color = "#00ff00";
				this.associated_midi_values = get_associated_midi_values(4);
				break;
			case Note.Name.TYPE.F:
				this.is_sharp_or_flat = false;
				this.sharp_name = this.type;
				this.flat_name = this.type;
				this.file_name = ["audio/notes/F.mp3"];
				this.color = "#00ff80";
				this.associated_midi_values = get_associated_midi_values(5);
				break;
			case Note.Name.TYPE.F_sharp:
				this.is_sharp_or_flat = true;
				this.sharp_name = "F#";
				this.flat_name = "Gb";
				this.file_name = ["audio/notes/F_sharp.mp3", "audio/notes/or.mp3", "audio/notes/G_flat.mp3"];
				this.color = "#00ffff";
				this.associated_midi_values = get_associated_midi_values(6);
				break;
			case Note.Name.TYPE.G:
				this.is_sharp_or_flat = false;
				this.sharp_name = this.type;
				this.flat_name = this.type;
				this.file_name = ["audio/notes/G.mp3"];
				this.color = "#007fff";
				this.associated_midi_values = get_associated_midi_values(7);
				break;
			case Note.Name.TYPE.G_sharp:
				this.is_sharp_or_flat = true;
				this.sharp_name = "G#";
				this.flat_name = "Ab";
				this.file_name = ["audio/notes/G_sharp.mp3", "audio/notes/or.mp3", "audio/notes/A_flat.mp3"];
				this.color = "#0000ff";
				this.associated_midi_values = get_associated_midi_values(8);
				break;
			case Note.Name.TYPE.A:
				this.is_sharp_or_flat = false;
				this.sharp_name = this.type;
				this.flat_name = this.type;
				this.file_name = ["audio/notes/A.mp3"];
				this.color = "#8000ff";
				this.associated_midi_values = get_associated_midi_values(9);
				break;
			case Note.Name.TYPE.A_sharp:
				this.is_sharp_or_flat = true;
				this.sharp_name = "A#";
				this.flat_name = "Bb";
				this.file_name = ["audio/notes/A_sharp.mp3", "audio/notes/or.mp3", "audio/notes/B_flat.mp3"];
				this.color = "#ff00ff";
				this.associated_midi_values = get_associated_midi_values(10);
				break;
			case Note.Name.TYPE.B:
				this.is_sharp_or_flat = false;
				this.sharp_name = this.type;
				this.flat_name = this.type;
				this.file_name = ["audio/notes/B.mp3"];
				this.color = "#ff007f";
				this.associated_midi_values = get_associated_midi_values(11);
				break;
		}
	}
}

Note.ALL_NOTE_NAME_TYPES = [new Note.Name(Note.Name.TYPE.C), new Note.Name(Note.Name.TYPE.C_sharp), new Note.Name(Note.Name.TYPE.D), 
						new Note.Name(Note.Name.TYPE.D_sharp), new Note.Name(Note.Name.TYPE.E), new Note.Name(Note.Name.TYPE.F),
						new Note.Name(Note.Name.TYPE.F_sharp), new Note.Name(Note.Name.TYPE.G), new Note.Name(Note.Name.TYPE.G_sharp),
						new Note.Name(Note.Name.TYPE.A), new Note.Name(Note.Name.TYPE.A_sharp), new Note.Name(Note.Name.TYPE.B)];

module.exports = Note;

},{"@jasonfleischer/log":7}],14:[function(require,module,exports){
const log = require("@jasonfleischer/log");

class Scale {

	static TYPE = Object.freeze({
		
		// 7 notes
		Ionian: "Ionian",
		Dorian: "Dorian",
		Phrygian: "Phrygian",
		Lydian: "Lydian",
		Mixolydian: "Mixolydian",
		Aeolian: "Aeolian",
		Locrian: "Locrian",

		Melodic_minor: "Melodic minor (ascending)",
		Harmonic_minor: "Harmonic minor",

		Double_Harmonic_Major: "Double Harmonic Major",
		Double_Harmonic_minor: "Double Harmonic minor",

		Phrygian_Dominant: "Spanish",

		// 6 notes
		Whole_Tone: "Whole Tone",
		blues: "Blues",

		// 5 notes (pentatonic)
		minor_Pentatonic: "minor pentatonic",
		Major_Pentatonic: "Major pentatonic",
		neutral_Pentatonic: "Neutral pentatonic",

		// 4 notes
		minor_Seventh: "minor seventh",
		Major_Seventh: "Major seventh",
		Dom_Seventh: "Dominant seventh",
		diminished_Tone: "Diminished Tone",
		
		// 3 notes
		minor_Triad: "minor triad",
		Major_Triad: "Major triad",
		Aug_Triad: "Augmented triad",
		Dim_Triad: "Diminished triad"
		
	});


	constructor(root_note, scale_type = Scale.TYPE.Major){
		this.root_note = root_note;
		this.type = scale_type;

		function replaceAll(str, find, replace) {
			return str.replace(new RegExp(find, 'g'), replace);
		}
		this.file_name = root_note.note_name.file_name.concat(["audio/scale/"+ replaceAll(this.type.toLowerCase(),' ','_') +".mp3"]);
		this.note_sequence = Scale.getNoteSequence(scale_type);
		this.alternate_names = Scale.getAlternateNames(scale_type);
		this.note_labels = this.getLabels();
		this.structure = this.getStructure();
	}

	static getNoteSequence(scale_type){
		switch(scale_type){
			case Scale.TYPE.Ionian:
				return [0, 2, 4, 5, 7, 9, 11];
			case Scale.TYPE.Dorian:
				return [0, 2, 3, 5, 7, 9, 10];
			case Scale.TYPE.Phrygian:
				return [0, 1, 3, 5, 7, 8, 10];
			case Scale.TYPE.Lydian:
				return [0, 2, 4, 6, 7, 9, 11];
			case Scale.TYPE.Mixolydian:
				return [0, 2, 4, 5, 7, 9, 10];
			case Scale.TYPE.Aeolian:
				return [0, 2, 3, 5, 7, 8, 10];
			case Scale.TYPE.Locrian:
				return [0, 1, 3, 5, 6, 8, 10];
			case Scale.TYPE.Melodic_minor:
				return [0, 2, 3, 5, 7, 9, 11];
			case Scale.TYPE.Harmonic_minor:
				return [0, 2, 3, 5, 7, 8, 11];
			case Scale.TYPE.Double_Harmonic_Major:
				return [0, 1, 4, 5, 7, 8, 11];
			case Scale.TYPE.Double_Harmonic_minor:
				return [0, 2, 3, 6, 7, 8, 11];
			case Scale.TYPE.Phrygian_Dominant:
				return [0, 1, 4, 5, 7, 8, 10];

			case Scale.TYPE.Whole_Tone:
				return [0, 2, 4, 6, 8, 10];
			case Scale.TYPE.blues:
				return [0, 3, 5, 6, 7, 10];

			case Scale.TYPE.minor_Pentatonic:
				return [0, 3, 5, 7, 10];
			case Scale.TYPE.Major_Pentatonic:
				return [0, 2, 4, 7, 9];
			case Scale.TYPE.neutral_Pentatonic:
				return [0, 2, 5, 7, 10];

			case Scale.TYPE.minor_Seventh:
				return [0, 3, 7, 10];
			case Scale.TYPE.Major_Seventh:
				return [0, 4, 7, 11];
			case Scale.TYPE.Dom_Seventh:
				return [0, 4, 7, 10];
			case Scale.TYPE.diminished_Tone:
				return [0, 3, 6, 9];

			case Scale.TYPE.minor_Triad:
				return [0, 3, 7];
			case Scale.TYPE.Major_Triad:
				return [0, 4, 7];
			case Scale.TYPE.Aug_Triad:
				return [0, 4, 8];
			case Scale.TYPE.Dim_Triad:
				return [0, 3, 6];
		}
		log.e('getNoteSequence failed: ' + scale_type);
	}

	static getAlternateNames(scale_type){
		switch(scale_type){
			case Scale.TYPE.Ionian:
				return ["Major"];
			case Scale.TYPE.Aeolian:
				return ["minor", "Melodic minor (descending)"];
			case Scale.TYPE.Double_Harmonic_Major:
				return ["Byzantine", "Arabic", "Gypsy major"];
			case Scale.TYPE.Double_Harmonic_minor:
				return ["Hungarian minor", "Gypsy minor"];
			case Scale.TYPE.Phrygian_Dominant:
				return ["Phrygian Dominant", "Spanish Gypsy"];
			default:
				return [];
		}
	}
	
	getNoteArray(all_notes, range) {
	
		var note_names = this.getUniqueNoteName(all_notes, range);
		var note_array = [];
		var i;
		for(i=range.min; i<=range.max; i++){
			var note = all_notes[i];
			if (note_names.has(note.note_name.type)) {
				note_array.push(note);
			}
		}
		if (note_array.length == 0) {
			log.e("no notes found for scale");  
		}
		return note_array;
	}

	getUniqueNoteName(all_notes, range) {

		function isNoteWithinRange(midi_number, range){
			return midi_number >= range.min && midi_number <= range.max;
		}
		const noteNames = new Set();
		var i;
		for(i=0; i<this.note_sequence.length; i++){
			let midi_number = this.root_note.midi_value + this.note_sequence[i];
			if(isNoteWithinRange(midi_number, range)){
				noteNames.add(all_notes[midi_number].note_name.type);
			}
		}
		for(i=this.note_sequence.length-1; i>=0; i--){
			let midi_number = this.root_note.midi_value - (12 - this.note_sequence[i]);
			if(isNoteWithinRange(midi_number, range)){
				noteNames.add(all_notes[midi_number].note_name.type);
			}
		}
		return noteNames;
	}

	getLabels() {
		let result = [];
		let all_labels = ["R", "m2", "M2", "m3", "M3", "P4", "TT", "P5", "m6", "M6", "m7", "M7"];
		var i;
		for(i=0; i<this.note_sequence.length; i++){
			result.push(all_labels[this.note_sequence[i]]);
		}
		return result;
	}

	getLabel(note) {
		let all_labels = ["R", "m2", "M2", "m3", "M3", "P4", "TT", "P5", "m6", "M6", "m7", "M7"];
		if(note.midi_value >= this.root_note.midi_value) {
			return all_labels[(note.midi_value - this.root_note.midi_value) % 12];
		} else {
			var diff = this.root_note.midi_value - note.midi_value;
			if(diff >= 12) { diff = diff % 12; }
			if(diff % 12 == 0) return all_labels[0];
			return all_labels[12 - diff];
		}
	}

	getStructure() {
		let result = [];
		let all_labels = ["Root", "minor 2nd", "Major 2nd", "minor 3rd", "Major 3rd", "Fourth",
											"Tritone", "Fifth", "minor 6th", "Major 6th", "minor 7th", "Major 7th"];
		var i;
		for(i=0; i<=this.note_sequence.length; i++){
			result.push(all_labels[this.note_sequence[i]]);
		}
		return result;
	}

	getContainingScaleTypeObjects(all_notes) {

		let result = [];

		var j;
		for(j = 0; j < this.note_sequence.length; j++){

			for (const key in Scale.TYPE) {
				let value = Scale.TYPE[key];			
				let sequence = Scale.getNoteSequence(value);
				if(sequence.length <= this.note_sequence.length){
					
					var newSequence = [];
					var k;
					for(k = 0; k < this.note_sequence.length; k++){
						newSequence[k] = this.note_sequence[k]-this.note_sequence[j];
						if(newSequence[k]<0){
							newSequence[k] = newSequence[k] + 12;
						}
					}

					var containsAllIntervals = true;
					var i;
					for(i = 0; i < sequence.length; i++){
						if(!newSequence.includes(sequence[i])){
							containsAllIntervals = false;
							break;
						}
					}
					if(containsAllIntervals){
						let containingNote = all_notes[this.root_note.midi_value + this.note_sequence[j]];
						result.push({note: containingNote, scale_type: value});
					}
				}
			}
		}
		return result;
	}

	getProperNoteNames(all_notes, all_key_signatures){
		
		var notes = [];
		var accidental_notes = [];

		var k;		
		for(k = 0; k < this.note_sequence.length; k++){
			let note = all_notes[this.root_note.midi_value + this.note_sequence[k]];
			if(note.note_name.is_sharp_or_flat){
				accidental_notes.push(note);
			}
			notes.push(note);
		}

		

		let number_of_accidentals = accidental_notes.length;

		if(this.type == Scale.TYPE.Ionian || this.type == Scale.TYPE.Dorian || this.type == Scale.TYPE.Phrygian || 
			this.type == Scale.TYPE.Lydian || this.type == Scale.TYPE.Mixolydian || this.type == Scale.TYPE.Aeolian || 
			this.type == Scale.TYPE.Locrian) {

			function getKeySignatures(){

				var available_key_signatures = [];
				var i;
				for(i = 0; i < all_key_signatures.length; i++){
					let key_signature = all_key_signatures[i];
					
					if (key_signature.number_of_flats == number_of_accidentals){

						var containsAllAccidentals = true;
						var l;
						for(l = 0; l < accidental_notes.length; l++){
							let accentalString = accidental_notes[l].note_name.flat_name;
							if(!key_signature.note_sequence.includes(accentalString)){
								containsAllAccidentals = false;
								break;
							}
						}
						if(containsAllAccidentals)
							available_key_signatures.push(key_signature);

					} else if(key_signature.number_of_sharps == number_of_accidentals){

						var containsAllAccidentals = true;
						var l;
						for(l = 0; l < accidental_notes.length; l++){
							let accentalString = accidental_notes[l].note_name.sharp_name;
							if(!key_signature.note_sequence.includes(accentalString)){
								containsAllAccidentals = false;
								break;
							}
						}
						if(containsAllAccidentals)
							available_key_signatures.push(key_signature);
						
					}
				}
				return available_key_signatures;
			}
			var available_key_signatures = getKeySignatures();

			if(number_of_accidentals != 0){


				function getResultFromKeySignature(key_signature) {
					var result = []
					var j;
					for(j = 0; j<notes.length; j++){
						let note = notes[j];

						if (note.note_name.is_sharp_or_flat){
							var n;
							for(n = 0; n<key_signature.note_sequence.length; n++){
								var key_signature_note = key_signature.note_sequence[n];
								if(note.note_name.sharp_name == key_signature_note || note.note_name.flat_name == key_signature_note) {
									result.push(key_signature_note);
								}
							}
						} else {
							result.push(note.note_name.type);
						}
					}
					return result;
				}

				if(available_key_signatures.length == 1){
					let key_signature = available_key_signatures[0];
					return getResultFromKeySignature(key_signature);
				} else {
					log.e('key signature not available');
				}
			}
		}


		function defaultAnswer(notes){
			var result = [];
			var j;
			for(j = 0; j<notes.length; j++){
				let note = notes[j];
				//result.push(note.note_name.is_sharp_or_flat ? note.note_name.sharp_name : note.note_name.type);
				
				result.push(note.note_name.type)
			}
			return result;
		}
		
		return defaultAnswer(notes);
	}

	toString() {
		return  this.root_note.note_name.type + " " + this.type;
	}
}

module.exports = Scale;
},{"@jasonfleischer/log":7}],15:[function(require,module,exports){
const PianoView = require("./lib/piano_view.js");
const log = require("@jasonfleischer/log");

function pianoBuilder(options) {

	this.id = options.id;
	if (this.id === undefined){
		log.e('id not provided for piano')
		return
	}

	this.pianoView = document.getElementById(this.id);
	if (this.pianoView === undefined){
		log.e('not piano exists with id: ' + this.id)
		return
	}

	function isInt(value) {
		var x = parseFloat(value);
		return !isNaN(value) && (x | 0) === x;
	}
	this.range = options.range;
	if (this.range === undefined){
		this.range = { min: 21, max: 108 }
	} else {
		if (options.range.min !== undefined && options.range.max !== undefined) {
			if(isInt(options.range.min)){
				this.range.min = Math.min(Math.max(this.range.min, options.range.min), this.range.max);
			}
			if(isInt(options.range.max)){
				this.range.max = Math.min(Math.max(this.range.min, options.range.max), this.range.max);
			}
		}
	}

	this.width = 1000;
	if (options.width !== undefined){
		this.width = options.width;
	}
	this.hover = false;
	if (options.hover !== undefined){
		this.hover = options.hover;
	}

	let backgroundColor = "#00000000";
	if (options.backgroundColor !== undefined){
		backgroundColor = options.backgroundColor;
	}

	this.view = new PianoView(this.id, this.width, this.range, options.onClick, this.hover, backgroundColor);
	return this.view;
}


module.exports = pianoBuilder;


},{"./lib/piano_view.js":16,"@jasonfleischer/log":7}],16:[function(require,module,exports){
const musicKit = require("@jasonfleischer/music-model-kit");
const log = require("@jasonfleischer/log")

class PianoView {
	constructor(id = "piano_view_id", width = 1000, range = musicKit.piano_range, onClick, hover = false, backgroundColor="#00000000") {

	  	this.id = id;
		this.BORDER_WIDTH = 1;
		this.range = range;
		this.min_midi_value = range.min;
		this.max_midi_value = range.max;
		this.number_of_white_keys = 0;
		this.number_of_black_keys = 0;
		this.midi_value_to_piano_key_map = {};
		this.hover = hover;
		this.backgroundColor = backgroundColor;
		this.onClick = onClick;
		var i;
		for(i = this.min_midi_value; i <= this.max_midi_value; i++){
			var note = musicKit.all_notes[i];
			if(!note.note_name.is_sharp_or_flat){
				this.number_of_white_keys++;
			} else {
				this.number_of_black_keys++;
			}
		}
		this.WIDTH = 1000;
		this.width = width;
		this.HEIGHT = this.calculateHeight(this.WIDTH, this.number_of_white_keys);
		this.buildCanvases();
		this.draw();
		this.resize(width);
	}

	buildCanvases() {

		let width = this.WIDTH;
		let height = this.HEIGHT;
		let rootView = document.getElementById(this.id);

	    this.white_keys_canvas = this.buildCanvas(rootView, "piano_white_keys_canvas_"+this.id, width, height);
	    this.white_keys_drawing_canvas = this.buildCanvas(rootView, "piano_white_keys_drawing_canvas_"+this.id, width, height);
	    if(this.hover) {
	    	this.white_keys_drawing_hover_canvas = this.buildCanvas(rootView, "piano_white_keys_drawing_hover_canvas_"+this.id, width, height);
	    }
	    this.black_keys_canvas = this.buildCanvas(rootView, "piano_black_keys_canvas_"+this.id, width, height);
	    this.black_keys_drawing_canvas = this.buildCanvas(rootView, "piano_black_keys_drawing_canvas_"+this.id, width, height);
	    if(this.hover) {
	    	this.black_keys_drawing_hover_canvas = this.buildCanvas(rootView, "piano_black_keys_drawing_hover_canvas_"+this.id, width, height);
	    }
		rootView.style.backgroundColor = this.backgroundColor;
		rootView.style.position = "relative"
		rootView.style.width = width  + "px";
		rootView.style.height = height  + "px";
		rootView.width = width;
		rootView.height = height;
	}

	buildCanvas(rootView, id, width, height) {

		var canvas = document.createElement('canvas'); 
	    canvas.id = id;
	    canvas.style.position = "absolute"
	    canvas.style.left = "0px"
	    canvas.style.right = "0px"
	    canvas.style.width = width + "px";
		canvas.style.height = height + "px";
		canvas.width = width;
		canvas.height = height;
	    rootView.appendChild(canvas);
	    return canvas;
	}

	removeCanvases(){
		const removeChilds = (parent) => {
		    while (parent.lastChild) {
				parent.removeChild(parent.lastChild);
			}
		};
		let rootView = document.getElementById(this.id);
		removeChilds(rootView);
	}

	resize(newWidth) {

		this.width = newWidth;

		let rootView = document.getElementById(this.id);

		var newWidth = Math.min(newWidth, this.WIDTH);

		var newHeight = this.calculateHeight(newWidth, this.number_of_white_keys);
		rootView.style.height = newHeight + "px";
		this.black_keys_canvas.style.height = newHeight + "px";
		this.black_keys_drawing_canvas.style.height = newHeight + "px";
		this.white_keys_canvas.style.height = newHeight + "px";
		this.white_keys_drawing_canvas.style.height = newHeight + "px";

		rootView.style.width = newWidth + "px";
		this.black_keys_canvas.style.width = newWidth + "px";
		this.black_keys_drawing_canvas.style.width = newWidth + "px";
		this.white_keys_canvas.style.width = newWidth + "px";
		this.white_keys_drawing_canvas.style.width = newWidth + "px";
		if(this.hover) {
	    	this.black_keys_drawing_hover_canvas.style.height = newHeight + "px";
	    	this.black_keys_drawing_hover_canvas.style.width = newWidth + "px";
	    	this.white_keys_drawing_hover_canvas.style.height = newHeight + "px";
	    	this.white_keys_drawing_hover_canvas.style.width = newWidth + "px";
			this.addHoverEventListeners();
		}
		if(this.onClick !== undefined) {
			this.addClickEventListeners(this.onClick);
		}
	}

	draw(){

		let white_key_width = Math.floor((this.WIDTH - ((this.number_of_white_keys+1)*this.BORDER_WIDTH) )/ this.number_of_white_keys);
		this.white_key_height =  Math.floor(white_key_width * 5);

		var white_keys = [];
		
		var i;
		var x = this.BORDER_WIDTH + (this.WIDTH - ((white_key_width + this.BORDER_WIDTH ) * this.number_of_white_keys))/2;
		for(i = this.min_midi_value; i <= this.max_midi_value; i++){
			var note = musicKit.all_notes[i];
			if(!note.note_name.is_sharp_or_flat){

				let key = new PianoView.Key(x, this.BORDER_WIDTH, 
					white_key_width, this.BORDER_WIDTH+this.white_key_height, note, "#fff")
				white_keys.push(key)

				this.midi_value_to_piano_key_map[note.midi_value] = key
				x = x + white_key_width + this.BORDER_WIDTH;
			}
		}

		var ctx = this.white_keys_canvas.getContext("2d");
		var j;
		for(j = 0; j < white_keys.length; j++){	
			var white_key = white_keys[j];
			white_key.draw(ctx);
		}

		var black_keys = [];
		var black_key_width = Math.floor(white_key_width * 0.6);
		var black_key_height = Math.floor(this.white_key_height * 0.67);
		var k;
		for(k = this.min_midi_value; k <= this.max_midi_value; k++){
			var note = musicKit.all_notes[k];
			if(note.note_name.is_sharp_or_flat){

				var flat_key = this.midi_value_to_piano_key_map[note.midi_value-1];
				var sharp_key = this.midi_value_to_piano_key_map[note.midi_value+1];
				if( flat_key != undefined && sharp_key != undefined) {

					var x = flat_key.x + this.BORDER_WIDTH + white_key_width - black_key_width/2;
					let key = new PianoView.Key(x, this.BORDER_WIDTH, black_key_width, black_key_height, note, "#333", true);
					black_keys.push(key)
					this.midi_value_to_piano_key_map[note.midi_value] = key
				}
			}
		}

		ctx = this.black_keys_canvas.getContext("2d");
		var l;
		for(l = 0; l < black_keys.length; l++){	
			var black_key = black_keys[l];
			black_key.draw(ctx);
		}
	}

	calculateHeight(width, number_of_white_keys) {
		let white_key_width = Math.floor((width - ((this.number_of_white_keys+1)*this.BORDER_WIDTH) )/ this.number_of_white_keys);
		return  Math.ceil((white_key_width * 5) + this.BORDER_WIDTH*2) +1 ;
	}

	clear() {
		this.black_keys_drawing_canvas.getContext("2d").clearRect(0, 0, this.WIDTH, this.HEIGHT);
		this.white_keys_drawing_canvas.getContext("2d").clearRect(0, 0, this.WIDTH, this.HEIGHT);
		var i;
	    for(i=this.range.min; i<=this.range.max; i++){
	    	this.midi_value_to_piano_key_map[i].isOn = false;
	    }
	}
	clearNote(note) {
		if(note == undefined) {
			log.e('note is undefined')
			return
		}
		if (!note.isWithinRange(this.range)) {
			log.i('note is out of range')
			return
		}
		let ctx = note.note_name.is_sharp_or_flat ? this.black_keys_drawing_canvas.getContext("2d") : 
													this.white_keys_drawing_canvas.getContext("2d");

		let key = this.midi_value_to_piano_key_map[note.midi_value];
		ctx.clearRect(key.x , key.y, key.width, key.height);
		key.isOn = false;
	}
	
	clearHover() {
		var canvas = this.white_keys_drawing_hover_canvas;
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);

		canvas = this.black_keys_drawing_hover_canvas;
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
	}

	clearHoverNote(note) {
		let ctx = note.note_name.is_sharp_or_flat ? this.black_keys_drawing_hover_canvas.getContext("2d") : 
													this.white_keys_drawing_hover_canvas.getContext("2d");

		let key = this.midi_value_to_piano_key_map[note.midi_value];
		ctx.clearRect(key.x , key.y, key.width, key.height);
	}

	drawNote(note){
		if(note == undefined) {
			log.e('note is undefined')
			return
		}
		this.drawNoteWithColor(note);
	}

	drawNoteWithColor(note, color=note.note_name.color){
		if(note == undefined) {
			log.e('note is undefined')
			return
		}
		if (!note.isWithinRange(this.range)) {
			log.i('note is out of range')
			return
		}
		var ctx = note.note_name.is_sharp_or_flat ? this.black_keys_drawing_canvas.getContext("2d") : 
													this.white_keys_drawing_canvas.getContext("2d");

		let key = this.midi_value_to_piano_key_map[note.midi_value];
		key.draw(ctx, color);
	}

	drawHoverNote(note){
		if(note == undefined) {
			log.e('note is undefined')
			return
		}
		if (!note.isWithinRange(this.range)) {
			log.i('note is out of range')
			return
		}
		var ctx = note.note_name.is_sharp_or_flat ? this.black_keys_drawing_hover_canvas.getContext("2d") : 
													this.white_keys_drawing_hover_canvas.getContext("2d");
		let color = note.note_name.is_sharp_or_flat ? "#aaaaaaaa" : "#33333333";
		let key = this.midi_value_to_piano_key_map[note.midi_value];
		key.draw(ctx, color);
	}

	drawInterval(interval){

		var play_type = interval.play_type;
		let higher_note = interval.getHigherNote(musicKit.all_notes);
		var first_note = (play_type == musicKit.Interval.PLAY_TYPE.ASCENDING) ? interval.lower_note : higher_note;

		this.clear();
		this.drawNoteWithColor(first_note);
		setTimeout(() => {
			var second_note = (play_type == musicKit.Interval.PLAY_TYPE.ASCENDING) ? higher_note : interval.lower_note;
			this.drawNoteWithColor(second_note);
		}, (interval.play_type == musicKit.Interval.PLAY_TYPE.HARMONIC) ? 0 : interval.delay_in_ms);	
	}

	drawChord(chord){
		this.clear();
		var note_array = chord.getNoteArray(musicKit.all_notes, this.range);
		var j;
		for(j=0; j< note_array.length; j++) {
			var note = note_array[j];
			var label = chord.note_labels[j];
			if (label == 'R'){
				this.drawNoteWithColor(note);
			} else {
				this.drawNoteWithColor(note, "#999");
			}
		}
	}

	drawScale(scale){
		this.clear();
		var note_array = scale.getNoteArray(musicKit.all_notes, this.range);
		var j;
		for(j=0; j< note_array.length; j++) {
			var note = note_array[j];
			
			if (note.note_name.type == scale.root_note.note_name.type){
				this.drawNoteWithColor(note);
			} else {
				this.drawNoteWithColor(note, "#999");
			}
		}
	}

	addClickEventListeners(onClick) {

		let rootView = document.getElementById(this.id);
		rootView.style.cursor="pointer";
		let range = this.range;
		let key_map = this.midi_value_to_piano_key_map;
		let width = this.width;
		let WIDTH = this.WIDTH;
		let self = this;

		if(this.onClickFunction !== undefined)
			rootView.removeEventListener("click", this.onClickFunction);
		this.onClickFunction = function(event){
			let position =	self.getPosition(rootView);
		    let x = (event.clientX - position.x) * (WIDTH/width);
		    let y = (event.clientY- position.y) * (WIDTH/width);

		    var foundKey = self.findKey(key_map, range, x, y);

		    if(foundKey == undefined){
		    	log.e("No key found on click");
		    } else {
		    	foundKey.isOn = !foundKey.isOn;
		    	onClick(foundKey.note, foundKey.isOn);
		    }
		}
		rootView.addEventListener("click", this.onClickFunction);
	}

	removeOnClick(){
		let rootView = document.getElementById(this.id);
		rootView.removeEventListener("click", this.onClickFunction);
	}

	addHoverEventListeners() {

		let view = document.getElementById(this.id);
		view.style.cursor="pointer";
		let range = this.range;
		let key_map = this.midi_value_to_piano_key_map;
		let width = this.width;
		let WIDTH = this.WIDTH;
		let self = this;
		var previousKey = undefined;

		if(this.mouseOverFunction !== undefined)
			view.removeEventListener("mouseover", this.mouseOverFunction);
		if(this.mouseMoveFunction !== undefined)
			view.removeEventListener("mousemove", this.mouseMoveFunction);
		if(this.mouseOutFunction !== undefined)
			view.removeEventListener("mouseout", this.mouseOutFunction);

		this.mouseOverFunction = function(event) {
			previousKey = undefined;
		}
		view.addEventListener("mouseover", this.mouseOverFunction);

		this.mouseMoveFunction = function(event){
		    let position =	self.getPosition(view);
		    let x = (event.clientX - position.x) * (WIDTH/width);
		    let y = (event.clientY- position.y) * (WIDTH/width);

		    var foundKey = self.findKey(key_map, range, x, y);

		    if(foundKey !== undefined){
		    	
		    	if(previousKey === undefined) {
		    		previousKey = foundKey;
		    		self.drawHoverNote(foundKey.note);
		    	}
		    	if(previousKey.note.midi_value !== foundKey.note.midi_value) {

		    		self.clearHoverNote(previousKey.note);
		    		previousKey = foundKey;
		    		self.drawHoverNote(foundKey.note);
		    	}		    	
		    } else {
		    	if(previousKey !== undefined){
			    	self.clearHoverNote(previousKey.note);
			    	previousKey = undefined;
		    	}
		    }
		}
		view.addEventListener("mousemove", this.mouseMoveFunction);
		
		this.mouseOutFunction = function(event) {
			if(previousKey !== undefined){
				self.clearHoverNote(previousKey.note);
			}
		}
		view.addEventListener("mouseout", this.mouseOutFunction);
	}


	getPosition(element) {
		const rect = element.getBoundingClientRect();
		return { x: rect.left, y: rect.top };
	}

	findKey(key_map, range, x, y){
		var foundKey;
		var i;
	    for(i=range.min; i<=range.max; i++){
	    	var key = key_map[i];
	    	if(key.isWithinBounds({x: x, y: y})){
	    		foundKey = key;
	    		if(key.isBlack){
	    			break;
	    		}
	    	}
	    }
	    return foundKey;
	}
}

PianoView.Key = class  {
	constructor(x, y, width, height, note, color, isBlack = false){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.note = note;
		this.color = color;
		this.isBlack = isBlack;
		this.isOn = false;
	}

	draw(ctx, color = this.color) {
		ctx.beginPath();
		ctx.lineWidth = 0;
		ctx.fillStyle = color;
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.fill();
		ctx.stroke();
    	
    	if (this.note.note_name.name == 'C' && this.note.octave == 4) {
			ctx.beginPath();
			ctx.arc(this.x + (this.width)/2, this.height - this.height*0.10, this.width * 0.15, 0, 2 * Math.PI, false);
			ctx.fillStyle = '#666';
			ctx.fill();
    	}
	}

	isWithinBounds(position) {
		return position.x >= this.x &&  position.x <= (this.width + this.x) &&
			position.y >= this.y &&  position.y <= (this.height + this.y);
	}
}

module.exports = PianoView;
},{"@jasonfleischer/log":7,"@jasonfleischer/music-model-kit":8}]},{},[1]);
