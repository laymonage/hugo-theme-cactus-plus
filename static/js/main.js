// To make images retina, add a class "2x" to the img element
// and add a <image-name>@2x.png image. Assumes jquery is loaded.

function isRetina() {
	var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
					  (min--moz-device-pixel-ratio: 1.5),\
					  (-o-min-device-pixel-ratio: 3/2),\
					  (min-resolution: 1.5dppx)";

	if (window.devicePixelRatio > 1)
		return true;

	if (window.matchMedia && window.matchMedia(mediaQuery).matches)
		return true;

	return false;
};


function retina() {

	if (!isRetina())
		return;

	$("img.2x").map(function(i, image) {

		var path = $(image).attr("src");

		path = path.replace(".png", "@2x.png");
		path = path.replace(".jpg", "@2x.jpg");

		$(image).attr("src", path);
	});
};

function loadUtterancesSafe(theme) {
	if (typeof loadUtterances !== 'undefined' && theme) {
		loadUtterances(theme);
	}
}

function switchTheme(e) {
    if (e.target.checked) {
        document.getElementById('dark-css').disabled = false;
        document.getElementById('dark-highlight-css').disabled = false;
		localStorage.setItem('theme', 'dark');
		loadUtterancesSafe('dark');
    }
    else {
		document.getElementById('dark-css').disabled = true;
		document.getElementById('dark-highlight-css').disabled = true;
		localStorage.setItem('theme', 'light');
		loadUtterancesSafe('light');
    }
}

function configureDarkModeToggle(currentTheme) {
	const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
	toggleSwitch.addEventListener('change', switchTheme, false);
	if (currentTheme && currentTheme === 'dark') {
		toggleSwitch.checked = true;
	}
}

$(document).ready(() => {
	const currentTheme = localStorage.getItem('theme');
	retina();
	configureDarkModeToggle(currentTheme);
	loadUtterancesSafe(currentTheme);
});
