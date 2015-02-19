# pushie  [![NPM version](https://badge.fury.io/js/pushie.svg)](http://badge.fury.io/js/pushie)


** CommonJS/Browserified ajax form submission **

Pushie is a browser history api wrapper, with fallback support to use URL hashes. 

[API Documenation](https://yawetse.github.io/pushie/api/html/index.html)

## Example

Check out `example/index.html`, the example javascript for the example page is `resources/js/example_src.js`

## Installation

```
$ npm install pushie
```

Pushie is a browserified/commonjs javascript module.

## Usage

*JavaScript*
```javascript
var Pushie = require('pushie'),
	myPushie,
	uiButton;

//initialize nav component after the dom has loaded
window.addEventListener('load',function(){
	myPushie = new Pushie({
    replacecallback: function(data){console.log(data)},
    pushcallback: function(data){console.log(data)},
    popcallback: function(data){console.log(data)}
  });
  uiButton = document.querySelector('#uiButton');
  uiButton.addEventListener('click',function(event){
  	event.preventDefault();
  	//normally you would do this after you queried for some data
  	myPushie.pushHistory({
			data: {
				title: 'some',
				name: 'sample',
				location: 'data you want to save'
			},
			title: 'some sample title',
			href: event.target.href
		});
  	return false;
  });
	//expose your nav component to the window global namespace
	window.myPushie = myPushie;
});
```

*HTML*
```html
<html>
	<head>
  	<title>Your Page</title>
  	<script src='[path/to/browserify/bundle].js'></script>
	</head>
	<body>
		<p>
			<a href="/newhistory/javascripthref" id="uiButton">replace third history</a>
		</p>
	</body>
</html>
```

##OPTIONS
```javascript
defaultOptions = {
	push_state_support: true,
	replacecallback: function (data) {
		console.log(data);
	},
	popcallback: function (data) {
		console.log(data);
	},
	pushcallback: function (data) {
		console.log(data);
	}
};
```

##API

```javascript
//submit pushie via ajax
myPushie.replaceHistory(options);  // options.data, options.title, options.href
myPushie.pushHistory(options); // options.data, options.title, options.href
myPushie.popHistory(options); // if no window.history.pushState then supply options.href

//events
myPushie.on('initialized'); // callback()
myPushie.on('pushhistory',callback); // callback(data)
myPushie.on('replacehistory',callback); // callback(data)
myPushie.on('pophistory',callback); // callback(data)
```
##Development
*Make sure you have grunt installed*
```
$ npm install -g grunt-cli
```

Then run grunt watch
```
$ grunt watch #uses grunt-connect on port 8181 
```
##For generating documentation
```
$ grunt doc
$ jsdoc2md lib/**/*.js index.js > doc/api.md
```

##Notes
* The Pushie uses Node's event Emitter for event handling.
* In order to test post submission, grunt connect is used on port 8181