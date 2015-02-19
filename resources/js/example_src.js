'use strict';

var request = require('superagent'),
	Pushie = require('../../index'),
	Pushie1,
	state,
	lastevent,
	urlhistory,
	examples,
	output,
	replaceHistoryButton,
	template = 'title: <strong>{title}</strong>, URL: <strong>{url}</strong>, name: <strong>{name}</strong>, location: <strong>{location}</strong>';

var reportEvent = function (event) {
	// console.log('event', event);
	lastevent.innerHTML = event.type;
};

var statecallback = function (data) {
	output.innerHTML = template.replace(/(:?\{(.*?)\})/g, function (a, b, c) {
		return data[c];
	});
};

var linkClick = function (event) {
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
			Pushie1.pushHistory({
				data: statedata,
				title: statedata.title,
				href: event.target.href
			});
		});
	return false;
};

var replaceHistoryEventClick = function () {
	Pushie1.replaceHistory({
		data: {
			title: 'replaced third title',
			name: 'replaced third name',
			location: 'replaced location'
		},
		title: 'replaced third title',
		href: '/history/third'
	});
};

var initEvents = function () {
	if (!Pushie1.options.push_state_support) {
		state.className = 'fail';
	}
	else {
		state.className = 'success';
		state.innerHTML = 'HTML5 History API available';
	}

	for (var x = 0; x < examples.length; x++) {
		examples[x].addEventListener('click', linkClick, false);
	}

	replaceHistoryButton.addEventListener('click', replaceHistoryEventClick, false);

	window.addEventListener('popstate', function (event) {
		reportEvent(event);
	});

	window.addEventListener('replacestate', function (event) {
		reportEvent(event);
	});

	window.addEventListener('hashchange', function (event) {
		reportEvent(event);
	});

	window.addEventListener('pageshow', function (event) {
		reportEvent(event);
	});

	window.addEventListener('pagehide', function (event) {
		reportEvent(event);
	});

	// window.history.replaceState(window.initialdata, window.initialdata.title, window.initialdata.url);
};

window.addEventListener('load', function () {
	state = document.getElementById('status');
	lastevent = document.getElementById('lastevent');
	urlhistory = document.getElementById('urlhistory');
	examples = document.querySelectorAll('#examples li a');
	output = document.getElementById('output');
	replaceHistoryButton = document.getElementById('replace-history');
	Pushie1 = new Pushie({
		replacecallback: statecallback,
		pushcallback: statecallback,
		popcallback: statecallback,
		// initialdata: {
		// 	title: 'init title',
		// 	name: 'init name',
		// 	location: 'init location'
		// },
		// initialtitle: 'init title',
		// initialhref: 'home'
	});
	initEvents();
	window.Pushie1 = Pushie1;
}, false);
