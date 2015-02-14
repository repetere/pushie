'use strict';

var pushie = require('../../index'),
	querystring = require('querystring'),
	pushieduckduckgo,
	pushiehtml,
	pushiejson,
	pushiepost,
	responseContainer;

var defaultErrorCallback = function (err, response) {
	responseContainer.innerHTML = 'error : ' + JSON.stringify(err, null, 2);
	responseContainer.innerHTML += '\nresponse : ' + JSON.stringify(response, null, 2);
};

window.addEventListener('load', function () {
	responseContainer = document.querySelector('#pushie-test-result');
	pushieduckduckgo = new pushie({
		jsonp: true,
		ajaxformselector: '#duckduckgo-pushie-test',
		queryparameters: {
			callback: 'duckduckgocallback',
		},
		errorcallback: defaultErrorCallback,
		successcallback: function (response) {
			responseContainer.innerHTML = JSON.stringify(response, null, 2);
		}
	});

	pushiehtml = new pushie({
		ajaxformselector: '#html-pushie-test',
		errorcallback: defaultErrorCallback,
		successcallback: function (response) {
			responseContainer.innerHTML = response.text;
		}
	});


	pushiejson = new pushie({
		ajaxformselector: '#pushie-test',
		queryparameters: {
			additional: 'queryparameter',
		},
		headers: {
			pushieheader: 'can be anything'
		},
		errorcallback: defaultErrorCallback,
		successcallback: function (response) {
			var queryfromajaxresponse = response.req._query[0];
			queryfromajaxresponse = querystring.parse(queryfromajaxresponse);
			responseContainer.innerHTML = JSON.stringify(queryfromajaxresponse, null, 2);
		}
	});

	pushiepost = new pushie({
		ajaxformselector: '#upload-pushie-test',
		postdata: {
			moredata: 'can be object of anything'
		},
		headers: {
			pushieheader: 'can be anything'
		},
		errorcallback: function (err, response) {
			var Forbject = require('forbject'),
				postformfields = new Forbject('#upload-pushie-test').getObject(),
				postresult = {
					form: postformfields,
					response: response
				},
				file = document.querySelector('#image'),
				reader = new FileReader();

			if (file && file.files && file.files[0]) {
				reader.readAsDataURL(file.files[0]);
				reader.onloadend = function () {
					if (reader.result.match(/image/gi)) {
						responseContainer.innerHTML = '<div><img src="' + reader.result + '"/></div>';
					}
					else {
						responseContainer.innerHTML = '<div>' + reader.result + '</div>';
					}
					responseContainer.innerHTML += JSON.stringify(postresult, null, 2);
				};
			}
			else {
				responseContainer.innerHTML = JSON.stringify(postresult, null, 2);
			}
		},
		successcallback: function (response) {
			responseContainer.innerHTML = JSON.stringify(response.body, null, 2);
		}
	});

	window.pushiejson = pushiejson;
}, false);
