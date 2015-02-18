'use strict';
var async = require('async'),
	ejs = require('ejs'),
	fs = require('fs-extra'),
	path = require('path'),
	querystring = require('querystring'),
	index_view_filepath = path.resolve(process.cwd(), 'resources/template/index.ejs'),
	INDEX_ejs_template_cache,
	pagedata = { // imagine these are ajax requests :)
		first: {
			title: 'first',
			name: 'Remy',
			location: 'Brighton, UK'
		},
		second: {
			title: 'second',
			name: 'John',
			location: 'San Francisco, USA'
		},
		third: {
			title: 'third',
			name: 'Jeff',
			location: 'Vancover, Canada'
		},
		fourth: {
			title: 'fourth',
			name: 'Simon',
			location: 'London, UK'
		}
	};

var getTemplateHTMLString = function (options, callback) {
	fs.readFile(options.templatefilepath, 'utf8', function (err, templatestring) {
		if (err) {
			callback(err, null);
		}
		else {
			callback(null, templatestring);
		}
	});
};
exports.getdata = function (req, res, next) {
	var req_url = req._parsedUrl.pathname;
	async.series({
		getPageTemplateString: function (cb) {
			getTemplateHTMLString({
				templatefilepath: index_view_filepath
			}, cb);
		},
		getPageData: function (cb) {
			var templatePageData = {};
			// console.log('req_url.split("/")', req_url.split('/'));
			if (req_url.match(/history/gi) && req_url.split('/').length >= 3) {
				templatePageData = pagedata[req_url.split('/')[2]];
				templatePageData.url = req._parsedUrl.pathname;
				// console.log('pagedata', pagedata);
				cb(null, templatePageData);
			}
			else {
				templatePageData.url = req._parsedUrl.pathname;
				templatePageData = pagedata.first;
				cb(null, templatePageData);
			}
		}
	}, function (err, result) {
		if (err) {
			next(err);
		}
		else if (req_url === '/' || req_url.match(/history/gi)) {
			console.log('req.headers', req.headers);
			INDEX_ejs_template_cache = ejs.render(result.getPageTemplateString, result.getPageData);
			if (req._parsedUrl.query && req._parsedUrl.query.length > 0 && querystring.parse(req._parsedUrl.query).format === 'json') {
				res.end(JSON.stringify(result.getPageData));
			}
			else {
				res.end(INDEX_ejs_template_cache);
			}
		}
		else {
			next();
		}
	});
};
