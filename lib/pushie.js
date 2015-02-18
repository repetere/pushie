/*
 * pushie
 * http://github.com/yawetse/pushie
 *
 * Copyright (c) 2015 Typesettin. All rights reserved.
 */
'use strict';

var events = require('events'),
	util = require('util'),
	extend = require('util-extend'),
;

/**
 * A module that represents a pushie object, a componentTab is a page composition tool.
 * @{@link https://github.com/typesettin/pushie}
 * @author Yaw Joseph Etse
 * @copyright Copyright (c) 2014 Typesettin. All rights reserved.
 * @license MIT
 * @constructor pushie
 * @requires module:async
 * @requires module:classie
 * @requires module:events
 * @requires module:forbject
 * @requires module:querystring
 * @requires module:superagent
 * @requires module:util-extend
 * @requires module:util
 * @param {object} options configuration options
 * @example 
		ajaxsubmitclassname: 'pushie',
		ajaxsubmitfileuploadclassname: 'pushie-file',
		ajaxformselector: '#pushie',
		jsonp: false,
		autosubmitselectors: '.autoFormSubmit',
		autosubmitelements: [],
		preventsubmitselectors: '.noFormSubmit',
		preventsubmitelements: [],
		headers: {},
		queryparameters: {},
		postdata: {},
		beforesubmitcallback: null,
		errorcallback: null,
		successcallback: null
 */
var pushie = function (options) {
	events.EventEmitter.call(this);
	var rand = function () {
			return Math.random().toString(36).substr(2); // remove `0.`
		},
		token = function () {
			return rand() + rand(); // to make it longer
		};
	var defaultOptions = {
		pushie_id: token(),
		push_state_support: false,
		callback: function (data) {
			console.log(data);
		}
	};
	this.options = extend(defaultOptions, options);

	this.pushHistory = this.__pushHistory;
	this.popHistory = this.__popHistory;
	this.init();
	// this.render = this._render;
	// this.addBinder = this._addBinder;
};

util.inherits(pushie, events.EventEmitter);


/**
 * sets push state
 * @param {object} options data,title,href
 * @emits pushhistory
 */
pushie.prototype.__pushHistory = function (options) {
	if (this.options.push_state_support) {
		window.history.pushState(options.data, options.title, options.href);
	}
	else {
		window.sessionStorage.setItem(this.options.pushie_id + options.href, JSON.stringify(options));
		window.location.hash = options.href;
	}
	this.emit('pushhistory', options);
};

/**
 * restores pop state
 * @param {object} options data,title,href
 * @emits pushhistory
 */
pushie.prototype.__popHistory = function (options) {
	var popdata;
	if (this.options.push_state_support) {
		this.options.callback(options.data);
	}
	else {
		popdata = JSON.parse(window.sessionStorage.getItem(this.options.pushie_id + options.href));
		this.options.callback(popdata);
	}
	this.emit('pophistory', options);
};

/**
 * sets this.options.form, also adds event listener for pushie form [this.ajaxFormEventListers()], adds auto submit form listeners [this.submitOnChangeListeners()], and prevent submit listeners [this.preventEnterSubmitListeners()]
 * @emits initialized
 */
pushie.prototype._init = function () {
	if (this.options.push_state_support === false) {
		window.addEventListener('hashchange', function () {
			this.options.popHistory({
				href: window.location.hash.substr(1, window.location.hash.length)
			});
		});
	}
	else {

	}
	this.emit('initialized');
};
module.exports = pushie;
