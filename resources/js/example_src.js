'use strict';

var request = require('superagent'),
	state,
	lastevent,
	urlhistory,
	examples,
	output,
	template = 'title: <strong>{title}</strong>, URL: <strong>{url}</strong>, name: <strong>{name}</strong>, location: <strong>{location}</strong>';

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
	var title = event.target.innerHTML;
	output.innerHTML = 'loading...';
	event.preventDefault();
	request
		.get(event.target.getAttribute('href'))
		.set('Accept', 'application/json')
		.query({
			format: 'json'
		})
		.end(function (error, res) {
			var statedata = JSON.parse(res.text);
			window.history.pushState(statedata, statedata.title, event.target.href);
			reportData(statedata);
		});
	return false;
};

var initEvents = function () {
	if (typeof window.history.pushState === 'undefined') {
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
		// var data = event.state;
		reportEvent(event);
		reportData(event.state || {
			title: 'unknown',
			url: 'unknown',
			name: 'undefined',
			location: 'undefined'
		});
	});

	window.addEventListener('replacestate', function (event) {
		// var data = event.state;
		reportEvent(event);
		reportData(event.state || {
			title: 'unknown',
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

	window.history.replaceState(window.initialdata, window.initialdata.title, window.initialdata.url);
};

window.addEventListener('load', function () {
	state = document.getElementById('status');
	lastevent = document.getElementById('lastevent');
	urlhistory = document.getElementById('urlhistory');
	examples = document.querySelectorAll('#examples li a');
	output = document.getElementById('output');
	initEvents();
}, false);
