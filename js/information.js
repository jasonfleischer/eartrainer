var information = {}

information.showAlert = function(){

	let contents = `
		<div>
			<ul class="desktop-only">
				<li id="darkmode">
					<div class="nav-toggle-item">
						<span>`+TR("Dark Mode")+`</span>
						<label id="darkmode_checkbox_switch" class="switch">
							<input id="darkmode_checkbox" type="checkbox" checked="checked"/>
							<span class="switch_track round" tabindex="0"></span>
						</label>
					</div>
				</li>
			</ul>
		</div>
		<br class="desktop-only" />
		<p onclick="openMailToDeveloper()">`+TR("Thank you for using this website. If you wish to submit feedback, comment or report an error click <strong>here</strong>.")+`</p>
		<br/>
		<p onclick="openURL('https://surikov.github.io/webaudiofont/')">`+TR("Special thanks to Surikov for their <strong>WebAudioFont</strong> library.")+`</p>
		<br/>
		<p onclick="openURL('https://jasonfleischer.github.io/website/');">`+TR("Information about the developer can be found <strong>here</strong>.")+`</p>
		<br class="desktop-only"/>
		<button class="desktop-only" onclick="show_keyboard_shortcuts()">`+TR("Keyboard Shortcuts")+`</button>
	`
	alert.show(TR("Information"), contents)

	information.setup_darkmode()
}

information.dismissAlert = function(){
	alert.dismiss()
}

information.setup_darkmode = function(){
	setup_darkmode($("darkmode"), $("darkmode_checkbox_switch"), $("darkmode_checkbox"));
	$("darkmode_checkbox").checked = model.darkmode;
}


