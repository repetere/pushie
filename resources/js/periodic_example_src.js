'use strict';

var pushie = require('../../index'),
	pushieduckduckgo,
	pushiegithub,
	pushie1,
	pushie2,
	responseContainer;

var defaultErrorCallback = function (err, response) {
	//console.log(err, response);
	responseContainer.innerHTML = 'error : ' + JSON.stringify(err, null, 2);
	responseContainer.innerHTML += '\nresponse : ' + JSON.stringify(response, null, 2);
};

window.addEventListener('load', function () {
	responseContainer = document.querySelector('#pushie-test-result');
	pushieduckduckgo = new pushie({
		jsonp: true,
		ajaxsubmitselector: '#duckduckgo-pushie-test',
		queryparameters: {
			callback: 'duckduckgocallback',
		},
		errorcallback: defaultErrorCallback,
		successcallback: function (response) {
			responseContainer.innerHTML = JSON.stringify(response, null, 2);
		}
	});

	pushiegithub = new pushie({
		ajaxsubmitselector: '#github-pushie-test',
		errorcallback: defaultErrorCallback,
		successcallback: function (response) {
			responseContainer.innerHTML = response.text;
		}
	});


	pushie1 = new pushie({
		ajaxsubmitselector: '#pushie-test',
		postdata: {
			_csrf: document.querySelector('input[name="_csrf"]').value
		},
		queryparameters: {
			format: 'json',
			_csrf: document.querySelector('input[name="_csrf"]').value
		},
		errorcallback: defaultErrorCallback,
		successcallback: function (response) {
			responseContainer.innerHTML = JSON.stringify(response.body, null, 2);
		}
	});

	pushie2 = new pushie({
		ajaxsubmitselector: '#upload-pushie-test',
		postdata: {
			_csrf: document.querySelector('input[name="_csrf"]').value
		},
		queryparameters: {
			format: 'json',
			_csrf: document.querySelector('input[name="_csrf"]').value
		},
		headers: {
			_csrf: document.querySelector('input[name="_csrf"]').value
		},
		errorcallback: defaultErrorCallback,
		successcallback: function (response) {
			responseContainer.innerHTML = JSON.stringify(response.body, null, 2);
		}
	});

	window.pushie1 = pushie1;
}, false);
