var window_resize_start_event_occured = false;
var resized_timer;
window.onresize = function(){
	clearTimeout(resized_timer);
	resized_timer = setTimeout(window_resized_end, 200);
	if(!window_resize_start_event_occured) {
		window_resized_start();
		window_resize_start_event_occured = true;
	}
};

function window_resized_start(){
	dismissInfo();	
}

function window_resized_end(){

	window_resize_start_event_occured = false;

	$("content_view").style.visibility = "visible";

	if(is_compact_window()) {
		hide_settings();
		$("hide_show_left_column").style.visibility = "hidden";
		$("content_view").style.marginLeft = "0px";

	} else {
		
		$("hide_show_left_column").style.visibility = "visible";

		if(is_left_column_showing) {
			$("nav-side-menu").style.display = "block";
			var column_width = getComputedStyle(document.documentElement).getPropertyValue("--left-column-width")
			$("content_view").style.marginLeft = column_width;
		} else {

			$("nav-side-menu").style.display = "none";
			$("content_view").style.marginLeft = "0px";
		}
	}

	var column_width = parseInt($("content_view").style.marginLeft.replace("px", ""));
	let contentWidth = document.body.clientWidth - column_width;
	$("init_view").style.width = contentWidth + "px";
	$("answer_container").style.width = contentWidth + "px";

	if(!audio_controller.playing){
		$("status_msg").style.display = "block"; // show
	}

	let fretboardPaddingLeftRight = 34;
	fretboardView.resize(Math.min(contentWidth-fretboardPaddingLeftRight, 1000));
	let pianoPaddingLeftRight = 30;
	pianoView.resize(Math.min(contentWidth-pianoPaddingLeftRight, 1000));
}