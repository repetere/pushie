'use strict';

var state,
	lastevent,
	urlhistory,
	examples,
	output,
	template = '<p>URL: <strong>{url}</strong>, name: <strong>{name}</strong>, location: <strong>{location}</strong></p>',
	data = { // imagine these are ajax requests :)
		first: {
			name: 'Remy',
			location: 'Brighton, UK'
		},
		second: {
			name: 'John',
			location: 'San Francisco, USA'
		},
		third: {
			name: 'Jeff',
			location: 'Vancover, Canada'
		},
		fourth: {
			name: 'Simon',
			location: 'London, UK'
		}
	};

var reportEvent = function (event) {
	console.log('event', event);
	lastevent.innerHTML = event.type;
};

var reportData = function (data) {
	output.innerHTML = template.replace(/(:?\{(.*?)\})/g, function (a, b, c) {
		return data[c];
	});
};

var linkClick = function (event) {
	var title;
	event.preventDefault();
	title = event.target.innerHTML;
	// console.log('title', title);
	data[title].url = event.target.getAttribute('href'); // slightly hacky (the setting), using getAttribute to keep it short
	history.pushState(data[title], title, event.target.href);
	reportData(data[title]);
	return false;
};

var initEvents = function () {
	if (typeof history.pushState === 'undefined') {
		state.className = 'fail';
	}
	else {
		state.className = 'success';
		state.innerHTML = 'HTML5 History API available';
	}

	for (var x = 0; x < examples.length; x++) {
		examples[x].addEventListener('click', linkClick, false);
	}

	window.addEventListener('popstate', function (event) {
		var data = event.state;
		reportEvent(event);
		reportData(event.state || {
			url: 'unknown',
			name: 'undefined',
			location: 'undefined'
		});
	});

	window.addEventListener('hashchange', function (event) {
		reportEvent(event);

		// we won't do this for now - let's stay focused on states
		/*
		if (event.newURL) {
		  urlhistory.innerHTML = event.oldURL;
		} else {
		  urlhistory.innerHTML = "no support for <code>event.newURL/oldURL</code>";
		}
		*/
	});

	window.addEventListener('pageshow', function (event) {
		reportEvent(event);
	});

	window.addEventListener('pagehide', function (event) {
		reportEvent(event);
	});
};

window.addEventListener('load', function () {
	state = document.getElementById('status');
	lastevent = document.getElementById('lastevent');
	urlhistory = document.getElementById('urlhistory');
	examples = document.querySelectorAll('#examples li a');
	output = document.getElementById('output');
	initEvents();
}, false);
