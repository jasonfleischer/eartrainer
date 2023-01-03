var information = {}

information.showAlert = function(){

	let contents = 
		'<br class="desktop-only" />'+
		'<p id="openMailToDeveloper">Thank you for using this website. If you wish to submit feedback, comment or report an error click <strong>here</strong></p>'+
		'<br/>'+
		'<p id="surikov">Special thanks to Surikov for their <strong>WebAudioFont</strong> library.</p>'+
		'<br/>'+
		'<p id="personalWebsite">Information about the developer can be found <strong>here</strong>.</p>'+
		'<br/>'+
		'<p id="musicAppWebsite">Other music apps created by this developer can be found <strong>here</strong>.</p>'+
		'<br class="desktop-only"/>'+
		'<button class="desktop-only" id="keyboard_shortcuts">Keyboard Shortcuts</button>';
	alert.show("Information", contents)
	information.setupOnClicks();
}

information.setupOnClicks = function(){
	$("openMailToDeveloper").onclick = function() { openMailToDeveloper(); };
	$("surikov").onclick = function() { openURL('https://surikov.github.io/webaudiofont/'); };
	$("personalWebsite").onclick = function() { openURL('https://jasonfleischer.github.io/website/'); };
	$("musicAppWebsite").onclick = function() { openURL('https://jasonfleischer.github.io/music-apps/'); };
	$("keyboard_shortcuts").onclick = function() { show_keyboard_shortcuts(); };
}

information.dismissAlert = function(){
	alert.dismiss()
}


